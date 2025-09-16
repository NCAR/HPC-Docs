
# Job submission queues and charges

All jobs must be submitted to a queue.  HPC job schedulers, including PBS Pro,
use queues to place jobs into categories for execution. Queues can be used to
provide access to specific resources, to set sensible limits on the amount of a
resource a job may use, and impact the priority of jobs in the queue relative to
other jobs.

PBS Pro supports two main queue types:

* ***Submission (Routing)*** - a queue that only accepts jobs and then routes
  them to another queue. Such queues are used to simplify submission by reducing
  the number of queues a user must consider. Typically, you will submit jobs to
  a routing queue, such as **main** on Derecho and **casper** on Casper.
* ***Execution*** - a queue that holds jobs while they are pending and running.
  If you query your job with `qstat` or `qhist`, you will almost certainly see
  it within an execution queue. You may also see queues that look like R1234567
  or S1234567; such queues are reservations created for a specific purpose and
  generally limited to a small subset of users.

In summary, you will need to consider *routing* queues at submission time and
the *execution* queue while tracking your job.

## Derecho queues

Most jobs on Derecho will be submitted to the **main** queue, which provides
exclusive use of CPU or GPU compute nodes for an extended period of time. A
limited number of shared compute nodes are also available via the **develop**
queue.

|**Submission Queue**        |**Execution Queue**|**Wall Clock Limit**  |**Resource Limits**                   |**Queue Description**|
| :-                         | :-                | :-                   | :-                                   | :-                  |
|**main** {: rowspan=2}      |cpu                |12 hours {: rowspan=2}| 2488 nodes; 128 cores per node       |Primary queue for production CPU and GPU workflows. Nodes are allocated for exclusive use by jobs. {: rowspan=2}|
                             |gpu                                       | 82 nodes; 4 GPUs per node            |&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|
|**develop** {: rowspan=2}   |cpudev             |6 hours {: rowspan=2} | 256 cores; 235 GB per node           |Interactive and batch use for debugging and development on shared nodes. A user can run multiple jobs in this queue concurrently if the total number of cores or GPUs used does not exceed the stated resource limits. {: rowspan=2}|
                             |gpu                                       | 8 GPUs; 487 GB per node              |&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|
|**preempt** {: rowspan=2}   |pcpu               |24 hours {: rowspan=2}| Same as **main** {: rowspan=2}       |Jobs will only run on resources otherwise idle.  Jobs may be [preempted](./preemption.md) with a short grace period to make room for higher priority jobs. {: rowspan=2}|
                             |pgpu|&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|

Some additional queues on the system are for dedicated purposes and accessible
only to authorized users.

## Casper queues

Casper is a highly heterogeneous machine designed for high-throughput analysis,
visualization, and general purpose GPU computing. While many *execution* queues
exist, most Casper jobs will be submitted via the primary **casper**
*submission* queue.

|**Submission  Queue**       |**Execution Queue**|**Wall Clock Limit**  |**Resource Limits**                   |**Queue Description**|
| :-                         | :-                | :-                   | :-                                   | :-                  |
|**casper** {: rowspan=4}    |htc                |24 hours {: rowspan=4}| 144 CPUs per job; 720 CPUs, 7200 GB RAM concurrent usage |High-throughput computing jobs are routed shared CPU nodes. Data analysis jobs typically end up here (e.g., Dask workers)|
                             |largemem                                  | 1 node, 733 <= RAM < 1.5 TB; 3 running job limit |Serial or shared-memory parallel jobs which need an exceptionally large amount of RAM.  |&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|
                             |vis, l40                                  | 2 GPUs | For jobs which need to use GPU rendering and/or an accelerated remote desktop ([VNC](../compute-systems/casper/remote-desktops.md#using-vnc)). |&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|
                             |gpgpu, a100, h100                         | 32 GPUs (8 for H100s)               |For general purpose GPU modeling and machine learning. 4-way and 8-way V100s, 4-way A100s, and 4-way H100 nodes are available. |&#8288 {: style="padding:0"}|&#8288 {: style="padding:0"}|
|**gpudev**                  |Varies             |30 minutes            | 4 V100 GPUs; 36 CPUs; 732 GB RAM     |Short, iterative, debugging and development tasks on V100 GPUs|

### GPU development jobs

A submission queue called `gpudev` is available between 8 a.m. and 5:30
p.m. Mountain time Monday to Friday to support application development
and debugging efforts on general purpose and ML/AI GPU applications.
This queue provides rapid access to up to 4 V100 GPUs, avoiding the
sometimes lengthy queue wait times in the `gpgpu` execution queue.

Job submissions to this queue are limited to 30 minutes walltime instead
of the 24-hour wallclock limit for all other submissions. **All jobs
submitted to the queue** must request one or more V100 GPUs (up to four)
in their resource directives. Node memory can be specified  explicitly
as usual, but by default jobs will be assigned N/4 of the total memory
on a node, where N is the number of V100 GPUs requested.

## Job priority

On previous NCAR HPC systems, queues could be used to select a higher or lower
priority, but on Derecho, users request a specific job priority via the `#PBS -l
job_priority=<value>` [resource
directive](./job-scripts/index.md#common-pbs-directives).

Users can set job priority to one of three values - economy, regular, and
premium. Jobs with higher priority are charged against the user's allocation at
higher rates than others.

| **Job priority** | **Priority / charge factor** | **Description**                                                   |
|------------------|----------------------------|---------------------------------------------------------------------|
| premium          | 1.5                        | Jobs are charged at 150% of the regular rate.                       |
| regular          |  **1**                     | All production jobs default to this priority.                       |
| economy          | 0.7                        | Production batch jobs are charged at 70% of regular rate.           |
| *preempt*        | 0.2                        | Automatically applied to all jobs submitted to the `preempt` queue. |

## Calculating charges
There are two types of consumable allocation - regular (CPU) core-hours and GPU
hours. On Casper, for example, a project might have both a *Casper* component
and a *Casper GPU* component. A job will **only use one** type of allocation. If
the job requests one or more GPUs, the project will be charged for the GPU hours
used (but no CPU allocation will be consumed). If no GPUs are requested, the job
will only charge against the core-hour allocation.

All charges are calculated based on the walltime (in hours) *used* by the
completed job, which is often less than the walltime *requested* at submission.
You should still aim to estimate a reasonable walltime request rather than
specifying the maximum allowed, however. Asking for the maximum time will
typically cause delays in job start as the scheduler must hold the requested
resources for a longer time.

### Exclusive nodes
Charges for use of Derecho are calculated in terms of core-hours. Jobs run in
Derecho queues other than **develop** are charged for exclusive use of the nodes
by this formula:

``` title="Formula for exclusive use charging"
wall-clock hours × nodes requested × ncpus or ngpus per node × charging factor
```

The important implication here is that no matter how many cores or GPUs you
request per node, your job will be assigned and charged for all CPU cores or GPU
devices on each node. Requesting less than 128 `ncpus` in an exclusive job also
reduces the ability of parallel libraries like MPI to load balance across all
network devices, potentially reducing performance. We recommend you *always*
request `ncpus=128` for node-exclusive Derecho jobs.

Other resources such as `mpiprocs`, `ompthreads`, and `mem` do not currently
impact job charging.

!!! example "Derecho node charging"
    Your batch script indicates how many Derecho nodes your job will use.

    === "Fully Subscribed CPU Node"
        In this example, you have selected 2 nodes, each of which has 128 cores,
        all of which will be used as MPI "ranks."

        ```
        #PBS -l select=2:ncpus=128:mpiprocs=128

        ```
        **Your job will be charged for the use of 256 cores.**


    === "Fully Subscribed CPU Node (Hybrid)"
        In this example, you have selected 4 nodes, each of which has 128 cores.
        Each node will have 32 MPI ranks and 4 OpenMP threads.

        ```
        #PBS -l select=4:ncpus=128:mpiprocs=32:ompthreads=4
        ```

        **Your job will be charged for the use of 512 cores.**


    === "Under-subscribed CPU Node "
        In this example, you have selected 2 nodes, each of which has 128 cores.
        To double the  available memory per rank, you elect to "under-subscribe"
        the node, that is, only use 64 cores as MPI ranks.

        ```
        #PBS -l select=2:ncpus=128:mpiprocs=64:mem=235GB
        ```

        **Your job will be charged for all 256 cores, even though you are only
        using 128** (assuming your code has no hybrid parallel capability - e.g
        OpenMP or other threading).

        !!! danger "Exclusive nodes are charged by resource allocation, not utilization"
            All **main** queue Derecho jobs grant *exclusive* use of nodes, so *jobs
            submitted to Derecho queues are charged for all 128 CPU cores or 4 GPUs
            on each node that is allocated* regardless of how many cores or GPUs are
            used.

            Requesting a Derecho CPU node for 1 hour will result in a 128 core hour
            charge, even if left idle by the user.

### Shared nodes
Charges for jobs that you run on a shared node, including all Casper jobs and
Derecho jobs submitted to the **develop** queue, are calculated by this formula:

``` title="Formula for shared use charging"
wall-clock hours x cores or GPUs requested
```

The primary difference being that shared jobs will only be charged for the
number of cores (`ncpus`) or GPUs (`ngpus`) requested, rather than the entirety
of the relevant resource for the requested number of nodes.

## Checking and managing charges
Users can check computing and storage charges through the CISL Systems
Accounting Manager. (Go to [SAM
documentation](../getting-started/accounts/systems-accounting-manager.md) or to
[SAM app](https://sam.ucar.edu/app/home).) Job history is ingested into the SAM
database daily, so recently completed jobs may not appear in your project
record.

If you have concerns about using your allocation most efficiently, contact the
[NCAR Research Computing help desk](https://rchelp.ucar.edu/) for guidance.
Sometimes jobs can be configured to make better use of the processors, and you
may be able to save by using a less expensive queue.

CISL can refund core-hours if system failures cause jobs to fail and the failed
jobs are reported promptly. Use this [core-hours refund request
form](https://helpdesk.ucar.edu/plugins/servlet/desk/portal/3/create/42) (login
required) if you think a refund is warranted. It is easier for us to verify
recent failures (from the past 3 days), so a prompt report is recommended.
