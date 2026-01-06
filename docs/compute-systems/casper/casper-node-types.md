# Casper Node Types

## Targeting a Casper Node Architecture

!!! tip
    This page is written with the assumption that you have some experience using
    PBS Pro to schedule compute jobs. If you are not yet familiar with job
    submission, we recommend you review our [PBS Pro documentation](../../../pbs)
    first.

Casper is a heterogeneous system that has several node architectures.  The
tables below provides architecture specifications and example PBS select
statements to target a specific node type.  Targeting a specific node may impact
scheduler time, particularly for architectures with low node counts.  The PBS
select statements are basic examples to request the node and you will likely
want to modify the select parameters to better suit your job workflow needs.

Be mindful that these examples only show a way to guarantee the scheduler gives
you that node type.  There are instances where modifying the example CPU count
may overlap with other node types.  A specific example would be selecting `#PBS
-l select=1:ncpus=4` which could place you on any of the High-Throughput
Computing node types.

Two parameters that are helpful for targeting node types are `cpu_type` and
`gpu_type`.  The tables below provides examples on how to use them and if you
need to use them for requesting a node type.

!!! info
    The examples below do not include optional the `ompthreads=X` argument for OpenMP threads but can be added if you need hybrid parallelism for your job.
    The `mpiprocs=X` setting is omitted except in cases where a GPU is requested since the GPUs underlying communication method requires a MPI rank for each GPU.

## Shared vs. Exclusive Resources

Casper's queue is set to share node resources across job requests but you may
need to request an exclusive node for your job.  The table in the [Resource Selection](#resource-selection) section provides
examples for job resource select statements that will aim for either more
performant with exclusive nodes or faster queue time with shared nodes.   You can reference the [job script
examples](../../pbs/job-scripts/casper-job-script-examples.md) to help build your submission script or
contact the [NCAR Research Computing help desk](https://rchelp.ucar.edu/) if you
have any questions about targeting a node type with PBS select statements that
are optimal for your workflow.

### Shared Node

These settings will prioritize reducing your time in the queue by requesting a subset of the available resources of that node. Fewer resources requested for a node will generally result in shorter queue times but will place you on nodes with other users running jobs.

### Exclusive Node

These settings will ensure that your job reserves the entire node.  These
requests can be thought of as the maximum amount of resources of the given node
type. For best performance, it is recommended to utilize all of the resources of a node if you are requesting an exclusive node.

## Resource Selection

The PBS select statements in this table provide ranges of resources for each node type. Ranges are italicized within brackets of the select statement. However, you cannot provide ranges as part of the select statement using PBS; it must be a static value. For example, the H100 nodes would allow a minimum resource request:

```
-l select=1:ncpus=1:mpiprocs=1:mem=10gb:ngpus=1:gpu_type=h100
```
up to the maximum resource request:
```
-l select=1:ncpus=64:mpiprocs=4:mem=985gb:ngpus=4:gpu_type=h100
```

The maximum resource request will always provide you with an exclusive node.

| Node Type                | CPU            | Cores | Core Speed | Node Memory | GPU          | GPU Memory | Node Count | PBS Select Statement                                                   |
|--------------------------|----------------|-------|------------|-------------|--------------|------------|-------|--------------------------------------------------------------------------|
| High-Throughput Computing| Intel Cascade Lake   | 34    | 2.6GHz     | 354 GB      |              |            | 62    | -l select=1:ncpus=[*1-34*]:mem=[*10-354*]gb:cpu_type=cascadelake                             |
|                          | AMD Epyc 9554P           | 62    | 3.1GHz           | 733 GB     |              |            | 64     | -l select=1:ncpus=[*1-62*]:mem=[*10-732*]gb:cpu_type=genoa                  |
| Large Memory                         | Intel Cascade Lake   | 36    | 2.3GHz     | 1500 GB     |              |            | 2     | -l select=1:ncpus=[*1-36*]:mem=[*400-1500*]gb:cpu_type=cascadelake                  |
|                          | AMD Epyc 9554P           | 62    | 3.1GHz           | 1536 GB     |              |            | 6     | -l select=1:ncpus=[*1-62*]:mem=[*400-1525*]gb:cpu_type=genoa                 |
| Data & Visualization     | Intel Skylake  | 36    | 2.3GHz     | 384 GB      | GP100        | 16 GB      | 9     | -l select=1:ncpus=[*1-36*]:mem=[*10-384*]gb:ngpus=1:gpu_type=gp100                            |
|                          | Intel Skylake  | 36    | 2.3GHz     | 384 GB      | A100         | 40 GB      | 3     | -l select=1:ncpus=[*1-36*]:mem=[*10-384*]gb:ngpus=1:gpu_type=a100_40gb            |
|                          | AMD EPYC 9474F | 48   | 3.6GHz           | 733 GB            | L40          | 48 GB           | 6     | -l select=1:ncpus=[*1-48*]:mem=[*10-732*]gb:ngpus=1:gpu_type=l40            |
| ML & GPGPU               | Intel Cascade Lake   | 36    | 2.6GHz     | 768 GB      | V100 (x4)    | 32 GB      | 4     | -l select=1:ncpus=[*1-36*]:mpiprocs=[*1-4*]:mem=[*10-768*]gb:ngpus=[*1-4*]:gpu_type=v100_4way                             |
|                          | Intel Cascade Lake   | 36    | 2.6GHz     | 1152 GB     | V100 (x8)    | 32 GB      | 6     | -l select=1:ncpus=[*1-36*]:mpiprocs=[*1-8*]:mem=[*10-1152*]gb:ngpus=[*1-8*]:gpu_type=v100_8way                             |
|                          | AMD EPYC Milan     | 128   | 2.45GHz    | 992 GB     | A100 (x4)    | 80 GB      | 8     | -l select=1:ncpus=[*1-128*]:mpiprocs=[*1-4*]:mem=[*10-992*]gb:ngpus=[*1-4*]:gpu_type=a100_80gb              |
|                          | Intel Xeon Gold 6430     | 64    | 2.10Ghz        | 985 GB            | H100 (x4)    | 80 GB      | 2     | -l select=1:ncpus=[*1-64*]:mpiprocs=[*1-4*]:mem=[*10-985*]gb:ngpus=[*1-4*]:gpu_type=h100                             |
|                          | AMD MI300A Zen 4*     | 96 (24 per APU)   | 3.70Ghz        | 470 GB            | MI300A CDNA3 (6 per APU)    | 128 GB      | 2     | -l select=1:ncpus=[*1-96*]:mem=[*10-470*]gb:ngpus=4:gpu_type=mi300a  |

*\*MI300A nodes are currently exclusive-use only, and so `ngpus` must be equal to 4. Other submissions will be rejected.*

### Accelerator Node Table

The table below provides all possible options for selecting an accelerator architectures on Casper. These values can be used for the `gpu_type` argument in PBS select statements to allow targeting of a single node architecture or the first available GPU matching the chosen compute capability.

| Execution Queue | Node Type                | CC / Arch            | GPU | GPU_mem | GPU_num |                                               
|-------|--------------------------|----------------|-------|------------|-------------|
| nvgpu | 4x V100 32gb   | cc70             | v100   | v100_32gb | v100_4way   |
| | 8x V100 32gb   | cc70             | v100   | v100_32gb | v100_8way   |
| | 1x A100 40gb   | cc70, cc80       | a100   | a100_40gb | a100_1way   |
| | 4x A100 80gb   | cc70, cc80       | a100   | a100_80gb | a100_4way   |
| | 4x H100 80gb   | cc70, cc80, cc90 | h100   | h100_80gb | h100_4way   |
| amdgpu | 4x MI300A      | gfx942           | mi300a |           | mi300a_4way |
| vis | 1x GP100       | vis | gp100 | gp100_16gb | |
| | 1x L40       | vis | l40 | l40_45gb |  |

### Large Memory Nodes

Select statements that have memory values greater than 400GB are routed to the
`largemem` queue.  There are fewer nodes that are assigned the `largemem` flag
so queue times may be longer if you request enough memory to land on this
routing method.

For the High-Throughput Computing nodes, requesting less than 350GB is a good
way to ensure that you will be routed to the general `htc` queue with shorter
wait times.
