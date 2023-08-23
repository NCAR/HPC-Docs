# Software libraries and modules

Scientists and software engineers in Earth system sciences will find
many of the libraries their applications require on NCAR’s
high-performance computing systems. These include libraries associated
with the Intel, GNU, and PGI compilers as well as others for I/O, data
formatting, Python, graphics, regridding, numerical computations, and
data analysis.

Users of these systems employ the module command to select and manage
the supported software environment they need. The software supported on
the NCAR systems differs to some extent.

The lists
of [Cheyenne](file:////display/RC/Software+on+Cheyenne) and [Casper](file:////display/RC/Software+modules+and+packages) modules
are extensive. If your application requires a different library or
library version, contact the [<u>NCAR Research Computing help
desk</u>](https://rchelp.ucar.edu/) for assistance. A few of the more
important libraries are described below.

#### Page contents

- [I/O and data formatting
  software](#Softwarelibrariesandmodules-I/Oanddataf)

- [Python and associated virtual
  environments](#Softwarelibrariesandmodules-Pythonandas)

- [Parallel data analysis](#Softwarelibrariesandmodules-Paralleldat)

- [Plotting](#Softwarelibrariesandmodules-Plotting)

- [Regridding](#Softwarelibrariesandmodules-Regridding)

- [Numerical libraries](#Softwarelibrariesandmodules-Numericalli)

- [GPGPU support (Casper
  only)](#Softwarelibrariesandmodules-GPGPUsuppor)

- [Deep learning, machine learning (Casper
  only)](#Softwarelibrariesandmodules-Deeplearnin)

## I/O and data formatting software

#### netcdf, pnetcdf, hdf5, pio, gdal

The netCDF libraries provide a common file format for many applications
run on NCAR supercomputers. The hdf5 library is used interoperably with
netCDF. Library pio is often used by CESM.

## Python and associated virtual environments

Several Python versions and corresponding libraries are available. Users
can augment their own environments by following the instructions
on [this documentation
page](file:////display/RC/Using+Conda+and+Python) for how to load Python
and its virtual environments.

## Parallel data analysis

#### dask, mpi4py, matlab

Dask and MPI for Python are available through the [NCAR Python
Library](file:////display/RC/Using+Conda+and+Python). MATLAB is
available by loading the matlab module. See [this
documentation](file:////display/RC/MATLAB+Parallel+Computing+Toolbox+on+Casper+and+Cheyenne) for
how to use MATLAB's parallel computing capabilities.

## Plotting

#### ncl, grads, wrf-python, matplotlib, bokeh, plotly

NCL and GrADS are individual modules. WRF-python and matplotlib are
available upon loading Python and one of its virtual environments as
described on [this documentation
page](file:////display/RC/Using+Conda+and+Python). Python users will
find matplotlib, bokeh, plotly, and many other libraries they can
install in their own virtual environments.

## Regridding

#### esmf, ncl

The ESMF libraries include standalone software for grid remapping, as
does NCL.

## Numerical libraries

#### mkl, fftw, petsc

MKL is Intel’s Math Library Kernel. FFTW is the acronym for Fastest
Fourier Transform in the West. PETSc is a suite of data structures and
routines for the scalable (parallel) solution of scientific applications
modeled by partial differential equations. 

## GPGPU support (Casper only)

#### cuda

CUDA is available on Casper via the **module load cuda** command. CUDA
is a parallel computing platform and programming model developed by
NVIDIA for general computing on GPUs.

#### OpenACC

OpenACC framework comes with PGI. You can load the pgi module on Casper
to access the OpenACC-aware compiler. OpenACC is a directive-based
programming model that moves the computational workload from CPU to GPU.

#### OpenCL

OpenCL is a software framework for writing programs that can execute
across heterogeneous platforms such as CPUs, GPUs, DSPs, and FPGAs. It
is essentially a unique programming language for developing applications
and APIs to run on and control the devices. OpenCL is based on the C99
and C++, version 11, programming languages.

## Deep learning, machine learning (Casper only)

#### tensorflow, torch

TensorFlow and PyTorch are available via any of NCAR’s supported Python
modules, in the default version of the [NCAR Python
Library](file:////display/RC/Using+Conda+and+Python). Loading the latest
version of Python provides the latest “learning” libraries.
