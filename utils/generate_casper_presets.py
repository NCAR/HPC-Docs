#!/usr/bin/env python3
"""
Generate docs/javascripts/casper-node-presets.json from live PBS node data.

Must be run on Casper (or somewhere that can reach casper-pbs).
If run from Derecho it will automatically SSH to casper.

Usage:
    python utils/generate_casper_presets.py [--dry-run]
"""

import argparse
import json
import math
import subprocess
import sys
from pathlib import Path

OUTPUT = Path(__file__).parent.parent / "docs/javascripts/casper-node-presets.json"

# ---------------------------------------------------------------------------
# Static config: only edit these when Casper gets new hardware or policy changes
# ---------------------------------------------------------------------------

QUEUES = [
    {"value": "develop",  "label": "develop"},
    {"value": "htc",      "label": "htc"},
    {"value": "largemem", "label": "largemem"},
    {"value": "vis",      "label": "vis"},
    {"value": "nvgpu",    "label": "nvgpu"},
    {"value": "amdgpu",   "label": "amdgpu"},
]

# Map (cpu_type, primary_gpu_type, primary_queue) → static metadata.
NODE_META = {
    ("cascadelake", "", "htc"): {
        "value":    "cascadelake-htc",
        "label":    "High-throughput / Intel Cascade Lake",
        "family":   "cpu",
        "queue":    "htc",
        "cpuType":  "cascadelake",
        "cpuDesc":  "Intel Cascade Lake • {ncpus} cores • 2.6 GHz",
        "gpuMode":  "none",
        "mpiprocsEnabled": False,
    },
    ("cascadelake", "", "largemem"): {
        "value":    "cascadelake-largemem",
        "label":    "Large memory / Intel Cascade Lake",
        "family":   "large-memory",
        "queue":    "largemem",
        "cpuType":  "cascadelake",
        "cpuDesc":  "Intel Cascade Lake • {ncpus} cores • 2.3 GHz",
        "gpuMode":  "none",
        "mpiprocsEnabled": False,
    },
    ("skylake", "", "htc"): {
        "value":    "skylake-htc",
        "label":    "High-throughput / Intel Skylake",
        "family":   "cpu",
        "queue":    "htc",
        "cpuType":  "skylake",
        "cpuDesc":  "Intel Skylake • {ncpus} cores • 2.3 GHz",
        "gpuMode":  "none",
        "mpiprocsEnabled": False,
    },
    ("genoa", "", "htc"): {
        "value":    "genoa-htc",
        "label":    "High-throughput / AMD Genoa",
        "family":   "cpu",
        "queue":    "htc",
        "cpuType":  "genoa",
        "cpuDesc":  "AMD Genoa • {ncpus} cores • 3.1 GHz",
        "gpuMode":  "none",
        "mpiprocsEnabled": False,
    },
    ("genoa", "", "largemem"): {
        "value":    "genoa-largemem",
        "label":    "Large memory / AMD Genoa",
        "family":   "large-memory",
        "queue":    "largemem",
        "cpuType":  "genoa",
        "cpuDesc":  "AMD Genoa • {ncpus} cores • 3.1 GHz",
        "gpuMode":  "none",
        "mpiprocsEnabled": False,
    },
    ("cascadelake", "v100_4way", "nvgpu"): {
        "value":    "v100-4way",
        "label":    "ML / GPGPU / V100 4-way",
        "family":   "gpu",
        "queue":    "nvgpu",
        "cpuDesc":  "Intel Cascade Lake • {ncpus} cores • 2.6 GHz",
        "gpuMode":  "multi",
        "gpuDesc":  "NVIDIA V100 • 32 GB each",
        "gpuType":  "v100_4way",
        "defaultGpuCount": 4,
        "mpiprocsEnabled": True,
    },
    ("cascadelake", "v100_8way", "nvgpu"): {
        "value":    "v100-8way",
        "label":    "ML / GPGPU / V100 8-way",
        "family":   "gpu",
        "queue":    "nvgpu",
        "cpuDesc":  "Intel Cascade Lake • {ncpus} cores • 2.6 GHz",
        "gpuMode":  "multi",
        "gpuDesc":  "NVIDIA V100 • 32 GB each",
        "gpuType":  "v100_8way",
        "defaultGpuCount": 8,
        "mpiprocsEnabled": True,
    },
    ("skylake", "v100_4way", "nvgpu"): {
        "value":    "skylake-v100-4way",
        "label":    "ML / GPGPU / V100 4-way (Skylake)",
        "family":   "gpu",
        "queue":    "nvgpu",
        "cpuDesc":  "Intel Skylake • {ncpus} cores • 2.3 GHz",
        "gpuMode":  "multi",
        "gpuDesc":  "NVIDIA V100 • 32 GB each",
        "gpuType":  "v100_4way",
        "defaultGpuCount": 4,
        "mpiprocsEnabled": True,
    },
    ("skylake", "v100_8way", "nvgpu"): {
        "value":    "skylake-v100-8way",
        "label":    "ML / GPGPU / V100 8-way (Skylake)",
        "family":   "gpu",
        "queue":    "nvgpu",
        "cpuDesc":  "Intel Skylake • {ncpus} cores • 2.3 GHz",
        "gpuMode":  "multi",
        "gpuDesc":  "NVIDIA V100 • 32 GB each",
        "gpuType":  "v100_8way",
        "defaultGpuCount": 8,
        "mpiprocsEnabled": True,
    },
    ("skylake", "gp100", "vis"): {
        "value":    "gp100-vis",
        "label":    "Data & visualization / GP100",
        "family":   "vis",
        "queue":    "vis",
        "cpuDesc":  "Intel Skylake • {ncpus} cores • 2.3 GHz",
        "gpuMode":  "single",
        "gpuDesc":  "NVIDIA GP100 • 16 GB",
        "gpuType":  "gp100",
        "mpiprocsEnabled": False,
    },
    ("skylake", "a100_40gb", "vis"): {
        "value":    "a100-vis",
        "label":    "Data & visualization / A100",
        "family":   "vis",
        "queue":    "vis",
        "cpuDesc":  "Intel Skylake • {ncpus} cores • 2.3 GHz",
        "gpuMode":  "single",
        "gpuDesc":  "NVIDIA A100 • 40 GB",
        "gpuType":  "a100_40gb",
        "mpiprocsEnabled": False,
    },
    ("genoa", "l40", "vis"): {
        "value":    "l40-vis",
        "label":    "Data & visualization / L40",
        "family":   "vis",
        "queue":    "vis",
        "cpuDesc":  "AMD EPYC 9474F • {ncpus} cores • 3.6 GHz",
        "gpuMode":  "single",
        "gpuDesc":  "NVIDIA L40 • 48 GB",
        "gpuType":  "l40",
        "mpiprocsEnabled": False,
    },
    ("milan", "a100_80gb", "nvgpu"): {
        "value":    "a100-80gb",
        "label":    "ML / GPGPU / A100 80GB",
        "family":   "gpu",
        "queue":    "nvgpu",
        "cpuDesc":  "AMD EPYC Milan • {ncpus} cores • 2.45 GHz",
        "gpuMode":  "multi",
        "gpuDesc":  "NVIDIA A100 • 80 GB each",
        "gpuType":  "a100_80gb",
        "defaultGpuCount": 4,
        "mpiprocsEnabled": True,
    },
    ("sapphirerapids", "h100", "nvgpu"): {
        "value":    "h100",
        "label":    "ML / GPGPU / H100",
        "family":   "gpu",
        "queue":    "nvgpu",
        "cpuDesc":  "Intel Xeon Gold (Sapphire Rapids) • {ncpus} cores • 2.1 GHz",
        "gpuMode":  "multi",
        "gpuDesc":  "NVIDIA H100 • 80 GB each",
        "gpuType":  "h100",
        "defaultGpuCount": 4,
        "mpiprocsEnabled": True,
    },
    ("mi300a", "mi300a", "amdgpu"): {
        "value":    "mi300a",
        "label":    "ML / GPGPU / MI300A",
        "family":   "mi300a",
        "queue":    "amdgpu",
        "cpuDesc":  "AMD MI300A • {ncpus} cores • 3.7 GHz",
        "gpuMode":  "multi",
        "gpuDesc":  "AMD MI300A • 128 GB each",
        "gpuType":  "mi300a",
        "defaultGpuCount": 4,
        "mpiprocsEnabled": True,
    },
}

# Queue guidance rules keyed by node family.
QUEUE_GUIDANCE = {
    "cpu": [
        {
            "when": {"field": "memPerNode", "operator": ">", "value": 733},
            "queue": "largemem",
            "message": 'Memory above 733 GB usually means the "largemem" queue. This helps match large-memory jobs to the right resources.',
        }
    ],
    "large-memory": [
        {
            "when": {"field": "memPerNode", "operator": "<=", "value": 733},
            "queue": "htc",
            "message": "This request uses a large-memory node type, but the memory request is below the usual large-memory routing threshold.",
        }
    ],
    "vis": [
        {
            "when": {"field": "gpuType", "operator": "===", "value": "l40"},
            "queue": "vis",
            "message": 'This targets a visualization node, so the "vis" queue is usually the right fit.',
        }
    ],
    "gpu": [
        {
            "when": {"field": "gpuCount", "operator": ">=", "value": 4},
            "queue": "nvgpu",
            "message": 'This targets NVIDIA GPU resources, so the "nvgpu" queue is usually the right fit.',
        }
    ],
    "mi300a": [
        {
            "when": {"field": "gpuCount", "operator": ">=", "value": 4},
            "queue": "amdgpu",
            "message": 'This targets AMD GPU resources, so the "amdgpu" queue is usually the right fit.',
        }
    ],
}

# Known user-facing queue names in priority order (first match in Qlist wins).
USER_QUEUES = ["htc", "largemem", "vis", "nvgpu", "amdgpu", "develop"]


def primary_user_queue(qlist_str):
    """Return the first user-facing queue found in a PBS Qlist string."""
    tokens = {q.strip() for q in qlist_str.split(",")}
    for q in USER_QUEUES:
        if q in tokens:
            return q
    return ""


# Known canonical GPU type tokens in priority order (first match wins).
GPU_CANONICAL = [
    "v100_8way", "v100_4way",
    "a100_80gb", "a100_40gb",
    "h100",
    "gp100",
    "l40",
    "mi300a",
]

# Queues to skip entirely (not Casper user-facing compute queues).
SKIP_QLISTS = {"system", "gdex", "rda", "develop", "jhublogin"}


# ---------------------------------------------------------------------------
# PBS data collection
# ---------------------------------------------------------------------------

def fetch_pbsnodes_json():
    """Run pbsnodes on Casper and return parsed JSON. SSHes if not on Casper."""
    try:
        import socket
        host = socket.gethostname()
        on_casper = "casper" in host.lower()
    except Exception:
        on_casper = False

    cmd = ["pbsnodes", "-av", "-F", "json"]
    if not on_casper:
        cmd = ["ssh", "casper"] + cmd

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ERROR: pbsnodes failed:\n{result.stderr}", file=sys.stderr)
        sys.exit(1)

    return json.loads(result.stdout)


def mb_to_gb(mem_str):
    """Convert PBS memory string (e.g. '362794mb') to integer GB (floor)."""
    mem_str = mem_str.lower()
    if mem_str.endswith("kb"):
        return int(mem_str[:-2]) // (1024 * 1024)
    if mem_str.endswith("mb"):
        return int(mem_str[:-2]) // 1024
    if mem_str.endswith("gb"):
        return int(mem_str[:-2])
    return 0


def primary_gpu_type(gpu_type_str):
    """Return the canonical GPU type from the PBS gpu_type resource string."""
    tokens = {t.strip() for t in gpu_type_str.split(",")}
    for canonical in GPU_CANONICAL:
        if canonical in tokens:
            return canonical
    return ""


def group_nodes(nodes):
    """
    Group PBS nodes by (cpu_type, primary_gpu_type) and collect max resources
    and node count for each group. Skips nodes whose Qlist is only system queues.
    """
    groups = {}
    for name, node in nodes.items():
        ra = node.get("resources_available", {})
        qlist_str = ra.get("Qlist", "")
        qlist = {q.strip() for q in qlist_str.split(",")}

        # Skip nodes that only serve internal/non-user queues.
        if qlist <= SKIP_QLISTS:
            continue

        cpu_type = ra.get("cpu_type", "")
        gpu_raw = ra.get("gpu_type", "")
        gpu_type = primary_gpu_type(gpu_raw)
        user_queue = primary_user_queue(qlist_str)
        key = (cpu_type, gpu_type, user_queue)

        ncpus = int(ra.get("ncpus", 0))
        mem_gb = mb_to_gb(ra.get("mem", "0mb"))
        ngpus = int(ra.get("ngpus", 0))

        if key not in groups:
            groups[key] = {"ncpus": ncpus, "mem_gb": mem_gb, "ngpus": ngpus, "count": 0}
        else:
            groups[key]["ncpus"] = max(groups[key]["ncpus"], ncpus)
            groups[key]["mem_gb"] = max(groups[key]["mem_gb"], mem_gb)
            groups[key]["ngpus"] = max(groups[key]["ngpus"], ngpus)

        groups[key]["count"] += 1

    return groups


# ---------------------------------------------------------------------------
# Preset assembly
# ---------------------------------------------------------------------------

def mem_summary(gb):
    if gb >= 1000:
        tb = gb / 1000
        s = f"{tb:.1f} TB RAM"
        return s
    return f"{gb} GB RAM"


def build_preset(key, hw, meta):
    ncpus = hw["ncpus"]
    mem_gb = hw["mem_gb"]
    node_count = hw["count"]
    family = meta["family"]
    gpu_mode = meta["gpuMode"]
    gpu_type = meta.get("gpuType", "")
    default_gpu = meta.get("defaultGpuCount", 1)

    gpu_summary = (
        "No GPU" if gpu_mode == "none"
        else f"{default_gpu}× {meta['gpuDesc']}"
    )

    preset = {
        "value":           meta["value"],
        "label":           meta["label"],
        "family":          family,
        "queue":           meta["queue"],
        "gpuMode":         gpu_mode,
        "mpiprocsEnabled": meta.get("mpiprocsEnabled", False),
        "queueGuidance":   QUEUE_GUIDANCE.get(family, []),
        "maxCpus":         ncpus,
        "maxMem":          mem_gb,
        "nodeCount":       node_count,
        "gpuType":         gpu_type,
        "gpuLabel":        meta.get("gpuDesc", "No GPU") if gpu_mode != "none" else "No GPU",
        "cpuSummary":      meta["cpuDesc"].format(ncpus=ncpus),
        "gpuSummary":      gpu_summary,
        "memorySummary":   mem_summary(mem_gb),
        "nodeSummary":     str(node_count),
    }

    if meta.get("cpuType"):
        preset["cpuType"] = meta["cpuType"]
    if meta.get("defaultGpuCount"):
        preset["defaultGpuCount"] = meta["defaultGpuCount"]

    return preset


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Print JSON without writing the file.")
    args = parser.parse_args()

    print("Fetching node data from Casper PBS...", file=sys.stderr)
    pbs_data = fetch_pbsnodes_json()
    nodes = pbs_data.get("nodes", {})
    print(f"  {len(nodes)} nodes found.", file=sys.stderr)

    groups = group_nodes(nodes)
    print(f"  {len(groups)} node type groups identified.", file=sys.stderr)

    node_types = []
    for key, hw in groups.items():
        meta = NODE_META.get(key)
        if meta is None:
            print(f"  WARNING: No metadata for node type {key!r} — skipping.", file=sys.stderr)
            continue
        node_types.append(build_preset(key, hw, meta))

    node_types.sort(key=lambda p: p["label"])

    output = {"queues": QUEUES, "nodeTypes": node_types}

    json_str = json.dumps(output, indent=2) + "\n"

    if args.dry_run:
        print(json_str)
    else:
        OUTPUT.write_text(json_str)
        print(f"Wrote {OUTPUT}", file=sys.stderr)


if __name__ == "__main__":
    main()
