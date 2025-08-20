# Advanced PBS Topics

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

!!! warning
    Do not use the qsub option `-W block=true` when peer scheduling. PBS will
    not be able to tell when the job is finished and the qsub call will hang
    indefinitely.

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
Interactive jobs provide an interactive session on a compute node, useful for debugging, testing code, and running short tasks that require user interaction.

Users can start an interactive job on `casper` or `Derecho` using the `qsub -I` command. The `-I` flag is used to request an interactive session. The following example shows how to start an interactive job with specified resources on `casper`:

```bash
qsub -I -l select=1:ncpus=1:mem=20GB -q casper@casper-pbs -l walltime=06:00:00 -A <project_code>
```


#### `qinteractive`

The `qinteractive` command provides a convenient way to start an interactive job on either `derecho` or `casper`. By default, when you run `qinteractive` on casper, it starts an interactive job with 1 CPU and 10GB of memory. On Derecho, `qinteractive` starts an interactive job with 32 CPUs and 55GB of memory on the `develop` queue.

The following example shows how to start an interactive job on either `derecho` or `casper` :

```bash
qinteractive -A <project_code>
```

!!! tip
    The `-A` flag is needed if users have not specified a default project code in their environment. The default project code can be specified using the environment variable `PBS_ACCOUNT`. Default project codes can also be specified for a specific system using `PBS_ACCOUNT_DERECHO` and `PBS_ACCOUNT_CASPER` for Derecho and Casper, respectively.

Users can also start an interactive job on a peer system by specifying the system name as shown below:

=== "Interactive job on Derecho"
    ```bash
    qinteractive @derecho
    ```
=== "Interactive job on Casper"
    ```bash
    qinteractive @casper
    ```


You can specify custom resources with `qinteractive` by using `qinteractive` helper flags. To see a full list of the flags, please run `qinteractive --help`.

For example, to start an interactive job on `casper` with 2 CPUs, 20GB of memory, and 1 GPU, you can use the following command:

```bash
qinteractive --ncpus 2 --mem 20GB --ngpus 1 @casper 
```

Additionally, the `qinteractive` command accepts all PBS flags and resource specifications as detailed by `man qsub`. For example, you can specify the walltime for the interactive job by using the `-l` flag as shown below:

```bash
qinteractive -l walltime=06:00:00
```

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

Creating [job dependencies](#job-dependencies) between submissions on peer servers is
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

    # Job preemption with PBS

!!! danger "Derecho Only!"
    This page describes functionality only present on Derecho.

!!! info "Job Preemption on Derecho"
    Some jobs are suitable for running in incrementally on resources that would otherwise be
    idle.

    *Derecho* supports running such jobs in the `preempt` queue, which allows them to be preempted with
    minimal impact when a higher-priority job requires the use of those
    resources. Suitable workflows include those with short or fairly
    unpredictable run times; for example, data processing, file movement, or
    running analysis tools that have an
    efficient **checkpoint/restart** capability.


## Using the preempt queue

The `preempt` queue is similar to the `main` Derecho queue in that it
serves to route jobs to the system's CPU or GPU nodes. It is different,
however, in that:

- Jobs will start only when they can make use of resources that would
  otherwise be idle.

- They will be terminated – with a 10-minute grace period – if the
  resources being used are required by a higher priority job in a
  different queue.

- Specifically, when the running job is targeted for
  preemption, the scheduler will send a termination signal (`SIGTERM`),
  wait 10 minutes, and then send a kill signal (`SIGKILL`), finally ending the job.
    - The user has the option to detect and act upon the `SIGTERM` using the methods
      described below.

The start time of a job in the preempt queue will be unpredictable
because of the idle resource prerequisite. Once it starts, it is
guaranteed at least 10 minutes of run time but potentially much more. The
duration depends on jobs other users submit to PBS after your job
begins.

To submit a job to the preempt queue, simply specify preempt as the
queue name in your PBS script header as follows:

!!! example "Requesting the `preempt` queue"
    ```bash
    #!/bin/bash
    #PBS -A <project_code>
    #PBS -N preemptable_job
    #PBS -q preempt
    #PBS -r n
    #PBS -l walltime=04:00:00
    #PBS -l select=2:ncpus=128:mpiprocs=32:ompthreads=4

    ...
    ```

The `walltime` specification is the job duration *upper limit* - as
discussed above, the actual execution could be shorter if the job is
preempted.

Use the specifier `#PBS -r` to indicate if the job should be rerun if
it is preempted; valid options are `y` or `n` for yes or no. All other
aspects of the PBS script are unchanged by the use of preemption.

Abrupt termination may be entirely acceptable for some workflows. This
could be the case for [batch removal of a large number of files](../storage-systems/glade/removing-large-number-of-files.md),
for example, or if the application writes frequent checkpoint files
and can restart successfully after being interrupted. In other cases,
it may be beneficial for the application to take a specific action
within the 10-minute grace window. Such an approach is possible with
minor changes to the application as described below.

### Practical implications for *preempt* throughput

Idle resources are a prerequisite for jobs in the preempt queue to
start. The smaller the resource request, the more likely there will be
an idle portion of the machine on which to schedule the job. Conversely,
large jobs in the queue are likely to wait for long periods of time, if
they execute at all. The ideal use case is small-to-medium sized jobs
that are robust to interruption and that can make meaningful progress in
short periods of time.

### Charging and allocations

Jobs run in the preempt queue are charged at a queue factor of only 0.2, vs. 1.0
for jobs in the main queue with regular priority.

---

## Terminating proactively with signal handling

When a job running in the preempt queue is targeted for preemption, PBS
notifies the running process through a [UNIX
signal](https://www.tutorialspoint.com/unix/unix-signals-traps.htm). PBS
then waits 10 minutes before killing the process. A properly configured
application can receive the notification signal, act upon it (typically
through an existing checkpoint functionality), and then
terminate gracefully rather than be terminated abruptly at the end of
the grace period. The steps required to configure an application in this
manner are:

1.   Provide a signal handler function to receive the termination
    request.

2.   Register the signal handler function with the operating system.

3.   Invoke or add checkpoints to be triggered by the signal handler.

Steps 1 and 2 are fairly common across applications and even programming
languages. Step 3 is application-specific, and usually involves writing
the application state to disk so that it can be restarted later. For
some applications, however, an even simpler approach may be possible.
For example, if the target application is a data-processing pipeline, it
may suffice to receive the termination notification, complete the
current processing step, and simply exit without beginning additional
steps in the pipeline.

### Signal handling and registration

#### C/C++ and Fortran

For traditional compiled languages such as C/C++ and Fortran, signal
handling is most readily accomplished through some minimal C functions,
even inside a predominantly Fortran application. This is because the
operating system application interface is C based. The following shows
the minimal required steps.

!!! example "Sample C program to catch signals sent from the operating system"
    ```c
    #include <stdio.h>
    #include <unistd.h>
    #include <time.h>
    #include <signal.h>
    static int checkpoint_requested = 0;

    void my_sig_handler (int signum)
    {
      time_t now;
      time(&now);

      switch (signum)
        {
        case SIGINT:
        case SIGTERM:
        case SIGUSR1:
          checkpoint_requested = 1;
          printf("...caught signal %d at %s", signum, ctime(&now));
          break;

        default:
          printf("...caught other unknown signal: %d at %s", signum, ctime(&now));
          printf("   see \"man 7 signal\" for a list of known signals\n");
          break;
        }
    }

    int main (int argc, char **argv)
    {
      /* register our user-defined signal handlers */
      signal(SIGINT,  my_sig_handler);
      signal(SIGTERM, my_sig_handler);
      signal(SIGUSR1, my_sig_handler);

      return 0;
    }
    ```

First, we declare a C function `my_sig_handler`, which takes the
signal identifier as input. In this example we construct a switch
statement that allows for processing different types of signals in the
same code block. It is evident from the listing that if the function is
called with a `SIGINT`, `SIGTERM`, or `SIGUSR1` signal then we set
the flag `checkpoint_requested` and print an informative statement.
For completeness, if called with any other signal, we print a diagnostic
message as well but take no other action.

Second, we call the system routine `signal() `to register our function
for the specific signals we want the application to process. In this
case, we are asking the operating system to call our function
my_sig_handler() any time a `SIGINT`, `SIGTERM`, or `SIGUSR1` is
encountered.

The third step is application specific and not listed, but the general
idea is elsewhere in the application (for example, the main time step
loop) we would check the value of the `checkpoint_requested` flag and
take appropriate action to save state and exit gracefully.

??? example "Expand this box for a complete MPI/C++ example"
    ```c++
    ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/PBS/preempt/minimal_mpi.cpp"
    ```

    ---

    [You can see this example on Github here](https://github.com/NCAR/hpc-demos/blob/main/PBS/preempt/minimal_mpi.cpp).

To integrate such an approach into a Fortran application, it is simplest
to create a C function taking no arguments that encapsulates the signal
registration process and calling it from within your Fortran main
application. Please contact CISL help for further assistance.

While the most common use case is compiled languages as shown above, it
is also possible to catch and act upon signals when your main
application is a shell script or in Python, as shown below.

#### Shell scripts

In shell scripting, the process is generally similar, with some very
slight changes in terminology. Notably, in shell scripts `traps` can be
used to intercept signals and call a user-specified function, in much
the same way a signal handler can be installed in a compiled language. A
complete example follows.

!!! example "Sample bash script to catch signals sent from the operating system"
    ```bash
    ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/PBS/preempt/demo.sh"
    ```

Running the previous code from a shell will enter a "Main Function"
loop that executes a number of steps. Sending **Control+C** to the
running program effectively sends a `SIGINT` and invokes the desired
signal handling function through the bash trap mechanism. If you
instead run this example under PBS, keep in mind the scheduler will
send `SIGTERM` when the job is targeted for preemption.

#### Python applications

Finally, Python provides the `signal` module, which can be used in a
user application to catch signals from the operating system as shown
here:


!!! example "Sample python script to catch signals sent from the operating system"
    ```python
    ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/PBS/preempt/demo.py"
    ```

---

## Additional resources

All the sample scripts above are available through the [NCAR hpc-demos GitHub repository](https://github.com/NCAR/hpc-demos) in the `PBS/preemp`t
subdirectory.

- [More detail on signal handling in C](https://www.gnu.org/software/libc/manual/html_node/Signal-Handling.html)

- [More detail on using traps in shell scripts](https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_12_02.html)

- [More detail on signal handling in Python](https://docs.python.org/3/library/signal.html)

<!--  LocalWords:  Derecho
 -->
