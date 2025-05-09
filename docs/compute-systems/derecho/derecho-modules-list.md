<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "./utils/update_module_list.sh derecho" -->

## Derecho default module list
<!-- --8<-- [start:default] -->
```pre

-------------------------- Module Stack Environments --------------------------
   ncarenv/23.06 (S)    ncarenv/23.09 (S)    ncarenv/24.12 (S,L,D)

------------------------- Compilers and Core Software -------------------------
   apptainer/1.3.4                 intel/2025.0.3
   atp/3.15.3                      intel/2025.1.0
   cce/17.0.1                      julia/1.11.2
   cdo/2.4.4                       lcov/2.0
   charliecloud/0.38               libfabric/1.15.2.0     (L,D)
   cmake/3.26.6                    libfabric/1.22.0
   conda/latest                    libfabric/2.1.0
   cray-ccdb/5.0.3                 libtorch/2.2.1
   cray-dyninst/12.3.1             linaro-forge/24.1
   cray-mrnet/5.1.2                madis/4.5
   cray-stat/4.12.2                matlab/R2024b
   craype/2.7.31          (L)      nccmp/1.9.1.0
   cuda/12.3.2                     ncl/6.6.2
   cudnn/8.9.7.29-12      (D)      nco/5.2.4
   cudnn/9.2.0.82-12               nco/5.3.1              (D)
   darshan-util/3.4.6              ncview/2.1.9
   ecflow/5.11.4                   ncvis/2022.08.28
   eigen/3.4.0                     neovim/0.10.0
   gcc/12.4.0                      nvhpc/24.11            (D)
   gdb4hpc/4.16.1                  nvhpc/25.1
   gmt/6.5.0                       papi/7.1.0.1
   go/1.23.3                       pcre/8.45
   grads/2.2.3                     peak-memusage/3.0.1
   grib-util/1.5.0                 perftools-base/24.03.0
   heaptrack/1.3.0                 podman/4.5.1
   idl/9.1.0                       rstudio/2024.12.0
   intel-advisor/2025.0.0          sanitizers4hpc/1.1.2
   intel-oneapi/2024.2.1           texlive/20240312
   intel-vtune/2025.0.1            valgrind4hpc/2.13.2
   intel/2024.2.1         (L,D)    wgrib2/3.1.1

------------------- Compiler-dependent Software - [oneapi] --------------------
   cray-libsci/24.03.0        hdf5/1.12.3         (L)      netcdf/4.9.3
   cray-mpich/8.1.29   (L)    kokkos/4.2.01                openmpi/5.0.7
   eccodes/2.34.0             mkl/2024.2.2                 proj/9.4.1
   fftw/3.3.10                mpi-serial/2.5.0             spherepack/3.2
   gdal/3.9.3                 musica/0.10.1                superlu/6.0.0
   geos/3.13.0                ncarcompilers/1.0.0 (L)      udunits/2.2.28
   hdf/4.2.15                 netcdf/4.9.2        (L,D)

--------------- MPI-dependent Software - [oneapi + cray-mpich] ----------------
   darshan-runtime/3.4.6           parallel-netcdf/1.14.0
   esmf/8.7.0                      parallelio/1.10.1
   esmf/8.8.0                      parallelio/2.6.3-static
   esmf/8.8.1               (D)    parallelio/2.6.3        (D)
   fftw-mpi/3.3.10                 parallelio/2.6.4
   gptl/8.1.1                      parallelio/2.6.5-static
   hdf5-mpi/1.12.3                 parallelio/2.6.5
   netcdf-mpi/4.9.2         (D)    parallelio/2.6.6-static
   netcdf-mpi/4.9.3                parallelio/2.6.6
   osu-micro-benchmarks/7.5        superlu-dist/8.2.1

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
  apptainer: apptainer/1.1.7, apptainer/1.1.9, apptainer/1.3.4
  arm-forge: arm-forge/22.1.3
  atp: atp/3.14.18, atp/3.15.0, atp/3.15.1, atp/3.15.3
  cce: cce/15.0.1, cce/16.0.1, cce/17.0.1
  cdo: cdo/2.1.1, cdo/2.2.2, cdo/2.3.0, cdo/2.4.2, cdo/2.4.4
  chapel: chapel/2.0.0
  charliecloud: charliecloud/0.32, charliecloud/0.33, charliecloud/0.38
  cmake: cmake/3.26.3, cmake/3.26.6
  conda: conda/latest
  cp2k: cp2k/2023.2
  cray-ccdb: cray-ccdb/4.12.13, cray-ccdb/5.0.1, cray-ccdb/5.0.3
  cray-dyninst: cray-dyninst/12.1.1, cray-dyninst/12.3.0, ...
  cray-libsci: cray-libsci/23.02.1.1, cray-libsci/23.09.1.1, ...
  cray-mpich: cray-mpich/8.1.25, cray-mpich/8.1.27, cray-mpich/8.1.29
  cray-mrnet: cray-mrnet/5.0.4, cray-mrnet/5.1.1, cray-mrnet/5.1.2
  cray-stat: cray-stat/4.11.13, cray-stat/4.12.1, cray-stat/4.12.2
  craype: craype/2.7.20, craype/2.7.23, craype/2.7.31
  cuda: cuda/11.7.1, cuda/11.8.0, cuda/12.2.1, cuda/12.3.2
  cudnn: cudnn/8.5.0.96-11.7, cudnn/8.7.0.84-11.8, cudnn/8.8.1.3-12, ...
  cutensor: cutensor/1.7.0.1
  darshan-runtime: darshan-runtime/3.4.2, darshan-runtime/3.4.4, ...
  darshan-util: darshan-util/3.4.2, darshan-util/3.4.4, darshan-util/3.4.6
  eccodes: eccodes/2.25.0, eccodes/2.32.0, eccodes/2.34.0, eccodes/2.36.0
  ecflow: ecflow/5.8.3, ecflow/5.11.4
  eigen: eigen/3.4.0
  esmf: esmf/8.4.2, esmf/8.5.0, esmf/8.6.0, esmf/8.6.1, esmf/8.7.0, ...
  fftw: fftw/3.3.10
  fftw-mpi: fftw-mpi/3.3.10
  gcc: gcc/12.2.0, gcc/12.4.0, gcc/13.2.0
  gcc-toolchain: gcc-toolchain/12.2.0, gcc-toolchain/13.2.0
  gdal: gdal/3.6.4, gdal/3.7.1, gdal/3.8.1, gdal/3.9.3
  gdb4hpc: gdb4hpc/4.14.7, gdb4hpc/4.15.1, gdb4hpc/4.16.1
  geos: geos/3.9.1, geos/3.12.1, geos/3.13.0
  gmt: gmt/6.4.0, gmt/6.5.0
  go: go/1.20.3, go/1.20.6, go/1.23.3
  googletest: googletest/1.12.1
  gptl: gptl/8.1.1
  grads: grads/2.2.1, grads/2.2.3
  grib-util: grib-util/1.2.4, grib-util/1.5.0
  h5z-zfp: h5z-zfp/1.1.1
  hdf: hdf/4.2.15
  hdf5: hdf5/1.12.2, hdf5/1.12.3, hdf5/1.14.3
  hdf5-mpi: hdf5-mpi/1.12.2, hdf5-mpi/1.12.3, hdf5-mpi/1.14.3
  heaptrack: heaptrack/1.3.0
  idl: idl/8.9.0, idl/9.0.0, idl/9.1.0
  intel: intel/2023.0.0, intel/2023.2.1, intel/2024.0.2, intel/2024.2.1, ...
  intel-advisor: intel-advisor/2024.0.0, intel-advisor/2024.2.1, ...
  intel-classic: intel-classic/2023.0.0, intel-classic/2023.2.1
  intel-inspector: intel-inspector/2024.0.0, intel-inspector/2024.2.0
  intel-mpi: intel-mpi/2021.10.0
  intel-oneapi: intel-oneapi/2023.0.0, intel-oneapi/2023.2.1, ...
  intel-vtune: intel-vtune/2023.2.0, intel-vtune/2024.0.0, ...
  ioapi: ioapi/3.2
  json-c: json-c/0.16
  julia: julia/1.9.2, julia/1.10.2, julia/1.11.2
  kokkos: kokkos/4.2.01
  lcov: lcov/2.0
  libemos: libemos/4.5.1
  libfabric: libfabric/1.15.2.0, libfabric/1.22.0, libfabric/2.1.0
  libtorch: libtorch/2.1.2, libtorch/2.2.1
  linaro-forge: linaro-forge/23.0, linaro-forge/23.1, linaro-forge/24.0.4, ...
  madis: madis/4.5
  matlab: matlab/R2023a, matlab/R2024a, matlab/R2024b
  mkl: mkl/2023.0.0, mkl/2023.2.0, mkl/2024.0.0, mkl/2024.2.1, mkl/2024.2.2, ...
  mpi-serial: mpi-serial/2.3.0, mpi-serial/2.5.0
  mpifileutils: mpifileutils/0.11.1, mpifileutils/0.12
  musica: musica/0.10.1
  mvapich: mvapich/3.0-cpu, mvapich/3.0-cuda
  ncarcompilers: ncarcompilers/1.0.0
  ncarenv: ncarenv/23.06, ncarenv/23.09, ncarenv/24.12
  nccmp: nccmp/1.9.0.1, nccmp/1.9.1.0
  ncl: ncl/6.6.2
  nco: nco/5.1.4, nco/5.1.6, nco/5.1.9, nco/5.2.4, nco/5.3.1
  ncview: ncview/2.1.8, ncview/2.1.9
  ncvis: ncvis/2022.08.28
  neovim: neovim/0.9.4, neovim/0.10.0
  netcdf: netcdf/4.9.2, netcdf/4.9.3
  netcdf-mpi: netcdf-mpi/4.9.2, netcdf-mpi/4.9.3
  node-js: node-js/18.12.1
  npm: npm/9.3.1
  nvhpc: nvhpc/21.3, nvhpc/23.1, nvhpc/23.5, nvhpc/23.7, nvhpc/24.1, ...
  openblas: openblas/0.3.23, openblas/0.3.25, openblas/0.3.28
  opencoarrays: opencoarrays/2.10.1, opencoarrays/2.10.2
  openmpi: openmpi/main, openmpi/5.0.0, openmpi/5.0.5, openmpi/5.0.7
  osu-micro-benchmarks: osu-micro-benchmarks/7.1-1, ...
  papi: papi/7.0.0.1, papi/7.0.1.1, papi/7.1.0.1
  parallel-netcdf: parallel-netcdf/1.12.3, parallel-netcdf/1.14.0
  parallelio: parallelio/1.10.1, parallelio/2.5.10, parallelio/2.6.0, ...
  pcre: pcre/8.45
  peak-memusage: peak-memusage/3.0.1
  perftools: perftools
  perftools-base: perftools-base/23.03.0, perftools-base/23.09.0, ...
  perftools-lite: perftools-lite
  perftools-lite-events: perftools-lite-events
  perftools-lite-gpu: perftools-lite-gpu
  perftools-lite-hbm: perftools-lite-hbm
  perftools-lite-loops: perftools-lite-loops
  perftools-preload: perftools-preload
  perl: perl/5.36.0, perl/5.38.0
  podman: podman/4.3.1, podman/4.5.1
  proj: proj/8.2.1, proj/9.2.1, proj/9.4.1
  rstudio: rstudio/2023.09.0, rstudio/2024.12.0
  sanitizers4hpc: sanitizers4hpc/1.0.4, sanitizers4hpc/1.1.1, ...
  spherepack: spherepack/3.2
  superlu: superlu/5.3.0, superlu/6.0.0
  superlu-dist: superlu-dist/8.1.2, superlu-dist/8.2.1
  texlive: texlive/20220321, texlive/20240312
  udunits: udunits/2.2.28
  valgrind4hpc: valgrind4hpc/2.12.11, valgrind4hpc/2.13.1, ...
  vasp: vasp/5.3.5
  vtune: vtune/2023.0.0
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
