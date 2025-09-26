# Peer Scheduling scheduling between systems

!!! info "Peer Scheduling scheduling between HPC Systems"
    Derecho and Casper use the PBS scheduler, and each system has its own
    dedicated PBS server to manage job submission and execution. These
    "peer" servers can share data between each other, and *jobs can be
    submitted from one system to another*. It is also possible to create
    dependencies between jobs on each server, enabling simulation-analysis
    workflows that target the appropriate system for each task.

## Submitting a job to a peer system

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

### Examples
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
so if you will want to submit the same script at times from the peer server,
*always append the server name to your queue*.

## Querying jobs across servers

You can use `qstat` to query jobs from peer servers by including the
server name in your field of interest. You can also use the system names
noted above when running qstat.

Note that the separator character differs for jobs (`.`) and queues (`@`).
```pre
qstat 654321.casper

qstat @casper-pbs
qstat main@desched1
```

## Creating dependencies between peer-scheduled jobs

Creating [job dependencies](job-dependencies.md) between submissions on peer servers is
straightforward; there is nothing unique about this workflow in PBS. As
with all jobs, pay close attention to specifying the destination server
in your queue designations. The job IDs returned by PBS include the
server name, so you do not need to append a server to the job ID you
specify in your dependency argument.

Here is an example of a workflow that runs a simulation on Derecho and, if successful, then ran a post-processing job on Casper. Thanks to peer scheduling, these jobs could be submitted from either Derecho or Casper login nodes.

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
