# How to compile and conduct a basic WRF-Chem on Derecho 

!!! info "About this page"
    This documentation provides information on how to download and compile WRF-Chem on NSF NCAR Derecho.
    Also, an example of a PBS script is provided to help new users get an idea of how to submit batch jobs efficiently on the system, including setting resource requests, loading modules, and launching the WRF executable.
---

## Obtaining WRF and code 
You can download WRF source codes from the [WRF webpage](https://www.mmm.ucar.edu/models/wrf/). 
Please refer to the [download instructions](https://www2.mmm.ucar.edu/wrf/users/download/get_source.html) for more information.
If you want to compile WRF-Chem, continue with the following steps. Otherwise, follow the instructions in the NCAR HPC Documentation for [compiling atmospheric WRF and WPS on Derecho](https://ncar-hpc-docs.readthedocs.io/en/latest/tutorials/wrf_on_derecho/).
It is recommended that you clone the latest public release branch directly from the official WRF repository [wrf-model GitHub repository](https://github.com/wrf-model/WRF). If you want to contribute new innovations to the WRF code, please consult ([WRF support](https://www.mmm.ucar.edu/models/wrf/support)) for more information about the process and requirements.

Before downloading the codes, review the default [quotas and purging policies](https://ncar-hpc-docs.readthedocs.io/en/latest/storage-systems/glade/) of different GLADE file spaces. This will help you determine the most appropriate location to store the source codes. 

To clone the latest public release version (currently v4.7.1), use the following command:

```bash
git clone --recurse-submodule --branch v4.7.1 https://github.com/wrf-model/WRF.git
```
This will create a local copy of the repository that you can edit and manage using Git.

Please refer to the instructions to [compile WPS on Derecho](https://ncar-hpc-docs.readthedocs.io/en/latest/tutorials/wrf_on_derecho/#compiling-the-wrf-preprocessing-system-wps), if you prefer to do so.

To compile WRF using the INTEL (ifx/icx) LLVM compiler (recommended), it is advised to compile within an [interactive job queue](https://ncar-hpc-docs.readthedocs.io/en/latest/pbs/?h=interactive#qinteractive) to avoid issues with required memory during compilation. To accomplish that use the following command on Derecho:
```bash
qinteractive -A <project_code> -l walltime=01:30:00
```
Once you are in the interactive queue, you'll need to load the required libraries and environmental variables to compile WRF.

On Derecho, this is done by loading pre-loaded modules. Please refer to [Modules](https://ncar-hpc-docs.readthedocs.io/en/latest/environment-and-software/user-environment/modules/) for more information. The modules and environment variables are needed regardless of using the Cmake build or by traditional method. 

```bash
module --force purge
module load ncarenv/24.12
module reset
module load cmake
module load parallel-netcdf
module load udunits
module list
```
The final command, module list, will display all currently loaded modules in your environment. A typical setup may look like:
```
Currently Loaded Modules:
  1) ncarenv/24.12  (S)   4) ncarcompilers/1.0.0   7) hdf5/1.12.3   10) parallel-netcdf/1.14.0
  2) craype/2.7.31        5) libfabric/1.15.2.0    8) netcdf/4.9.2  11) udunits/2.2.28
  3) intel/2024.2.1       6) cray-mpich/8.1.29     9) cmake/3.26.6

  Where:
   S:  Module is Sticky, requires --force to unload or purge
```
Next, set up environment for WRF Chem:
```bash
export WRFIO_NCD_LARGE_FILE_SUPPORT=1
export WRF_EM_CORE=1
export WRF_CHEM=1
export WRF_KPP=1
export YACC='/usr/bin/yacc -d'
export FLEX_LIB_DIR=/usr/lib64
```
## Configuring the Build
Once the environment is set up, you can configure the code for compilation. The CMake-based compilation option provided with recent versions of WRF simplifies and standardizes the build process.
## Configuring WRF with CMake
Once your environment is set up and the WRF code is downloaded and extracted, navigate into the WRF source directory and initiate the configuration process using the CMake-based configuration script:
```
cd WRF
./configure_new
```
You will be prompted to select a compiler configuration. For this setup, select option 1 to compile WRF using the Intel oneAPI LLVM compilers (ifx/icx):
```
Using default build directory : _build
Using default install directory : /glade/derecho/scratch/biswas/CSG/WRF4.7.1/install
0   Linux         gfortran    /    gcc         /    mpif90      /    mpicc      GNU (gfortran/gcc)
1   Linux         ifx         /    icx         /    mpif90      /    mpicc      INTEL (ifx/icx) : oneAPI LLVM
!! - Compiler not found, some configurations will not work and will be hidden
Select configuration [0-1] Default [0] (note !!)  : 1
```
Next, you will be prompted to choose options for various build components, such as WRF core type, nesting capability, case type, and MPI support. For most research applications, the default or commonly selected options are sufficient. The default values are shown. You can press Enter/Return to select the default options. 
```
Select option for WRF_CORE from WRF_CORE_OPTIONS [0-4] 
	0 : ARW
	1 : CONVERT
	2 : DA
	3 : DA_4D_VAR
	4 : PLUS 
Default [0] : 0
```
```
Select option for WRF_NESTING from WRF_NESTING_OPTIONS [0-3] 
	0 : NONE
	1 : BASIC
	2 : MOVES
	3 : VORTEX 
Default [1] : 1
```
```
Select option for WRF_CASE from WRF_CASE_OPTIONS [0-14] 
	0 : EM_REAL
	1 : EM_FIRE
	...
	...
	14 : NONE 
Default [0] : 0
```
```
[DM] Use MPI?    Default [Y] [Y/n] : Y
[SM] Use OpenMP? Default [N] [y/N] : N
Configure additional options? Default [N] [y/N] : N
```
You will notice several checks done by the script. If successful, you will notice a new directory: _build.
Next step is to compile the code using:

```
./compile_new |& tee compile.log
```
Upon successful compilation, the executables wrf, real, ndown, and tc will be generated and located in the _build/main/ directory. Compilation progress and details are recorded in the compile.log file. If the compilation fails, refer to compile.log for diagnostic messages and error information to assist with troubleshooting.

## Compiling WRF-Chem with traditional method on Derecho

This section outlines how to compile WRF using the traditional method on Derecho. 
Load the modules and environment variables shown above. In addition, you need to make a [code change](https://forum.mmm.ucar.edu/threads/unable-to-compile-wrf-chem-v4-7-1.22663/) to successfully compile WRF-Chem on Derecho.

Edit line 121 in WRF/chem/KPP/compile_wkc, from:
```bash
$WKC_HOME/util/wkc/tuv_kpp FIRST ../../inc/
```
to:
```bash
$WKC_HOME/util/wkc/tuv_kpp FIRST ../../../../inc/
```
Navigate to the WRF source directory and start the configuration process:
```bash
cd WRF
```
```bash
./configure
```
The ./configure script will detect your system architecture and loaded environment settings, including available libraries like NetCDF.

You will then be prompted to choose a compilation option. For INTEL INTEL (ifx/icx) : oneAPI LLVM:
```
78. (dmpar) INTEL (ifx/icx) : oneAPI LLVM 
```
Refer to [WRF Users Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/index.html) for more info.
Next, select the desired nesting option. For most applications, "basic nesting" (option 1) is sufficient:
```bash
Enter selection [1-83] : 78
------------------------------------------------------------------------
Compile for nesting? (1=basic, 2=preset moves, 3=vortex following) [default 1]: 1

Configuration successful! 
```
Upon successful execution of the ./configure command, a configure.wrf file is generated. This file includes compilation settings and rules tailored to Derecho. Advanced users may edit this file to modify specific compile options if needed.

To compile WRF, use the ./compile command with the desired case option. In this tutorial, we compile the em_real case (Eulerian Mass grid for real-data simulations), which is the most commonly used option:

```bash
./compile em_real >compile.log 2>&1 &
```
Note: It is strongly recommended to redirect the output of the compile process to a log file (e.g., compile.log) for easier debugging in case of errors. The redirection syntax may differ based on the shell used; the example above is for bash.

After the compilation is finished, if successful, you will see the following lines at the end of the compile.log file.  
```bash
==========================================================================
build started:   Thu 25 Sep 2025 03:01:56 PM MDT
build completed: Thu 25 Sep 2025 03:03:58 PM MDT

--->                  Executables successfully built                  <---

-rwxr-xr-x 1 biswas ncar 74743192 Sep 25 15:03 main/ndown.exe
-rwxr-xr-x 1 biswas ncar 74729408 Sep 25 15:03 main/real.exe
-rwxr-xr-x 1 biswas ncar 67258744 Sep 25 15:03 main/tc.exe
-rwxr-xr-x 1 biswas ncar 90615128 Sep 25 15:03 main/wrf.exe

==========================================================================
```
If the build finishes successfully, a message will be printed, and the four executables (ndown.exe, real.exe, tc.exe, wrf.exe) will be present in the WRF/main directory.
Type the command
```bash
ls main/*.exe
```
If the compilations fail, follow the [WRF Users Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/compiling.html) for directions to debug. 

## Submitting jobs
WPS jobs can be run in an interactive mode. However, WRF jobs are more memory-intensive and should be submitted using a PBS batch script. 
To know more about PBS batch jobs, please refer to the [PBS batch jobs scripts](https://ncar-hpc-docs.readthedocs.io/en/latest/compute-systems/derecho/starting-derecho-jobs/derecho-job-script-examples/).

Below is a sample job to run WRF using 1 node and utilizing 128 processors. 
```bash
#!/bin/bash -l
#PBS -N wrf_run
#PBS -A XXXXXXXX
#PBS -q main
#PBS -l walltime=1:00:00
#PBS -m abe
#PBS -j oe
#PBS -l select=1:ncpus=128:mpiprocs=128

# Load modules to match compile-time environment
module --force purge
module load ncarenv/24.12
module reset

# cray-mpich mpiexec option
mpiexec -n 128 -ppn 128 ./wrf.exe
```
To submit a batch job, use the `qsub` command followed by the name of your PBS batch script file.
```bash
qsub script_name
```
To know more about starting and managing jobs, please refer to the [documentation](https://ncar-hpc-docs.readthedocs.io/en/latest/pbs/).

## Running Long Simulations with Restart Capability
For simulations that exceed the [wall-clock time limits of Derecho](https://ncar-hpc-docs.readthedocs.io/en/latest/pbs/charging/) or for operational workflows that require regular checkpoints, WRF supports restart capability, allowing you to break up long simulations into multiple shorter runs without losing progress.

Please refer to the Restart documentation to know how to set it up:
- [WRF Users Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/running_wrf.html#restart-capability)
- [WRF Online tutorial](https://www2.mmm.ucar.edu/wrf/OnLineTutorial/CASES/Restart/index.php).

## Debugging a Failed WRF Run
For detailed instructions and troubleshooting tips, refer to the [WRF Forum Post](https://forum.mmm.ucar.edu/threads/how-to-debug-the-code-to-find-where-the-model-is-stopping.316/) and [WRF compiling](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/compiling.html) on Debugging. These articles includes strategies for locating and understanding runtime errors.

By default, traceback support is disabled in the configure.wrf file. To enable it, run:

- ./configure -D: Enables bounds checking, additional exception handling, and debugging features while disabling compiler optimizations. This option is supported only for the PGI, Intel, and GNU (gfortran) compilers.  

- ./configure -d: this option disables compiler optimizations, making it easier to trace code behavior when using debuggers like gdb or dbx.

```
Save the file and recompile WRF using the appropriate compile command (e.g., ./compile em_real).

Analyze the Log Files:

- After a failed run, check the rsl.out.* and rsl.error.* files in your run directory. These files contain the output from each processor and often indicate where and why the model stopped.

By enabling traceback and inspecting the relevant logs, you can often pinpoint the issue—whether it's a segmentation fault, array bounds error, or missing input—and proceed with targeted fixes.
