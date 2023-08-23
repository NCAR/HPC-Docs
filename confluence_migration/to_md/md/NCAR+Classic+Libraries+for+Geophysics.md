# NCAR Classic Libraries for Geophysics

Several mathematical libraries developed in the years 1970-1990 remain
popular in the geophysics community. These libraries, listed below, are
available for downloading here on GitHub: [NCAR Classic Libraries
for-Geophysics](https://github.com/NCAR/NCAR-Classic-Libraries-for-Geophysics).

- **FFTPACK**: A library of fast Fourier transforms

- **FISHPACK**: Fortran subprograms for solving separable elliptic
  partial differential equations (PDEs)

- **FISHPACK 90**: FISHPACK subprograms with a Fortran 90 interface

- **MUDPACK**: Multigrid Fortran subprograms for solving separable and
  non-separable elliptic PDEs

- **SPHEREPACK**: A Fortran library for modeling geophysical processes

All of these library routines are written primarily in Fortran 77. Their
internal implementation does not always conform to the Fortran Standard.
FISHPACK90 provides a Fortran 90 interface to the FISHPACK routines.
Only MUDPACK is written with parallelism in mind; it uses OpenMP
directives for shared-memory parallelism. The other libraries were
designed to run on a single processor.

These libraries represent many person-years of development, and though
they are no longer under development, NCAR continues to make them
available to the public at no cost under a software licensing agreement.
The libraries are best suited to Linux and UNIX environments and require
a directory structure, **tar**, and **gmake** commands.

![](media/image1.png)
