# Starting *Casper* jobs

This page describes how to use PBS Pro to submit jobs to run on
nodes in the Casper cluster. *Unless GPUs are required, run jobs that
require the use of more than one compute node on Derecho.*

Procedures for starting both **interactive jobs** and **batch jobs** on
Casper are described below. Also:

- Compile your code on Casper nodes if you will run it on Casper.

- See [Calculating charges](file:////display/RC/Job-submission+queues+and+charges) to
  learn how core-hours charges are calculated for jobs that run on
  Casper.

Begin by logging in on *Casper* or *Derecho*.

!!! info "*Casper* Wall-clock limits"
    The wall-clock limit on the Casper cluster is 24 hours except as noted
    below.

    Specify the hours your job needs as in the examples below. Use either
    the `hours:minutes:seconds` format or `minutes:seconds`.


## Interactive jobs

### Starting a remote command shell with execcasper

Run the `execcasper` command to start an interactive job. Invoking
it *without an argument* will start an interactive shell on the *first
available HTC node*. The default wall-clock time is 6 hours.

To use another type of node, include a *select statement* specifying the
resources you need. The `execcasper` command accepts all PBS flags and
resource specifications as detailed by `man qsub`.

If you do not include a resource specification by using either a select
statement or convenience flags, you will be assigned 1 CPU with 10 GB of
memory and no GPUs.

If no project is assigned with either the `-A` option or
the `DAV_PROJECT` environment variable, any valid project listed for
your username will be chosen at random.

### Starting a virtual desktop with vncmgr

If your work with complex programs such as MATLAB and VAPOR requires the
use of virtual network computing (VNC) server and client software,
use `vncmgr` instead of `execcasper`.

Using `vncmgr` simplifies configuring and running a VNC session in a
Casper batch job. How to do that is [documented here](../remote-desktops.md).

## Batch jobs

Prepare a batch script by following one of the
examples [here](./casper-job-script-examples.md).
Most Casper batch
jobs use the `casper` *submission* queue. The exception is for GPU
development jobs, which are submitted to the `gpudev` submission queue.

Be aware that the system **does not** import your login environment by
default, so make sure your script loads the software modules that you
will need to run the job.

!!! danger "**Caution:**  Avoid using the PBS **-V** option with cross submission"
    Avoid using the PBS `-V` option to propagate your environment
    settings to the batch job; it can cause odd behaviors and job
    failures when used in submissions to *Casper* from *Derecho*. If
    you need to forward certain environment variables to your job, use
    the lower-case `-v` option to specify them. (See `man qsub` for
    details.)

When your job script is ready, use `qsub` to submit it from the *Casper*
login nodes.


## GPU development jobs

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

## Concurrent resource limits

Job limits are in place to ensure short dispatch times and a fair
distribution of system resources. The specific limits that apply to your
submission depend on the resources requested by your job. Based on your
request, your submission will be classified as shown in the table.

<table>
  <colgroup>
    <col style="width: 17%" />
    <col style="width: 17%" />
    <col style="width: 20%" />
    <col style="width: 44%" />
  </colgroup>
  <thead>
    <tr class="header">
      <th><strong>Submission queue</strong></th>
      <th><strong>Job category (execution queue)</strong></th>
      <th><strong>Job resource requests</strong></th>
      <th><strong>Limits</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr class="odd">
      <td rowspan="4"><strong>casper</strong><br />
        24-hour wallclock limit</td>
      <td><strong>largemem</strong></td>
      <td>mem &gt; 361 GB<br />
        ncpus &lt;= 36<br />
        ngpus = 0</td>
      <td>Up to 5 jobs eligible for execution at any one time (more can be
        queued)</td>
    </tr>
    <tr class="even">
      <td><strong>htc</strong></td>
      <td>mem &lt;= 361 GB<br />
        ncpus &lt;= 144<br />
        ngpus = 0</td>
      <td>Up to 468 CPUs in use per user at any one time<br />
        Up to 4680 GB memory per user at any one time<br />
        (across all jobs in category)</td>
    </tr>
    <tr class="odd">
      <td><strong>vis</strong></td>
      <td>gpu_type=gp100</td>
      <td>Up to 2 GPUs in use per user at any one time<br />
        Individual jobs are limited to a single gp100 (no multi-GPU jobs)</td>
    </tr>
    <tr class="even">
      <td><strong>gpgpu</strong></td>
      <td>gpu_type=v100</td>
      <td>Up to 32 GPUs in use per user at any one time; users may submit jobs
        requesting more than 32 GPUs for execution on weekends.</td>
    </tr>
    <tr class="odd">
      <td><strong>gpudev</strong><br />
        30-minute wallclock limit</td>
      <td></td>
      <td>ncpus &lt;= 36<br />
        1 &lt;= ngpus &lt;= 4</td>
      <td>Queue is only operational from 8 a.m. to 5:30 p.m. Mountain time,
        Monday to Friday. Users may have only one active job in the queue at any
        time.</td>
    </tr>
  </tbody>
</table>

## NVMe node-local storage

Casper nodes each have 2 TB of local NVMe solid-state disk (SSD)
storage. Some is used to augment memory to reduce the likelihood of jobs
failing because of excessive memory use.

NVMe storage can also be used *while a job is running*. (Recommended
only for I/O-intensive jobs.) Data stored
in `/local_scratch/pbs.$PBS_JOBID` are deleted when the job ends.

To use this disk space while your job is running, include the following
in your batch script after customizing as needed.
```pre
### Copy input data to NVMe (can check that it fits first using "df -h")
cp -r /glade/scratch/$USER/input_data /local_scratch/pbs.$PBS_JOBID

### Run script to process data (NCL example takes input and output paths as command line arguments)
ncl proc_data.ncl /local_scratch/pbs.$PBS_JOBID/input_data /local_scratch/pbs.$PBS_JOBID/output_data

### Move output data before the job ends and your output is deleted
mv /local_scratch/pbs.$PBS_JOBID/output_data ${SCRATCH}
```

## Script examples

See this page for many *Casper* PBS job script examples:
[Casper job script examples](./casper-job-script-examples.md)

<!--  LocalWords:  Casper
 -->
