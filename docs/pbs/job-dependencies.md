# Job Dependencies

It is possible to schedule jobs to run based on the status of other
jobs. For example, you might schedule a preprocessing job to run;
start a computation job when the preprocessing job is complete; then
start a post-processing job when the computation is done.

One way to schedule such a series or chain of jobs is to use `qsub -W [job-dependency-expression]`
to specify the job dependencies you need.  This can also be accomplished by submitting subsequent jobs from *inside* another job.

## PBS job dependencies (`-W depend`)
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