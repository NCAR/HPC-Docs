
# Job-submission queues and charges



## Derecho queue details
The `main` queue, which has a 12-hour wall-clock limit, meets most users' needs for running batch jobs on Derecho.  On Derecho users request a specific job priority via the `#PBS -l job_priority=<regular|premium|economy>` [resource directive](./job-scripts/index.md#common-pbs-directives), instead of through distinct queues as was the case previously on Cheyenne.

|**Queue name**      |<div style="width:100px">PBS<br>`job_priority`</div> |**Wall clock limit (hours)**|**Charging factor**|**Derecho queue description**|
| :-                 | :-           | :-                         | :-                             | :-                |
|`main` {: rowspan=3}|`premium`     |12 {: rowspan=3}            |1.5|Jobs are charged at 150% of the regular rate.|
                     |`regular`                                  |1  |Most production batch jobs run in this queue; also accepts interactive jobs.|
                     |`economy`                                  |0.7|Production batch jobs are charged at 70% of the regular rate.|
|`preempt`           |              |24                          |0.2|Jobs will only run on resources otherwise idle.  Jobs may be [preempted](./preemption.md) with a short grace period to make room for higher priority jobs. |
|`develop`           |              |6                           |1  |Interactive and serial batch use for debugging and other tasks on shared 256-GB nodes. Jobs in this queue should specify memory required via `-l select=...:mem=5GB` up to 235GB. An individual job can use up to 256 cores or 8 GPUs across two nodes. A user can run multiple jobs in the share queue concurrently if the total number of cores or GPUs used is no more than 256 or 8 respectively.|


Some additional queues on the system are for dedicated purposes and accessible only to authorized users.

## Calculating charges

### Exclusive nodes
Charges for use of Derecho are calculated in terms of core-hours. Jobs run in Derecho queues other than "share" are charged for exclusive use of the nodes by this formula:

**wall-clock hours × nodes used × cores per node × charging factor**


!!! example "Derecho node charging"
    Your batch script indicates how many Derecho nodes your job will use.

    === "Fully Subscribed CPU Node"
        In this example, you have selected 2 nodes, each of which has 128 cores, all of which will be used as MPI "ranks."
        ```
        #PBS -l select=2:ncpus=128:mpiprocs=128
        ```
        **Your job will be charged for the use of 256 cores.**


    === "Fully Subscribed CPU Node (Hybrid)"
        In this example, you have selected 4 nodes, each of which has 128 cores. Each node will have 32 MPI ranks and 4 OpenMP threads.
        ```
        #PBS -l select=4:ncpus=128:mpiprocs=32:ompthreads=4
        ```
        **Your job will be charged for the use of 512 cores.**


    === "Under-subscribed CPU Node "
        In this example, you have selected 2 nodes, each of which has 128 cores. To double the  available memory per rank, you elect to "under-subscribe" the node, that is, only use 64 cores as MPI ranks.
        ```
        #PBS -l select=2:ncpus=128:mpiprocs=64:mem=235GB
        ```
        **Your job will be charged for all 256 cores, even though you are only using 128** (assuming your code has no hybrid parallel capability - e.g OpenMP or other threading).

    !!! danger "Exclusive nodes are charged by resource allocation, not utilization"
        Most Derecho batch queues are for *exclusive* use, so *jobs submitted to Derecho queues are charged for all 128 CPU cores on each node that is used* regardless of how many CPUs are used.
        Requesting a Derecho CPU node for 1 hour will result in a 128 core hour charge, even if left idle by the user.

### Shared nodes (Casper)
Charges for jobs that you run on a shared node, including Casper nodes, are calculated by this formula:

**core-seconds/3600 (core-hours)**

## Checking and managing charges
Users can check computing and storage charges through the CISL Systems Accounting Manager. (Go to [SAM documentation](../getting-started/accounts/systems-accounting-manager.md) or to [SAM app](https://sam.ucar.edu/app/home).)

If you have concerns about using your allocation most efficiently, contact the [NCAR Research Computing help desk](https://rchelp.ucar.edu/) for guidance. Sometimes jobs can be configured to make better use of the processors, and you may be able to save by using a less expensive queue.

CISL can refund core-hours if system failures cause jobs to fail and the failed jobs are reported promptly. Use this [core-hours refund request form](https://helpdesk.ucar.edu/plugins/servlet/desk/portal/3/create/42) (login required) if you think a refund is warranted. Technical limitations prevent us from verifying refund eligibility for jobs that are more than seven days old.
