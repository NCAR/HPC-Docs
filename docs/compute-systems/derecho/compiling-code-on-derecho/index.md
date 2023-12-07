# Compiling code on Derecho


## Compilers available on Derecho
Several C/C++ and Fortran compilers are available on all NCAR HPC
systems. The information on this page applies to all of those systems
except where noted.

<table style="width:100%;">
  <colgroup>
    <col style="width: 24%" />
    <col style="width: 12%" />
    <col style="width: 20%" />
    <col style="width: 20%" />
    <col style="width: 24%" />
  </colgroup>
  <thead>
    <tr class="header">
      <th><strong>Compiler</strong></th>
      <th><strong>Language</strong></th>
      <th><strong>Commands for serial programs</strong></th>
      <th><strong>Commands for programs<br />
          using MPI</strong></th>
      <th><strong>Flags to enable OpenMP</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr class="odd">
      <td rowspan="3"><strong>Intel</strong> (Classic/OneAPI)*</td>
      <td>Fortran</td>
      <td><pre>ifort / ifx</pre></td>
      <td><pre>mpif90</pre></td>
      <td rowspan="3"><pre>-qopenmp</pre></td>
    </tr>
    <tr class="even">
      <td>C</td>
      <td><pre>icc / icx</pre></td>
      <td><pre>mpicc</pre></td>
    </tr>
    <tr class="odd">
      <td>C++</td>
      <td><pre>icpc / icpx</pre></td>
      <td><pre>mpicxx</pre></td>
    </tr>
    <tr class="even">
      <td rowspan="3"><strong>NVIDIA HPC SDK</strong></td>
      <td>Fortran</td>
      <td><pre>nvfortran</pre></td>
      <td><pre>mpif90</pre></td>
      <td rowspan="3"><pre>-mp</pre></td>
    </tr>
    <tr class="odd">
      <td>C</td>
      <td><pre>nvc</pre></td>
      <td><pre>mpicc</pre></td>
    </tr>
    <tr class="even">
      <td>C++</td>
      <td><pre>nvc++</pre></td>
      <td><pre>mpicxx</pre></td>
    </tr>
    <tr class="odd">
      <td rowspan="3"><strong>GNU Compiler Collection (GCC)</strong></td>
      <td>Fortran</td>
      <td><pre>gfortran</pre></td>
      <td><pre>mpif90</pre></td>
      <td rowspan="3"><pre>-fopenmp</pre></td>
    </tr>
    <tr class="even">
      <td>C</td>
      <td><pre>gcc</pre></td>
      <td><pre>mpicc</pre></td>
    </tr>
    <tr class="odd">
      <td>C++</td>
      <td><pre>g++</pre></td>
      <td><pre>mpicxx</pre></td>
    </tr>
    <tr class="even">
      <td rowspan="3"><strong>Cray Compiler</strong> (Derecho only)**</td>
      <td>Fortran</td>
      <td><pre>ftn</pre></td>
      <td><pre>mpif90</pre></td>
      <td rowspan="3"><pre>-fopenmp</pre></td>
    </tr>
    <tr class="odd">
      <td>C</td>
      <td><pre>cc</pre></td>
      <td><pre>mpicc</pre></td>
    </tr>
    <tr class="even">
      <td>C++</td>
      <td><pre>CC</pre></td>
      <td><pre>mpicxx</pre></td>
    </tr>
    <tr class="odd">
      <td colspan="5">* Intel OneAPI is a cross-platform toolkit that
          supports C, C++, Fortran, and Python programming languages
          and replaces <a href="https://www.intel.com/content/www/us/en/developer/articles/release-notes/intel-parallel-studio-xe-supported-and-unsupported-product-versions.html">Intel
            Parallel Studio</a>. Derecho supports both Intel OneAPI and Intel
          Classic Compilers. Intel is planning to retire the Intel Classic
          compilers and is moving toward Intel OneAPI. Intel Classic Compiler
          commands (ifort, icc, and icpc) will be replaced by the Intel OneAPI
          compilers (ifx, icx, and icpx).</td>
    </tr>
    <tr class="even">
      <td colspan="5">** Please note that mpi wrappers are not
          available by default using Cray compilers but the ncarcompilers module
          will translate a call to “mpicc” to “cc” (and likewise for the other
          languages) as a convenience.</td>
    </tr>
  </tbody>
</table>


## Compiler Commands

All supported compilers are available via the `module` utility. After
loading the compiler module you want to use, refer to the table above to identify and run the
appropriate compilation wrapper command.

If your script already includes one of the following generic MPI
commands, there is no need to change it:

- `mpif90`, `mpif77`, `ftn`*

- `mpicc`, `cc`*

- `mpiCC`, `CC`*

*The wrappers `ftn`, `cc`, and `CC` are Cray-specific only available on Derecho.

Build any libraries that you need to support an application with the
same compiler, compiler version, and compatible flags used to compile
the other parts of the application, including the main executable(s).
Also, before you run the applications, be sure you have loaded the
same [module/version environment](../../../environment-and-software/user-environment/modules.md) in which you
created the applications. This will help you avoid job failures that can
result from missing MPI launchers and library routines.

### Compiler `man` pages

To refer to the `man` page for a compiler, log in to the system where
you intend to use it, load the module, then execute `man` for the
compiler. For example:
```
module load nvhpc
man nvfortran
```

You can also use `-help` flags for a description of the command-line
options for each compiler. Follow this example:
```
ifort -help

nvfortran -help [=option]

```
!!! tip
    Use compiler [diagnostic
    flags](index.md#common-compiler-options-and-diagnostic-flags) to identify
    potential problems while compiling the code.


## Changing compilers

To change from one compiler to another, use `module swap`. In this
example, you are switching from Intel to NVIDIA:
```sh
module swap intel nvhpc
```

When you load a compiler module or change to a different compiler, the
system makes other compatible modules available. This helps you
establish a working environment and avoid conflicts.

If you need to link your program with a library, use `module
load` to load the library as in this example:
```sh
module load netcdf
```

Then you can invoke the desired compilation command, including any library linking options such as `-lnetcdf`. Here's an example:
```sh
mpif90-o foo.exe foo.f90 -lnetcdf
```

## Compiling CPU code

### Using the Cray compiler collection

Derecho users have access to the Cray Compiling Environment (CCE) using
the `cce` module. The compiler collection includes `cc`, `CC`,
and `ftn` for compiling C, C++, and Fortran codes.

To see which versions of the compiler are available, use the `module
avail` command:
```sh
module avail cce
```

CCE base compilers are available by default in
the `ncarcompilers` module. Loading the `ncarcompilers` module
simplifies building code with dependencies such as netCDF. For example,
compiling a simple Fortran code using netCDF is as follows with the
compiler wrappers:
```sh
ftn -o mybin -lnetcdff mycode.f90
```

Meanwhile, if you did not have the `ncarcompilers` module loaded, you
would need to run the following command instead, with the linker flags
and include-paths:
```sh
ftn -I/path/to/netcdf/include -L/path/to/netcdf/lib -lnetcdff -o mybin mycode.f90
```

### Using Cray MPICH MPI

Unlike other MPI libraries, Cray MPICH does **NOT** provide MPI
wrapper commands like `mpicc`, `mpicxx`, and `mpif90`. Rather, use
the same `cc`, `CC`, and `ftn` commands you use to compile a
serial code. The Cray Programming Environment (CPE) will add MPI build
flags to your commands whenever you have the `cray-mpich` module
loaded.

As many application build systems expect the MPI wrappers,
our `ncarcompilers` module will translate a call to `mpicc` to
`cc` (and likewise for the other languages) as a convenience,
typically eliminating the need to alter pre-existing build scripts.

Cray MPICH also supports GPU devices. If you are using an MPI
application compiled with GPU support, enable CUDA functionality
by loading a cuda module and setting or exporting this environment
variable before calling the MPI launcher in your job by including this
in your script:
```sh
MPICH_GPU_SUPPORT_ENABLED=1
```

Also, if your GPU-enabled MPI application makes use of managed memory,
you also need to set this environment variable:
```sh
MPICH_GPU_MANAGED_MEMORY_SUPPORT_ENABLED=1
```

At runtime, you will also need to pass information about job parallelism
to the `mpiexec` (or `mpirun` / `aprun`) launcher because this
information is not automatically taken from the PBS job script. You can
pass this information by setting environment variables or by
using `mpiexec` options. Full details of runtime settings for
launching parallel programs can be found by running `man mpiexec`.

The primary settings you will need are:

- the number of mpi ranks (`-n / PALS_NRANKS`)

- the number of ranks per node (`-ppn / PALS_PPN`)

- the number of OpenMP threads or CPUs to associate with each rank (`-d /
  PALS_DEPTH`)

- binding options (`--cpu-bind / PALS_CPU_BIND`)

!!! tip
    **Cray MPICH** has many tunable parameters you can set through
    environment variables. Run `man mpi` for a complete listing of these
    environment variables.

Example PBS select statements and corresponding MPI launch options are
shown below for binding a hybrid MPI + OpenMP application (144 MPI
ranks, and 4 OpenMP threads per MPI rank, which requires 5 nodes but
does not fully subscribe the last node). Examples of both methods –
setting environment variables and passing options to `mpiexec` – are
provided.

#### Environment variable example

=== "bash"
    ```sh

    #PBS -l select=5:ncpus=128:mpiprocs=32:ompthreads=4

    export PALS_NRANKS=144
    export PALS_PPN=32
    export PALS_DEPTH=4
    export PALS_CPU_BIND=depth

    mpiexec ./a.out
    ```
=== "tcsh"

    ``` tcsh
    #PBS -l select=5:ncpus=128:mpiprocs=32:ompthreads=4

    setenv PALS_NRANKS 144
    setenv PALS_PPN 32
    setenv PALS_DEPTH 4
    setenv PALS_CPU_BIND depth

    mpiexec ./a.out
    ```

#### `mpiexec` options example
=== "bash"
    ```sh
    #PBS -l select=5:ncpus=128:mpiprocs=32:ompthreads=4

    mpiexec --cpu-bind depth -n 144 -ppn 32 -d 4 ./a.out
    ```
=== "tcsh"
    ```tcsh
    #PBS -l select=5:ncpus=128:mpiprocs=32:ompthreads=4

    mpiexec --cpu-bind depth -n 144 -ppn 32 -d 4 ./a.out
    ```


### Other compilers

These additional compilers are available on Derecho.

- NVIDIA’s HPC SDK

- Intel compilers

- the GNU Compiler Collection (GCC)

When using non-Cray compilers, you can use either the compiler
collection’s own commands (e.g., `ifort`, `nvfortran`) or the
equivalent CPE command (e.g., `ftn`) as long as you have loaded your
desired compiler module. If you do not have the `ncarcompilers` module
loaded and you are using the `cray-mpich` MPI, you will need to use a
CPE command.


#### Using Intel compilers

The Intel compiler suite is available via the `intel` module. It
includes compilers for C, C++, and Fortran codes.
by default.

To see which versions are available, use the `module avail` command.
```sh
module avail intel
```

To load the default Intel compiler, use `module load` without
specifying a version.
```sh
module load intel
```

To load a different version, specify the version number when loading the
module.

Similarly, you can swap your current compiler module to Intel by using
the `module swap` command.
```sh
module swap cce/14.0.3 intel
```

Extensive documentation for using the Intel compilers is
available [online here](https://www.intel.com/content/www/us/en/developer/tools/oneapi/toolkits.html).
To review the manual page for a compiler, run the `man` command for it
as in this example:
```sh
man ifort
```

!!! note "What's the difference between the `intel`, `intel-oneapi`, `intel-classic` modules?"
    Users migrating from Cheyenne and previous Casper deployments may
    note there are several "flavors" of the Intel compiler available
    through the module system.

    Intel is currently moving from their "classic" compiler suite to
    the new "OneAPI" family.  During this process both sets of
    compilers are available, but through different commands under different `module` selections:

    |  Module         | **Fortran** | **C** | **C++** |
    |-----------------|-------------|-------|---------|
    | `intel-classic` | `ifort`     | `icc` | `icpc`  |
    | `intel-oneapi`  | `ifx`       | `icx` | `icpx`  |
    | `intel`<br>(default) | `ifort` | `icx` | `icpx` |

    The `intel-classic` module makes the familiar `ifort/icc/icpc`
    compilers available, however it is expected these will be
    deprecated during Casper's lifetime.  At this stage we expect to
    keep existing compiler versions available, however there will be
    no further updates.

    The `intel-oneapi` module uses the new `ifx/icx/icpx` compilers.

    The default `intel` module presently uses the older `ifort`
    Fortran compiler along with the newer `icx/icpx` C/C++ compilers.
    This choice is intentional as the newer `ifx` does not reliably
    match the performance of `ifort` in all cases.  We will continue
    to monitor the progress of the OneAPI compilers and will change
    this behavior in the future.

##### Optimizing your code with Intel compilers

Intel compilers provide several different optimization and vectorization
options. By default, they use the `-O2` option, which includes some
optimizations.

Using `-O3` instead will provide more aggressive optimizations that
may not improve the performance of some programs, while `-O1` enables
minimal optimization. A higher level of optimization might increase your
compile time significantly.

You can also disable any optimization by using `-O0`.

Be aware that compiling CPU code with the Intel compiler on Derecho is
significantly different from using the Intel compiler on the Cheyenne
system. Flags that are commonly used on Cheyenne might cause Derecho
jobs to fail or run much more slowly than otherwise possible.

!!! tip "CPU Architecture Flags to use  on Derecho"
    **DO use on Derecho: `-march=core-avx2`**

!!! danger "Do NOT use on Derecho:"
    **Do NOT use on Derecho: `-xHost` , `-axHost` , `-xCORE-AVX2` , `-axCORE-AVX2`**

    These flags will generate code that may not run, or will run suboptimally on Derecho.

##### Examples

To compile and link a single Fortran program and create an executable,
follow this example:
```sh
ifort filename.f90 -o filename.exe
```

To enable multi-threaded parallelization (OpenMP), include
the `-qopenmp` flag as shown here:
```sh
ifort -qopenmp filename.f90 -o filename.exe
```

## Compiling GPU code

On Derecho, GPU applications should be built with either the Cray
compilers or the NVIDIA HPC SDK compilers and libraries. In the
following examples, we demonstrate the use of NVIDIA’s tools.

Additional compilation flags for GPU code will depend in large part on
which GPU-programming paradigm is being used (e.g., OpenACC, OpenMP,
CUDA) and which compiler collection you have loaded. The following
examples show basic usage, but note that many customizations and
optimizations are possible. You are encouraged to read the relevant man
page for the compiler you choose.

### OpenACC

To compile with OpenACC directives, simply add the `-acc` flag to your
invocation of nvc, nvc++, or nvfortan. A Fortran example:
```sh
nvfortran -o acc_bin -acc acc_code.f90
```

You can gather more insight into GPU acceleration decisions made by the
compiler by adding `-Minfo=accel` to your invocation. Using compiler
options, you can also specify which GPU architecture to target. This
example will request compilation for both V100 (as on Casper) and A100
GPUs (as on Derecho):
```sh
nvfortran -o acc_bin -acc -gpu=cc70,cc80 acc_code.f90
```

Specifying multiple acceleration targets will increase the size of the
binary and the time it takes to compile the code.

### OpenMP

Using OpenMP to offload code to the GPU is similar to using OpenACC. To
compile a code with OpenMP offloading, use the `-mp=gpu` flag. The
aforementioned diagnostic and target flags also apply to OpenMP
offloading.
```sh
nvfortran -o omp_gpu -mp=gpu omp.f90
```

### CUDA

The process for compiling CUDA code depends on whether you are using C++
or Fortran. For C++, the process often involves multiple stages in which
you first use `nvcc``, the NVIDIA CUDA compiler, and then your C++
compiler of choice.
```sh
nvcc -c -arch=sm_80 cuda_code.cu
g++ -o cuda_bin -lcuda -lcudart main.cpp cuda_code.o
```
Using the `nvcc` compiler driver with a non-NVIDIA C++ compiler
requires loading a cuda environment module in addition to the
compiler of choice.

The compiler handles CUDA code directly, so the compiler you use must
support CUDA. This means you should use `nvfortran`. If your source
code file ends with the `.cuf` extension, nvfortran will enable CUDA
automatically. Otherwise, you can specify the `-Mcuda` flag to the
compiler.
```sh
nvfortran -Mcuda -o cf_bin cf_code.f90
```

## Native Compiler Commands
We recommend using the module wrapper commands described above. However,
if you prefer to invoke the compilers directly without the `ncarcompilers` wrappers, see this note:

??? note "Native Compiler Commands"
    We recommend using the module wrapper commands described above. However,
    if you prefer to invoke the compilers directly, unload the NCAR default
    compiler wrapper environment by entering this on your command line:
    ```sh
    module unload ncarcompilers
    ```

    You can still use the environment variables that are set by the modules
    that remain loaded, as shown in the following examples of invoking
    compilers directly to compile a Fortran program.


    === "Intel compiler"
        ```sh
        ifort -o a.out $NCAR_INC_<PACKAGE> program_name.f $NCAR_LDFLAGS_<PACKAGE> -l<package_library>
        ```
    === "NVIDIA HPC compiler"
        ```sh
        nvfortran -o a.out $NCAR_INC_<PACKAGE> program_name.f $NCAR_LDFLAGS_<PACKAGE> -l<package_library>
        ```
    === "GNU compiler collection (GCC)"
        ```sh
        gfortran -o a.out $NCAR_INC_<PACKAGE> program_name.f $NCAR_LDFLAGS_<PACKAGE> -l<package_library>
        ```
    === "Cray Compilers (CPE)"
        ```sh
        ftn -o a.out $NCAR_INC_<PACKAGE> program_name.f $NCAR_LDFLAGS_<PACKAGE> -l<package_library>
        ```

## Multiple Compiler Versions and User Applications
In addition to multiple compilers, CISL keeps available multiple
versions of libraries to accommodate a wide range of users' needs.
Rather than rely on the environment variable `LD_LIBRARY_PATH` to find the
correct libraries dynamically, we encode library paths within the
binaries when you build Executable and Linkable Format (ELF)
executables. To do this, we use `RPATH` rather than `LD_LIBRARY_PATH` to set
the necessary paths to shared libraries.

This enables your executable to work regardless of updates to new
default versions of the various libraries; it doesn't have to search
dynamically at run time to load them. It also means you don't need to
worry about setting the variable or loading another module, greatly
reducing the likelihood of runtime errors.


---

## Common Compiler Options and Diagnostic Flags

Portability and correctness both are important goals when developing
code. Non-standard code may not be portable, and its execution may be
unpredictable.

Using diagnostic options when you compile your code can help you find
potential problems. Since the compiler is going to analyze your code
anyway, it pays to take advantage of the diagnostic options to learn as
much as you can from the analysis. Please note that some compilers
disable the default optimization when you switch on certain debugging
flags.

Because of differences in compilers, it also is good practice to compile
your code with each compiler that is available on the system, note any
diagnostic messages you get, and revise your code accordingly.

The following options can be helpful as you compile code to run in the
HPC environment that CISL manages.

| Compiler | Flag | Effect |
|------|--------|--------|
| **Cray**<br>[Cray C/C++ debug options](https://support.hpe.com/hpesc/public/docDisplay?docLocale=en_US&docId=a00115116en_us&page=Debug_Options.html) {: rowspan=5} | `-G0` | provide complete debugging information with optimizations disabled (i.e.`-O0`,`-O ipa0`,`-O scale0`,`-O vector0`).<br>Breakpoints can be set at different sections of the code for easier debugging. |
| `-G01` | generate debugging report with partial optimization. |
| `-G02` | generate debugging report with full optimization. |
| `-g`   | generate debugging report (equivalent to`-G0`). |
| `-h bounds`|  Enables checking of array bounds, pointer and array references at runtime. |
| **Intel**<br>[Intel C++ diagnostic options](https://software.intel.com/en-us/cpp-compiler-developer-guide-and-reference-compiler-diagnostic-options) {: rowspan=6} | `-debug all` | provides complete debugging information. |
| `-g`         | places symbolic debugging information in the executable program. |
| `-check all` | performs all runtime checks (includes bounds checking). |
| `-warn all`  | enables all warnings. |
| `-stand f08` | warns of usage that does not conform to the Fortran 2008 standard. |
| `-traceback` | enables stack trace if the program crashes. |
| **GCC**<br>[GCC diagnostic warning ptions](http://gcc.gnu.org/onlinedocs/gcc-3.4.4/gcc/Warning-Options.html) {: rowspan=4} | `-ggdb` | places symbolic debugging information in the executable program for use by GDB. |
| `-fcheck=all` | performs all runtime checks (includes bounds checking). |
| `-Wall`       | enables all warnings. |
| `-std=f2008`  | warns of usage that does not conform to the Fortran 2008 standard. |
| **NVIDIA HPC SDK**<br>[NVIDIA HPC SDK documentation](https://docs.nvidia.com/hpc-sdk/compilers/hpc-compilers-user-guide/#freq-used-options). {: rowspan=5} | `-g` | Include symbolic debugging information in the object modules with optimization disabled (`-O0`). |
| `-gopt`            | Include symbolic debugging information in the object modules without affecting any optimizations. |
| `-C` or<br> `-Mbounds` | Add array bounds checking. |
| `-Mchkptr`         | Check for unintended de-referencing of NULL pointers. |
| `-Minform=inform`  | Display all the error messages of any severity (inform, warn, severe and fatal) during compilation phase. |
