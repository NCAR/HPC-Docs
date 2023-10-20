# Portable Batch System (PBS) Job Scripts

**Job scripts** form the basis of *batch jobs*.
A job script is simply a text file with instructions of the work to
execute.  Job scripts are *usally* written in `bash` or `tcsh` and
thus mimic commands a user would execute interactively through a
shell; but instead are executed on specific resources allocated by the
scheduler when available.  Scripts can also be written in other
languages - commonly Python.


## Anatomy of a Job Script
Sample basic PBS scripts are listed below:
!!! example "PBS job scripts"
    === "bash"
        ```bash
        #!/bin/bash
        #PBS -N hello_pbs
        #PBS -A <project_code>
        #PBS -j oe
        #PBS -k eod
        #PBS -q main
        #PBS -l walltime=00:05:00
        #PBS -l select=2:ncpus=128:mpiprocs=128

        ### Set temp to scratch
        export TMPDIR=${SCRATCH}/${USER}/temp && mkdir -p $TMPDIR

        ### specify desired module environment
        module purge
        module load ncarenv/23.09 gcc/12.2.0 cray-mpich/8.1.25
        module list

        ### Compile & Run MPI Program
        mpicxx -o hello_world_derecho /glade/u/home/benkirk/hello_world_mpi.C -fopenmp
        mpiexec -n 256 -ppn 128 ./hello_world_derecho
        ```

        ---

        The first line denotes the interpreter to be used for the script.
        ```bash
        #!/bin/bash
        ```
        indicates this is a `bash` script, and that the `bash` shell will be used to parse its contents.


    === "tcsh"
        ```tcsh
        #!/bin/tcsh
        #PBS -N hello_pbs
        #PBS -A <project_code>
        #PBS -j oe
        #PBS -k eod
        #PBS -q main
        #PBS -l walltime=00:05:00
        #PBS -l select=2:ncpus=128:mpiprocs=128

        source /etc/csh.cshrc

        ### Set temp to scratch
        setenv TMPDIR ${SCRATCH}/${USER}/temp && mkdir -p ${TMPDIR}

        ### specify desired module environment
        module purge
        module load ncarenv/23.09 gcc/12.2.0 cray-mpich/8.1.25
        module list

        ### Compile & Run MPI Program
        mpicxx -o hello_world_derecho /glade/u/home/benkirk/hello_world_mpi.C -fopenmp
        mpiexec -n 256 -ppn 128 ./hello_world_derecho
        ```

        ---

        The first line denotes the interpreter to be used for the script.
        ```tcsh
        #!/bin/tcsh
        ```
        indicates this is a `tcsh` script, and that the `tcsh` shell will be used to parse its contents.

    === "Python"
        ```python
        #!/glade/u/apps/opt/conda/envs/npl/bin/python
        #PBS -N hello_pbs
        #PBS -A <project_code>
        #PBS -j oe
        #PBS -k eod
        #PBS -q main
        #PBS -l walltime=00:05:00
        #PBS -l select=1:ncpus=128:mpiprocs=128

        import sys
        print("Hello, world!!\n\n")

        print("Python version:")
        print(sys.version)
        print("Version info:")
        print(sys.version_info)
        ```

        ---

        The  first line denotes the interpreter to be used for the script.
        ```python
        #!/glade/u/apps/opt/conda/envs/npl/bin/python
        ```
        indicates this is a `python` script (and, specifically, the NCAR NPL instance), and that the `python` interpeter will be used to parse its contents.

**Focusing on the `bash` example for discussion**, the remainder of the script contains two main sections:

### `#PBS` Directives

1.  The lines beginning with `#PBS` are **directives** that will be interpreted by PBS when this script is submitted with `qsub`.
    Each of these lines contains an instruction that will be used by `qsub` to control job resoures, execution, etc...

    Specifically,

    * `-N hello_pbs` provides a *job name*.  This name will be displayed by the scheduler for diagnosic and file output.  If omitted, and a script is used to submit the job, the job's name is the  name  of  the  script.
    * `-A <project_code>` indicates which *NCAR Project Accounting code* resource allocation will be applicable to this job. (You will want to replace `<project_code>` with your project's specific code.)
    * `-j oe` requests we *combine any standard text output (`o`) and error (`e`) into one output file*.
      (By default, PBS will write program output and error to different log files.  This behavior is contraty to what many users expect from terminal interaction, where output and error are generally interspersed. This optional flag changes that behavior.)
    * `-q main` specifies the desired PBS *queue* for this job.
    * `-l walltime=00:05:00` requests 5 minutes as the maximum job execution (*walltime*) time.  Specified in `HH:MM:SS` format.
    * `-l select=2:ncpus=128:mpiprocs=128` is a computational *resource chunk* request, detailing the quantity and configuration of *compute nodes* required for this job. This examle requests a *selection* of 2 nodes, where each node must have 128 CPU cores, each of which we will use as an MPI rank in our application.


2.  The remaining **script contents** are simply `bash` commands that will be run inside the batch environment on the selected resources and define the work to be done in this job.

### Script Contents

The remaining script contains shell commands that define the job execution workflow.  The commands here are arbitrary, however we strongly reccomend the general structure presented above.  This includes

1.  **Explicitly setting the `TMPDIR` variable**.

    As described [here](../storing-temporary-files.md), many programs
    write temporary data to `TMPDIR`, which is usually small and
    shared amongst users.  Specifying your own directory for temporary
    files can help you avoid the risk of your own programs and other
    users' programs failing when no more space is available.

2.  **Loading and reporting the specific module environment required for this job.**

    While strictily not necessary (in general, the default modules will be loaded anyway), we reccomend this as best practice as it facilitates debugging and later reproducability.  (While the system default modules will change over time, manually specifying module versions allows you to recreate the same execution environment in the future.)

4.  **(*Optional*) Defining any environment variables specific to the chosen module environment.**

    Occasionally users will want to define particular runtime environemnt variables e.g. for a specific MPI or library chosen via the `module load` commands.


5.  **Remaining job-specific steps.**

    In the example above, we first compile and then execute `hello_world_mpi.C`, a simple MPI program.


---

## Common directives and PBS execution environment variables.

### Common `#PBS` directives

#### Resource `select` statements

#### Job Priority

#### Listing of common `#PBS` directives

## PBS execution environment variables
Within the **script contents** of the job script, it is common for the
specifics of the job to depend slighly on the PBS execution
environment. PBS creates a number of environment variables that can be
useful when writing portable scripts.  Some of the more useful
environment variables are:

|  <div style="width:110px">Variable</div> | Value |
|---------------|-------|
| `PBS_ACCOUNT`   | The NCAR Project Accounting code used for this job. |
| `PBS_JOBID`     | The PBS Job ID for this job.<br>Example: `1473351.desched1` |
| `PBS_JOBNAME`   | The name of this job. Matches the `-N` specified.<br>Example: `hello_pbs` |
| `PBS_O_WORKDIR` | The working directory from where the job was submitted. |
| `PBS_SELECT`    | The resource specification `-l select=` line for this job.<br>This can be useful for setting runtime-specific configuration options that might depend on resource selection.<br>(e.g. processor layout, CPU binding, etc...)<br>Example: `2:ncpus=128:mpiprocs=2:ompthreads=2:mem=200GB:Qlist=cpu:ngpus=0`  |
| `PBS_NODEFILE`  | A file whose contents lits the nodes assigned to this job.<br> Typically listed as one node name per line, for each MPI rank in the job.<br>Each node will be listed for as many times as it has MPI ranks. <br>Example: `/var/spool/pbs/aux/1473351.desched1` |

<!-- | `PBS_QUEUE`     | The name of the PBS execution queue.<br>In general this will be an *execution* queue, and different than the *routing* queue specified by `-q` in the job script.<br>Example: `cpu` | -->



PBS_SELECT=2:ncpus=128:mpiprocs=2:ompthreads=2:mem=200GB:Qlist=cpu:ngpus=0+1:ncpus=128:mpiprocs=4:ompthreads=4:mem=200GB:Qlist=cpu:ngpus=0
