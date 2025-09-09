# Targeting a Casper Node Architecture

!!! tip
    This page is written with the assumption that you have some experience using
    PBS Pro to schedule compute jobs. If you are not yet familiar with job
    submission, we recommend you review our [PBS Pro documentation](../../../pbs)
    first.

Casper is a heterogeneous system that has several node architectures.  The
charts below provides architecture specifications and example PBS select
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

The examples below do not include optional the `ompthreads=X` argument for
OpenMP threads but can be added if you need hybrid parallelism for your job.
The `mpiprocs=X` setting is omitted except in cases where a GPU is requested
since the GPUs underlying communication method requires a MPI rank for each GPU.


# Shared vs. Exclusive Resources

Casper's queue is set to share node resources across job requests but you may
need to request an exclusive node for your job.  The tables below provide
examples for job resource select statements that will aim for either more
performant with exclusive nodes or faster queue time with shared nodes.  The
range of parameters can be inferred from careful analysis between the shared and
exclusive request amounts.  You can reference the [job script
examples](../../pbs/job-scripts/casper-job-script-examples.md) to help build your submission script or
contact the [NCAR Research Computing help desk](https://rchelp.ucar.edu/) if you
have any questions about targeting a node type with PBS select statements that
are optimal for your workflow.

## Shared Node

These settings will prioritize reducing your time in the queue and can be
thought of as the minimum required resource requests to ensure you receive the
desired node type.  Memory requests are omitted in the examples unless it is a
requirement to be placed on large memory nodes.

| Node Type                | CPU            | Cores | Core Speed | Node Memory | GPU          | GPU Memory | Node Count | PBS Select Statements                                                   |
|--------------------------|----------------|-------|------------|-------------|--------------|------------|-------|--------------------------------------------------------------------------|
| Data & Visualization     | Intel Skylake  | 36    | 2.3GHz     | 384 GB      | GP100        | 16 GB      | 9     | -l select=1:ncpus=1:ngpus=1 -l gpu_type=gp100                            |
|                          | Intel Skylake  | 36    | 2.3GHz     | 384 GB      | A100         | 40 GB      | 3     | -l select=1:ncpus=1:ngpus=1:cpu_type=skylake -l gpu_type=a100            |
|                          | AMD EPYC 9474F | 48   | 3.6GHz           | 733 GB            | L40          | 48 GB           | 6     | -l select=1:ncpus=1:ngpus=1 -l gpu_type=l40            |
| ML & GPGPU               | Intel Cascade Lake   | 36    | 2.6GHz     | 768 GB      | V100 (x4)    | 32 GB      | 4     | -l select=1:ncpus=1:ngpus=1 -l gpu_type=v100                             |
|                          | Intel Cascade Lake   | 36    | 2.6GHz     | 1152 GB     | V100 (x8)    | 32 GB      | 6     | -l select=1:ncpus=5:mpiprocs=5:ngpus=5 -l gpu_type=v100                             |
|                          | AMD EPYC Milan     | 128   | 2.45GHz    | 992 GB     | A100 (x4)    | 80 GB      | 8     | -l select=1:ncpus=16:mpiprocs=1:ngpus=1:cpu_type=milan -l gpu_type=a100              |
|                          | Intel Xeon Gold 6430     | 64    | 2.10Ghz        | 985 GB            | H100 (x4)    | 80 GB      | 2     | -l select=1:ncpus=8:mpiprocs=1:ngpus=1 -l gpu_type=h100                             |
| High-Throughput Computing| Intel Cascade Lake   | 34    | 2.6GHz     | 354 GB      |              |            | 62    | -l select=1:ncpus=1:cpu_type=cascadelake                             |
|                          | Intel Cascade Lake   | 36    | 2.3GHz     | 1500 GB     |              |            | 2     | -l select=1:ncpus=1:cpu_type=cascadelake:mem=400GB                   |
|                          | AMD Epyc 9554P           | 62    | 3.1GHz           | 733 GB     |              |            | 64     | -l select=1:ncpus=1:cpu_type=genoa                  |
|                          | AMD Epyc 9554P           | 62    | 3.1GHz           | 1536 GB     |              |            | 6     | -l select=1:ncpus=1:cpu_type=genoa:mem=400GB                  |

## Exclusive Node

These settings will ensure that your job reserves the entire node.  These
requests can be thought of as the maximum amount of resources of the given node
type.

| Node Type                | CPU            | Cores | Core Speed | Node Memory | GPU          | GPU Memory | Node Count | PBS Select Statements                                                   |
|--------------------------|----------------|-------|------------|-------------|--------------|------------|-------|--------------------------------------------------------------------------|
| Data & Visualization     | Intel Skylake  | 36    | 2.3GHz     | 384 GB      | GP100        | 16 GB      | 9     | -l select=1:ncpus=36:ngpus=1:mem=354GB -l gpu_type=gp100                            |
|                          | Intel Skylake  | 36    | 2.3GHz     | 384 GB      | A100         | 40 GB      | 3     | -l select=1:ncpus=36:ngpus=1:mem=354GB:cpu_type=skylake -l gpu_type=a100            |
|                          | AMD EPYC 9474F | 48   | 3.6GHz           | 733 GB            | L40          | 48 GB           | 6     | -l select=1:ncpus=48:mpiprocs=1:ngpus=1:mem=732GB -l gpu_type=l40            |
| ML & GPGPU               | Intel Cascade Lake   | 36    | 2.6GHz     | 768 GB      | V100 (x4)    | 32 GB      | 4     | -l select=1:ncpus=36:mpiprocs=4:ngpus=4:mem=740GB -l gpu_type=v100                             |
|                          | Intel Cascade Lake   | 36    | 2.6GHz     | 1152 GB     | V100 (x8)    | 32 GB      | 6     | -l select=1:ncpus=36:mpiprocs=8:ngpus=8:mem=1100GB -l gpu_type=v100                             |
|                          | AMD EPYC Milan     | 128   | 2.45GHz    | 992 GB     | A100 (x4)    | 80 GB      | 8     | -l select=1:ncpus=128:mpiprocs=4:ngpus=4:cpu_type=milan:mem=991GB -l gpu_type=a100              |
|                          | Intel Xeon Gold 6430     | 64    | 2.10Ghz        | 985 GB            | H100 (x4)    | 80 GB      | 2     | -l select=1:ncpus=64:mpiprocs=4:ngpus=4:mem=984GB -l gpu_type=h100               |
| High-Throughput Computing| Intel Cascade Lake   | 34    | 2.6GHz     | 354 GB      |              |            | 62    | -l select=1:ncpus=36:cpu_type=cascadelake:mem=353GB                             |
|                          | Intel Cascade Lake   | 36    | 2.3GHz     | 1500 GB     |              |            | 2     | -l select=1:ncpus=36:cpu_type=cascadelake:mem=1480GB                   |
|                          | AMD Epyc 9554P           | 62    | 3.1GHz           | 733 GB     |              |            | 64     | -l select=1:ncpus=62:cpu_type=genoa:mem=732GB                  |
|                          | AMD Epyc 9554P           | 62    | 3.1GHz           | 1536 GB     |              |            | 6     | -l select=1:ncpus=62:cpu_type=genoa:mem=1480GB                  |
        
## Large Memory Nodes

Select statements that have memory values greater than 400GB are routed to the
`largemem` queue.  There are fewer nodes that are assigned the `largemem` flag
so queue times may be longer if you request enough memory to land on this
routing method.

For the High-Throughput Computing nodes, requesting less than 350GB is a good
way to ensure that you will be routed to the general `htc` queue with shorter
wait times.
