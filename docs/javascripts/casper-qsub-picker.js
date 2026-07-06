document.addEventListener('DOMContentLoaded', function () {
  // Only run this script on pages that actually include the picker form.
  // This keeps the shared docs JS from throwing errors on unrelated pages.
  const form = document.getElementById('casper-qsub-picker-form');
  if (!form) {
    return;
  }

  // Locate the JSON file relative to this JS file.
  // Why: MkDocs pages can be nested at different URL depths, so a fixed path can break.
  // The fallback handles cases where script URL detection is unavailable.
  const presetScript = document.querySelector('script[src*="casper-qsub-picker.js"]');
  const presetDataUrl = presetScript
    ? new URL('casper-node-presets.json', presetScript.src)
    : new URL('javascripts/casper-node-presets.json', window.location.href);
  const presetDataPath = presetDataUrl.toString();

  // Cache references to all form controls and output regions.
  // These are the primary "components" this script updates.
  const queueSelect = document.getElementById('queue-select');
  const nodeTypeSelect = document.getElementById('node-type-select');
  const nodeCountSelect = document.getElementById('node-count-select');
  const nodeSummary = document.getElementById('node-summary');
  const queueWarning = document.getElementById('queue-warning');
  const resourceHelp = document.getElementById('resource-help');
  const cpuInput = document.getElementById('cpus-input');
  const memInput = document.getElementById('mem-input');
  const walltimeInput = document.getElementById('walltime-input');
  const projectInput = document.getElementById('project-input');
  const gpuCountInput = document.getElementById('gpu-count-input');
  const interactiveCheckbox = document.getElementById('interactive-checkbox');
  const mpiprocsInput = document.getElementById('mpiprocs-input');
  const output = document.getElementById('qsub-output');
  const copyButton = document.getElementById('copy-command-btn');
  const gpuBlock = document.getElementById('gpu-options-block');

  let nodePresets = {};
  let queueOptions = [];
  let nodeTypeOptions = [];

  // Casper execution queues are route-only in PBS. Users conceptually choose
  // the resource queue, but submissions must go through the route queue.
  const routeOnlyQueues = {
    htc: true,
    largemem: true,
    vis: true,
    nvgpu: true,
    amdgpu: true,
    cpu: true,
  };

  // Read a numeric input safely and clamp it to at least 1.
  // If the field is empty or invalid, use the provided fallback.
  function parseInputValue(element, fallback) {
    const parsed = parseInt(element.value, 10);
    return Number.isNaN(parsed) ? fallback : Math.max(1, parsed);
  }

  // Tiny grammar helper used for the human-readable summary text.
  function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
  }

  // Convert a selected queue to the queue value that should appear in qsub.
  // If PBS marks a queue as from_route_only, users must submit to "casper".
  function resolveSubmissionQueue(queueName) {
    return routeOnlyQueues[queueName] ? 'casper' : queueName;
  }

  // Fetch and normalize preset data from JSON into:
  // 1) ordered arrays for dropdown rendering, and
  // 2) a lookup map for fast access by node type value.
  function loadPresetData() {
    return fetch(presetDataPath)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Unable to load node preset data');
        }
        return response.json();
      })
      .then(function (data) {
        queueOptions = (data.queues || []).filter(function (queue) {
          return !routeOnlyQueues[queue.value];
        });

        // Ensure the Casper route queue is available for user submission.
        if (!queueOptions.some(function (queue) { return queue.value === 'casper'; })) {
          queueOptions.unshift({ value: 'casper', label: 'casper' });
        }

        nodeTypeOptions = data.nodeTypes || [];
        nodePresets = {};
        nodeTypeOptions.forEach(function (preset) {
          nodePresets[preset.value] = preset;
        });
      });
  }

  // Populate the queue dropdown from the preset metadata.
  function populateQueueOptions() {
    queueSelect.innerHTML = '';
    queueOptions.forEach(function (queue) {
      const option = document.createElement('option');
      option.value = queue.value;
      option.textContent = queue.label;
      queueSelect.appendChild(option);
    });

    // Keep startup default explicit so we never fall back to "develop".
    if (queueOptions.some(function (queue) { return queue.value === 'casper'; })) {
      queueSelect.value = 'casper';
    }
  }

  // Build a short display label for node type dropdown options.
  // Some labels may include trailing parenthetical notes; those are removed
  // here so the selector remains easier to scan.
  function formatNodeTypeLabel(preset) {
    return (preset.labelBase || preset.label || '')
      .replace(/\s*\([^)]*\)\s*$/g, '')
      .trim();
  }

  function populateNodeTypeOptions() {
    nodeTypeSelect.innerHTML = '';
    nodeTypeOptions.forEach(function (preset) {
      const option = document.createElement('option');
      option.value = preset.value;
      option.textContent = formatNodeTypeLabel(preset);
      nodeTypeSelect.appendChild(option);
    });
  }

  // Populate the node-count dropdown based on the currently selected node type.
  function updateNodeCountOptions(preset) {
    nodeCountSelect.innerHTML = '';
    const maxNodes = preset.nodeCount;
    for (let i = 1; i <= maxNodes; i += 1) {
      const opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = String(i);
      nodeCountSelect.appendChild(opt);
    }
    nodeCountSelect.value = '1';
  }

  function getSelectedPreset() {
    // Prefer explicit user selection; otherwise fall back to first preset.
    return nodePresets[nodeTypeSelect.value] || nodeTypeOptions[0] || {};
  }

  // Evaluate queue recommendation rules for the current resource request.
  // Each rule checks a single condition (memory, GPU count, or GPU type).
  // Returns the first matching rule, or undefined when no guidance applies.
  function evaluateQueueGuidance(preset, values) {
    const guidance = preset.queueGuidance || [];

    return guidance.find(function (rule) {
      const condition = rule.when || {};
      const field = condition.field;
      const actualValue = values[field];
      const expectedValue = condition.value;

      if (field === 'memPerNode') {
        if (condition.operator === '>') {
          return actualValue > expectedValue;
        }
        if (condition.operator === '<=') {
          return actualValue <= expectedValue;
        }
      }

      if (field === 'gpuCount') {
        if (condition.operator === '>=') {
          return actualValue >= expectedValue;
        }
      }

      if (field === 'gpuType') {
        return condition.operator === '===' && actualValue === expectedValue;
      }

      return false;
    });
  }

  // Warn when the selected queue does not match the resource profile implied by the form.
  function updateQueueWarning() {
    const preset = getSelectedPreset();
    const selectedQueue = queueSelect.value || preset.queue;
    const memPerNode = parseInputValue(memInput, 1);
    const gpuCount = parseInputValue(gpuCountInput, 1);
    const gpuType = preset.gpuType || '';
    const guidance = evaluateQueueGuidance(preset, { memPerNode: memPerNode, gpuCount: gpuCount, gpuType: gpuType });

    if (!guidance) {
      queueWarning.textContent = '';
      queueWarning.style.display = 'none';
      return;
    }

    const expectedQueue = guidance.queue;
    const expectedSubmissionQueue = resolveSubmissionQueue(expectedQueue);
    const warningText = guidance.message || '';

    if (selectedQueue === expectedSubmissionQueue) {
      queueWarning.textContent = '';
      queueWarning.style.display = 'none';
      return;
    }

    // Show a warning only when the selected queue does not match suggested routing.
    queueWarning.textContent = 'This request is normally submitted through the "' + expectedSubmissionQueue + '" queue. The selected queue "' + selectedQueue + '" may not target these resources as intended. ' + warningText;
    queueWarning.style.display = 'block';
    queueWarning.style.color = '#b45309';
  }

  // Render the selected node profile summary shown above the form controls.
  function updateNodeSummary() {
    const preset = getSelectedPreset();
    const memorySummary = (preset.memorySummary || '').replace(/\s+RAM\b/i, '').trim();
    nodeSummary.innerHTML = '<div style="border-left:4px solid #4f46e5; padding:0.7rem 0.9rem; background:#f8fafc; border-radius:0.4rem;">' +
      '<div style="font-weight:600; margin-bottom:0.35rem;">Selected node profile</div>' +
      '<div style="display:grid; gap:0.35rem; font-size:0.95rem;">' +
      '<div><strong>CPU:</strong> ' + preset.cpuSummary + '</div>' +
      '<div><strong>GPU:</strong> ' + preset.gpuSummary + '</div>' +
      '<div><strong>Memory:</strong> ' + memorySummary + '</div>' +
      '<div><strong>Nodes:</strong> ' + preset.nodeSummary + '</div>' +
      '</div></div>';
  }

  // Update the compact request summary shown beneath the resource fields.
  function updateResourceHelp() {
    const preset = getSelectedPreset();
    const nodeCount = parseInputValue(nodeCountSelect, 1);
    const cpusPerNode = parseInputValue(cpuInput, 1);
    const memPerNode = parseInputValue(memInput, 1);
    const gpuCount = preset.gpuMode && preset.gpuMode !== 'none'
      ? (preset.gpuMode === 'single' ? 1 : parseInputValue(gpuCountInput, 1))
      : null;
    const mpiRanks = preset.mpiprocsEnabled && preset.gpuMode && preset.gpuMode !== 'none'
      ? parseInputValue(mpiprocsInput, 1)
      : null;

    // Build a compact sentence that mirrors what will end up in the PBS select clause.
    let summary = nodeCount + ' ' + pluralize(nodeCount, 'node', 'nodes') + ' × (' + cpusPerNode + ' ' + pluralize(cpusPerNode, 'CPU', 'CPUs') + ', ' + memPerNode + ' GB';

    if (gpuCount) {
      summary += ', ' + gpuCount + ' ' + pluralize(gpuCount, 'GPU', 'GPUs');
    }

    if (mpiRanks) {
      summary += ', ' + mpiRanks + ' ' + pluralize(mpiRanks, 'MPI rank', 'MPI ranks');
    }

    summary += ')';

    resourceHelp.textContent = summary;
    updateNodeSummary();
    updateQueueWarning();
  }

  // Apply the currently selected node preset to the form controls.
  function updateNodePreset() {
    const preset = getSelectedPreset();
    if (!preset.value) {
      return;
    }

    // Use the actual submission queue for this node type.
    queueSelect.value = resolveSubmissionQueue(preset.queue);
    cpuInput.min = '1';
    memInput.min = '10';
    cpuInput.max = preset.maxCpus;
    memInput.max = preset.maxMem;

    cpuInput.value = String(preset.maxCpus);
    memInput.value = String(preset.maxMem);

    updateNodeCountOptions(preset);
    updateGpuOptions(preset);
    updateResourceHelp();
  }

  function syncMpiprocsWithGpuCount(preset) {
    const selectedPreset = preset || getSelectedPreset();

    if (!selectedPreset.gpuMode || selectedPreset.gpuMode === 'none' || !selectedPreset.mpiprocsEnabled) {
      return;
    }

    // For multi-GPU training-style presets, we keep mpiprocs aligned with ngpus
    // as a safe default (users can still override where enabled).
    const gpuCount = selectedPreset.gpuMode === 'single'
      ? 1
      : parseInputValue(gpuCountInput, selectedPreset.defaultGpuCount || 1);

    mpiprocsInput.value = String(gpuCount);
  }

  // Show or hide GPU-specific controls based on the selected node type.
  function updateGpuOptions(preset) {
    const selectedPreset = preset || getSelectedPreset();

    // CPU-only node types: hide GPU controls and keep fields inert.
    if (!selectedPreset.gpuMode || selectedPreset.gpuMode === 'none') {
      gpuBlock.hidden = true;
      gpuCountInput.value = '0';
      gpuCountInput.disabled = true;
      mpiprocsInput.value = '1';
      mpiprocsInput.disabled = true;
      return;
    }

    gpuBlock.hidden = false;

    // Single-GPU node types (for example visualization nodes): force 1 GPU.
    if (selectedPreset.gpuMode === 'single') {
      gpuCountInput.value = '1';
      gpuCountInput.disabled = true;
      mpiprocsInput.value = '1';
      mpiprocsInput.disabled = true;
    } else {
      // Multi-GPU node types: expose GPU count and optional MPI controls.
      gpuCountInput.value = String(selectedPreset.defaultGpuCount || 1);
      gpuCountInput.disabled = false;
      mpiprocsInput.disabled = !selectedPreset.mpiprocsEnabled;
      syncMpiprocsWithGpuCount(selectedPreset);
    }
  }

  // Build the final qsub command from the currently selected form values.
  function buildCommand() {
    const projectCode = projectInput.value.trim() || '<project_code>';
    const selectedQueue = queueSelect.value || getSelectedPreset().queue;
    const queue = resolveSubmissionQueue(selectedQueue);
    const walltime = walltimeInput.value.trim() || '01:00:00';
    const preset = getSelectedPreset();
    const maxCpus = preset.maxCpus;
    const maxMem = preset.maxMem;
    const selectedNodeCount = parseInputValue(nodeCountSelect, 1);
    // Respect node-type limits even if users type larger values manually.
    const cpus = Math.min(maxCpus, parseInputValue(cpuInput, 1));
    const mem = Math.min(maxMem, parseInputValue(memInput, 1));

    // Base PBS select clause always includes node count, CPUs, and memory.
    let selectClause = 'select=' + selectedNodeCount + ':ncpus=' + cpus + ':mem=' + mem + 'gb';

    // CPU-only families include explicit architecture targeting.
    if (preset.cpuType) {
      selectClause += ':cpu_type=' + preset.cpuType;
    }

    // GPU families include ngpus and gpu_type, and optionally mpiprocs.
    if (preset.gpuMode && preset.gpuMode !== 'none') {
      const gpuCount = preset.gpuMode === 'single' ? 1 : parseInputValue(gpuCountInput, 1);
      const gpuType = preset.gpuType || '';
      const mpiprocs = parseInputValue(mpiprocsInput, 1);
      selectClause += ':ngpus=' + gpuCount + ':gpu_type=' + gpuType;

      if (preset.mpiprocsEnabled || gpuCount > 1) {
        selectClause += ':mpiprocs=' + mpiprocs;
      }
    }

    const interactiveFlag = interactiveCheckbox.checked ? ' -I' : '';
    const command = 'qsub' + interactiveFlag + ' -A ' + projectCode + ' -q ' + queue + ' -l walltime=' + walltime + ' -l ' + selectClause;
    updateResourceHelp();
    output.textContent = command;
  }

  function copyCommand() {
    const command = output.textContent.trim();
    if (!command) {
      return;
    }

    // Prefer modern clipboard API, with a textarea fallback for older browsers.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(command).then(function () {
        copyButton.textContent = 'Copied';
        window.setTimeout(function () {
          copyButton.textContent = 'Copy command';
        }, 1500);
      });
    } else {
      const tempInput = document.createElement('textarea');
      tempInput.value = command;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      copyButton.textContent = 'Copied';
      window.setTimeout(function () {
        copyButton.textContent = 'Copy command';
      }, 1500);
    }
  }

  [queueSelect, nodeTypeSelect, nodeCountSelect, cpuInput, memInput, walltimeInput, projectInput, mpiprocsInput, interactiveCheckbox].forEach(function (element) {
    element.addEventListener('input', buildCommand);
    element.addEventListener('change', buildCommand);
  });

  // Keep MPI ranks synced with GPU count for multi-GPU presets.
  gpuCountInput.addEventListener('input', function () {
    syncMpiprocsWithGpuCount();
    buildCommand();
  });
  gpuCountInput.addEventListener('change', function () {
    syncMpiprocsWithGpuCount();
    buildCommand();
  });

  nodeTypeSelect.addEventListener('change', function () {
    updateNodePreset();
    buildCommand();
  });

  nodeCountSelect.addEventListener('change', function () {
    updateResourceHelp();
    buildCommand();
  });

  copyButton.addEventListener('click', copyCommand);

  // Startup sequence:
  // 1) load data, 2) fill dropdowns, 3) choose first preset, 4) initialize form,
  // 5) render first command preview.
  loadPresetData()
    .then(function () {
      populateQueueOptions();
      populateNodeTypeOptions();
      if (nodeTypeSelect.options.length) {
        nodeTypeSelect.value = nodeTypeOptions[0].value;
      }
      updateNodePreset();
      buildCommand();
    })
    .catch(function () {
      queueWarning.textContent = 'Unable to load Casper node preset data.';
      queueWarning.style.display = 'block';
      queueWarning.style.color = '#b45309';
    });
});
