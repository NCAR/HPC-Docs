# Starting and managing jobs with PBS

!!! info "About this page"
    This documentation provides information for how to use PBS Pro to submit and manage interactive jobs and batch jobs on NSF NCAR systems.

    The basic PBS commands are the same on each cluster, but refer to these system-specific pages for details that are unique to each of them, including hardware specifications, software, and job-submission queues and procedures:

    - [Derecho](../compute-systems/derecho/index.md )
    - [Casper](../compute-systems/casper/index.md )

Computerized batch processing is a method of running software programs
called jobs in batches automatically. While users are required to
submit the jobs, no other interaction by the user is required to
process the batch. Batches may automatically be run at scheduled times
as well as being run contingent on the availability of computer
resources. For additional background, see
[Batch Computing Overview](https://en.wikipedia.org/wiki/Batch_processing).
NSF NCAR's HPC resources use the [Portable Batch System](https://en.wikipedia.org/wiki/Portable_Batch_System)
as implemented in Altair's [PBS Pro](https://altair.com/pbs-professional) across shared resources.


---

## Job scripts
[Job scripts](./job-scripts/index.md) form the basis of *batch jobs*.
A job script is simply a text file with instructions of the work to
execute.  Job scripts are *usually* written in `bash` or `tcsh` and
thus mimic commands a user would execute interactively through a
shell; but instead are executed on specific resources allocated by the
scheduler when available.  Scripts can also be written in other
languages - commonly Python.  See our [job scripts](./job-scripts/index.md) page for a detailed discussion of job
scripts and examples.


## Submitting jobs
In the examples that follow, `script_name`, `job.pbs` etc... represent a job script files submitted for batch execution.

[PBS Pro](https://altair.com/pbs-professional) is used to schedule both interactive jobs and batch compute jobs. Detailed examples of how to start both types of jobs are included in the documentation (see links above) for each individual system.

Commands for starting interactive jobs are specific to individual systems. The basic command for starting a batch job, however, is the same.

To submit a batch job, use the `qsub` command followed by the name of your PBS batch script file.

```bash
qsub script_name
```

### Propagating environment settings

Some users find it useful to set environment variables in their login environment that can be temporarily used for multiple batch jobs without modifying the job script. This practice can be particularly useful during iterative development and debugging work.

PBS has two approaches to propagation:

1. Specific variables can be forwarded to the job upon request.
2. The entire environment can be forwarded to the job.

In general, the first approach is preferred because the second may have unintended consequences.

These settings are controlled by qsub arguments that can be used at the command line or as directives within job scripts. Here are examples of both approaches:

```bash
# Selectively forward runtime variables to the job (lower-case v)
qsub -v DEBUG=true,CASE_NAME job.pbs
```

When you use the selective option (lower-case `v`), you can either specify only the variable name to propagate the current value (as in `CASE_NAME` in the example), or you can explicitly set it to a given value at submission time (as in `DEBUG`).

```bash
# Forward the entire environment to the job (upper-case V)
qsub -V job.pbs
```
Do not use full propagation when peer-scheduling jobs. Doing so will cause libraries and binaries to be inherited via variables like `PATH` and `LD_LIBRARY_PATH`. These inherited settings **will** cause applications to break, and may render the job completely unusable.

## Managing jobs

Here are some of the most useful commands for managing and monitoring jobs that have been launched with PBS.

Most of these commands will only modify or query data from jobs that are active on the same system. That is, run each command on Derecho if you want to interact with a job on Derecho.

Run any command followed by `-h` to get help, as in `qhist -h`.

### `qdel`
Run `qdel` with the job ID to kill a pending or running job.

```bash
qdel jobID
```
Kill all of your own pending or running jobs. (Be sure to use backticks as shown.)

```bash
qdel `qselect -u $USER`
```

### `qhist`
Run `qhist` for information on finished jobs.

```bash
qhist -u $USER
```

Your output will include jobs that finished on the current day unless you specify the number (`N`) of days to include.

```bash
qhist -u $USER -d N
```

Your output will be similar to this, with `Mem(GB)` and `CPU(%)` indicating approximate total memory usage per job and average CPU usage per core per job:
```pre
Job ID  User     Queue  Nodes NCPUs Finish  RMem(GB)  Mem(GB) CPU(%) Elap(h)
2426690 stormyk  regular    1     1 05-1527        -     0.3   75.0    0.09
2426693 stormyk  regular    1     1 05-1527        -     0.1   90.0    0.09
2426541 stormyk  regular    1     1 05-1523        -     0.1   83.0    0.03
2426542 stormyk  regular    1     1 05-1524        -     0.1   70.0    0.04
2426683 stormyk  regular    1     1 05-1523        -     0.1    0.0    0.02
2426444 stormyk  regular    1     1 05-1522        -     0.1   19.0    0.02
2426435 stormyk  regular    1     1 05-1522        -     0.1   13.0    0.02
```
You can obtain additional job details using `qhist -w` for *wide* output, or customize the output - see `qhist --format=help` for a list of options.

The following variation will generate a list of jobs that finished with non-zero exit codes to help you identify jobs that failed.

```bash
qhist -u $USER -r x0
```

### `qstat`

Run this to see the status of all of your own unfinished jobs.

```bash
qstat -u $USER
```

Your output will be similar to what is shown just below. Most column headings are self-explanatory – `NDS` for nodes, `TSK` for tasks, and so on.

In the status `(S)` column, most jobs are either queued `(Q)` or running `(R)`. Sometimes jobs are held `(H)`, which might mean they are dependent on the completion of another job. If you have a job that is held and is not dependent on another job, CISL recommends killing and resubmitting the job.


```pre
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

```bash
qstat -f jobID
```
!!! warning
    Use the above command only sparingly; it places a high load on PBS.


Get a single-line summary of the status of an unfinished or recently completed job (within 72 hours).

```bash
qstat -x jobID
```

Get information about unfinished jobs in a specified execution queue.


```
qstat queue_name
```
See job activity by queue (e.g., pending, running) in terms of numbers of jobs.

```
qstat -Q
```

Display information for all of your pending, running, and finished jobs.

```
qstat -x -u $USER
```

Query jobs running on one system by specifying the system as shown here. (Only these options are supported when running qstat in this cross-server mode: `-x`, `-u`,`-w`, `-n`, `-s`)

```
qstat -w -u $USER @derecho
```

!!! tip
    Query jobs running on one system by specifying `@derecho` or `@casper` from either system as shown here.
    ```sh
    qstat -w -u $USER @derecho
    qstat -w -u $USER @casper
    ```
    Only these options are supported when running `qstat` in this cross-server mode: `-x`, `-u`, `-w`, `-n`, `-s`

## Job Dependencies

It is possible to schedule jobs to run based on the status of other
jobs. For example, you might schedule a preprocessing job to run;
start a computation job when the preprocessing job is complete; then
start a post-processing job when the computation is done.

One way to schedule such a series or chain of jobs is to use `qsub -W [job-dependency-expression]`
to specify the job dependencies you need.  This can also be accomplished by submitting subsequent jobs from *inside* another job.

### PBS job dependencies (`-W depend`)
Let's say you have you have three scripts to submit and run consecutively:

 1. `pre.pbs`: a preprocessing job
 2. `main.pbs`: a computation job
 3. `post.pbs`: a post-processing job

The main job can be run only when the preprocessing job finishes, and the post-processing job can be run only when the computation job finishes.

Submit the first job, placing it on hold. (If it starts before the dependent jobs are submitted, the dependent jobs might never start.):
```bash
JOBID1=$(qsub -h pre.pbs)
```
Make starting of the second job dependent on successful completion of the first:
```bash
JOBID2=$(qsub -W depend=afterok:$JOBID1 main.pbs)
```
Make starting of the post-processing job dependent on successful completion of the second job:
```bash
JOBID3=$(qsub -W depend=afterok:$JOBID2 post.pbs)
```
Release the first job to initiate the sequence:
```bash
qrls $JOBID1
```
(Strictly speaking, `JOBID3` is not used in these examples and can be omitted if desired, but the sequence listed above is easily extensible to another dependent job.)

The complete sequence is shown below for additional clarity:
=== "bash"
    ```bash
    JOBID1=$(qsub -h pre.pbs)
    JOBID2=$(qsub -W depend=afterok:$JOBID1 main.pbs)
    JOBID3=$(qsub -W depend=afterok:$JOBID2 post.pbs)
    qrls $JOBID1
    ```
=== "tcsh"
    ```tcsh
    set JOBID1=`qsub -h pre.pbs`
    set JOBID2=`qsub -W depend=afterok:$JOBID1 main.pbs`
    set JOBID3=`qsub -W depend=afterok:$JOBID2 post.pbs`
    qrls $JOBID1
    ```

In the example above, the clause `afterok` is used to indicate the subsequent jobs should only begin after the preceding job completes successfully.
This is likely the most common use case, however other clauses are available, and jobs may depend on multiple predecessors.
Some of the more common dependency clauses are listed below, where `<arg_list>` is usually a single PBS job id as shown above, but can be a colon-separated
list of IDs if appropriate.  See `man qsub` for a full listing and additional details.

|  Clause | Effect |
|---------|--------|
| `after:<arg_list>`      | This job may be scheduled for execution at any point after all jobs in `<arg_list>` have *started* execution. |
| `afterok:<arg_list>`    | This job may be scheduled for execution only after all jobs in `<arg_list>` have terminated with no errors. |
| `afternotok:<arg_list>` | This job may be scheduled for execution only after all jobs in `<arg_list>` have terminated with errors. |
| `afterany:<arg_list>`   | This job may be scheduled for execution after all jobs in `<arg_list>` have finished execution, with any exit status (with or without errors.) This job will not run if a job in the `<arg_list>` was deleted without ever having been run. |
| `before:<arg_list>`      | Jobs in `<arg_list>` may begin execution once this job has begun execution.|
| `beforeok:<arg_list>`    | Jobs in `<arg_list>` may begin execution once this job terminates without errors. |
| `beforenotok:<arg_list>` | If this job terminates execution with errors, jobs in `<arg_list>` may begin. |
| `beforeany:<arg_list>`   | Jobs in `<arg_list>` may begin execution once this job terminates execution, with or without errors.|


### Nested jobs



## Peer Scheduling scheduling between systems

!!! info "Peer Scheduling scheduling between HPC Systems"
    Derecho and Casper use the PBS scheduler, and each system has its own
    dedicated PBS server to manage job submission and execution. These
    "peer" servers can share data between each other, and *jobs can be
    submitted from one system to another*. It is also possible to create
    dependencies between jobs on each server, enabling simulation-analysis
    workflows that target the appropriate system for each task.

### Submitting a job to a peer system

To submit a job to a queue on a peer server, you need to append the name
of the server to the queue directive in your job script. The names of
the PBS servers are:

| **System** | **PBS server name**            |
|------------|--------------------------------|
| Casper     | `casper-pbs`                    |
| Derecho    | `desched1` |

#### Examples
=== "Casper to Derecho"
    You want to submit to the Derecho "main" queue from a
    Casper login node or compute node. Append the Derecho server name as
    follows in your job script when specifying the queue:
    ```pre
    #PBS -q main@desched1
    ```

=== "Derecho to Casper"
    You want to submit a job to Casper from Derecho. Append
    the Casper server name as follows in your job script when specifying the
    destination:
    ```pre
    #PBS -q casper@casper-pbs
    ```

The server-specific queue names will be understood by both PBS servers,
so if you will want to submit the same script at times from Casper,
*always append the server name to your queue*.

### Interactive Jobs

Users can start an interactive job on `casper` or `Derecho` using the `qsub -I` command. The `-I` flag is used to request an interactive job. The following example shows how to start an interactive job on `casper`:

```bash
qsub -I -l select=1:ncpus=1:mem=20GB -q casper@casper-pbs -l walltime=06:00:00 -A <project_code>
```

Additionally, the `qinteractive` command can be used to start an interactive job on `derecho` or `casper`. For `derecho` this will start an interactive job on the `develop` queue, while for `casper` it will submit the job to the `main` queue. The following example shows how to start an interactive job on `derecho` or `casper`:

```bash
qinteractive -A <project_code>
```

Additionally `execasper` can be used to start an interactive job on `casper`. If you are on a `derecho` login node, using `execasper` will start an interactive job on `casper`. 


### Querying jobs

You can use `qstat` to query jobs from peer servers by including the
server name in your field of interest. You can also use the system names
noted above when running qstat.

Note that the separator character differs for jobs (`.`) and queues (`@`).
```pre
qstat 654321.casper

qstat @casper-pbs
qstat @desched1
```

### Creating dependencies between peer-scheduled jobs

Creating [job dependencies](index.md#job-dependencies) between submissions on peer servers is
straightforward; there is nothing unique about this workflow in PBS. As
with all jobs, pay close attention to specifying the destination server
in your queue designations. The job IDs returned by PBS include the
server name, so you do not need to append a server to the job ID you
specify in your dependency argument.

Here is an example of a workflow that runs a simulation on Derecho
(NSF NCAR's previous supercomputer) and, if successful, then ran a post-processing
job on Casper. Thanks to peer scheduling, these jobs could be submitted
from either Derecho or Casper login nodes.

=== "bash"
    ```bash
    JID=$(qsub -q main@desched1 run_model.pbs)
    qsub -q casper@casper-pbs -W depend=afterok:$JID run_postprocess.pbs
    ```
=== "tcsh"
    ```tcsh
    set JID=`qsub -q main@desched1 run_model.pbs`
    qsub -q casper@casper-pbs -W depend=afterok:$JID run_postprocess.pbs
    ```
