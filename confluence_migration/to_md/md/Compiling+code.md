# Compiling code

Cheyenne and Casper users have access to Intel, NVIDIA/PGI, and
GNU compilers. The **Intel compiler module** is loaded by default, which
makes some [<u>Intel
tools</u>](file:////display/RC/Intel+Parallel+Studio+XE+tools) available
by default as well.

2/2/2021: This documentation has been updated because of changes to the
PGI compiler. It has become the NVIDIA HPC (nvhpc) compiler and all
future versions will be released as such. PGI users should migrate to
NVIDIA when possible. The nvhpc compiler has no license limitations.

#### Page contents

- [Compiler commands](#Compilingcode-Compilercommands)

- [GPU compilers](#Compilingcode-GPUcompilers)

- [Changing compilers](#Compilingcode-Changingcompilers)

- [Where to compile](#Compilingcode-Wheretocompile)

- [Native commands](#Compilingcode-Nativecommands)

## Compiler commands

After loading the compiler module that you want to use, identify and run
the appropriate compilation wrapper command from the table below. (If
your script already includes one of the following generic MPI commands,
there is no need to change it: mpif90, mpif77, ftn; mpicc, cc; mpiCC and
CC.)

Also consider using the compiler's [<u>diagnostic
flags</u>](file:////display/RC/Compiler+diagnostic+flags+for+Cheyenne+users) to
identify potential problems.

Any libraries you build to support an application should be built with
the same compiler, compiler version, and compatible flags that were used
to compile the other parts of the application, including the main
executable(s). Also, when you run the applications, be sure you have
loaded the same [<u>module/version
environment</u>](file:////display/RC/Environment+modules+on+Cheyenne) in
which you created the applications. This will avoid job failures that
can result from missing mpi launchers and library routines. 

***Compiler man pages***

To get the **man** page for a compiler, log in to the system where you
intend to use it, load the module, then execute **man** for the
compiler.

module load nvhpc

man nvfortran

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
<th><strong>Compiler</strong></th>
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

## GPU compilers

To compile CUDA code to run on the Casper data analysis and
visualization nodes, use the appropriate NVIDIA compiler command:

- **nvc** – NVIDIA C compiler

- **nvcc** – NVIDIA CUDA compiler (Using nvcc requires a C compiler to
  be present in the background; nvc, icc, or gcc, for example.)

- **nvfortran** – CUDA Fortran

For examples, see:

- [<u>Compiling GPU code on Casper
  nodes</u>](file:////display/RC/Compiling+GPU+code+on+Casper+nodes)

- [<u>Compiling multi-GPU MPI-CUDA code on
  Casper</u>](file:////display/RC/Compiling+multi-GPU+MPI-CUDA+code+on+Casper)

## Changing compilers

Should you prefer to use a compiler other than the Intel default
compiler, use **module swap** to make the change.

In this example, you are switching from Intel to NVIDIA:

module swap intel nvhpc

When you load a compiler module, the system makes other compatible
modules available. This helps you establish a working environment and
avoid conflicts. If you need to link your program with a
library\*, use **module load** to load the library as in this example:

module load netcdf

Then, you can just invoke the desired compilation command without adding
link options such as **-l netcdf**. Here's an example:

mpif90 foo.f90

You can learn more about how using modules helps you manage your
environment on our [<u>Environment
modules</u>](file:////display/RC/Environment+modules+on+Cheyenne) page.

## Where to compile

The use of different types of processors and operating systems in the
Cheyenne environment makes your choice of where to compile your code
especially important. 

<table>
<colgroup>
<col style="width: 46%" />
<col style="width: 53%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>System</strong></th>
<th><strong>Processor</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Cheyenne</td>
<td>Intel Broadwell</td>
</tr>
<tr class="even">
<td>Casper DAV nodes</td>
<td>Intel Skylake (default)<br />
Intel Cascade Lake</td>
</tr>
</tbody>
</table>

Cheyenne uses SUSE Enterprise Linux, while the Casper data analysis and
visualization (DAV) nodes run CentOS. The different operating systems
provide different versions of some standard libraries, which may be
incompatible with each other. Specify Skylake nodes to ensure your code
will run on both Skylake and Cascade Lake nodes.

Even if you take care to build your programs for portability, you will
achieve superior performance if you compile your code on the cluster
where you intend for it to run.

### Compile on Cheyenne if…

- You want to aggressively optimize CPU performance.

- You will run your code only on Cheyenne.

You can compile your code in a batch job in the "economy" or "regular"
queue using your login environment (not a login node) if needed.

### Compile on Casper if...

- You want to ensure that your code will run on Casper nodes.

- You want to use the latest CPU optimizations in Intel's Skylake or
  Cascade Lake architecture.

- Your programs use GPU tools like OpenGL, CUDA, and OpenACC.

## Native commands

We recommend using the module wrapper commands described above. However,
if you prefer to invoke the compilers directly, unload the NCAR default
compiler wrapper environment by entering this on your command line:

module unload ncarcompilers

You can still use the environment variables that are set by the modules
that remain loaded, as shown in the following examples of invoking
compilers directly to compile a Fortran program.

### Intel compiler

ifort -o a.out \$NCAR_INC\_\<PROGRAM\> program_name.f
\$NCAR_LDFLAGS\_\<PROGRAM\> \$NCAR_LIBS\_\<PROGRAM\>

### NVIDIA HPC compiler

nvfortran -o a.out \$NCAR_INC\_\<PROGRAM\> program_name.f
\$NCAR_LDFLAGS\_\<PROGRAM\> \$NCAR_LIBS\_\<PROGRAM\>

### GNU compiler collection (GCC)

gfortran -o a.out \$NCAR_INC\_\<PROGRAM\> program_name.f
\$NCAR_LDFLAGS\_\<PROGRAM\> \$NCAR_LIBS\_\<PROGRAM\>

### PGI compiler

pgfortran -o a.out \$NCAR_INC\_\<PROGRAM\> program_name.f
\$NCAR_LDFLAGS\_\<PROGRAM\> \$NCAR_LIBS\_\<PROGRAM\>

To determine the correct name to substitute for \<PROGRAM\> in those
commands, you can grep each of them as shown here.

env \| grep NCAR_INC

env \| grep NCAR_LDFLAGS

env \| grep NCAR_LIBS

**\*** In addition to multiple compilers, CISL keeps available multiple
versions of libraries to accommodate a wide range of users' needs.
Rather than rely on the environment variable LD_LIBRARY_PATH to find the
correct libraries dynamically, we encode library paths within the
binaries when you build Executable and Linkable Format (ELF)
executables. To do this, we use RPATH rather than LD_LIBRARY_PATH to set
the necessary paths to shared libraries.

This enables your executable to work regardless of updates to new
default versions of the various libraries; it doesn't have to search
dynamically at run time to load them. It also means you don't need to
worry about setting the variable or loading another module, greatly
reducing the likelihood of runtime errors.
