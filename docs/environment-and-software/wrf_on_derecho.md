# How to compile and conduct a basic WRF on Derecho 

!!! info "About this page"
    This documentation provides information on how to download and compile WRF and WPS on NSF NCAR Derecho.
    Also, an example of a PBS script is provided to help new users get an idea of how to submit batch jobs efficiently on the system, including setting resource requests, loading modules, and launching the WRF executable.
---

## Obtaining WRF and WPS code 
The WRF and WPS codes can be downloaded from 
the [WRF webpage](https://www.mmm.ucar.edu/models/wrf/). 
Please refer to the [download instructions](https://www2.mmm.ucar.edu/wrf/users/download/get_source.html) for more information.
If you do not plan to modify the WRF and WPS code, you can use (latest version recommended) the pre-compiled versions of the code available on Derecho at:
```
/glade/work/wrfhelp/derecho_pre_compiled_code
```
Copy the version you want to run to your working directory:
```
cp -r /glade/work/wrfhelp/derecho_pre_compiled_code/wrfv4.7.1 WRF
cp -r /glade/work/wrfhelp/derecho_pre_compiled_code/wpsv4.6.0_jb WPS
```
If you intend to modify the WRF code and contribute changes back to the official repository, it is recommended that you clone the latest development branch directly from the official WRF repository [wrf-model GitHub repository](https://github.com/wrf-model/WRF). Please consult ([WRF support](https://www.mmm.ucar.edu/models/wrf/support)) for more information about the process and requirements.

To clone the latest version (currently v4.7.1), use the following command:

```bash
git clone --recurse-submodule --branch v4.7.1 https://github.com/wrf-model/WRF.git
```
This will create a local copy of the repository that you can edit and manage using Git.

After downloading the WRF model, the next step is to download and extract the WRF Preprocessing System ([WPS](https://github.com/wrf-model/WPS/releases)).

Use the following command to extract the downloaded archive:

```bash
tar -xvf WPS-4.6.0.tar.gz
```
You will get a directory called WPS-4.6.0.

Next, the needed libraries are loaded to compile WRF and WPS.

On Derecho, this is done by loading pre-loaded modules. Please refer to [Modules](https://ncar-hpc-docs.readthedocs.io/en/latest/environment-and-software/user-environment/modules/) for more information.

```bash
module --force purge
module load ncarenv/24.12
module reset
module load cmake
module list
```
The final command, module list, will display all currently loaded modules in your environment. A typical setup may look like:
```
Currently Loaded Modules:
  1) ncarenv/24.12 (S)   3) intel/2024.2.1        5) libfabric/1.15.2.0   7) hdf5/1.12.3    9) cmake/3.26.6
  2) craype/2.7.31       4) ncarcompilers/1.0.0   6) cray-mpich/8.1.29    8) netcdf/4.9.2

  Where:
   S:  Module is Sticky, requires --force to unload or purge
```
## Configuring the Build
Once the environment is set up, you can configure the code for compilation. It is strongly recommended to use the CMake-based configuration option provided with recent versions of WRF, as it simplifies and standardizes the build process.
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
./compile_new >& compile.log
```
Upon successful compilation, the executables wrf, real, ndown, and tc will be generated and located in the _build/main/ directory. Compilation progress and details are recorded in the compile.log file. If the compilation fails, refer to compile.log for diagnostic messages and error information to assist with troubleshooting.

## Compiling WRF with Older Intel Compilers (ftn/icc) on Derecho

This section outlines how to compile WRF using the classic Intel compiler suite (ftn/icc) on Derecho’s Cray XC system. This method is useful if you prefer using Intel's traditional compilers rather than the newer oneAPI LLVM-based compilers.

Start by purging any previously loaded modules and loading the appropriate environment for Intel 2023 compilers:

```bash
module --force purge
module load ncarenv/23.06
module reset
module list
```
The module list command will display all currently loaded modules, which should look similar to the following:
```bash
Currently Loaded Modules:
  1) ncarenv/23.06 (S)   2) craype/2.7.20   3) intel/2023.0.0   4) ncarcompilers/1.0.0   5) cray-mpich/8.1.25   6) hdf5/1.12.2   7) netcdf/4.9.2
```
Navigate to the WRF source directory and start the configuration process:
```bash
cd WRF
```
```bash
./configure
```
The ./configure script will detect your system architecture and loaded environment settings, including available libraries like NetCDF.

You will then be prompted to choose a compilation option. For INTEL (ftn/icc), select:
```
50. (dmpar)  INTEL (ftn/icc): Cray XC
```
Refer to [WRF Users Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/index.html) for more info.
Next, select the desired nesting option. For most applications, "basic nesting" (option 1) is sufficient:
```bash
 48. (serial)  49. (smpar)  50. (dmpar)  51. (dm+sm)   INTEL (ftn/icc): Cray XC
 52. (serial)  53. (smpar)  54. (dmpar)  55. (dm+sm)   PGI (pgf90/pgcc)
 ...
 76. (serial)  77. (smpar)  78. (dmpar)  79. (dm+sm)   INTEL (ifx/icx) : oneAPI LLVM
 80. (serial)  81. (smpar)  82. (dmpar)  83. (dm+sm)   FUJITSU (frtpx/fccpx): FX10/FX100 SPARC64 IXfx/Xlfx

Enter selection [1-83] : 50
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
build started:   Wed 23 Apr 2025 10:04:19 AM MDT
build completed: Wed 23 Apr 2025 10:39:40 AM MDT
--->                  Executables successfully built                  <---
-rwxr-xr-x 1 biswas ncar 51935024 Apr 23 10:39 main/ndown.exe
-rwxr-xr-x 1 biswas ncar 47030584 Apr 23 10:39 main/real.exe
-rwxr-xr-x 1 biswas ncar 45936248 Apr 23 10:39 main/tc.exe
-rwxr-xr-x 1 biswas ncar 59119872 Apr 23 10:38 main/wrf.exe
==========================================================================
```
If the build finishes successfully, a message will be printed, and the four executables (ndown.exe, real.exe, tc.exe, wrf.exe) will be present in the WRF/main directory.
Type the command
```bash
ls main/*.exe
```
If the compilations fail, follow the [WRF Users Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/compiling.html) for directions to debug. 

## Compiling the WRF Preprocessing System (WPS)
Once WRF is successfully compiled, the next step is to compile the WRF Preprocessing System (WPS), which is required to process input data for WRF.

Navigate to the WPS source directory. If you are following the standard folder structure, this can be done with:

```bash

cd ../WPS-4.6.0
```
WPS needs to know where your compiled WRF code resides. Set the WRF_DIR environment variable to point to your WRF installation directory:
```bash
export WRF_DIR=../WRF
```
WPS requires the JasPer library to handle GRIB2 input files (a common format for meteorological datasets). Set the following environment variables to point to the appropriate library and include paths:

```bash
export JASPERINC=/glade/u/home/wrfhelp/UNGRIB_LIBRARIES/include
export JASPERLIB=/glade/u/home/wrfhelp/UNGRIB_LIBRARIES/lib
```
Next, let's configure and compile WPS.

```bash
./configure
```
This will prompt the compiler options available. We opted 21 (Linux x86_64, Intel Classic compilers).

```bash
Will use NETCDF in dir: /glade/u/apps/derecho/23.09/spack/opt/spack/netcdf/4.9.2/oneapi/2023.2.1/yzvj
Using WRF I/O library in WRF build identified by $WRF_DIR: /glade/derecho/scratch/biswas/CSG/WRF
Found Jasper environment variables for GRIB2 support...
  $JASPERLIB = /glade/u/home/wrfhelp/UNGRIB_LIBRARIES/lib
  $JASPERINC = /glade/u/home/wrfhelp/UNGRIB_LIBRARIES/include
------------------------------------------------------------------------
Please select from among the following supported platforms.

   1.  Linux x86_64, gfortran    (serial)
  ...
  20.  Linux x86_64, Intel oneAPI compilers    (dmpar_NO_GRIB2)
  21.  Linux x86_64, Intel Classic compilers    (serial)
  22.  Linux x86_64, Intel Classic compilers    (serial_NO_GRIB2)
  23.  Linux x86_64, Intel Classic compilers    (dmpar)
  24.  Linux x86_64, Intel Classic compilers    (dmpar_NO_GRIB2)
  ...
  44.  Cray XC CLE/Linux x86_64, Intel Classic compilers   (dmpar_NO_GRIB2)

Enter selection [1-44] : 21
------------------------------------------------------------------------
Configuration successful. To build the WPS, type: compile
------------------------------------------------------------------------

```
The next step is to compile the WPS code. 

```bash
./compile >compile.log 2>&1 &
```
If the build finishes successfully, the three executables (ungrib.exe, geogrid.exe, metgrid.exe) will be present in the WPS-4.6.0 directory.
```bash
ls *exe
geogrid.exe  metgrid.exe  ungrib.exe
```
Now, WPS and WRF codes are compiled, and the necessary executables are obtained. Refer to the WRF documentation for next steps. 

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
For detailed instructions and troubleshooting tips, refer to the [WRF Forum Post](https://forum.mmm.ucar.edu/threads/how-to-debug-the-code-to-find-where-the-model-is-stopping.316/) on Debugging. This post includes additional strategies for locating and understanding runtime errors.

If your WRF run fails, it's important to identify the exact point of failure to efficiently resolve the issue.

Enable Debugging with Traceback:

By default, traceback support is disabled in the configure.wrf file. To enable it:

- Open your configure.wrf file in a text editor.

- Locate the line that defines FCDEBUG. It may be commented out.

- Uncomment and modify it to the following:

```bash
FCDEBUG         =        -g $(FCNOOPT) -traceback
```
Save the file and recompile WRF using the appropriate compile command (e.g., ./compile em_real).

Analyze the Log Files:

- After a failed run, check the rsl.out.* and rsl.error.* files in your run directory. These files contain the output from each processor and often indicate where and why the model stopped.

By enabling traceback and inspecting the relevant logs, you can often pinpoint the issue—whether it's a segmentation fault, array bounds error, or missing input—and proceed with targeted fixes.
