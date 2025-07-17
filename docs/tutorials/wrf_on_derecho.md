# How to compile and conduct a basic WRF on Derecho 

!!! info "About this page"
    This documentation provides information on how to download and compile WRF and WPS on NSF NCAR Derecho.
    Also, an example of a PBS script is provided to help new users get an idea of how to submit batch jobs efficiently on the system, including setting resource requests, loading modules, and launching the WRF executable.
---

## Obtaining WRF and WPS code 
The WRF and WPS codes can be downloaded from 
the [WRF webpage](https://www.mmm.ucar.edu/models/wrf/). 
Please refer to the ([download instructions](https://www2.mmm.ucar.edu/wrf/users/download/get_source.html)) for more information.
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

Next, download the WRF Preprocessing System ([WPS code](https://github.com/wrf-model/WPS/releases)). 
Untar and unzip the downloaded file. 
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
The last command will show the packages currently loaded in your environment.
```
Currently Loaded Modules:
  1) ncarenv/24.12 (S)   3) intel/2024.2.1        5) libfabric/1.15.2.0   7) hdf5/1.12.3    9) cmake/3.26.6
  2) craype/2.7.31       4) ncarcompilers/1.0.0   6) cray-mpich/8.1.29    8) netcdf/4.9.2

  Where:
   S:  Module is Sticky, requires --force to unload or purge
```
There are several options to configure the code. It is recommended to use the WRF CMake option to configure and compile the code. 
```
cd WRF
./configure_new
```
Here option 1 is choosen to compile with ifx compiler:
```
Using default build directory : _build
Using default install directory : /glade/derecho/scratch/biswas/CSG/WRF4.7.1/install
0   Linux         gfortran    /    gcc         /    mpif90      /    mpicc      GNU (gfortran/gcc)
1   Linux         ifx         /    icx         /    mpif90      /    mpicc      INTEL (ifx/icx) : oneAPI LLVM
!! - Compiler not found, some configurations will not work and will be hidden
Select configuration [0-1] Default [0] (note !!)  : 1
```
Next, you will be prompted to select options for WRF_CORE, WRF_NESTING, WRF_CASE, MPI, and other relevant settings. For the purpose of this tutorial, commonly used configuration options preferred by researchers have been selected to guide you through a typical setup. 
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
	2 : EM_SCM_XY
	3 : EM_TROPICAL_CYCLONE
	4 : EM_HELDSUAREZ
	5 : EM_B_WAVE
	6 : EM_GRAV2D_X
	7 : EM_HILL2D_X
	8 : EM_LES
	9 : EM_QUARTER_SS
	10 : EM_SEABREEZE2D_X
	11 : EM_CONVRAD
	12 : EM_SQUALL2D_X
	13 : EM_SQUALL2D_Y
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
```
Compilation with INTEL (ftn/icc): Cray XC
We will load the necessary modules for compilation.

```bash
module --force purge
module load ncarenv/23.06
module reset
module list
```
The last command will show the packages currently loaded in your environment.
```bash
Currently Loaded Modules:
  1) ncarenv/23.06 (S)   2) craype/2.7.20   3) intel/2023.0.0   4) ncarcompilers/1.0.0   5) cray-mpich/8.1.25   6) hdf5/1.12.2   7) netcdf/4.9.2

  Where:
   S:  Module is Sticky, requires --force to unload or purge
```
Once modules are loaded, follow the steps to configure and compile the code.
```bash
cd WRF
```
```bash
./configure
```
The ./configure command automatically detects the system architecture and environment settings, such as the availability of required libraries like NETCDF. In this example, the code is compiled using the Intel compiler suite, as specified in the currently loaded modules.
Refer to [WRF Users Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/index.html) for more info.
We opted for: (dmpar) INTEL (ftn/icc): Cray XC (50) and then basic nesting (1). 
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
Upon successful execution of the ./configure command, a configure.wrf file is generated. This file includes compilation settings and rules tailored to your system environment (e.g., Derecho). Advanced users may edit this file to modify specific compile options if needed.

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
If the build finishes successfully, a message will be printed, and the four executables (ndown.exe, real.exe, tc.exe, wrf.exe) will be present in the main directory.
Type the command
```bash
ls -ls main/*.exe
```
If the compilations fail, follow the [WRF Users Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/compiling.html) for directions to debug. 

The next step is to compile the WPS code.

```bash

cd ../WPS-4.6.0
```
A good practice is to set the WRF_DIR environment variable pointing to the WRF installation. 

```bash
export WRF_DIR=../WRF
```
In the WPS, JASPERINC and JASPERLIB refer to the JasPer library, which is used for reading and writing GRIB2 files — a common format for meteorological data.

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
The next step is to compile the WPS code. 

```bash
./compile >compile.log 2>&1 &
```
If the build finishes successfully, the three executables (ungrib.exe, geogrid.exe, metgrid.exe) will be present in the WPS-4.6.0 directory.
```bash
ls *exe
geogrid.exe  metgrid.exe  ungrib.exe
```

## Submitting jobs
WPS jobs can be run in an interactive mode. However, WRF jobs are more memory-intensive and should be submitted using a PBS batch script. 

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
