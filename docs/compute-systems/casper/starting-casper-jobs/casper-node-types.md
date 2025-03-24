# Targeting a Casper Node Architecture

Casper is a heterogeneous system that has several node architectures.  The chart below provides architecture specifications and example PBS select statements to target a specific node type.  Targeting a specific node may impact scheduler time, particularly for architectures with low node counts.  The PBS select statements are basic examples to request the node and you will likely want to modify the select parameters to better suit your job workflow needs.

Be mindful that these examples only show a way to guarantee the scheduler gives you that node type.  There are instances where modifying the example CPU count may overlap with other node types.  A specific example would be selecting `#PBS -l select=1:ncpus=4` which could place you on any of the High-Throughput Computing node types.

Two parameters that are helpful for targeting node types are `cpu_type` and `gpu_type`.  The table below provides example on how to use them and if you need to use them for requesting a node type.

The examples below also do not include options for MPI ranks or OpenMP threads but should be added if you want parallelism for multiple CPUs in your job.  Memory requests are also omitted in the examples unless it is a requirement to be placed on large memory nodes.  You can reference the [job script examples](casper-job-script-examples.md) to help build your submission script or contact the [NCAR Research Computing help desk](https://rchelp.ucar.edu/) if you have any questions about targeting a node type with PBS select statements that are optimal for your workflow.

| Node Type                | CPU            | Cores | Core Speed | Node Memory | GPU          | GPU Memory | Node Count | PBS Select Statements                                                   |
|--------------------------|----------------|-------|------------|-------------|--------------|------------|-------|--------------------------------------------------------------------------|
| Data & Visualization     | Intel Skylake  | 36    | 2.3GHz     | 384 GB      | GP100        | 16 GB      | 9     | -l select=1:ncpus=1:ngpus=1 -l gpu_type=gp100                            |
|                          | Intel Skylake  | 36    | 2.3GHz     | 384 GB      | A100         | 40 GB      | 3     | -l select=1:ncpus=1:ngpus=1:cpu_type=skylake -l gpu_type=a100            |
|                          | AMD EPYC 9474F | 48   | 3.6GHz           | 733 GB            | L40          | 48 GB           | 6     | -l select=1:ncpus=1:ngpus=1 -l gpu_type=l40            |
| ML & GPGPU               | Cascade Lake   | 36    | 2.6GHz     | 768 GB      | V100 (x4)    | 32 GB      | 4     | -l select=1:ncpus=1:ngpus=4 -l gpu_type=v100                             |
|                          | Intel Cascade Lake   | 36    | 2.6GHz     | 1152 GB     | V100 (x8)    | 32 GB      | 6     | -l select=1:ncpus=8:mpiprocs=8:ngpus=8 -l gpu_type=v100                             |
|                          | AMD EPYC Milan     | 128   | 2.45GHz    | 1024 GB     | A100 (x4)    | 80 GB      | 8     | -l select=1:ncpus=4:mpiprocs=4:ngpus=4:cpu_type=milan -l gpu_type=a100              |
|                          | Intel Xeon Gold 6430     | 64    | 2.10Ghz        | 985 GB            | H100 (x4)    | 80 GB      | 2     | -l select=1:ncpus=4:mpiprocs=4:ngpus=4 -l gpu_type=h100                             |
| High-Throughput Computing| Cascade Lake   | 36    | 2.6GHz     | 384 GB      |              |            | 62    | -l select=1:ncpus=36:cpu_type=cascadelake                             |
|                          | Cascade Lake   | 36    | 2.3GHz     | 1500 GB     |              |            | 2     | -l select=1:ncpus=36:cpu_type=cascadelake:mem=800GB                   |
|                          | AMD Epyc 9554P           | 62    | 3.1GHz           | 768 GB     |              |            | 64     | -l select=1:ncpus=62:cpu_type=genoa                  |
|                          | AMD Epyc 9554P           | 64    | 3.1GHz           | 1536 GB     |              |            | 6     | -l select=1:ncpus=64:cpu_type=genoa:mem=800GB                  |
