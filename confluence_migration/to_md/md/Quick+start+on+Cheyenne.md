# Quick start on Cheyenne

Once you have [<u>an account and the necessary
software</u>](file:////display/RC/User+accounts+and+HPC+system+access),
you can log in and run jobs on the Cheyenne supercomputer.

Logging in also gives users access to these resources, depending on
their allocations:

- [<u>GLADE centralized file
  service</u>](file:////display/RC/GLADE+file+spaces)

- [<u>Campaign Storage file
  system</u>](file:////display/RC/Campaign+Storage+file+system)

To run data analysis and visualization jobs on the Casper system's
nodes, follow the [<u>procedures described
here</u>](file:////display/RC/Starting+Casper+jobs+with+PBS). There is
no need to transfer output files from Cheyenne for this since Cheyenne
and Casper mount the same GLADE file systems.

#### Don’t run **sudo** on NCAR systems

If you need help with tasks that you think require sudo privileges, or
if you aren’t sure, please contact [HPC User
Support](file:////display/RC/User+support) before trying to run sudo
yourself. The command fails when unauthorized users run it and sends a
security alert to system administrators.

#### Page contents

- [Logging in on an NCAR
  system](#QuickstartonCheyenne-LogginginonanNCARs)

- [Environment](#QuickstartonCheyenne-Environment)

- [Compiling](#QuickstartonCheyenne-compilingCompiling)

- [Debugging](#QuickstartonCheyenne-Debugging)

- [Cheyenne queues](#QuickstartonCheyenne-Cheyennequeues)

- [Submitting jobs](#QuickstartonCheyenne-submittingSubmitti)

## Logging in on an NCAR system

To log in, start your terminal or Secure Shell client and run
an **ssh** command as shown here:

ssh -X username@cheyenne.ucar.edu

OR

ssh -X username@casper.ucar.edu

Some users (particularly on Macs) need to use **-Y** instead
of **-X** when calling SSH to enable X11 forwarding.

You can use this shorter command if your username for the system is the
same as your username on your local computer:

ssh -X cheyenne.ucar.edu

OR

ssh -X casper.ucar.edu

After running the ssh command, you will be asked to authenticate to
finish logging in.

## Environment

The Cheyenne HPC system uses a Linux operating system and supports
widely used shells on its login and compute nodes. Users also have
several compiler choices.

#### Operating system

SUSE Linux.

#### Scheduler

Altair PBS Pro. See this [<u>detailed
documentation</u>](file:////display/RC/Starting+Cheyenne+jobs) about
using PBS Pro and running jobs.

#### Shells

The default login shell for new Cheyenne users is **bash**. You can
change the default after logging in to the Systems Accounting Manager
([<u>SAM</u>](file:////display/RC/Systems+Accounting+Manager)). It may
take several hours for a change you make to take effect. You can confirm
which shell is set as your default by entering **echo \$SHELL** on your
Cheyenne command line.

#### Environment modules

The Cheyenne **module** utility enables users to easily load and unload
compilers and compatible software packages as needed, and to create
multiple customized environments for various tasks.

Here are some of the most commonly used commands. (See
the [<u>Environment modules
page</u>](file:////display/RC/Environment+modules+on+Cheyenne) for more
details.)

**module av **- Show which modules are available for use with the
current compiler.

**module help** - List switches, subcommands, and arguments for the
module utility. Specify a modulefile by name for help with an individual
module.

module help netcdf

**module list** - List the modules that are loaded.

**module load** - Load the default version of a software package, or
load a specified version.

module load modulefile_name

module load modulefile_name/n.n.n

**module spider **- List all modules that exist on the system.

**module swap **- Unload one module and load a different one. Example:

module swap netcdf pnetcdf

**module unload** - Unload the specified software package.

module unload modulefile_name

## Compiling

Cheyenne users have access to Intel, PGI, and GNU compilers. The **Intel
compiler module** is loaded by default.

After loading the compiler module that you want to use, identify and run
the appropriate compilation wrapper command from the table below. (If
your script already includes one of the following generic MPI commands,
there is no need to change it: mpif90, mpif77, ftn; mpicc, cc; mpiCC and
CC.)

Also consider using the compiler's [<u>diagnostic
flags</u>](file:////display/RC/Compiler+diagnostic+flags+for+Cheyenne+users) to
identify potential problems.

<table>
<colgroup>
<col style="width: 13%" />
<col style="width: 13%" />
<col style="width: 21%" />
<col style="width: 21%" />
<col style="width: 30%" />
</colgroup>
<thead>
<tr class="header">
<th><h4 id="compiler"><strong>Compiler</strong></h4></th>
<th><strong>Language</strong></th>
<th><strong>Commands for serial programs</strong></th>
<th><strong>Commands for programs<br />
using MPI</strong></th>
<th><strong>Flags to enable OpenMP<br />
(for serial and MPI)</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Intel (default)</strong></td>
<td>Fortran</td>
<td>ifort foo.f90</td>
<td>mpif90 foo.f90</td>
<td>-qopenmp</td>
</tr>
<tr class="even">
<td></td>
<td>C</td>
<td>icc foo.c</td>
<td>mpicc foo.c</td>
<td>-qopenmp</td>
</tr>
<tr class="odd">
<td></td>
<td>C++</td>
<td>icpc foo.C</td>
<td>mpicxx foo.C</td>
<td>-qopenmp</td>
</tr>
<tr class="even">
<td colspan="5">Include these flags for best performance when you use
the Intel compiler:<br />
-march=corei7 -axCORE-AVX2</td>
</tr>
<tr class="odd">
<td><strong>NVIDIA HPC</strong></td>
<td>Fortran</td>
<td>nvfortran foo.f90</td>
<td>mpif90 foo.f90</td>
<td>-mp</td>
</tr>
<tr class="even">
<td></td>
<td>C</td>
<td>nvc foo.c</td>
<td>mpicc foo.c</td>
<td>-mp</td>
</tr>
<tr class="odd">
<td></td>
<td>C++</td>
<td>nvc++ foo.C</td>
<td>mpicxx foo.C</td>
<td>-mp</td>
</tr>
<tr class="even">
<td><strong>GNU <br />
(GCC)</strong></td>
<td>Fortran</td>
<td>gfortran foo.f90</td>
<td>mpif90 foo.f90</td>
<td>-fopenmp</td>
</tr>
<tr class="odd">
<td></td>
<td>C</td>
<td>gcc foo.c</td>
<td>mpicc foo.c</td>
<td>-fopenmp</td>
</tr>
<tr class="even">
<td></td>
<td>C++</td>
<td>g++ foo.C</td>
<td>mpicxx foo.C</td>
<td>-fopenmp</td>
</tr>
<tr class="odd">
<td><strong>PGI</strong></td>
<td>Fortran</td>
<td>pgfortran (or pgf90 or pgf95) foo.f90</td>
<td>mpif90 foo.f90</td>
<td>-mp</td>
</tr>
<tr class="even">
<td></td>
<td>C</td>
<td>pgcc foo.c</td>
<td>mpicc foo.c</td>
<td>-mp</td>
</tr>
<tr class="odd">
<td></td>
<td>C++</td>
<td>pgcpp (or pgCC) foo.C</td>
<td>mpicxx foo.C</td>
<td>-mp</td>
</tr>
<tr class="even">
<td colspan="5">The PGI compiler has become the NVIDIA HPC (nvhpc)
compiler and all future versions will be released as such. PGI users
should migrate to NVIDIA when possible.</td>
</tr>
</tbody>
</table>

## Debugging

CISL provides the ARM Forge tools, **DDT** and **MAP**, for debugging,
profiling, and optimizing code in the Cheyenne environment.

**Performance Reports** is another ARM tool for Cheyenne users. It
summarizes the performance of HPC application runs.

See [<u>Running DDT, MAP and PR
jobs</u>](file:////display/RC/Running+DDT%252C+MAP+and+PR+jobs+on+Cheyenne).

## Cheyenne queues

Most of the Cheyenne batch queues are for exclusive use, and jobs are
charged for all 36 cores on each node that is used. Jobs in the shared
use "share" queue are charged only for the cores used.

The "regular" queue, which has a 12-hour wall-clock limit, meets most
users' needs for running batch jobs.

See the table on [<u>this
page</u>](file:////display/RC/Job-submission+queues+and+charges) for
information about other queues.

## Submitting jobs

Schedule your jobs to run on Cheyenne by submitting them through the PBS
Pro workload management system. (To run jobs on the Casper cluster,
see [<u>this
documentation</u>](file:////display/RC/Starting+Casper+jobs+with+PBS).)

To submit a Cheyenne *batch* job, use the **qsub** command followed by
the name of your batch script file.

qsub script_name

See [<u>this page</u>](file:////display/RC/Cheyenne+job+script+examples)
for job script examples.

To start an *interactive* job, use the **qsub** command with the
necessary options but no script file.

qsub -I -l select=1:ncpus=36:mpiprocs=36 -l walltime=01:00:00 -q regular
-A project_code

#### More detailed PBS Pro documentation

- [<u>Submitting jobs with
  PBS</u>](file:////display/RC/Starting+Cheyenne+jobs)

- [<u>Scripts that you can adapt for your own
  jobs</u>](file:////display/RC/Cheyenne+job+script+examples)
