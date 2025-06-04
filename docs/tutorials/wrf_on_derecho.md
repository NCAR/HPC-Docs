# How to compile and conduct a basic run with WRF on Derecho 

!!! info "About this page"
    This documentation provides information on how to download and compile WRF and WPS on NSF NCAR Derecho.
    Also, examples of PBS scripts are provided to 
---

## Obtaining WRF code 
The WRF and WPS code can be downloaded from 
the [WRF webpage](https://www.mmm.ucar.edu/models/wrf/). 
Please refer to the ([download](https://www2.mmm.ucar.edu/wrf/users/download/get_source.html)) for more information.

Here we are using the recommended method of cloning the code from the [wrf-model GitHub repository](https://github.com/wrf-model/WRF). 


```bash
git clone --recurse-submodules https://github.com/wrf-model/WRF WRF4.6.1
```
WRF need various libraries to compile and run. On Derecho this is done by loading pre-loaded modules. Please refer to [Modules](https://ncar-hpc-docs.readthedocs.io/en/latest/environment-and-software/user-environment/modules/).
```bash
module --force purge
module load ncarenv/24.12
module reset
module list
```
The last command will show the currently loaded packages in your environment.
```bash
Currently Loaded Modules:
  1) ncarenv/24.12 (S)   3) intel/2024.2.1        5) libfabric/1.15.2.0   7) hdf5/1.12.3
  2) craype/2.7.31       4) ncarcompilers/1.0.0   6) cray-mpich/8.1.29    8) netcdf/4.9.2

Currently Loaded Modules:
  1) ncarenv/23.06 (S)   2) craype/2.7.20   3) intel/2023.0.0   4) ncarcompilers/1.0.0   5) cray-mpich/8.1.25   6) hdf5/1.12.2   7) netcdf/4.9.2

Currently Loaded Modules:
  1) ncarenv/23.09 (S)   2) craype/2.7.23   3) intel/2023.2.1   4) ncarcompilers/1.0.0   5) cray-mpich/8.1.27   6) hdf5/1.12.2   7) netcdf/4.9.2

```
Once modules are loaded, follow the steps to configure and compile the code.
```bash
cd WRF4.6.1
```
```bash
./configure
```
The above command detects the system architecture and other environment options (e.g. NETCDF). Here, we are compiling the code with the Intel compiler shown above.
Refer to [WRF Users Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/index.html) for more info.
We select 50 (dmpar) INTEL (ftn/icc): Cray XC and then basic nesting (1). 
```bash
checking for perl5... no
checking for perl... found /glade/u/apps/derecho/23.09/opt/view/bin/perl (perl)
Will use NETCDF in dir: /glade/u/apps/derecho/23.09/spack/opt/spack/netcdf/4.9.2/oneapi/2023.2.1/yzvj
ADIOS2 not set in environment. Will configure WRF for use without.
HDF5 not set in environment. Will configure WRF for use without.
PHDF5 not set in environment. Will configure WRF for use without.
Will use 'time' to report timing information


If you REALLY want Grib2 output from WRF, modify the arch/Config.pl script.
Right now you are not getting the Jasper lib, from the environment, compiled into WRF.

------------------------------------------------------------------------
Please select from among the following Linux x86_64 options:

  1. (serial)   2. (smpar)   3. (dmpar)   4. (dm+sm)   PGI (pgf90/gcc)
  5. (serial)   6. (smpar)   7. (dmpar)   8. (dm+sm)   PGI (pgf90/pgcc): SGI MPT
  9. (serial)  10. (smpar)  11. (dmpar)  12. (dm+sm)   PGI (pgf90/gcc): PGI accelerator
 13. (serial)  14. (smpar)  15. (dmpar)  16. (dm+sm)   INTEL (ifort/icc)
                                         17. (dm+sm)   INTEL (ifort/icc): Xeon Phi (MIC architecture)
 18. (serial)  19. (smpar)  20. (dmpar)  21. (dm+sm)   INTEL (ifort/icc): Xeon (SNB with AVX mods)
 22. (serial)  23. (smpar)  24. (dmpar)  25. (dm+sm)   INTEL (ifort/icc): SGI MPT
 26. (serial)  27. (smpar)  28. (dmpar)  29. (dm+sm)   INTEL (ifort/icc): IBM POE
 30. (serial)               31. (dmpar)                PATHSCALE (pathf90/pathcc)
 32. (serial)  33. (smpar)  34. (dmpar)  35. (dm+sm)   GNU (gfortran/gcc)
 36. (serial)  37. (smpar)  38. (dmpar)  39. (dm+sm)   IBM (xlf90_r/cc_r)
 40. (serial)  41. (smpar)  42. (dmpar)  43. (dm+sm)   PGI (ftn/gcc): Cray XC CLE
 44. (serial)  45. (smpar)  46. (dmpar)  47. (dm+sm)   CRAY CCE (ftn $(NOOMP)/cc): Cray XE and XC
 48. (serial)  49. (smpar)  50. (dmpar)  51. (dm+sm)   INTEL (ftn/icc): Cray XC
 52. (serial)  53. (smpar)  54. (dmpar)  55. (dm+sm)   PGI (pgf90/pgcc)
 56. (serial)  57. (smpar)  58. (dmpar)  59. (dm+sm)   PGI (pgf90/gcc): -f90=pgf90
 60. (serial)  61. (smpar)  62. (dmpar)  63. (dm+sm)   PGI (pgf90/pgcc): -f90=pgf90
 64. (serial)  65. (smpar)  66. (dmpar)  67. (dm+sm)   INTEL (ifort/icc): HSW/BDW
 68. (serial)  69. (smpar)  70. (dmpar)  71. (dm+sm)   INTEL (ifort/icc): KNL MIC
 72. (serial)  73. (smpar)  74. (dmpar)  75. (dm+sm)   AMD (flang/clang) :  AMD ZEN1/ ZEN2/ ZEN3 Architectures
 76. (serial)  77. (smpar)  78. (dmpar)  79. (dm+sm)   INTEL (ifx/icx) : oneAPI LLVM
 80. (serial)  81. (smpar)  82. (dmpar)  83. (dm+sm)   FUJITSU (frtpx/fccpx): FX10/FX100 SPARC64 IXfx/Xlfx

Enter selection [1-83] : 50
------------------------------------------------------------------------
Compile for nesting? (1=basic, 2=preset moves, 3=vortex following) [default 1]: 1

Configuration successful! 
```
The command below will compile the code. The most used option is em_real (Eulerian Mass grid – real data case.
The compile log will be redirected to compile.log. The syntax will vary depending on the SHELL. Here it is bash.

```bash
./compile em_real >compile.log 2>&1 &
```
After the compilation is finished, if successful, you will see the following lines at the end of the file.  
```bash
==========================================================================
build started:   Wed 23 Apr 2025 10:04:19 AM MDT
build completed: Wed 23 Apr 2025 10:39:40 AM MDT
--->                  Executables successfully built                  <---
-rwxr-xr-x 1 biswas ncar 51935024 Apr 23 10:39 main/ndown.exe
-rwxr-xr-x 1 biswas ncar 47030584 Apr 23 10:39 main/real.exe
-rwxr-xr-x 1 biswas ncar 45936248 Apr 23 10:39 main/tc.exe
-rwxr-xr-x 1 biswas ncar 59119872 Apr 23 10:38 main/wrf.exe
==========================================================================
```
If the build finishes successfully, a message will be printed, and the four executables (ndown.exe, real.exe, tc.exe, wrf.exe) will be present in the main directory.

```bash

cd ../WPS
```
```bash
export WRF_DIR=../WRF4.6.1
```

```bash
export JASPERINC=/glade/u/home/wrfhelp/UNGRIB_LIBRARIES/include
export JASPERLIB=/glade/u/home/wrfhelp/UNGRIB_LIBRARIES/lib
```


```bash
./configure
```
```bash
Will use NETCDF in dir: /glade/u/apps/derecho/23.09/spack/opt/spack/netcdf/4.9.2/oneapi/2023.2.1/yzvj
Using WRF I/O library in WRF build identified by $WRF_DIR: /glade/derecho/scratch/biswas/CSG/WRF4.6.1
Found Jasper environment variables for GRIB2 support...
  $JASPERLIB = /glade/u/home/wrfhelp/UNGRIB_LIBRARIES/lib
  $JASPERINC = /glade/u/home/wrfhelp/UNGRIB_LIBRARIES/include
------------------------------------------------------------------------
Please select from among the following supported platforms.

   1.  Linux x86_64, gfortran    (serial)
   2.  Linux x86_64, gfortran    (serial_NO_GRIB2)
   3.  Linux x86_64, gfortran    (dmpar)
   4.  Linux x86_64, gfortran    (dmpar_NO_GRIB2)
   5.  Linux x86_64, PGI compiler   (serial)
   6.  Linux x86_64, PGI compiler   (serial_NO_GRIB2)
   7.  Linux x86_64, PGI compiler   (dmpar)
   8.  Linux x86_64, PGI compiler   (dmpar_NO_GRIB2)
   9.  Linux x86_64, PGI compiler, SGI MPT   (serial)
  10.  Linux x86_64, PGI compiler, SGI MPT   (serial_NO_GRIB2)
  11.  Linux x86_64, PGI compiler, SGI MPT   (dmpar)
  12.  Linux x86_64, PGI compiler, SGI MPT   (dmpar_NO_GRIB2)
  13.  Linux x86_64, IA64 and Opteron    (serial)
  14.  Linux x86_64, IA64 and Opteron    (serial_NO_GRIB2)
  15.  Linux x86_64, IA64 and Opteron    (dmpar)
  16.  Linux x86_64, IA64 and Opteron    (dmpar_NO_GRIB2)
  17.  Linux x86_64, Intel oneAPI compilers    (serial)
  18.  Linux x86_64, Intel oneAPI compilers    (serial_NO_GRIB2)
  19.  Linux x86_64, Intel oneAPI compilers    (dmpar)
  20.  Linux x86_64, Intel oneAPI compilers    (dmpar_NO_GRIB2)
  21.  Linux x86_64, Intel Classic compilers    (serial)
  22.  Linux x86_64, Intel Classic compilers    (serial_NO_GRIB2)
  23.  Linux x86_64, Intel Classic compilers    (dmpar)
  24.  Linux x86_64, Intel Classic compilers    (dmpar_NO_GRIB2)
  25.  Linux x86_64, Intel Classic compilers, SGI MPT    (serial)
  26.  Linux x86_64, Intel Classic compilers, SGI MPT    (serial_NO_GRIB2)
  27.  Linux x86_64, Intel Classic compilers, SGI MPT    (dmpar)
  28.  Linux x86_64, Intel Classic compilers, SGI MPT    (dmpar_NO_GRIB2)
  29.  Linux x86_64, Intel Classic compilers, IBM POE    (serial)
  30.  Linux x86_64, Intel Classic compilers, IBM POE    (serial_NO_GRIB2)
  31.  Linux x86_64, Intel Classic compilers, IBM POE    (dmpar)
  32.  Linux x86_64, Intel Classic compilers, IBM POE    (dmpar_NO_GRIB2)
  33.  Linux x86_64 g95 compiler     (serial)
  34.  Linux x86_64 g95 compiler     (serial_NO_GRIB2)
  35.  Linux x86_64 g95 compiler     (dmpar)
  36.  Linux x86_64 g95 compiler     (dmpar_NO_GRIB2)
  37.  Cray XE/XC CLE/Linux x86_64, Cray compiler   (serial)
  38.  Cray XE/XC CLE/Linux x86_64, Cray compiler   (serial_NO_GRIB2)
  39.  Cray XE/XC CLE/Linux x86_64, Cray compiler   (dmpar)
  40.  Cray XE/XC CLE/Linux x86_64, Cray compiler   (dmpar_NO_GRIB2)
  41.  Cray XC CLE/Linux x86_64, Intel Classic compilers   (serial)
  42.  Cray XC CLE/Linux x86_64, Intel Classic compilers   (serial_NO_GRIB2)
  43.  Cray XC CLE/Linux x86_64, Intel Classic compilers   (dmpar)
  44.  Cray XC CLE/Linux x86_64, Intel Classic compilers   (dmpar_NO_GRIB2)

Enter selection [1-44] : 21
------------------------------------------------------------------------
Configuration successful. To build the WPS, type: compile
------------------------------------------------------------------------

```
```bash
./compile >compile.log 2>&1 &
```

```bash
ls *exe
```

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
