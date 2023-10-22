<!-- NOTE!!  -->
<!-- This file is designed to be included by a parent page -->

!!! example "Batch script to run a high-throughput computing (HTC) job on *Casper*"
    This example shows how to create a script for running
    a **high-throughput computing (HTC)** job. Such jobs typically use only
    a few CPU cores and likely do not require the use of an MPI library or
    GPU.

    === "bash"
        ```bash
        #!/bin/bash -l
        ### Job Name
        #PBS -N htc_job
        ### Charging account
        #PBS -A <project_code>
        ### Request one chunk of resources with 1 CPU and 10 GB of memory
        #PBS -l select=1:ncpus=1:mem=10GB
        ### Allow job to run up to 30 minutes
        #PBS -l walltime=30:00
        ### Route the job to the casper queue
        #PBS -q casper
        ### Join output and error streams into single file
        #PBS -j oe

        export TMPDIR=${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Load Conda/Python module and activate NPL environment
        module load conda
        conda activate npl

        ### Run analysis script
        python myscript.py datafile.dat
        ```


    === "tcsh"
        ```tcsh
        #!/bin/tcsh
        ### Job Name
        #PBS -N htc_job
        ### Charging account
        #PBS -A <project_code>
        ### Request one chunk of resources with 1 CPU and 10 GB of memory
        #PBS -l select=1:ncpus=1:mem=10GB
        ### Allow job to run up to 30 minutes
        #PBS -l walltime=30:00
        ### Route the job to the casper queue
        #PBS -q casper
        ### Join output and error streams into single file
        #PBS -j oe

        setenv TMPDIR ${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Load Conda/Python module and activate NPL environment
        module load conda
        conda activate npl

        ### Run analysis script
        python myscript.py datafile.dat
        ```

!!! example "Batch script to run an MPI GPU job on *Casper*"

    === "bash"
        ```bash
        #!/bin/bash -l
        #PBS -N mpi_job
        #PBS -A <project_code>
        #PBS -l select=2:ncpus=4:mpiprocs=4:ngpus=4:mem=40GB
        #PBS -l gpu_type=v100
        #PBS -l walltime=01:00:00
        #PBS -q casper
        #PBS -j oe

        export TMPDIR=${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Provide CUDA runtime libraries
        module load cuda

        ### Run program
        mpirun ./executable_name
        ```

    === "tcsh"
        ```tcsh
        #!/bin/tcsh
        ### Job Name
        #PBS -N mpi_gpu_job
        ### Charging account
        #PBS -A <project_code>
        ### Request two resource chunks, each with 4 CPUs, GPUs, MPI ranks, and 40 GB of memory
        #PBS -l select=2:ncpus=4:mpiprocs=4:ngpus=4:mem=40GB
        ### Specify that the GPUs will be V100s
        #PBS -l gpu_type=v100
        ### Allow job to run up to 1 hour
        #PBS -l walltime=01:00:00
        ### Route the job to the casper queue
        #PBS -q casper
        ### Join output and error streams into single file
        #PBS -j oe

        setenv TMPDIR ${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Provide CUDA runtime libraries
        module load cuda

        ### Run program
        mpirun ./executable_name
        ```

!!! example "Batch script to run a pure OpenMP job on *Casper*"

    === "bash"
        ```bash
        #!/bin/bash -l
        #PBS -N OpenMP_job
        #PBS -A <project_code>
        #PBS -l select=1:ncpus=8:ompthreads=8
        #PBS -l walltime=00:10:00
        #PBS -q casper
        #PBS -j oe

        export TMPDIR=${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Run program
        ./executable_name
        ```

    ===  "tcsh"
        ```tcsh
        #!/bin/tcsh
        #PBS -N OpenMP_job
        #PBS -A <project_code>
        #PBS -l select=1:ncpus=8:ompthreads=8
        #PBS -l walltime=00:10:00
        #PBS -q casper
        #PBS -j oe

        setenv TMPDIR ${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Run program
        ./executable_name
        ```

!!! example "Batch script to run a hybrid MPI/OpenMP job on *Casper*"

    === "bash"
        ```bash
        #!/bin/bash -l
        #PBS -N hybrid_job
        #PBS -A <project_code>
        #PBS -l select=2:ncpus=8:mpiprocs=2:ompthreads=4
        #PBS -l walltime=00:10:00
        #PBS -q casper
        #PBS -j oe

        export TMPDIR=${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Run program
        mpirun ./executable_name
        ```

    === "tcsh"
        ```tcsh
        #!/bin/tcsh
        #PBS -N hybrid_job
        #PBS -A <project_code>
        #PBS -l select=2:ncpus=8:mpiprocs=2:ompthreads=4
        #PBS -l walltime=00:10:00
        #PBS -q casper
        #PBS -j oe

        setenv TMPDIR ${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Run program
        mpirun ./executable_name
        ```

!!! example "Batch script to run a job array on *Casper*"

    Job arrays are useful for submitting and managing collections of similar
    jobs – for example, running the same program repeatedly on different
    input files. PBS can process a job array more efficiently than it can
    process the same number of individual non-array jobs.

    This example uses environment variable `PBS_ARRAY_INDEX` as an
    argument in running the jobs. This variable is set by the scheduler in
    each of your array subjobs, and spans the range of values set in
    the `#PBS -J` array directive.


    === "bash"
        ```bash
        #!/bin/bash -l
        #PBS -N job_array
        #PBS -A <project_code>
        ### Each array subjob will be assigned a single CPU with 4 GB of memory
        #PBS -l select=1:ncpus=1:mem=4GB
        #PBS -l walltime=00:10:00
        #PBS -q casper
        ### Request 10 subjobs with array indices spanning 2010-2020 (input year)
        #PBS -J 2010-2020
        #PBS -j oe

        export TMPDIR=${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Run program
        ./executable_name data.year-$PBS_ARRAY_INDEX
        ```

    === "tcsh"
        ```tcsh
        #!/bin/tcsh
        #PBS -N job_array
        #PBS -A <project_code>
        ### Each array subjob will be assigned a single CPU with 4 GB of memory
        #PBS -l select=1:ncpus=1:mem=4GB
        #PBS -l walltime=01:00:00
        #PBS -q casper
        ### Request 10 subjobs with array indices spanning 2010-2020 (input year)
        #PBS -J 2010-2020
        #PBS -j oe

        setenv TMPDIR ${SCRATCH}/temp
        mkdir -p ${TMPDIR}

        ### Run program
        ./executable_name data.year-$PBS_ARRAY_INDEX
        ```


    If you need to include a job ID in a subsequent `qsub` command, be
    sure to use quotation marks to preserve the `[]` brackets, as in
    this example:
    ```pre
    qsub -W "depend=afterok:317485[]" postprocess.pbs
    ```

!!! example "Using NVIDIA MPS in *Casper* GPU jobs"
    Some workflows benefit from processing more than one CUDA kernel on a
    GPU concurrently, as a single kernel is not sufficient to keep the GPU
    fully utilized. NVIDIA’s Multi-Process Service (MPS) enables this
    capability on modern NVIDIA GPUs like the V100s on Casper.

    Consider using MPS when you are requesting more MPI tasks than physical
    GPUs. Particularly for jobs with large problem sizes, using multiple MPI
    tasks with MPS active can sometimes offer a performance boost over using
    a single task per GPU.

    The PBS job scheduler provides MPS support via a chunk-level resource.
    When you request MPS, PBS will perform the following steps on each
    specified chunk:

    1.  Launch the MPS control daemon on each job node.

    2.  Start the MPS server on each node.

    3.  Run your GPU application.

    4.  Terminate the MPS server and daemon.

    To enable MPS on job hosts, add `mps=1` to your select statement
    chunks as follows:
    ```pre
    #PBS -l select=1:ncpus=8:mpiprocs=8:mem=60GB:ngpus=1:mps=1
    ```
    On each V100 GPU, you may use MPI to launch up to 48 CUDA contexts (GPU
    kernels launched by MPI tasks) when using MPS. MPS can be used with
    OpenACC and OpenMP offload codes as well, as the compiler generates CUDA
    code from your directives at compile time.

    Jobs may not request MPS activation on nodes with GP100 GPUs.

    In this example, we run a CUDA Fortran program that also uses MPI. The
    application was compiled using the NVIDIA HPC SDK compilers, the CUDA
    toolkit, and Open MPI. We request all GPUs on each node and use NVIDIA
    MPS to use multiple MPI tasks on CPU nodes for each GPU.

    === "bash"
    ```bash
    #!/bin/bash
    #PBS -A <project_code>
    #PBS -N gpu_mps_job
    #PBS -q casper@casper-pbs
    #PBS -l walltime=01:00:00
    #PBS -l select=2:ncpus=36:mpiprocs=36:ngpus=4:mem=300GB:mps=1
    #PBS -l gpu_type=v100

    # Use scratch for temporary files to avoid space limits in /tmp
    export TMPDIR=${SCRATCH}/temp
    mkdir -p ${TMPDIR}

    # Load modules to match compile-time environment
    module purge
    module load ncarenv nvhpc/22.5 cuda/11.4 openmpi/4.1.4

    # Run application using Open MPI
    mpirun ./executable_name
    ```
