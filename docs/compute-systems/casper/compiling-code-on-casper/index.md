# Compiling code on NCAR systems

## Compilers available on Casper
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
      <td rowspan="3"><strong>Intel (Classic/OneAPI)</strong>*</td>
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
    <tr class="odd">
      <td colspan="5">* Intel OneAPI is a cross-platform toolkit that
          supports C, C++, Fortran, and Python programming languages
          and replaces <a href="https://www.intel.com/content/www/us/en/developer/articles/release-notes/intel-parallel-studio-xe-supported-and-unsupported-product-versions.html">Intel
            Parallel Studio</a>. Casper supports both Intel OneAPI and Intel
          Classic Compilers. Intel is planning to retire the Intel Classic
          compilers and is moving toward Intel OneAPI. Intel Classic Compiler
          commands (ifort, icc, and icpc) will be replaced by the Intel OneAPI
          compilers (ifx, icx, and icpx).</td>
    </tr>
  </tbody>
</table>


## Compiler Commands

All supported compilers are available via the `module` utility. After
loading the compiler module you want to use, refer to the table above to identify and run the
appropriate compilation wrapper command.

If your script already includes one of the following generic MPI
commands, there is no need to change it:

- `mpif90`, `mpif77`

- `mpicc`

- `mpiCC`

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
mpif90 -o foo.exe foo.f90 -lnetcdf
```

## Compiling CPU code
<!-- FIXME -->
!!! danger "Optimizing code for multiple types of CPUs"
    Be aware that compiling CPU code on Casper
    can be complicated by the heterogeneous nature of the nodes.
    (Casper nodes contain a mixture of Intel Skylake, Intel
    Cascade Lake, and AMD Milan CPUs.)

    In general users will want to compile binaries that can execute on
    any of the CPU types.  This can be accomplished by manually
    specifying the target CPU architecture:

    === "Intel Compilers"
        `-march=core-avx2`

    === "GCC Compilers"
        `-march=core-avx2`

    === "NVHPC Compilers"
        `-tp=zen3`

    If your application fails to run with an `illegal instruction`
    message, this indicates the compiled binary contains instructions
    incompatible with the current CPU.  Try compiling with flags as
    indicated above, or
    [reach out to consulting](../../../user-support/index.md) for help.

### Using the default Intel compiler collection

The Intel compiler suite is available via the `intel` module, which is loaded by default.
It includes compilers for C, C++, and Fortran codes.


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
module swap gcc intel
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


### Other compilers

These additional compilers are available on Casper.

- NVIDIA’s HPC SDK
- the GNU Compiler Collection (GCC)

## Compiling GPU code

On Casper, GPU applications should be built with either the NVIDIA HPC SDK compilers and libraries, or with two-stage linking. In the
following examples, we demonstrate the use of NVIDIA’s tools. To compile CUDA code to run on the Casper data analysis and
visualization nodes, use the appropriate NVIDIA compiler command:

- `nvc` – NVIDIA C compiler

- `nvcc` – NVIDIA CUDA compiler (Using `nvcc` requires a C compiler to
  be present in the background; `nvc`, `icc`, or `gcc`, for example.)

- `nvfortran` – CUDA Fortran


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
example will request compilation for both V100 and A100
GPUs:
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
you first use `nvcc`, the NVIDIA CUDA compiler, and then your C++
compiler of choice.
```sh
nvcc -c -arch=sm_80 cuda_code.cu
g++ -o cuda_bin -lcuda -lcudart main.cpp cuda_code.o
```
Using the `nvcc` compiler driver with a non-NVIDIA C++ compiler
requires loading a `cuda` environment module in addition to the
compiler of choice.

The compiler handles CUDA code directly, so the compiler you use must
support CUDA. This means you should use `nvfortran`. If your source
code file ends with the `.cuf` extension, nvfortran will enable CUDA
automatically. Otherwise, you can specify the `-Mcuda` flag to the
compiler.
```sh
nvfortran -Mcuda -o cf_bin cf_code.f90
```

The sample below demonstrates how to compile CUDA C code on casper.

??? example "`hello_world.cu` on Casper with CUDA"
    **`hello_world.cu` source file:**

    ```c
    /* hello_world.cu
     * ---------------------------------------------------
     * A Hello World example in CUDA
     * ---------------------------------------------------
     * This is a short program which uses multiple CUDA
     * threads to calculate a "Hello World" message which
     * is then printed to the screen.  It's intended to
     * demonstrate the execution of a CUDA kernel.
     * ---------------------------------------------------
     */
    #define SIZE 12
    #include <stdio.h>
    #include <stdlib.h>
    #include <cuda_runtime.h>

    /* CUDA kernel used to calculate hello world message */
    __global__ void hello_world(char *a, int N);

    int main(int argc, char **argv)
    {
       /* data that will live on host */
       char *data;

       /* data that will live in device memory */
       char *d_data;

       /* allocate and initialize data array */
       data = (char*) malloc(SIZE*sizeof(char));
       data[0]  =  72; data[1]  = 100; data[2]  = 106;
       data[3]  = 105; data[4]  = 107; data[5]  =  27;
       data[6]  =  81; data[7]  = 104; data[8]  = 106;
       data[9]  =  99; data[10] =  90; data[11] =  22;

       /* print data before kernel call */
       printf("Contents of data before kernel call: %s\n", data);

       /* allocate memory on device */
       cudaMalloc(&d_data, SIZE*sizeof(char));

       /* copy memory to device array */
       cudaMemcpy(d_data, data, SIZE, cudaMemcpyHostToDevice);

       /* call kernel */
       hello_world<<<4,3>>>(d_data, SIZE);

       /* copy data back to host */
       cudaMemcpy(data, d_data, SIZE, cudaMemcpyDeviceToHost);

       /* print contents of array */
       printf("Contents of data after kernel call:  %s\n",data);

       /* clean up memory on host and device */
       cudaFree(d_data);
       free(data);
       return(0);
    }

    /* hello_world
     * Each thread increments an element of the input
     * array by its global thread id
     */
    __global__ void hello_world(char *a, int N)
    {
       int i = blockDim.x * blockIdx.x + threadIdx.x;
       if(i < N) a[i] = a[i] + i;
    }
    ```

    **Log into a GPU-Enabled node**

    Log in to either Casper or Derecho and run `qinteractive @casper` with a GPU resource request to start an interactive job on a GPU-accelerated Casper node:

    ```sh
    qinteractive @casper -l gpu_type=gp100 --ngpus=1
    ```

    **Compile `hello_world.cu`**

    === "NVHPC"
        ```pre
        module reset
        module load nvhpc cuda
        nvcc -o hello hello_world.cu
        ```
    === "GCC"
        ```pre
        module reset
        module load gnu cuda
        nvcc -c hello_world.cu
        gcc -o hello hello_world.o
        ```

    **Run the program**

    ```pre
    ./hello
    Contents of data before kernel call: HdjikhjcZ
    Contents of data after kernel call:  Hello World!
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
