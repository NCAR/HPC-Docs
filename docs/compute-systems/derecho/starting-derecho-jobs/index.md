# Starting *Derecho* jobs

When you use any of these examples, remember to substitute your own job name and project code, and customize the other directives and commands as necessary.


!!! tip
    For a parallel job that does not use OpenMP threads – for a pure
    MPI job, for example – specify `ompthreads=1` in your PBS select
    statement as shown below. Failure to do so may result in the job
    oversubscribing its nodes, resulting in poor performance or
    puzzling behavior such as exceeding its wallclock limit.

**Load all modules** that are necessary to run your program at the start of your batch scripts by including a line like this:

```sh
module load intel cray-mpich
```

If you think you might run a particular compiled executable well into the future, we advise that you load specific versions of desired modules to ensure reproducibility. Follow this example:
```sh
module load intel/19.1.1 mpt/2.25
```

## Script examples

See this page for many *Derecho* PBS job script examples:
[Derecho job script examples](./derecho-job-script-examples.md)

When your script is ready, submit your batch job for scheduling as shown [here](../../../pbs/index.md).
