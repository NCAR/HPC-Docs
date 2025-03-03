<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "./utils/update_module_list.sh casper" -->

## Casper default module environment
```pre

-------------------------- Module Stack Environments --------------------------
   ncarenv/23.10 (S)    ncarenv/24.12 (S,L,D)

------------------------- Compilers and Core Software -------------------------
   apptainer/1.3.4                 julia/1.11.2
   cdo/2.4.4                       linaro-forge/24.1
   charliecloud/0.38               madis/4.5
   cmake/3.31.0                    matlab/R2024b
   conda/latest                    nccmp/1.9.1.0
   cuda/12.3.2            (L)      ncl/6.6.2
   cudnn/8.9.7.29-12      (D)      nco/5.2.4
   cudnn/9.2.0.82-12               nco/5.3.1           (D)
   darshan-util/3.4.6              ncview/2.1.9
   doxygen/1.12.0                  ncvis/2022.08.28
   ecflow/5.11.4                   neovim/0.10.0
   eigen/3.4.0                     nvhpc/24.11
   ferret/7.6.0                    nvtop/3.0.1
   gcc/12.4.0                      octave/9.1.0
   gmt/6.5.0                       paraview/5.13.1
   go/1.23.3                       pcre/8.45
   grads/2.2.3                     peak-memusage/3.0.1
   grib-util/1.5.0                 podman/4.5.1
   gsl/2.7.1                       rstudio/2024.12.0
   idl/9.1.0                       texlive/20240312
   intel-advisor/2025.0.0          ucx/1.17.0          (L)
   intel-oneapi/2024.2.1           vapor/3.9.3
   intel-vtune/2025.0.1            visit/3.4.1
   intel/2024.2.1         (L,D)    wgrib2/3.1.1
   intel/2025.0.3

------------------- Compiler-dependent Software - [oneapi] --------------------
   eccodes/2.34.0    hdf5/1.12.3         (L)      netcdf/4.9.3
   fftw/3.3.10       mkl/2024.2.2                 openmpi/5.0.6  (L)
   gdal/3.9.3        mpi-serial/2.5.0             proj/9.2.1
   geos/3.13.0       ncarcompilers/1.0.0 (L)      udunits/2.2.28
   hdf/4.2.15        netcdf/4.9.2        (L,D)

----------------- MPI-dependent Software - [oneapi + openmpi] -----------------
   adios2/2.10.2                netcdf-mpi/4.9.3
   darshan-runtime/3.4.6        osu-micro-benchmarks/7.5
   esmf/8.7.0                   parallel-netcdf/1.14.0
   esmf/8.8.0            (D)    parallelio/2.6.3
   fftw-mpi/3.3.10              parallelio/2.6.4
   hdf5-mpi/1.12.3              parallelio/2.6.5         (D)
   netcdf-mpi/4.9.2      (D)

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
  adios2: adios2/2.9.1, adios2/2.9.2, adios2/2.10.2
  apptainer: apptainer/1.1.9, apptainer/1.3.4
  cdo: cdo/2.2.2, cdo/2.3.0, cdo/2.4.4
  charliecloud: charliecloud/0.33, charliecloud/0.38
  clang: clang/16.0.6
  cmake: cmake/3.26.3, cmake/3.31.0
  conda: conda/latest
  cuda: cuda/11.8.0, cuda/12.2.1, cuda/12.3.2
  cudnn: cudnn/8.7.0.84-11.8, cudnn/8.9.7.29-12, cudnn/9.2.0.82-12
  darshan-runtime: darshan-runtime/3.4.2, darshan-runtime/3.4.4, ...
  darshan-util: darshan-util/3.4.2, darshan-util/3.4.4, darshan-util/3.4.6
  doxygen: doxygen/1.8.20, doxygen/1.12.0
  eccodes: eccodes/2.25.0, eccodes/2.32.0, eccodes/2.34.0, eccodes/2.36.0
  ecflow: ecflow/5.11.4
  eigen: eigen/3.4.0
  esmf: esmf/8.5.0, esmf/8.6.0, esmf/8.7.0, esmf/8.8.0
  ferret: ferret/7.6.0
  fftw: fftw/3.3.10
  fftw-mpi: fftw-mpi/3.3.10
  gcc: gcc/12.2.0, gcc/12.4.0, gcc/13.2.0
  gcc-toolchain: gcc-toolchain/12.2.0, gcc-toolchain/13.2.0
  gdal: gdal/3.7.1, gdal/3.8.1, gdal/3.9.3
  geos: geos/3.9.1, geos/3.12.1, geos/3.13.0
  gmt: gmt/6.4.0, gmt/6.5.0
  go: go/1.20.6, go/1.23.3
  googletest: googletest/1.14.0
  grads: grads/2.2.3
  grib-util: grib-util/1.2.4, grib-util/1.5.0
  gsl: gsl/2.7.1
  h5z-zfp: h5z-zfp/1.1.1
  hdf: hdf/4.2.15
  hdf5: hdf5/1.12.2, hdf5/1.12.3, hdf5/1.14.3
  hdf5-mpi: hdf5-mpi/1.12.2, hdf5-mpi/1.12.3, hdf5-mpi/1.14.3
  idl: idl/8.9.0, idl/9.0.0, idl/9.1.0
  intel: intel/2023.2.1, intel/2024.0.2, intel/2024.2.1, intel/2025.0.3
  intel-advisor: intel-advisor/2024.0.0, intel-advisor/2025.0.0
  intel-classic: intel-classic/2023.2.1
  intel-inspector: intel-inspector/2024.0.0
  intel-oneapi: intel-oneapi/2023.2.1, intel-oneapi/2024.0.2, ...
  intel-vtune: intel-vtune/2023.2.0, intel-vtune/2024.0.0, ...
  julia: julia/1.9.2, julia/1.10.2, julia/1.10.5, julia/1.11.2
  linaro-forge: linaro-forge/23.0, linaro-forge/23.1, linaro-forge/24.0.4, ...
  madis: madis/4.5
  matlab: matlab/R2023a, matlab/R2024a, matlab/R2024b
  mkl: mkl/2023.2.0, mkl/2024.0.0, mkl/2024.2.1, mkl/2024.2.2, mkl/2025.0.1
  mpi-serial: mpi-serial/2.3.0, mpi-serial/2.5.0
  mpifileutils: mpifileutils/0.11.1
  ncarcompilers: ncarcompilers/1.0.0
  ncarenv: ncarenv/23.10, ncarenv/24.12
  nccmp: nccmp/1.9.1.0
  ncl: ncl/6.6.2
  nco: nco/5.1.6, nco/5.1.9, nco/5.2.4, nco/5.3.1
  ncview: ncview/2.1.9
  ncvis: ncvis/2022.08.28
  neovim: neovim/0.9.4, neovim/0.10.0
  netcdf: netcdf/4.9.2, netcdf/4.9.3
  netcdf-cxx-legacy: netcdf-cxx-legacy/4.2
  netcdf-mpi: netcdf-mpi/4.9.2, netcdf-mpi/4.9.3
  nvhpc: nvhpc/23.7, nvhpc/24.1, nvhpc/24.7, nvhpc/24.11
  nvtop: nvtop/3.0.1
  octave: octave/8.2.0, octave/9.1.0
  openblas: openblas/0.3.23, openblas/0.3.25, openblas/0.3.28
  openmpi: openmpi/4.1.6, openmpi/5.0.0, openmpi/5.0.6
  osu-micro-benchmarks: osu-micro-benchmarks/7.2, osu-micro-benchmarks/7.3, ...
  parallel-netcdf: parallel-netcdf/1.12.3, parallel-netcdf/1.14.0
  parallelio: parallelio/2.6.2, parallelio/2.6.3, parallelio/2.6.4, ...
  paraview: paraview/5.11.1, paraview/5.13.1
  pcre: pcre/8.45
  peak-memusage: peak-memusage/3.0.1
  perl: perl/5.38.0
  pocl: pocl/3.0
  podman: podman/4.5.1
  proj: proj/8.2.1, proj/9.2.1
  rstudio: rstudio/2023.09.0, rstudio/2024.12.0
  texlive: texlive/20220321, texlive/20240312
  ucx: ucx/1.14.1, ucx/1.17.0
  udunits: udunits/2.2.28
  vapor: vapor/3.9.0, vapor/3.9.1, vapor/3.9.2, vapor/3.9.3
  vexcl: vexcl/1.4.3
  visit: visit/3.3.3, visit/3.4.1
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
