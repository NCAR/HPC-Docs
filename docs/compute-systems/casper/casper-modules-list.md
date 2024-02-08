<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "./utils/update_module_list.sh casper" -->

## Casper default module environment
```pre

-------------------------- Module Stack Environments ---------------------------
   ncarenv/23.10 (S,L)

------------------------- Compilers and Core Software --------------------------
   apptainer/1.1.9                          intel/2024.0.2
   cdo/2.2.2                                julia/1.9.2
   cdo/2.3.0                       (D)      linaro-forge/23.0
   charliecloud/0.33                        linaro-forge/23.1   (D)
   clang/16.0.6                             matlab/R2023a
   cmake/3.26.3                             nccmp/1.9.1.0
   conda/latest                             ncl/6.6.2
   cuda/11.8.0                              nco/5.1.6
   cuda/12.2.1                     (L,D)    nco/5.1.9           (D)
   cudnn/8.7.0.84-11.8                      ncview/2.1.9
   darshan-util/3.4.2                       ncvis/2022.08.28
   darshan-util/3.4.4              (D)      nvhpc/23.7          (D)
   doxygen/1.8.20                           nvhpc/24.1
   eigen/3.4.0                              octave/8.2.0
   ferret/7.6.0                             paraview/5.11.1
   gcc/12.2.0                      (D)      pcre/8.45
   gcc/13.2.0                               peak-memusage/3.0.1
   gmt/6.4.0                                perl/5.38.0
   gmt/6.5.0                       (D)      pocl/3.0
   go/1.20.6                                podman/4.5.1
   grads/2.2.3                              rstudio/2023.09.0
   grib-util/1.2.4                          texlive/20220321
   idl/8.9.0                                ucx/1.14.1          (L)
   intel-classic/2023.2.1                   vapor/3.9.0
   intel-oneapi-inspector/2024.0.0          vexcl/1.4.3
   intel-oneapi/2023.2.1           (D)      visit/3.3.3
   intel-oneapi/2024.0.2                    vtune/2023.2.0
   intel/2023.2.1                  (L,D)    wgrib2/3.1.1

-------------------- Compiler-dependent Software - [oneapi] --------------------
   eccodes/2.25.0              hdf/4.2.15                 netcdf/4.9.2   (L)
   fftw/3.3.10                 hdf5/1.12.2         (L)    openmpi/4.1.6  (L)
   gcc-toolchain/12.2.0        mkl/2023.2.0               proj/8.2.1
   gcc-toolchain/13.2.0 (D)    mpi-serial/2.3.0           udunits/2.2.28
   gdal/3.7.1                  mpi-serial/2.5.0    (D)
   geos/3.9.1                  ncarcompilers/1.0.0 (L)

----------------- MPI-dependent Software - [oneapi + openmpi] ------------------
   adios2/2.9.1             fftw-mpi/3.3.10     osu-micro-benchmarks/7.2
   darshan-runtime/3.4.2    hdf5-mpi/1.12.2     parallel-netcdf/1.12.3
   esmf/8.5.0               netcdf-mpi/4.9.2    parallelio/2.6.2

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

## Casper complete module listing
```pre
----------------------------------------------------------------------------
The following is a list of the modules and extensions currently available:
----------------------------------------------------------------------------
  adios2: adios2/2.9.1, adios2/2.9.2
  apptainer: apptainer/1.1.9
  cdo: cdo/2.2.2, cdo/2.3.0
  charliecloud: charliecloud/0.33
  clang: clang/16.0.6
  cmake: cmake/3.26.3
  conda: conda/latest
  cuda: cuda/11.8.0, cuda/12.2.1
  cudnn: cudnn/8.7.0.84-11.8
  darshan-runtime: darshan-runtime/3.4.2, darshan-runtime/3.4.4
  darshan-util: darshan-util/3.4.2, darshan-util/3.4.4
  doxygen: doxygen/1.8.20
  eccodes: eccodes/2.25.0, eccodes/2.32.0
  eigen: eigen/3.4.0
  esmf: esmf/8.5.0, esmf/8.6.0
  ferret: ferret/7.6.0
  fftw: fftw/3.3.10
  fftw-mpi: fftw-mpi/3.3.10
  gcc: gcc/12.2.0, gcc/13.2.0
  gcc-toolchain: gcc-toolchain/12.2.0, gcc-toolchain/13.2.0
  gdal: gdal/3.7.1, gdal/3.8.1
  geos: geos/3.9.1, geos/3.12.1
  gmt: gmt/6.4.0, gmt/6.5.0
  go: go/1.20.6
  grads: grads/2.2.3
  grib-util: grib-util/1.2.4
  hdf: hdf/4.2.15
  hdf5: hdf5/1.12.2, hdf5/1.14.3
  hdf5-mpi: hdf5-mpi/1.12.2, hdf5-mpi/1.14.3
  idl: idl/8.9.0
  intel: intel/2023.2.1, intel/2024.0.2
  intel-classic: intel-classic/2023.2.1
  intel-oneapi: intel-oneapi/2023.2.1, intel-oneapi/2024.0.2
  intel-oneapi-inspector: intel-oneapi-inspector/2024.0.0
  julia: julia/1.9.2
  linaro-forge: linaro-forge/23.0, linaro-forge/23.1
  matlab: matlab/R2023a
  mkl: mkl/2023.2.0, mkl/2024.0.0
  mpi-serial: mpi-serial/2.3.0, mpi-serial/2.5.0
  ncarcompilers: ncarcompilers/1.0.0
  ncarenv: ncarenv/23.10
  nccmp: nccmp/1.9.1.0
  ncl: ncl/6.6.2
  nco: nco/5.1.6, nco/5.1.9
  ncview: ncview/2.1.9
  ncvis: ncvis/2022.08.28
  netcdf: netcdf/4.9.2
  netcdf-mpi: netcdf-mpi/4.9.2
  nvhpc: nvhpc/23.7, nvhpc/24.1
  octave: octave/8.2.0
  openblas: openblas/0.3.23, openblas/0.3.25
  openmpi: openmpi/4.1.6, openmpi/5.0.0
  osu-micro-benchmarks: osu-micro-benchmarks/7.2, osu-micro-benchmarks/7.3
  parallel-netcdf: parallel-netcdf/1.12.3
  parallelio: parallelio/2.6.2
  paraview: paraview/5.11.1
  pcre: pcre/8.45
  peak-memusage: peak-memusage/3.0.1
  perl: perl/5.38.0
  pocl: pocl/3.0
  podman: podman/4.5.1
  proj: proj/8.2.1, proj/9.2.1
  rstudio: rstudio/2023.09.0
  texlive: texlive/20220321
  ucx: ucx/1.14.1
  udunits: udunits/2.2.28
  vapor: vapor/3.9.0
  vexcl: vexcl/1.4.3
  visit: visit/3.3.3
  vtune: vtune/2023.2.0
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
