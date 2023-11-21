

## Intel's Math Kernel Library

The Intel Math Kernel Library ([Intel MKL](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl.html)) contains highly optimized, extensively threaded math routines for science, engineering, and financial applications. Core math functions include BLAS, LAPACK, ScaLAPACK, Sparse Solvers, Fast Fourier Transforms, Vector Math, and more.

On NCAR systems the MKL is available through the `mkl` module.  (See [here](./user-environment/modules.md) for more discussion on interacting with the module system.)

Intel MKL has the following [functional categories](https://en.wikipedia.org/wiki/Math_Kernel_Library):

- **Linear algebra**:
    - BLAS routines are vector-vector (Level 1), matrix-vector (Level 2) and matrix-matrix (Level 3) operations for real and complex single and double precision data.
    - LAPACK consists of tuned LU, Cholesky and QR factorizations, eigenvalue and least squares solvers.
    - Sparse BLAS, ScaLAPACK, Sparse Solver, Extended Eigensolver (FEAST, PARDISO), PBLAS and BLACS.

- **Fast Fourier Transforms (FFTs)** from 1D to multidimensional, complex to complex, real to complex, and real to real transforms of arbitrary lengths. Applications written with the open source FFTW can be easily ported to MKL by linking with interface wrapper libraries provided as part of MKL for easy migration.

    - Cluster versions of LAPACK and FFTs are also available as part of MKL to take advantage of MPI parallelism in addition to single node parallelism from multithreading.

- **Vector math functions** include computationally intensive core mathematical operations for single and double precision real and complex data types. These are similar to `libm` functions from compiler libraries but operate on vectors rather than scalars to provide better performance. There are various controls for setting accuracy, error mode and denormalized number handling to customize the behavior of the routines.

- **Statistics functions** include random number generators and probability distributions, optimized for multicore processors. Also included are compute-intensive in and out-of-core routines to compute basic statistics, estimation of dependencies etc.

- **Data fitting functions** include splines (linear, quadratic, cubic, look-up, stepwise constant) for 1-dimensional interpolation that can be used in data analytics, geometric modeling and surface approximation applications.


### Linking with the MKL
The MKL ships with both serial and parallel versions of many of its core components, and with support for normal and "long" (64-bit) indexing integers. See the
[Link Line Advisor](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl-link-line-advisor.html) for guidance on how to select precise combinations of the MKL functionality when linking into your application.

---

## Cray LibSci

!!! danger "Derecho Only!"
    Most Cray software such as `LibSci` is only available on Derecho.

Cray's `LibSci` is a collection of numerical routines tuned for performance on Cray systems.

Most `LibSci` components contain both serial and and parallel routines optimized specifically to make best use of Cray processors and interconnect architectures. The general components of Cray `LibSci` are:

- BLAS (Basic Linear Algebra Subroutines)

- CBLAS (C interface to the legacy BLAS)

- BLACS (Basic Linear Algebra Communication Subprograms)

- LAPACK (Linear Algebra Package)

- ScaLAPACK (Parallel Linear Algebra routines)

- IRT (Iterative Refinement Toolkit) ‐ a library of solvers and tools
  that provides solutions to linear systems using single‐precision
  factorizations while preserving accuracy through mixed‐precision
  iterative refinement.

- CrayBLAS ‐ a library of BLAS routines highly optimized for Cray
   systems. (For further information, see `man intro_blas3`.)

For additional details see:
```console
$ module load cray-libsci
$ man intro_libsci
```

---

## FFTW

[FFTW](https://www.fftw.org/) is a C subroutine library for computing the discrete Fourier transform (DFT) in one or more dimensions, of arbitrary input size, and of both real and complex data (as well as of even/odd data, i.e. the discrete cosine/sine transforms or DCT/DST).

On NCAR systems single-node and distributed-memory parallel implementations of FFTW are available through the `fftw` and `fftw-mpi` modules, respectively. (See [here](./user-environment/modules.md) for more discussion on interacting with the module system.)
