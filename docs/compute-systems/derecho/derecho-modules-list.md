<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "./utils/update_module_list.sh derecho" -->

## Derecho default module list
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

## Derecho complete module listing
```pre
----------------------------------------------------------------------------
The following is a list of the modules and extensions currently available:
----------------------------------------------------------------------------
  apptainer: apptainer/1.1.7, apptainer/1.1.9
  arm-forge: arm-forge/22.1.3
  atp: atp/3.14.18, atp/3.15.0
  cce: cce/15.0.1
  cdo: cdo/2.1.1, cdo/2.2.2
  charliecloud: charliecloud/0.32, charliecloud/0.33
  cmake: cmake/3.26.3
  conda: conda/latest
  cp2k: cp2k/2023.2
  cray-ccdb: cray-ccdb/4.12.13
  cray-dyninst: cray-dyninst/12.1.1
  cray-libsci: cray-libsci/23.02.1.1
  cray-mpich: cray-mpich/8.1.25
  cray-mrnet: cray-mrnet/5.0.4
  cray-stat: cray-stat/4.11.13
  craype: craype/2.7.20
  cuda: cuda/11.7.1, cuda/11.8.0, cuda/12.2.1
  cudnn: cudnn/8.5.0.96-11.7, cudnn/8.7.0.84-11.8
  cutensor: cutensor/1.7.0.1
  darshan-runtime: darshan-runtime/3.4.2
  darshan-util: darshan-util/3.4.2
  eccodes: eccodes/2.25.0
  ecflow: ecflow/5.8.3
  esmf: esmf/8.4.2, esmf/8.5.0
  fftw: fftw/3.3.10
  fftw-mpi: fftw-mpi/3.3.10
  gcc: gcc/12.2.0
  gdal: gdal/3.6.4, gdal/3.7.1
  gdb4hpc: gdb4hpc/4.14.7
  geos: geos/3.9.1
  go: go/1.20.3, go/1.20.6
  gptl: gptl/8.1.1
  grads: grads/2.2.1, grads/2.2.3
  hdf: hdf/4.2.15
  hdf5: hdf5/1.12.2
  hdf5-mpi: hdf5-mpi/1.12.2
  idl: idl/8.9.0
  intel: intel/2023.0.0, intel/2023.2.1
  intel-classic: intel-classic/2023.0.0, intel-classic/2023.2.1
  intel-mpi: intel-mpi/2021.8.0, intel-mpi/2021.10.0
  intel-oneapi: intel-oneapi/2023.0.0, intel-oneapi/2023.2.1
  julia: julia/1.9.2
  linaro-forge: linaro-forge/23.0
  matlab: matlab/R2023a
  mkl: mkl/2023.0.0, mkl/2023.2.0
  mpi-serial: mpi-serial/2.3.0
  mpifileutils: mpifileutils/0.11.1
  mvapich: mvapich/3.0b
  ncarcompilers: ncarcompilers/1.0.0
  ncarenv: ncarenv/23.06, ncarenv/23.09
  nccmp: nccmp/1.9.0.1, nccmp/1.9.1.0
  ncl: ncl/6.6.2
  nco: nco/5.1.4, nco/5.1.6
  ncview: ncview/2.1.8, ncview/2.1.9
  ncvis: ncvis/2022.08.28
  netcdf: netcdf/4.9.2
  netcdf-mpi: netcdf-mpi/4.9.2
  nvhpc: nvhpc/21.3, nvhpc/23.1, nvhpc/23.5, nvhpc/23.7
  osu-micro-benchmarks: osu-micro-benchmarks/7.1-1, ...
  papi: papi/7.0.0.1
  parallel-netcdf: parallel-netcdf/1.12.3
  parallelio: parallelio/1.10.1, parallelio/2.5.10, parallelio/2.6.0, ...
  pcre: pcre/8.45
  peak-memusage: peak-memusage/3.0.1
  perftools: perftools
  perftools-base: perftools-base/23.03.0
  perftools-lite: perftools-lite
  perftools-lite-events: perftools-lite-events
  perftools-lite-gpu: perftools-lite-gpu
  perftools-lite-hbm: perftools-lite-hbm
  perftools-lite-loops: perftools-lite-loops
  perftools-preload: perftools-preload
  perl: perl/5.36.0, perl/5.38.0
  podman: podman/4.3.1, podman/4.5.1
  proj: proj/8.2.1
  rstudio: rstudio/2023.09.0
  sanitizers4hpc: sanitizers4hpc/1.0.4
  superlu: superlu/5.3.0
  superlu-dist: superlu-dist/8.1.2
  texlive: texlive/20220321
  udunits: udunits/2.2.28
  valgrind4hpc: valgrind4hpc/2.12.11
  vtune: vtune/2023.0.0, vtune/2023.2.0
----------------------------------------------------------------------------
To learn more about a package execute:
   $ module spider Foo
where "Foo" is the name of a module.
To find detailed information about a particular package you
must specify the version if there is more than one version:
   $ module spider Foo/11.1
----------------------------------------------------------------------------
```
