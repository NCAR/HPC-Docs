# Portable Batch System (PBS) Job Scripts

**Job scripts** form the basis of *batch jobs*.
A job script is simply a text file with instructions of the work to
execute.  Job scripts are *usually* written in `bash` or `tcsh` and
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

        The first line denotes the interpreter to be used for the script:
        ```bash
        #!/bin/bash
        ```

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

        The first line denotes the interpreter to be used for the script:
        ```tcsh
        #!/bin/tcsh
        ```

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

        The  first line denotes the interpreter to be used for the script:
        ```python
        #!/glade/u/apps/opt/conda/envs/npl/bin/python
        ```
        indicates this is a `python` script (and, specifically, the NCAR NPL instance).

**Focusing on the `bash` example for discussion**, the remainder of the script contains two main sections:

1.  The lines beginning with `#PBS` are **directives** that will be interpreted by PBS when this script is submitted with `qsub`.
    Each of these lines contains an instruction that will be used by `qsub` to control job resources, execution, etc...

2.  The remaining **script contents** are simply `bash` commands that will be run inside the batch environment on the selected resources and define the work to be done in this job.


### PBS directives

The example above contains several **directives** which are interpreted by the `qsub` submission program:

* `-N hello_pbs` provides a *job name*.  This name will be displayed by the scheduler for diagnostic and file output.  If omitted, and a script is used to submit the job, the job's name is the  name  of  the  script.
* `-A <project_code>` indicates which *NCAR Project Accounting code* resource allocation will be applicable to this job. (You will want to replace `<project_code>` with your project's specific code.)
* `-j oe` requests we *combine any standard text output (`o`) and error (`e`) into one output file*.
  (By default, PBS will write program output and error to different log files.  This behavior is contrary to what many users expect from terminal interaction, where output and error are generally interspersed. This optional flag changes that behavior.)
* `-q main` specifies the desired PBS *queue* for this job.
* `-l walltime=00:05:00` requests 5 minutes as the maximum job execution (*walltime*) time.  Specified in `HH:MM:SS` format.
* `-l select=2:ncpus=128:mpiprocs=128` is a computational *resource chunk* request, detailing the quantity and configuration of *compute nodes* required for this job. This example requests a *selection* of 2 nodes, where each node must have 128 CPU cores, each of which we will use as an MPI rank in our application.


### Script contents

The remaining script contains shell commands that define the job execution workflow.  The commands here are arbitrary, however we strongly recommend the general structure presented above.  This includes:

1.  **Explicitly setting the `TMPDIR` variable**.

    As described [here](../storing-temporary-files.md), many programs
    write temporary data to `TMPDIR`, which is usually small and
    shared among st users.  Specifying your own directory for temporary
    files can help you avoid the risk of your own programs and other
    users' programs failing when no more space is available.

2.  **Loading and reporting the specific module environment required for this job.**

    While strictly not necessary (in general, the system default modules will be loaded anyway), we recommend this as best practice as it facilitates debugging and reproducing later.  (While the system default modules will change over time, manually specifying module versions allows you to recreate the same execution environment in the future.)

4.  **(*Optional*) Defining any environment variables specific to the chosen module environment.**

    Occasionally users will want to define particular run time environment variables e.g. for a specific MPI or library chosen via the `module load` commands.


5.  **Remaining job-specific steps.**

    In the example above, we first compile and then execute `hello_world_mpi.C`, a simple MPI program.

---

## Common `#PBS` directives

### Resource requests
Resources (compute node configuration, job duration) are requested
through a combination of *resource selection* flags, each preceded
with `-l`.

For example:
```pre
#PBS -l walltime=00:05:00
#PBS -l select=1:ncpus=64:mpiprocs=4:ngpus=4:mem=400GB
#PBS -l gpu_type=a100
#PBS -l job_priority=economy
```
specifies job `walltime`, compute node selection, GPU type, and job
priority.  See more details below.


#### `select` statements
Resources are specified through a `select` statement.  The general form of a *homogeneous* selection statement is
```pre
select=<# NODES>:ncpus=<# CPU Cores/node>:mpiprocs=<# MPI Ranks/node>:ompthreads=<# OpenMP Threads/rank>:mem=<RAM/node>:ngpus=<# GPUs/node>
```
where

*  `<# NODES>` is the total number of compute nodes requested, followed by a colon-separated list of

*  `<# CPU Cores/node>` is the *total* number of CPUs requested *on each node*, which can be a mix of MPI Ranks and/or OpenMP threads,

*  `<# MPI Ranks/node` is the number of MPI Ranks *on each node*,

*  `<# OpenMP Threads/node>` is the number of OpenMP ranks *per MPI Rank on each node*. (Optional, defaults to 1),

*  `<RAM/node>` is how much main memory (RAM) the job will be able to access *on each node*. (Optional, default is system dependent), and

*  `<# GPUs/node>` is the number of GPUs *per node*. (Optional, defaults to 0).

Taken together, this specifies a *resource chunk*. Homogeneous resource chunks are the most common case, however, *heterogeneous* selection statements can be constructed by multiple chunks separated by a **+** (examples below).

##### Examples
*  4 128-core nodes, each running 128 MPI ranks (4 `x` 128 = 512 MPI ranks total).
   ```pre
   select=4:ncpus=128:mpiprocs=128
   ```

*  4 128-core nodes, each running 32 MPI ranks with 4 OpenMP threads per ranl (4 `x` 32 = 128 MPI ranks total, each with 4 threads = 512 total CPU cores).
   ```pre
   select=4:ncpus=128:mpiprocs=32:ompthreads=4
   ```

*  2 64-core nodes, each running 4 MPI ranks, 4 GPUS, and 384 GB memory (8 GPUs total, with 8 MPI ranks).
   ```pre
   select=2:ncpus=64:mpiprocs=4:ngpus=4:mem=384GB
   ```

*  4 36-core nodes, each running 4 MPI ranks, 4 GPUS configured with NVIDIA's Multi-Process Service (MPS), and 768 GB memory (16 GPUs total, with 16 MPI ranks).
   ```pre
   select=4:ncpus=36:mpiprocs=4:ngpus=4:mem=768GB:mps=1
   ```
   MPS is simply enabled via `mps=1`, and is disabled by default (`mps=0`)

*  A heterogeneous selection, 96 128-core nodes each with 128 MPI ranks, and 32 128-core nodes each with 16 MPI ranks and 8 OpenMP threads
   ```pre
   select=96:ncpus=128:mpiprocs=128+32:ncpus=16:ompthreads=8
   ```

The particular values for `ncpus`, `mem`, `ngpus` are node-type
dependent, and most NCAR systems have more than one available node
type. (See system specific documentation for
recommended values.)

!!! tip "Request all `ncpus` when running on exclusive nodes"
    For large multi-node jobs on machines like *Derecho* nodes are
    usually assigned exclusively to a single PBS job at a time.  For
    most use cases, users will request the maximum number of CPUS
    available via `ncpus`, and consume all through a combination of
    `mpiprocs` and `ompthreads`.

    Occasionally users may want fewer than the maximum CPUs for
    computation, "under-subscribing" compute nodes.  This is usually
    done for memory intensive applications, where some cores are
    intentionally left idle in order to increase the memory available
    for the running cores.  In such circumstances users should still
    request access to all CPUs, but only use a subset.  For example
    ```bash
    select=4:ncpus=128:mpiprocs=64:ompthreads=1:mem=235GB
    ```
    requests access to all 128 CPUs on a dedicated node, but only
    assigns 64 for MPI use.

    By requesting access to all `ncpus=128` is
    recommended for this case because it allows optimally locating the
    actually used `mpiprocs=64` across the compute node via *process
    binding*.

#### `walltime`
The `-l walltime=HH:MM:SS` resource directive specifies maximum job
duration. Jobs still running when this wall time is exceeded will be
terminated automatically by the scheduler.
```pre
walltime=HH:MM:SS
```

#### `job_priority`
Users may request a specific job priority with the `-l job_priority=...` resource directive.
Valid options are:
```pre
job_priority=<regular|premium|economy>
```
Job priority impacts both scheduling and resource accounting, allowing users to run at a higher/lower priority in exchange for additional/reduced allocation consumption.  See [here](../../compute-systems/derecho/derecho-use-policies.md#job-priority) for additional information.


#### `gpu_type`
For highly heterogeneous systems such as Casper, a resource chunk
statement including GPUS may match more than one particular GPU type.
The resource specification `-l gpu_type=...` requests a particular GPU
type, removing such ambiguity.  Valid options are:
```
gpu_type=<gp100|v100|a100>
```

### Listing of frequently used `#PBS` directives
<!-- FIXME -- add a table -->

| <div style="width:160px">Directive</div> | Impact |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-A <project_code>` | NCAR Project Accounting  string  associated  with  the  job.                                                                                                                                                                                                                                                                                                                                                                           |
| `-a <date at time>`  | Allows users to request a future  *eligible time* for job execution.<br>(By default jobs are considered immediately eligible for execution.)<br> Format: `[[[YY]MM]DD]hhmm[.SS]`                                                                                                                                                                                                                                                       |
| `-h`                | Holds the job.<br><Held jobs can be released with `qrls`.                                                                                                                                                                                                                                                                                                                                                                                |
| `-I`                | Specifies **interactive** execution.<br>Interactive jobs place the user a login session on the first compute node.<br>Interactive jobs terminate when the shell exits, or `walltime` is exceeded.                                                                                                                                                                                                                                      |
| `-J <range>`        | Specifies an **array job**.<br>Use  the range argument to specify the indices of the sub jobs of the array.  range is specified in the form `X-Y[:Z]` where `X` is the first index, `Y` is the upper bound on the indices, and `Z`  is  the  stepping factor. Indices must be greater than or equal to zero.<br><br>Use the optional `%max_subjobs` argument to set a limit on the number of subjobs that can be running  at  one time. |
| `-m <mail events>`   | Sends email on specific events (may be combined).<br>`n`: No mail is sent<br>`a`: Mail is sent when the job is aborted by the batch system<br>`b`: Mail is sent when the job begins execution<br>`e`:  Mail is sent when the job terminates<br><br>Example: `-m abe` |
| `-M <address(es)>` | List of users to whom mail about the job is sent.<br>The user list argument has the form: `<username>[@<hostname>][,<username>[@<hostname>],...]` |


!!! info "`qsub` arguments take precedence over `#PBS` directives"
    Best practice is to fully specify your PBS queue, job name, and resources in your job script as shown above. This allows for better debugging and facilitates reproducing runs in the future.    When a job's PBS attributes are fully specified, you can usually submit the script with no additional arguments, for example
    ```bash
    qsub script.pbs
    ```
    (See [Running Jobs](../index.md) for more details on interacting with the scheduler.)

    ---

    On occasion users may want to change some of the PBS parameters
    without modifying the job script.  A common example may be the
    account code, the job name (`-N`) or even the `walltime`.

    Any `#PBS` directives specified in the job script can be
    overridden at submission time by equivalent arguments to `qsub`.
    For example,
    ```bash
     qsub -A <OTHER_ACCOUNT> \
          -N testing \
          -l job_priority=premium \
          script.pbs
    ```
    will run `script.pbs` under the specified `<OTHER_ACCOUNT>`
    with the job name `testing` and requests `premium` priority,
    regardless of what other values may be specified in `script.pbs`


## Execution environment variables
Within the **script contents** of the job script, it is common for the
specifics of the job to depend slightly on the PBS and specific
`module` execution environment.  Both running under PBS and loading
certain [module files](../../environment-and-software/user-environment/modules.md)
create some environment variables that might be useful when writing
portable scripts; for example scripts that might be shared among users
or executed within several different configurations.

!!! tip "Use common environment variables to write portable PBS batch scripts"
    Avoid hard-coding paths into your shell scripts if instead any of
    the environment variables below might be used.  This will
    facilitate moving scripts between systems, users, and application
    versions with minimal modifications, as output paths can be
    defined generically as opposed to hard-coded for each user.


### PBS execution environment variables
PBS creates a number of environment variables that are accessible within a job's execution environment.
Some of the more useful ones are:


|  <div style="width:110px">Variable</div> | Value |
|---------------|-------|
| `PBS_ACCOUNT`   | The NCAR Project Accounting code used for this job. |
| `PBS_JOBID`     | The PBS Job ID for this job.<br>Example: `1473351.desched1` |
| `PBS_JOBNAME`   | The name of this job. Matches the `-N` specified.<br>Example: `hello_pbs` |
| `PBS_O_WORKDIR` | The working directory from where the job was submitted. |
| `PBS_SELECT`    | The resource specification `-l select=` line for this job.<br>This can be useful for setting runtime-specific configuration options that might depend on resource selection.<br>(e.g. processor layout, CPU binding, etc...)<br>Example: `2:ncpus=128:mpiprocs=2:ompthreads=2:mem=200GB:Qlist=cpu:ngpus=0`  |
| `PBS_NODEFILE`  | A file whose contents lists the nodes assigned to this job.<br> Typically listed as one node name per line, for each MPI rank in the job.<br>Each node will be listed for as many times as it has MPI ranks. <br>Example: `/var/spool/pbs/aux/1473351.desched1` |

<!-- | `PBS_QUEUE`     | The name of the PBS execution queue.<br>In general this will be an *execution* queue, and different than the *routing* queue specified by `-q` in the job script.<br>Example: `cpu` | -->


### NCAR `module`-specific execution environment variables

| <div style="width:200px">Variable</div>                  | Value                                                                                                           |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| <p style="text-align: center;"><strong>Machine and Software Environment</strong></p> {: colspan=2} |
| `NCAR_HOST`                                              | Specifies the *host class* of machine, e.g. `derecho` or `casper`                                               |
| `NCAR_BUILD_ENV_COMPILER`                                | A unique string identifying the host and compiler+version currently loaded.<br>Example: `casper-oneapi-2023.2.1` |
| `NCAR_BUILD_ENV_MPI`                                     | A unique string identifying the host, compiler+version, and mpi+version currently loaded.<br> Example: `casper-oneapi-2023.2.1-openmpi-4.1.5` |
| `NCAR_BUILD_ENV`                                         | A unique string identifying the current *build environment*, identical to `NCAR_BUILD_ENV_MPI` when an MPI module is loaded, or `NCAR_BUILD_ENV_COMPILER` if only a compiler is loaded. |
| `LMOD_FAMILY_COMPILER`<br>`LMOD_FAMILY_COMPILER_VERSION` | Specifies the type and version of compiler currently loaded, if any.<br>Example:`intel`, `gcc`, `nvhpc`         |
| `LMOD_FAMILY_MPI`<br>`LMOD_FAMILY_MPI_VERSION`           | Specifies the type and version of MPI currently loaded, if any.<br>Example:`openmpi`, `cray-mpich`, `intel-mpi` |
| <p style="text-align: center;"><strong>User and File System Paths</strong></p> {: colspan=2} |
| `${USER}`    | The `username` of user executing the script. |
| `${HOME}`    | The GLADE home file space for the user executing the script.<br>Example: `/glade/u/home/${USER}` |
| `${WORK}`    | The GLADE work file space for the user executing the script.<br>Example: `/glade/work/${USER}` |
| `${SCRATCH}` | The GLADE scratch file space for the user executing the script.<br>Example: `/glade/derecho/scratch/${USER}` |

---

## Sample PBS job scripts

### Casper
---8<--- "docs/compute-systems/casper/starting-casper-jobs/casper-job-script-examples-content.md"

### Derecho
---8<--- "docs/compute-systems/derecho/starting-derecho-jobs/derecho-job-script-examples-content.md"

<!--  LocalWords:  mpiprocs MPI ompthreads OpenMP mem ngpus GPUs  ncpus
 -->
