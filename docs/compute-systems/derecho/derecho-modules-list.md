<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "./utils/update_module_list.sh derecho" -->

## Derecho default module list
<!-- --8<-- [start:default] -->
```pre

-------------------------- Module Stack Environments ---------------------------
   ncarenv/23.06 (S)    ncarenv/23.09 (S,L,D)

------------------------- Compilers and Core Software --------------------------
   apptainer/1.1.9              intel-classic/2023.2.1
   atp/3.14.18                  intel-oneapi-inspector/2024.0.0
   atp/3.15.1          (D)      intel-oneapi/2023.2.1           (D)
   cce/16.0.1                   intel-oneapi/2024.0.2
   cdo/2.2.2                    intel/2023.2.1                  (L,D)
   cdo/2.3.0           (D)      intel/2024.0.2
   charliecloud/0.33            julia/1.9.2
   cmake/3.26.3                 linaro-forge/23.0
   conda/latest                 linaro-forge/23.1               (D)
   cray-ccdb/4.12.13            matlab/R2023a
   cray-ccdb/5.0.1     (D)      nccmp/1.9.1.0
   cray-dyninst/12.1.1          ncl/6.6.2
   cray-dyninst/12.3.0 (D)      nco/5.1.6
   cray-mrnet/5.0.4             nco/5.1.9                       (D)
   cray-mrnet/5.1.1    (D)      ncview/2.1.9
   cray-stat/4.11.13            ncvis/2022.08.28
   cray-stat/4.12.1    (D)      nvhpc/23.7                      (D)
   craype/2.7.20                nvhpc/24.1
   craype/2.7.23       (L,D)    papi/7.0.0.1
   cuda/11.7.1                  papi/7.0.1.1                    (D)
   cuda/11.8.0                  pcre/8.45
   cuda/12.2.1         (D)      peak-memusage/3.0.1
   cudnn/8.5.0.96-11.7 (D)      perftools-base/23.03.0
   cudnn/8.7.0.84-11.8          perftools-base/23.09.0          (D)
   darshan-util/3.4.2           perl/5.38.0
   darshan-util/3.4.4  (D)      podman/4.5.1
   ecflow/5.8.3                 rstudio/2023.09.0
   gcc/12.2.0                   sanitizers4hpc/1.0.4
   gcc/13.2.0          (D)      sanitizers4hpc/1.1.1            (D)
   gdb4hpc/4.14.7               texlive/20220321
   gdb4hpc/4.15.1      (D)      valgrind4hpc/2.12.11
   go/1.20.6                    valgrind4hpc/2.13.1             (D)
   grads/2.2.3                  vtune/2023.2.0
   grib-util/1.2.4              wgrib2/3.1.1
   idl/8.9.0

-------------------- Compiler-dependent Software - [oneapi] --------------------
   cray-libsci/23.02.1.1          hdf5/1.12.2         (L)
   cray-libsci/23.09.1.1 (D)      mkl/2023.2.0
   cray-mpich/8.1.25              mpi-serial/2.3.0
   cray-mpich/8.1.27     (L,D)    mpi-serial/2.5.0    (D)
   eccodes/2.25.0                 ncarcompilers/1.0.0 (L)
   fftw/3.3.10                    netcdf/4.9.2        (L)
   gcc-toolchain/12.2.0           proj/8.2.1
   gcc-toolchain/13.2.0  (D)      superlu/5.3.0
   geos/3.9.1                     udunits/2.2.28
   hdf/4.2.15

---------------- MPI-dependent Software - [oneapi + cray-mpich] ----------------
   darshan-runtime/3.4.2        netcdf-mpi/4.9.2
   esmf/8.5.0                   osu-micro-benchmarks/7.2
   esmf/8.6.0            (D)    parallel-netcdf/1.12.3
   fftw-mpi/3.3.10              parallelio/1.10.1
   gptl/8.1.1                   parallelio/2.6.2         (D)
   hdf5-mpi/1.12.2              superlu-dist/8.1.2

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
<!-- --8<-- [end:default] -->

## Derecho complete module listing
<!-- --8<-- [start:complete] -->
```pre
----------------------------------------------------------------------------
The following is a list of the modules and extensions currently available:
----------------------------------------------------------------------------
  apptainer: apptainer/1.1.7, apptainer/1.1.9
  arm-forge: arm-forge/22.1.3
  atp: atp/3.14.18, atp/3.15.0, atp/3.15.1
  cce: cce/15.0.1, cce/16.0.1
  cdo: cdo/2.1.1, cdo/2.2.2, cdo/2.3.0
  charliecloud: charliecloud/0.32, charliecloud/0.33
  cmake: cmake/3.26.3
  conda: conda/latest
  cp2k: cp2k/2023.2
  cray-ccdb: cray-ccdb/4.12.13, cray-ccdb/5.0.1
  cray-dyninst: cray-dyninst/12.1.1, cray-dyninst/12.3.0
  cray-libsci: cray-libsci/23.02.1.1, cray-libsci/23.09.1.1
  cray-mpich: cray-mpich/8.1.25, cray-mpich/8.1.27
  cray-mrnet: cray-mrnet/5.0.4, cray-mrnet/5.1.1
  cray-stat: cray-stat/4.11.13, cray-stat/4.12.1
  craype: craype/2.7.20, craype/2.7.23
  cuda: cuda/11.7.1, cuda/11.8.0, cuda/12.2.1
  cudnn: cudnn/8.5.0.96-11.7, cudnn/8.7.0.84-11.8
  cutensor: cutensor/1.7.0.1
  darshan-runtime: darshan-runtime/3.4.2, darshan-runtime/3.4.4
  darshan-util: darshan-util/3.4.2, darshan-util/3.4.4
  eccodes: eccodes/2.25.0, eccodes/2.32.0
  ecflow: ecflow/5.8.3
  esmf: esmf/8.4.2, esmf/8.5.0, esmf/8.6.0
  fftw: fftw/3.3.10
  fftw-mpi: fftw-mpi/3.3.10
  gcc: gcc/12.2.0, gcc/13.2.0
  gcc-toolchain: gcc-toolchain/12.2.0, gcc-toolchain/13.2.0
  gdal: gdal/3.6.4, gdal/3.7.1, gdal/3.8.1
  gdb4hpc: gdb4hpc/4.14.7, gdb4hpc/4.15.1
  geos: geos/3.9.1, geos/3.12.1
  gmt: gmt/6.4.0, gmt/6.5.0
  go: go/1.20.3, go/1.20.6
  gptl: gptl/8.1.1
  grads: grads/2.2.1, grads/2.2.3
  grib-util: grib-util/1.2.4
  hdf: hdf/4.2.15
  hdf5: hdf5/1.12.2, hdf5/1.14.3
  hdf5-mpi: hdf5-mpi/1.12.2, hdf5-mpi/1.14.3
  idl: idl/8.9.0
  intel: intel/2023.0.0, intel/2023.2.1, intel/2024.0.2
  intel-classic: intel-classic/2023.0.0, intel-classic/2023.2.1
  intel-mpi: intel-mpi/2021.8.0
  intel-oneapi: intel-oneapi/2023.0.0, intel-oneapi/2023.2.1, ...
  intel-oneapi-inspector: intel-oneapi-inspector/2024.0.0
  ioapi: ioapi/3.2
  julia: julia/1.9.2
  libemos: libemos/4.5.1
  linaro-forge: linaro-forge/23.0, linaro-forge/23.1
  matlab: matlab/R2023a
  mkl: mkl/2023.0.0, mkl/2023.2.0, mkl/2024.0.0
  mpi-serial: mpi-serial/2.3.0, mpi-serial/2.5.0
  mpifileutils: mpifileutils/0.11.1
  ncarcompilers: ncarcompilers/1.0.0
  ncarenv: ncarenv/23.06, ncarenv/23.09
  nccmp: nccmp/1.9.0.1, nccmp/1.9.1.0
  ncl: ncl/6.6.2
  nco: nco/5.1.4, nco/5.1.6, nco/5.1.9
  ncview: ncview/2.1.8, ncview/2.1.9
  ncvis: ncvis/2022.08.28
  netcdf: netcdf/4.9.2
  netcdf-mpi: netcdf-mpi/4.9.2
  nvhpc: nvhpc/21.3, nvhpc/23.1, nvhpc/23.5, nvhpc/23.7, nvhpc/24.1
  openblas: openblas/0.3.23, openblas/0.3.25
  opencoarrays: opencoarrays/2.10.1
  openmpi: openmpi/main
  osu-micro-benchmarks: osu-micro-benchmarks/7.1-1, ...
  papi: papi/7.0.0.1, papi/7.0.1.1
  parallel-netcdf: parallel-netcdf/1.12.3
  parallelio: parallelio/1.10.1, parallelio/2.5.10, parallelio/2.6.0, ...
  pcre: pcre/8.45
  peak-memusage: peak-memusage/3.0.1
  perftools: perftools
  perftools-base: perftools-base/23.03.0, perftools-base/23.09.0
  perftools-lite: perftools-lite
  perftools-lite-events: perftools-lite-events
  perftools-lite-gpu: perftools-lite-gpu
  perftools-lite-hbm: perftools-lite-hbm
  perftools-lite-loops: perftools-lite-loops
  perftools-preload: perftools-preload
  perl: perl/5.36.0, perl/5.38.0
  podman: podman/4.3.1, podman/4.5.1
  proj: proj/8.2.1, proj/9.2.1
  rstudio: rstudio/2023.09.0
  sanitizers4hpc: sanitizers4hpc/1.0.4, sanitizers4hpc/1.1.1
  superlu: superlu/5.3.0
  superlu-dist: superlu-dist/8.1.2, superlu-dist/8.2.1
  texlive: texlive/20220321
  udunits: udunits/2.2.28
  valgrind4hpc: valgrind4hpc/2.12.11, valgrind4hpc/2.13.1
  vtune: vtune/2023.0.0, vtune/2023.2.0
  wgrib2: wgrib2/3.1.1
----------------------------------------------------------------------------
To learn more about a package execute:
   $ module spider Foo
where "Foo" is the name of a module.
To find detailed information about a particular package you
must specify the version if there is more than one version:
   $ module spider Foo/11.1
----------------------------------------------------------------------------
```
<!-- --8<-- [end:complete] -->
