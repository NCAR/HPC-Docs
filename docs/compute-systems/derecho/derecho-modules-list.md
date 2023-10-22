<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "./utils/update_module_list.sh derecho" -->
```pre

-------------------------- Module Stack Environments ---------------------------
   ncarenv/23.06 (S,L,D)    ncarenv/23.09 (S)

------------------------- Compilers and Core Software --------------------------
   apptainer/1.1.7            intel-classic/2023.0.0
   arm-forge/22.1.3           intel-oneapi/2023.0.0
   atp/3.14.18                intel/2023.0.0         (L)
   atp/3.15.0          (D)    linaro-forge/23.0
   cce/15.0.1                 matlab/R2023a
   cdo/2.1.1                  nccmp/1.9.0.1
   charliecloud/0.32          ncl/6.6.2
   cmake/3.26.3               nco/5.1.4
   conda/latest               ncview/2.1.8
   cray-ccdb/4.12.13          ncvis/2022.08.28
   cray-dyninst/12.1.1        nvhpc/21.3
   cray-mrnet/5.0.4           nvhpc/23.1             (D)
   cray-stat/4.11.13          nvhpc/23.5
   craype/2.7.20       (L)    papi/7.0.0.1
   cuda/11.7.1                pcre/8.45
   cudnn/8.5.0.96-11.7        peak-memusage/3.0.1
   cutensor/1.7.0.1           perftools-base/23.03.0
   darshan-util/3.4.2         perl/5.36.0
   gcc/12.2.0                 podman/4.3.1
   gdb4hpc/4.14.7             sanitizers4hpc/1.0.4
   go/1.20.3                  texlive/20220321
   grads/2.2.1                valgrind4hpc/2.12.11
   idl/8.9.0                  vtune/2023.0.0

-------------------- Compiler-dependent Software - [oneapi] --------------------
   cray-libsci/23.02.1.1        intel-mpi/2021.8.0
   cray-mpich/8.1.25     (L)    mkl/2023.0.0
   eccodes/2.25.0               mpi-serial/2.3.0
   fftw/3.3.10                  ncarcompilers/1.0.0 (L)
   geos/3.9.1                   netcdf/4.9.2        (L)
   hdf/4.2.15                   proj/8.2.1
   hdf5/1.12.2           (L)    udunits/2.2.28

---------------- MPI-dependent Software - [oneapi + cray-mpich] ----------------
   darshan-runtime/3.4.2        hdf5-mpi/1.12.2           parallelio/2.6.0
   esmf/8.4.2                   netcdf-mpi/4.9.2          parallelio/2.6.1
   esmf/8.5.0            (D)    parallel-netcdf/1.12.3    parallelio/2.6.2 (D)
   fftw-mpi/3.3.10              parallelio/1.10.1
   gptl/8.1.1                   parallelio/2.5.10

  Where:
   D:  Default Module
   L:  Module is loaded
   S:  Module is Sticky, requires --force to unload or purge

If the avail list is too long consider trying:

"module --default avail" or "ml -d av" to just list the default modules.
"module overview" or "ml ov" to display the number of modules for each name.

Use "module spider" to find all possible modules and extensions.
Use "module keyword key1 key2 ..." to search for all possible modules matching
any of the "keys".
```
