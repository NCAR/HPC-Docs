# **Quick start on Cheyenne**
Once you have [an account and the necessary software](file:///C:/display/RC/User+accounts+and+HPC+system+access), you can log in and run jobs on the Cheyenne supercomputer.

Logging in also gives users access to these resources, depending on their allocations:

- [GLADE centralized file service](file:///C:/display/RC/GLADE+file+spaces)
- [Campaign Storage file system](file:///C:/display/RC/Campaign+Storage+file+system)

To run data analysis and visualization jobs on the Casper system's nodes, follow the [procedures described here](file:///C:/display/RC/Starting+Casper+jobs+with+PBS). There is no need to transfer output files from Cheyenne for this since Cheyenne and Casper mount the same GLADE file systems.

!!! warning "**Don’t run sudo on NCAR systems!**"
    If you need help with tasks that you think require sudo privileges, or if you aren’t sure, please contact [HPC User Support](file:///C:/display/RC/User+support) before trying to run sudo yourself. The command fails when unauthorized users run it and sends a security alert to system administrators.

## Page contents
- [Logging in on an NCAR system](#quickstartoncheyenne-logginginonanncarsystem)
- [Environment](#quickstartoncheyenne-environment)
- [Compiling](#quickstartoncheyenne-compilingcompiling)
- [Debugging](#quickstartoncheyenne-debugging)
- [Cheyenne queues](#quickstartoncheyenne-cheyennequeues)
- [Submitting jobs](#quickstartoncheyenne-submittingsubmittingjobs)


-----
## <a name="quickstartoncheyenne-logginginonanncarsystem"></a>**Logging in on an NCAR system**
To log in, start your terminal or Secure Shell client and run an `ssh` command as shown here:
```
ssh -X username@cheyenne.ucar.edu
```
OR
```
ssh -X username@casper.ucar.edu
```

Some users (particularly on Macs) need to use `-Y` instead of `-X` when calling `ssh` to enable `X11 forwarding`.

You can use this shorter command if your username for the system is the same as your username on your local computer:
```
ssh -X cheyenne.ucar.edu
```

After running the `ssh` command, you will be asked to authenticate to finish logging in.

-----
## <a name="quickstartoncheyenne-environment"></a>**Environment**
The Cheyenne HPC system uses a Linux operating system and supports widely used shells on its login and compute nodes. Users also have several compiler choices.

#### **Operating system**
SUSE Linux.

#### **Scheduler**

Altair PBS Pro. See this [detailed documentation](file:///C:/display/RC/Starting+Cheyenne+jobs) about using PBS Pro and running jobs.


#### **Shells**
The default login shell for new Cheyenne users is **bash**. You can change the default after logging in to the Systems Accounting Manager ([SAM](file:///C:/display/RC/Systems+Accounting+Manager)). It may take several hours for a change you make to take effect. You can confirm which shell is set as your default by entering `echo $SHELL` on your Cheyenne command line.

#### **Environment modules**
The Cheyenne `module` utility enables users to easily load and unload compilers and compatible software packages as needed, and to create multiple customized environments for various tasks.

Here are some of the most commonly used commands. (See the [Environment modules page](file:///C:/display/RC/Environment+modules+on+Cheyenne) for more details.)

- **`module av`** - Show which modules are available for use with the current compiler.

- **`module help`** - List switches, subcommands, and arguments for the module utility. Specify a modulefile by name for help with an individual module.
```
module help netcdf
```
- **`module list`** - List the modules that are loaded.

- **`module load`** - Load the default version of a software package, or load a specified version.
```
module load modulefile\_name

module load modulefile\_name/n.n.n
```
- **`module spider`** - List all modules that exist on the system.

- **`module swap`** - Unload one module and load a different one. Example:
```
module swap netcdf pnetcdf
```
- **`module unload`** - Unload the specified software package.
```
module unload modulefile\_name
```


-----
## <a name="quickstartoncheyenne-compilingcompiling"></a>**Compiling**
Cheyenne users have access to Intel, PGI, and GNU compilers. The **Intel compiler module** is loaded by default.

After loading the compiler module that you want to use, identify and run the appropriate compilation wrapper command from the table below. (If your script already includes one of the following generic MPI commands, there is no need to change it: `mpif90`, `mpif77`, `ftn`; `mpicc`, `cc`; `mpiCC` and `CC`.)

Also consider using the compiler's [diagnostic flags](file:///C:/display/RC/Compiler+diagnostic+flags+for+Cheyenne+users) to identify potential problems.


<table><tr><th><h4><b>Compiler</b></h4></th><th><b>Language</b></th><th><b>Commands for serial programs</b></th><th><b>Commands for programs<br>using MPI</b></th><th><b>Flags to enable OpenMP<br>(for serial and MPI)</b></th></tr>
<tr><td><b>Intel (default)</b></td><td>Fortran</td><td>ifort foo.f90</td><td>mpif90 foo.f90</td><td>-qopenmp</td></tr>
<tr><td></td><td>C</td><td>icc foo.c</td><td>mpicc foo.c</td><td>-qopenmp</td></tr>
<tr><td></td><td>C++</td><td>icpc foo.C</td><td>mpicxx foo.C</td><td>-qopenmp</td></tr>
<tr><td colspan="5">Include these flags for best performance when you use the Intel compiler:<br>-march=corei7 -axCORE-AVX2</td></tr>
<tr><td><b>NVIDIA HPC</b></td><td>Fortran</td><td>nvfortran foo.f90</td><td>mpif90 foo.f90</td><td>-mp</td></tr>
<tr><td></td><td>C</td><td>nvc foo.c</td><td>mpicc foo.c</td><td>-mp</td></tr>
<tr><td></td><td>C++</td><td>nvc++ foo.C</td><td>mpicxx foo.C</td><td>-mp</td></tr>
<tr><td><b>GNU <br>(GCC)</b></td><td>Fortran</td><td>gfortran foo.f90</td><td>mpif90 foo.f90</td><td>-fopenmp</td></tr>
<tr><td></td><td>C</td><td>gcc foo.c</td><td>mpicc foo.c</td><td>-fopenmp</td></tr>
<tr><td></td><td>C++</td><td>g++ foo.C</td><td>mpicxx foo.C</td><td>-fopenmp</td></tr>
<tr><td><b>PGI</b></td><td>Fortran</td><td>pgfortran (or pgf90 or pgf95) foo.f90</td><td>mpif90 foo.f90</td><td>-mp</td></tr>
<tr><td></td><td>C</td><td>pgcc foo.c</td><td>mpicc foo.c</td><td>-mp</td></tr>
<tr><td></td><td>C++</td><td>pgcpp (or pgCC) foo.C</td><td>mpicxx foo.C</td><td>-mp</td></tr>
<tr><td colspan="5">The PGI compiler has become the NVIDIA HPC (nvhpc) compiler and all future versions will be released as such. PGI users should migrate to NVIDIA when possible.</td></tr>
</table>
-----
## <a name="quickstartoncheyenne-debugging"></a>**Debugging**
CISL provides the ARM Forge tools, **DDT** and **MAP**, for debugging, profiling, and optimizing code in the Cheyenne environment.

**Performance Reports** is another ARM tool for Cheyenne users. It summarizes the performance of HPC application runs.

See [Running DDT, MAP and PR jobs](file:///C:/display/RC/Running+DDT%2C+MAP+and+PR+jobs+on+Cheyenne).

-----
## <a name="quickstartoncheyenne-cheyennequeues"></a>**Cheyenne queues**
Most of the Cheyenne batch queues are for exclusive use, and jobs are charged for all 36 cores on each node that is used. Jobs in the shared use `share` queue are charged only for the cores used.

The `regular` queue, which has a 12-hour wall-clock limit, meets most users' needs for running batch jobs.

See the table on [this page](file:///C:/display/RC/Job-submission+queues+and+charges) for information about other queues.

-----
## <a name="quickstartoncheyenne-submittingsubmittingjobs"></a>**Submitting jobs**
Schedule your jobs to run on Cheyenne by submitting them through the PBS Pro workload management system. (To run jobs on the Casper cluster, see [this documentation](file:///C:/display/RC/Starting+Casper+jobs+with+PBS).)

To submit a Cheyenne *batch* job, use the **qsub** command followed by the name of your batch script file.

```shell
qsub script_name
import khar as kh
```
See [this page](file:///C:/display/RC/Cheyenne+job+script+examples) for job script examples.


To start an *interactive* job, use the `qsub` command with the necessary options but no script file.
```
qsub -I -l select=1:ncpus=36:mpiprocs=36 -l walltime=01:00:00 -q regular -A project_code
```

#### **More detailed PBS Pro documentation**
- [Submitting jobs with PBS](file:///C:/display/RC/Starting+Cheyenne+jobs)
- [Scripts that you can adapt for your own jobs](file:///C:/display/RC/Cheyenne+job+script+examples)

----

copy of https://arc.ucar.edu/knowledge_base/72581213