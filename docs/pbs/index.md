# What is a Job?

Unlike a personal machine, NCAR HPC resources are shared between a plethora of different users with different use cases. In order to ensure everyone has fair access to computational resources, a __job scheduler__ is used to ration out resources for certain periods of time. These allotments of resources are known as __jobs__. Users can access these computational resources by submitting commands to the job scheduler.

### Types of Jobs
There are 2 types of jobs that users can request when on the system.

#### Batch jobs
A batch job is a type of job that submits a request for resources along with commands or a script. The scheduler then finds the desired resources and executes provided commands on said resources. This type of job is entirely non-interactive and is usually the most common type of job on NCAR HPC Resources.

__Reasons to run a batch job:__

- The application needs to run for several hours.
- The application is best suited for a scripted workflow.
- The application does not require any interaction with the user. 
- The application needs to be run many times either in series or in parallel.

You can run a batch job either by preparing a [job script](#job-scripts) and [submitting it with](#submitting-your-first-job) `qsub` or with `qcmd` for single commands.

#### Interactive jobs
An interactive job is an allotment of resources without a predetermined set of commands submitted with the request. These types of jobs load you into an interactive session where you can run your commands directly on a node. These types of jobs are usually best for developing workflows or debugging applications. They can also be used when doing visualization or development work. Interactive jobs can be invoked directly on the command line, by requesting a JupyterHub session, or by [requesting a FastX session](../compute-systems/casper/remote-desktops.md#using-fastx).

__Reasons to run an interactive job:__

- You need to build or test the workflow before committing to a script.
- You need to interact with the application as it is executing.
- You are building an application that is best tested on a compute node in real time.

To get an interactive job run the `qinteractive` command.

### Job Scripts
By far the most common type of job on NCAR HPC systems are batch jobs. These jobs often make use of a script headed by a set of directives requesting resources from the scheduler. This is then followed a set of commands to be completed under the job. Directives can be included on the command line or within the job script, but directives from command line will always have precedence.

#### Anatomy of a Job Script
Job scripts are commonly organized in 3 distinct sections: *directives*, *environment management*, and *scripting*.  Directives are required by the scheduler to launch a job. Environment management and scripting are optional components of your job scripts but it is highly recommended to follow this structure to ensure software stack compatibility for future runs.

```
#!/bin/bash
# These are the PBS Directives
#PBS -n hello_pbs
#PBS -A <project_code>
#PBS -j oe
#PBS -q main
#PBS -l walltime=00:05:00
#PBS -l select=2:ncpus=128:mpiprocs=128

# Environment Management
module purge
module load ncarenv/24.12 intel cray-mpich
TMPDIR=/glade/derecho/scratch/$USER/tmpdir

# Scripting
mpiexec ./parallelapp
mv parallel_output /glade/work/$USER/output
```

##### PBS directives
The example above contains several directives which are interpreted by the qsub submission program:

| Directive | Function     |
| --------- | ------------ |
| `#PBS -n hello_pbs` | Provides a job name. This name will be displayed by the scheduler for diagnostic and file output. If omitted, and a script is used to submit the job, the job's name is the name of the script. |
| `#PBS -A <project_code>` | Specify an NCAR project allocation from which the job will charge core or GPU hours. (You will want to replace `<project_code>` with your project's specific code.) |
| `#PBS -j oe` | Requests we combine any standard text output (o) and error (e) into one output file. (By default, PBS will write program output and error to different log files. This behavior is contrary to what many users expect from terminal interaction, where output and error are generally interspersed. This optional flag changes that behavior.) |
| `#PBS -q main` | Specifies the desired PBS queue for this job |
| `#PBS-l walltime=00:05:00` | Requests 5 minutes as the maximum job execution (walltime) time. Specified in HH:MM:SS format. |
| `#PBS -l select=2:ncpus=128:mpiprocs=128` | Request a computational resource chunk, detailing the quantity and configuration of compute nodes required for this job. This example requests a selection of 2 nodes, where each node must have 128 CPU cores, each of which we will use as an MPI rank in our application. |

Some directives like queues may vary from system to system. Please check out our [queues and charging](./charging.md) page for more information.

##### Environment Setup
Once your PBS directives are in place, there’s no restriction on what else is needed in script. This being said, CISL recommends users configure their environments to be tailored to what their job needs are at the start of the script. This usually includes explicit module setup, setting a `TMPDIR`, and setting any additional variables you might need within the script. 

**Loading and reporting the specific module environment required for this job.**

Defining the module environment is not required but highly recommended as a best practice to facilitate debugging or reproducing later.  If the module environment is not defined in the script then the job will run with the default module stack.  The default module stack is changed periodically which could lead to errors if you compiled an application with an older, incompatible default module environment.  Additional details on setting up your module environment can be found in the [modules](../environment-and-software/user-environment/modules.md) section.

**Explicitly setting the `TMPDIR` variable.**

Many programs write temporary data to `TMPDIR`, which is usually small and shared amongst users. Specifying your own directory for temporary files can help you avoid the risk of your own programs and other users' programs failing when no more space is available.

##### Remaining job-specific steps

Lastly we add in whatever commands we need to run the application. In this simple case, we run `parallelapp`, a simple MPI program.

### Submitting your first job

The three commands to submit a job are as follows:

#### qsub
`qsub` submits a script to the job scheduler. Normally, this command is the fundamental building block for all PBS job submission. On NCAR HPC systems, it is primarily used for batch jobs.

```
# Request a batch job
qsub <your-job-script>
```

As noted prior, qsub can also take in any number of directives as flags for the command. 

```
qsub -A <your-account> -l walltime=00:10:00 <your-job-script>
```

PBS commands are share among NCAR HPC Systems, but specific directive values will vary. Check out the more extensive [job scripts](./job-scripts/index.md) documentation for more information.

#### qcmd
`qcmd` is an NCAR provided submission command that submits a single command to the job scheduler and waits for the jobs completion. This command is great for smaller tasks that would be CPU or memory constrained on a login node.

```
qcmd <PBS-Directives> -- <your-command>
```

By default, `qcmd` will request a single node with 32 cores on the `develop` queue. An account must be provided at run time or through the `PBS_ACCOUNT` environment variable.

#### `qinteractive`

`qinteractive` is an another NCAR provided submission command that provides a convenient way to start an interactive job. By default, when you run `qinteractive` on Casper, it starts an interactive job with 1 CPU and 10GB of memory. On Derecho, `qinteractive` starts an interactive job with 32 CPUs and 55GB of memory on the `develop` queue.

The following example shows how to start an interactive job on either Derecho or Casper :

```bash
qinteractive -A <project_code> -l walltime=01:00:00
```

!!! tip
    The `-A` flag is needed if users have not specified a default project code in their environment. The default project code can be specified using the environment variable `PBS_ACCOUNT`. Default project codes can also be specified for a specific system using `PBS_ACCOUNT_DERECHO` and `PBS_ACCOUNT_CASPER` for Derecho and Casper, respectively.

Users can also start an interactive job on Casper or Derecho using the `qsub -I` command. The `-I` flag is used to request an interactive session. The following example shows how to start an interactive job with specified resources on Casper:

```bash
qsub -I -l select=1:ncpus=1:mem=20GB -q casper -l walltime=06:00:00 -A <project_code>
```

### Propagating environment settings
Some users find it useful to set environment variables in their login environment that can be temporarily used for multiple batch jobs without modifying the job script. This practice can be particularly useful during iterative development and debugging work.

PBS has two approaches to propagation:

- Specific variables can be forwarded to the job upon request.
- The entire environment can be forwarded to the job.

In general, the first approach is preferred because the second may have unintended consequences.

These settings are controlled by qsub arguments that can be used at the command line or as directives within job scripts. Here are examples of both approaches:

```
# Selectively forward runtime variables to the job (lower-case v)
qsub -v DEBUG=true,CASE_NAME job.pbs
```

When you use the selective option (lower-case v), you can either specify only the variable name to propagate the current value (as in `CASE_NAME` in the example), or you can explicitly set it to a given value at submission time (as in `DEBUG`).

```
# Forward the entire environment to the job (upper-case V)
qsub -V job.pbs
```

!!! Warning
    Do not use full propagation when peer-scheduling jobs. Doing so will cause libraries and binaries to be inherited via variables like `PATH` and `LD_LIBRARY_PATH`. These inherited settings will cause applications to break, and may render the job completely unusable.

### Managing your Jobs
Here are some of the most useful commands for managing and monitoring jobs that have been launched with PBS.

Most of these commands will only modify or query data from jobs that are active on the same system. That is, run each command on Derecho if you want to interact with a job on Derecho.

Run any command followed by `-h` to get help, as in `qhist -h`.

##### qdel
Run qdel with the job ID to kill a pending or running job.

```
qdel jobID
```
Kill all of your own pending or running jobs. (Be sure to use backticks as shown.)
```
qdel `qselect -u $USER`
```
##### qhist
Run qhist for information on finished jobs.

```
qhist -u $USER
```
Your output will include jobs that finished on the current day unless you specify the number (N) of days to include.

```
qhist -u $USER -d N
```
Your output will be similar to this, with Mem(GB) and CPU(%) indicating approximate total memory usage per job and average CPU usage per core per job:

```
Job ID  User     Queue  Nodes NCPUs Finish  RMem(GB)  Mem(GB) CPU(%) Elap(h)
2426690 stormyk  regular    1     1 05-1527        -     0.3   75.0    0.09
2426693 stormyk  regular    1     1 05-1527        -     0.1   90.0    0.09
2426541 stormyk  regular    1     1 05-1523        -     0.1   83.0    0.03
2426542 stormyk  regular    1     1 05-1524        -     0.1   70.0    0.04
2426683 stormyk  regular    1     1 05-1523        -     0.1    0.0    0.02
2426444 stormyk  regular    1     1 05-1522        -     0.1   19.0    0.02
2426435 stormyk  regular    1     1 05-1522        -     0.1   13.0    0.02
```

You can obtain additional job details using `qhist -w` for wide output, or customize the output. See `qhist --format=help` for a list of options.
The following variation will generate a list of jobs that finished with non-zero exit codes to help you identify jobs that failed.

```
qhist -u $USER -r x0
```

##### qstat
Run this to see the status of all of your own unfinished jobs.

```
qstat -u $USER
```
Your output will be similar to what is shown just below. Most column headings are self-explanatory – `NDS` for nodes, `TSK` for tasks, and so on.

In the status (S) column, most jobs are either queued (Q) or running (R). Sometimes jobs are held (H), which might mean they are dependent on the completion of another job. If you have a job that is held and is not dependent on another job, CISL recommends killing and resubmitting the job.
```
                                                       Req'd  Req'd   Elap
Job ID         Username Queue   Jobname SessID NDS TSK Memory Time  S Time
------         -------- -----   ------- ------ --- --- ------ ----- - ----
657237.chadmin apatelsm economy ens603   46100 60  216   --   02:30 R 01:24
657238.chadmin apatelsm regular ens605     --   1   36   --   00:05 H   --
657466.chadmin apatelsm economy ens701    5189 60  216   --   02:30 R 00:46
657467.chadmin apatelsm regular ens703     --   1   36   --   00:10 H   --
```

Following are examples of `qstat` with some other commonly used options and arguments.

Get a long-form summary of the status of an unfinished job.
```
qstat -f jobID
```

Get a single-line summary of the status of an unfinished or recently completed job (within 72 hours).

```
qstat -x jobID
```
Get information about unfinished jobs in a specified execution queue.

```
qstat <queue_name>
```
See job activity by queue (e.g., pending, running) in terms of numbers of jobs.

```
qstat -Q
```
Display information for all of your pending, running, and finished jobs.

```
qstat -x -u $USER
```
Query jobs running on one system by specifying the system as shown here.

```
qstat -w -u $USER @derecho
```
!!! tip

    Query jobs running on one system by specifying `@derecho` or `@casper` from either system as shown here.

```
qstat -w -u $USER @derecho
qstat -w -u $USER @casper
```
