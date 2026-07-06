# Casper qsub command picker

Use this quick form to build a PBS submission command for Casper. It is meant as a starting point for students and new users who want a readable way to translate a simple resource request into a `qsub` command.

<div id="casper-qsub-picker-form" class="admonition">
  <div class="admonition-title">Build a Casper qsub command</div>
  <div style="display:grid; gap:0.75rem;">
    <label>
      <strong>Project code</strong><br />
      <input id="project-input" type="text" value="" placeholder="project code" style="width:100%;" />
    </label>

    <label id="queue-label">
      <strong>Queue</strong><br />
      <select id="queue-select" style="width:100%;"></select>
      <div id="queue-warning" style="display:none; margin-top:0.35rem; font-size:0.9rem; color:#b45309;"></div>
    </label>

    <label>
      <strong>Node type</strong><br />
      <select id="node-type-select" style="width:100%;"></select>
    </label>
    <p id="node-type-help" style="margin:0; font-size:0.9rem;"></p>
    <div id="node-summary" style="margin:0;"></div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:0.75rem;">
      <label>
        <strong>Node count</strong><br />
        <select id="node-count-select" style="width:100%;"></select>
      </label>
      <label>
        <strong>CPUs per node</strong><br />
        <input id="cpus-input" type="number" min="1" max="34" value="34" />
      </label>
      <label>
        <strong>Memory per node (GB)</strong><br />
        <input id="mem-input" type="number" min="1" max="354" value="354" />
      </label>
      <label>
        <strong>Walltime</strong><br />
        <input id="walltime-input" type="text" value="01:00:00" placeholder="HH:MM:SS" />
      </label>
    </div>

    <div id="gpu-options-block" hidden>
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:0.75rem;">
        <label>
          <strong>GPUs per node</strong><br />
          <input id="gpu-count-input" type="number" min="1" max="8" value="1" />
        </label>
        <label>
          <strong>MPI ranks per node</strong><br />
          <input id="mpiprocs-input" type="number" min="1" max="8" value="1" />
        </label>
      </div>
    </div>
    <p id="resource-help" style="margin:0; font-size:0.8rem;"></p>

    <label style="display:flex; align-items:center; gap:0.5rem;">
      <input id="interactive-checkbox" type="checkbox" />
      <strong>Use interactive qsub (-I)</strong>
    </label>

    <label>
      <strong>Generated qsub command</strong><br />
      <pre id="qsub-output" style="white-space:pre-wrap; word-break:break-word;"></pre>
    </label>

    <div style="margin-top:-0.25rem;">
      <button id="copy-command-btn" type="button" style="border:1px solid #d1d5db; background:#fff; padding:0.45rem 0.75rem; border-radius:0.3rem;">Copy</button>
    </div>
  </div>
</div>

## How to use it

1. Choose a project code and queue that fits your workflow.
2. Pick a node type to load the typical CPU, memory, and GPU profile for that class of node.
3. Adjust the node count, CPUs per node, and memory per node as needed.
4. If the selected node type supports GPUs, set the GPU count and MPI ranks as appropriate.
5. Review the generated qsub command and copy it as a starting point for a batch script or one-off submission.

For a more detailed explanation of Casper queues and node types, see [Casper node types](./casper-node-types.md).
