<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "./utils/update_module_list.sh casper" -->

## Casper default module environment
```pre

-------------------------- Module Stack Environments ---------------------------
   ncarenv/23.09 (S,L)

------------------------- Compilers and Core Software --------------------------
   apptainer/1.1.9               ncl/6.6.2
   cdo/2.2.2                     nco/5.1.6
   charliecloud/0.33             ncview/2.1.9
   clang/16.0.6                  ncvis/2022.08.28
   cmake/3.26.3                  nvhpc/23.7
   conda/latest                  octave/8.2.0
   cuda/11.8.0            (L)    paraview/5.11.1
   cudnn/8.7.0.84-11.8           pcre/8.45
   darshan-util/3.4.2            peak-memusage/3.0.1
   doxygen/1.8.20                perl/5.38.0
   eigen/3.4.0                   pocl/3.0
   gcc/12.2.0                    podman/4.5.1
   go/1.20.6                     texlive/20220321
   grads/2.2.3                   ucx/1.14.1          (L)
   grib-util/1.2.4               vapor/3.9.0
   intel-classic/2023.2.1        vexcl/1.4.3
   intel-oneapi/2023.2.1         visit/3.3.3
   intel/2023.2.1         (L)    vtune/2023.2.0
   julia/1.9.2                   wgrib2/3.1.1
   linaro-forge/23.0             xxdiff/latest
   nccmp/1.9.1.0

-------------------- Compiler-dependent Software - [oneapi] --------------------
   eccodes/2.25.0    hdf5/1.12.2         (L)    netcdf/4.9.2   (L)
   fftw/3.3.10       mkl/2023.2.0               openmpi/4.1.5  (L)
   geos/3.9.1        mpi-serial/2.3.0           proj/8.2.1
   hdf/4.2.15        ncarcompilers/1.0.0 (L)    udunits/2.2.28

----------------- MPI-dependent Software - [oneapi + openmpi] ------------------
   adios2/2.9.1             fftw-mpi/3.3.10     parallel-netcdf/1.12.3
   darshan-runtime/3.4.2    hdf5-mpi/1.12.2     parallelio/2.6.1
   esmf/8.5.0               netcdf-mpi/4.9.2    parallelio/2.6.2       (D)

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
<!-- --8<-- [start:complete] -->
```pre
----------------------------------------------------------------------------
The following is a list of the modules and extensions currently available:
----------------------------------------------------------------------------
  adios2: adios2/2.9.1
  apptainer: apptainer/1.1.9
  cdo: cdo/2.2.2
  charliecloud: charliecloud/0.33
  clang: clang/16.0.6
  cmake: cmake/3.26.3
  conda: conda/latest
  cuda: cuda/11.8.0
  cudnn: cudnn/8.7.0.84-11.8
  darshan-runtime: darshan-runtime/3.4.2
  darshan-util: darshan-util/3.4.2
  doxygen: doxygen/1.8.20
  eccodes: eccodes/2.25.0
  eigen: eigen/3.4.0
  esmf: esmf/8.5.0
  fftw: fftw/3.3.10
  fftw-mpi: fftw-mpi/3.3.10
  gcc: gcc/12.2.0
  gdal: gdal/3.7.1
  geos: geos/3.9.1
  go: go/1.20.6
  grads: grads/2.2.3
  grib-util: grib-util/1.2.4
  hdf: hdf/4.2.15
  hdf5: hdf5/1.12.2
  hdf5-mpi: hdf5-mpi/1.12.2
  intel: intel/2023.2.1
  intel-classic: intel-classic/2023.2.1
  intel-oneapi: intel-oneapi/2023.2.1
  julia: julia/1.9.2
  linaro-forge: linaro-forge/23.0
  mkl: mkl/2023.2.0
  mpi-serial: mpi-serial/2.3.0
  ncarcompilers: ncarcompilers/1.0.0
  ncarenv: ncarenv/23.09
  nccmp: nccmp/1.9.1.0
  ncl: ncl/6.6.2
  nco: nco/5.1.6
  ncview: ncview/2.1.9
  ncvis: ncvis/2022.08.28
  netcdf: netcdf/4.9.2
  netcdf-mpi: netcdf-mpi/4.9.2
  nvhpc: nvhpc/23.7
  octave: octave/8.2.0
  openblas: openblas/0.3.23
  openmpi: openmpi/4.1.5
  parallel-netcdf: parallel-netcdf/1.12.3
  parallelio: parallelio/2.6.1, parallelio/2.6.2
  paraview: paraview/5.11.1
  pcre: pcre/8.45
  peak-memusage: peak-memusage/3.0.1
  perl: perl/5.38.0
  pocl: pocl/3.0
  podman: podman/4.5.1
  proj: proj/8.2.1
  texlive: texlive/20220321
  ucx: ucx/1.14.1
  udunits: udunits/2.2.28
  vapor: vapor/3.9.0
  vexcl: vexcl/1.4.3
  visit: visit/3.3.3
  vtune: vtune/2023.2.0
  wgrib2: wgrib2/3.1.1
  xxdiff: xxdiff/latest
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