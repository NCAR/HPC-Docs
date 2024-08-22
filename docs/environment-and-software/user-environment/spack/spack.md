# Spack

## What is Spack?

[Spack](https://spack.readthedocs.io/en/latest/) is an HPC-focused package manager which provides a prepared repository of thousands of package build recipes. While you can install binary installs of packages (e.g., like the package managers conda, zypper, homebrew do), Spack is designed to make from-source installs of complex software easy and reproducible.

We now use Spack to manage the HPC user software stack on Derecho and Casper. Almost all software modules available on Derecho and Casper have been installed using Spack.

## Adding your own software with Spack

Our software stacks on Derecho and Casper are designed to allow user augmentation via Spack's "[chained installation](https://spack.readthedocs.io/en/latest/chain.html)" capability. In a chained installation, one Spack instance is considered the *upstream*. In this case, our software stack is the upstream, providing access to all of our configuration settings and existing package installs to the *downstream* (which will be your Spack instance). These inherited settings allow your Spack instance to use our packages as dependencies, and also enable you to generate [environment modules](https://lmod.readthedocs.io/en/latest/) which will show up in the appropriate location in our module tree.

There are a number of reasons why you might wish to create a Spack downstream, including:

1. You need specific package installed that doesn't fit the scope of our module stack
2. You wish to use an unsupported/old version of some software package
3. You want to build a version of a package with debugging or profiling functionality for troubleshooting purposes

### Creating your downstream instance

A downstream Spack instance needs to know where to find the upstream. It is also helpful to point the downstream to certain [configuration (YAML) files](https://spack.readthedocs.io/en/latest/configuration.html) from the upstream, so that packages will "concretize" in the same manner, ensuring the reuse of dependencies.

To make it easier to set up your downstream, we provide a helper script called `spack-downstream` in the NCAR user environment. When you run this script, a clone of our Spack fork will be installed and this clone will become your downstream instance. The script configures this clone to see the loaded version of our software stack (indicated by the **ncarenv** module version) as the upstream. The following commands would create a downstream instance with the latest software stack on Derecho:

```bash
module load ncarenv/23.09
spack-downstream
```

These commands will create a downstream Spack instance in `/glade/work/$USER/spack-downstreams/derecho/23.09` (hereafter referred to as `$SPACK_ROOT`) which contains a clone of our fork of Spack, set to track the Git branch that matches the loaded software stack. It also copies relevant settings from our upstream instance into the `$SPACK_ROOT/etc/spack` subdirectory.

To begin using your downstream instance, you should first set up your shell environment to use your clone of Spack. The `spack-downstream` script will ask whether you wish to add this to your shell initialization files, but you can manually set up Spack at any time by running:

=== "bash"
    ```bash
    . /glade/work/$USER/spack-downstreams/derecho/23.09/share/spack/setup-env.sh
    ```
=== "tcsh"
    ```tcsh
    source /glade/work/$USER/spack-downstreams/derecho/23.09/share/spack/setup-env.csh
    ```

You will now have access to Spack and its subcommands directly from your shell.

!!! tip
    By default, Spack will want to write any auto-detected configuration settings to a file in your `$HOME`. This file is shared across all Spack environments you use and can lead to unexpected results. You can force Spack to instead write configuration settings in the relevant Spack instance or environment by setting the following environment variable. We strongly recommend you do so.

    === "bash"
        ```bash
        export SPACK_DISABLE_LOCAL_CONFIG=true
        ```
    === "tcsh"
        ```tcsh
        setenv SPACK_DISABLE_LOCAL_CONFIG true
        ```

### Installing a package

Spack provides many options for configuring and installing packages. If you request a package that is already installed into our upstream instance, Spack will recognize this and not repeat the install.

As an example, let's say you wish to install a version of **parallel-netcdf** with debugging symbols on (i.e. `-g -O0`). Assuming you have already set up Spack in your shell, you can initiate the installation by running the following command:

```
spack install parallel-netcdf@1.12.3 %oneapi@2023.2.1 cppflags="-g -O0" ^cray-mpich@8.1.27
```

If all goes well, you should see that Spack installs the package with the **Intel OneAPI** compiler and the **cray-mpich** MPI library, just like in our production stack. Only this version will have debug symbols active.

!!! tip
    Spack package concretization is complex and there are many factors that can influence how Spack will install a package. We highly recommend utilizing the `spec` subcommand to verify the concretization before you actually install the package.
    ```sh
    $ spack spec -I -l parallel-netcdf@1.12.3 %oneapi@2023.2.1 cppflags="-g -O0" ^cray-mpich@8.1.27
    Input spec
    --------------------------------
     -   parallel-netcdf@1.12.3%oneapi@2023.2.1 cppflags="-g -O0"
     -       ^cray-mpich@8.1.27

    Concretized
    --------------------------------
     -   ttd73pp  parallel-netcdf@1.12.3%oneapi@2023.2.1 cppflags="-g -O0" ~burstbuffer+cxx+fortran+pic+shared build_system=autotools arch=linux-sles15-x86_64_v3
    [e]  i2n4u72      ^cray-mpich@8.1.27%oneapi@2023.2.1+wrappers build_system=generic arch=linux-sles15-x86_64_v3
    [e]  nah75ig      ^m4@1.4.18%gcc@7.5.0+sigsegv build_system=autotools patches=3877ab5,fc9b616 arch=linux-sles15-x86_64_v3
    [^]  jqrnm24      ^perl@5.38.0%gcc@7.5.0+cpanm+opcode+open+shared+threads build_system=generic arch=linux-sles15-x86_64_v3
    [^]  fizqd24          ^berkeley-db@18.1.40%gcc@7.5.0+cxx~docs+stl build_system=autotools patches=26090f4,b231fcc arch=linux-sles15-x86_64_v3
    [^]  adam562          ^bzip2@1.0.8%gcc@7.5.0~debug~pic+shared build_system=generic arch=linux-sles15-x86_64_v3
    [e]  cmszzch              ^diffutils@3.6%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  wsmcahk          ^gdbm@1.23%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  npfqu2h              ^readline@8.2%gcc@7.5.0 build_system=autotools patches=bbf97f1 arch=linux-sles15-x86_64_v3
    [^]  w4gepfm                  ^ncurses@6.4%gcc@7.5.0~symlinks+termlib abi=none build_system=autotools arch=linux-sles15-x86_64_v3
    [e]  xexiyjr                      ^pkg-config@0.29.2%gcc@7.5.0+internal_glib build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  g42iifh          ^zlib@1.2.13%gcc@7.5.0+optimize+pic+shared build_system=makefile arch=linux-sles15-x86_64_v3
    ```

### Using the package

At this point, you could simply access the program or library from the install prefix provided by Spack (use `spack location -i <pkg>` to get the prefix). However, you may want to access the package via environment modules, as you would do with software installed by CISL. You can enable this using Spack downstreams as well.

When you created your downstream instance, the script configured Spack to create modules in `/glade/work/$USER/spack-downstreams/derecho/modules`. If you are installing a package that already exists in our software stack, as would be the case for the parallel-netcdf example above, it can be helpful to provide a custom name for the package module to help disambiguate each version. Spack allows for such customization in the *modules.yaml* configuration file. Access the file using this command:

```
spack config edit modules
```

There are many configuration settings available to you to customize module generation, but for module naming you will want to edit the *projections* block. Here, add a line to identify a `-g -00` build of any package as a debug version:

```
  modules:
    'default:':
        lmod:
          projections:
            all: '{name}/{version}'
            ...
            cppflags='-g -O0': '{name}/{version}-debug'
```

You could also limit the scope of this specific projection to **parallel-netcdf** only - see [this documentation](https://spack.readthedocs.io/en/latest/module_file_support.html#module-file-customization) for more information on Spack module customization. Once you have your configuration saved, you can generate the module file using this command:

```
spack module lmod refresh
```

The next time you run `module avail`, you should see a new module called `parallel-netcdf/1.12.3-debug`. (If you do not see the expected modules, caching may be interfering - try `module --ignore-cache avail`.) This module (and any other downstream modules) will be annotated with a `(U)`, which signifies that the module is a user-generated downstream module.

---

## Additional Examples

### PETSc
In this example we show how to install various configurations of PETSc using the `gcc` compilers and `cray-mpich` on Derecho.  It demonstrates typical problems and resolutions necessary for complex packages.

PETSc, the Portable, Extensible Toolkit for Scientific Computation, is for the scalable (parallel) solution of scientific applications modeled by partial differential equations (PDEs). It has bindings for C, Fortran, and Python. PETSc also contains TAO, the Toolkit for Advanced Optimization, software library. It supports MPI, and GPUs through CUDA, HIP, Kokkos, or OpenCL, as well as hybrid MPI-GPU parallelism.  See the [PETSc overview page for more information](https://petsc.org/release/overview/).

**Versions and configuration options**

Many versions of PETSc are available through Spack, and each supports many optional configurations. Further, the PETSc API changes somewhat regularly across versions. This makes it an ideal candidate for a customized installation since it is difficult to define one particular configuration that will satisfy all users.   The Spack `info` subcommand provides an overview of the supported versions and configuration options (expand the example box below for full details).

??? example "`$ spack info petsc` - Spack-supported PETSc versions and options "
    ```pre
    $ spack info petsc
    Package:   petsc

    Description:
        PETSc is a suite of data structures and routines for the scalable
        (parallel) solution of scientific applications modeled by partial
        differential equations.

    Homepage: https://petsc.org

    Preferred version:
        3.20.2    http://web.cels.anl.gov/projects/petsc/download/release-snapshots/petsc-3.20.2.tar.gz

    Safe versions:
        main      [git] https://gitlab.com/petsc/petsc.git on branch main
        3.20.2    http://web.cels.anl.gov/projects/petsc/download/release-snapshots/petsc-3.20.2.tar.gz
        3.20.1    http://web.cels.anl.gov/projects/petsc/download/release-snapshots/petsc-3.20.1.tar.gz
        3.20.0    http://web.cels.anl.gov/projects/petsc/download/release-snapshots/petsc-3.20.0.tar.gz
        3.19.6    http://web.cels.anl.gov/projects/petsc/download/release-snapshots/petsc-3.19.6.tar.gz
        [...]
        3.11.0    http://web.cels.anl.gov/projects/petsc/download/release-snapshots/petsc-3.11.0.tar.gz

    Deprecated versions:
        None

    Variants:
        X [false]                     false, true
            Activate X support
        batch [false]                 false, true
            Enable when mpiexec is not available to run binaries
        build_system [generic]        generic
            Build systems supported by the package
        cgns [false]                  false, true
            Activates support for CGNS (only parallel)
        clanguage [C]                 C, C++
            Specify C (recommended) or C++ to compile PETSc
        complex [false]               false, true
            Build with complex numbers
        cuda [false]                  false, true
            Build with CUDA
        debug [false]                 false, true
            Compile in debug mode
        double [true]                 false, true
            Switches between single and double precision
        exodusii [false]              false, true
            Activates support for ExodusII (only parallel)
        fftw [false]                  false, true
            Activates support for FFTW (only parallel)
        fortran [true]                false, true
            Activates fortran support
        giflib [false]                false, true
            Activates support for GIF
        hdf5 [true]                   false, true
            Activates support for HDF5 (only parallel)
        hpddm [false]                 false, true
            Activates support for HPDDM (only parallel)
        hwloc [false]                 false, true
            Activates support for hwloc
        hypre [true]                  false, true
            Activates support for Hypre (only parallel)
        int64 [false]                 false, true
            Compile with 64bit indices
        jpeg [false]                  false, true
            Activates support for JPEG
        knl [false]                   false, true
            Build for KNL
        kokkos [false]                false, true
            Activates support for kokkos and kokkos-kernels
        libpng [false]                false, true
            Activates support for PNG
        libyaml [false]               false, true
            Activates support for YAML
        memalign [none]               none, 16, 32, 4, 64, 8
            Specify alignment of allocated arrays
        memkind [false]               false, true
            Activates support for Memkind
        metis [true]                  false, true
            Activates support for metis and parmetis
        mkl-pardiso [false]           false, true
            Activates support for MKL Pardiso
        mmg [false]                   false, true
            Activates support for MMG
        moab [false]                  false, true
            Activates support for MOAB (only parallel)
        mpfr [false]                  false, true
            Activates support for MPFR
        mpi [true]                    false, true
            Activates MPI support
        mumps [false]                 false, true
            Activates support for MUMPS (only parallel)
        openmp [false]                false, true
            Activates support for openmp
        p4est [false]                 false, true
            Activates support for P4Est (only parallel)
        parmmg [false]                false, true
            Activates support for ParMMG (only parallel)
        ptscotch [false]              false, true
            Activates support for PTScotch (only parallel)
        random123 [false]             false, true
            Activates support for Random123
        rocm [false]                  false, true
            Enable ROCm support
        saws [false]                  false, true
            Activates support for Saws
        shared [true]                 false, true
            Enables the build of shared libraries
        strumpack [false]             false, true
            Activates support for Strumpack
        suite-sparse [false]          false, true
            Activates support for SuiteSparse
        sycl [false]                  false, true
            Enable sycl build
        tetgen [false]                false, true
            Activates support for Tetgen
        trilinos [false]              false, true
            Activates support for Trilinos (only parallel)
        valgrind [false]              false, true
            Enable Valgrind Client Request mechanism
        zoltan [false]                false, true
            Activates support for Zoltan

        when +cuda
          cuda_arch [none]            none, 10, 11, 12, 13, 20, 21, 30, 32, 35, 37, 50, 52, 53, 60, 61, 62, 70, 72, 75, 80, 86, 87, 89, 90
              CUDA architecture

        when +fortran
          scalapack [false]           false, true
              Activates support for Scalapack
          superlu-dist [true]         false, true
              Activates support for superlu-dist (only parallel)

        when +rocm
          amdgpu_target [none]        none, gfx1010, gfx1011, gfx1012, gfx1013, gfx1030, gfx1031, gfx1032, gfx1033, gfx1034, gfx1035,
                                      gfx1036, gfx1100, gfx1101, gfx1102, gfx1103, gfx701, gfx801, gfx802, gfx803, gfx900, gfx900:xnack-,
                                      gfx902, gfx904, gfx906, gfx906:xnack-, gfx908, gfx908:xnack-, gfx909, gfx90a, gfx90a:xnack+,
                                      gfx90a:xnack-, gfx90c, gfx940, gfx941, gfx942
              AMD GPU architecture

    Build Dependencies:
        blas       giflib   hipsolver     kokkos          llvm-amdgpu  mpfr             parmetis   rocrand    scotch        trilinos
        cgns       gmake    hipsparse     kokkos-kernels  memkind      mpi              parmmg     rocsolver  sowing        valgrind
        cuda       gmp      hsa-rocr-dev  lapack          metis        mumps            python     rocsparse  strumpack     zlib-api
        diffutils  hdf5     hwloc         libpng          mkl          netcdf-c         random123  rocthrust  suite-sparse  zoltan
        exodusii   hip      hypre         libx11          mmg          p4est            rocblas    saws       superlu-dist
        fftw       hipblas  jpeg          libyaml         moab         parallel-netcdf  rocprim    scalapack  tetgen

    Link Dependencies:
        blas      gmake      hipsparse     kokkos-kernels  memkind  mpi              parmmg     rocsparse  strumpack     zlib-api
        cgns      gmp        hsa-rocr-dev  lapack          metis    mumps            random123  rocthrust  suite-sparse  zoltan
        cuda      hdf5       hwloc         libpng          mkl      netcdf-c         rocblas    saws       superlu-dist
        exodusii  hip        hypre         libx11          mmg      p4est            rocprim    scalapack  tetgen
        fftw      hipblas    jpeg          libyaml         moab     parallel-netcdf  rocrand    scotch     trilinos
        giflib    hipsolver  kokkos        llvm-amdgpu     mpfr     parmetis         rocsolver  sowing     valgrind

    Run Dependencies:
        None

    Licenses:
        None
    ```

**Concretization and installation**

As indicated above, Spack can be *very* complex and often requires iteration to behave as intended - this is certainly the case with PETSc.  Below we walk through some common issues and their resolution.

As a first attempt, we use the `spec` subcommand to inspect the results of Spack's concretization. Inspecting the output of `spack spec -I -l petsc %gcc@12.2.0 ^cray-mpich@8.1.27` shows an incompatible mix of compilers are chosen for PETSc and some of its dependencies. (expand the box below for full details).
??? danger "Simple `spack spec` concretization - *FAILS to build*"
    In this case a first attempt to concretize the package produces an environment that will fail to compile.
    ```pre
    $ spack spec -I -l petsc %gcc@12.2.0 ^cray-mpich@8.1.27
    Input spec
    --------------------------------
     -   petsc%gcc@12.2.0
     -       ^cray-mpich@8.1.27

    Concretized
    --------------------------------
     -   ffwwiqs  petsc@3.20.2%gcc@12.2.0~X~batch~cgns~complex~cuda~debug+double~exodusii~fftw+fortran~giflib+hdf5~hpddm~hwloc+hypre~int64~jpeg~knl~kokkos~libpng~libyaml~memkind+metis~mkl-pardiso~mmg~moab~mpfr+mpi~mumps~openmp~p4est~parmmg~ptscotch~random123~rocm~saws~scalapack+shared~strumpack~suite-sparse+superlu-dist~sycl~tetgen~trilinos~valgrind~zoltan build_system=generic clanguage=C memalign=none arch=linux-sles15-x86_64_v3
    [e]  s6pw3zg      ^cray-libsci@23.09.1.1%gcc@12.2.0~mpi~openmp+shared build_system=generic arch=linux-sles15-x86_64_v3
    [e]  yvsz3yb      ^cray-mpich@8.1.27%gcc@12.2.0+wrappers build_system=generic arch=linux-sles15-x86_64_v3
    [e]  cmszzch      ^diffutils@3.6%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [e]  c6c6ilx      ^gmake@4.2.1%gcc@7.5.0~guile build_system=autotools patches=ca60bd9,fe5b60d arch=linux-sles15-x86_64_v3
    [^]  5gpbw4b      ^hdf5@1.12.2%gcc@12.2.0+cxx+fortran+hl~ipo~java+mpi+shared+szip~threadsafe+tools api=default build_system=cmake build_type=Release generator=make arch=linux-sles15-x86_64_v3
    [^]  k34xtup          ^cmake@3.26.3%gcc@7.5.0~doc+ncurses+ownlibs build_system=generic build_type=Release arch=linux-sles15-x86_64_v3
    [^]  uq6yiht              ^curl@8.1.2%gcc@7.5.0~gssapi~ldap+libidn2~librtmp~libssh+libssh2+nghttp2 build_system=autotools libs=shared,static tls=mbedtls,openssl arch=linux-sles15-x86_64_v3
    [^]  h3pxskh                  ^libidn2@2.3.4%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  222jsqf                      ^libunistring@1.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  qgbb6js                  ^libssh2@1.10.0%gcc@7.5.0+shared build_system=autotools crypto=mbedtls patches=011d926 arch=linux-sles15-x86_64_v3
    [^]  xeqdxhr                  ^mbedtls@2.28.2%gcc@7.5.0+pic build_system=makefile build_type=Release libs=shared,static arch=linux-sles15-x86_64_v3
    [^]  k6lzdqf                  ^nghttp2@1.48.0%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  cg5o2it          ^libszip@2.1.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [e]  xexiyjr          ^pkg-config@0.29.2%gcc@7.5.0+internal_glib build_system=autotools arch=linux-sles15-x86_64_v3
     -   ejdvsxb      ^hypre@2.30.0%gcc@7.5.0~caliper~complex~cuda~debug+fortran~gptune~int64~internal-superlu~magma~mixedint+mpi~openmp~rocm+shared~superlu-dist~sycl~umpire~unified-memory build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  6pby7bq      ^metis@5.1.0%gcc@12.2.0~gdb~int64~ipo~real64+shared build_system=cmake build_type=Release generator=make patches=4991da9,93a7903,b1225da arch=linux-sles15-x86_64_v3
    [^]  ga7pmju      ^openblas@0.3.25%gcc@7.5.0~bignuma~consistent_fpcsr+fortran~ilp64+locking+pic+shared build_system=makefile symbol_suffix=none threads=openmp arch=linux-sles15-x86_64_v3
    [^]  jqrnm24          ^perl@5.38.0%gcc@7.5.0+cpanm+opcode+open+shared+threads build_system=generic arch=linux-sles15-x86_64_v3
    [^]  fizqd24              ^berkeley-db@18.1.40%gcc@7.5.0+cxx~docs+stl build_system=autotools patches=26090f4,b231fcc arch=linux-sles15-x86_64_v3
    [^]  7436gng      ^parmetis@4.0.3%gcc@12.2.0~gdb~int64~ipo+shared build_system=cmake build_type=Release generator=make patches=4f89253,50ed208,704b84f arch=linux-sles15-x86_64_v3
    [^]  lmsy2vj      ^python@3.10.12%gcc@7.5.0+bz2+crypt+ctypes+dbm~debug+libxml2+lzma~nis~optimizations+pic+pyexpat+pythoncmd+readline+shared+sqlite3+ssl~tkinter+uuid+zlib build_system=generic patches=0d98e93,7d40923,f2fd060 arch=linux-sles15-x86_64_v3
    [^]  adam562          ^bzip2@1.0.8%gcc@7.5.0~debug~pic+shared build_system=generic arch=linux-sles15-x86_64_v3
    [^]  ioxwsfz          ^expat@2.5.0%gcc@7.5.0+libbsd build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  fb4m5js              ^libbsd@0.11.7%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  huw6hi3                  ^libmd@1.0.4%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  wsmcahk          ^gdbm@1.23%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  al2lizj          ^gettext@0.21.1%gcc@7.5.0+bzip2+curses+git~libunistring+libxml2+tar+xz build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  k4pmi3f              ^libiconv@1.17%gcc@7.5.0 build_system=autotools libs=shared,static arch=linux-sles15-x86_64_v3
    [^]  p2qilsy              ^libxml2@2.10.3%gcc@7.5.0~python build_system=autotools arch=linux-sles15-x86_64_v3
    [e]  c4brufk              ^tar@1.34%gcc@7.5.0 build_system=autotools zip=pigz arch=linux-sles15-x86_64_v3
    [^]  as5rojq          ^libffi@3.3%gcc@7.5.0 build_system=autotools patches=26f26c6 arch=linux-sles15-x86_64_v3
    [^]  u5teb4s          ^libxcrypt@4.4.35%gcc@7.5.0~obsolete_api build_system=autotools patches=4885da3 arch=linux-sles15-x86_64_v3
    [^]  w4gepfm          ^ncurses@6.4%gcc@7.5.0~symlinks+termlib abi=none build_system=autotools arch=linux-sles15-x86_64_v3
    [e]  ohtkism          ^openssl@1.1.1l%gcc@7.5.0~docs+shared build_system=generic certs=system arch=linux-sles15-x86_64_v3
    [^]  npfqu2h          ^readline@8.2%gcc@7.5.0 build_system=autotools patches=bbf97f1 arch=linux-sles15-x86_64_v3
    [^]  a5yrh7q          ^sqlite@3.42.0%gcc@7.5.0+column_metadata+dynamic_extensions+fts~functions+rtree build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  rhcskli          ^util-linux-uuid@2.38.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  fvguvlm          ^xz@5.4.1%gcc@7.5.0~pic build_system=autotools libs=shared,static arch=linux-sles15-x86_64_v3
     -   75imrcu      ^superlu-dist@8.2.1%gcc@7.5.0~cuda~int64~ipo+openmp+parmetis~rocm+shared build_system=cmake build_type=Release generator=make arch=linux-sles15-x86_64_v3
    [^]  5tno2tn          ^cmake@3.27.9%gcc@7.5.0~doc+ncurses+ownlibs build_system=generic build_type=Release arch=linux-sles15-x86_64_v3
    [^]  wsgus7v              ^curl@8.4.0%gcc@7.5.0~gssapi~ldap+libidn2~librtmp~libssh+libssh2+nghttp2 build_system=autotools libs=shared,static tls=mbedtls,openssl arch=linux-sles15-x86_64_v3
    [^]  nptl6x4                  ^libssh2@1.11.0%gcc@7.5.0+shared build_system=autotools crypto=mbedtls patches=011d926 arch=linux-sles15-x86_64_v3
    [^]  qplzqrc                  ^nghttp2@1.52.0%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
    [^]  g42iifh      ^zlib@1.2.13%gcc@7.5.0+optimize+pic+shared build_system=makefile arch=linux-sles15-x86_64_v3
    ```

    The failure come when executing the installation:

    ```pre
    $ spack install petsc %gcc@12.2.0 ^cray-mpich@8.1.27
    ==> cray-libsci@23.09.1.1 : has external module in ['cray-libsci/23.09.1.1']
    [+] /opt/cray/pe/libsci/23.09.1.1/GNU/10.3/x86_64 (external cray-libsci-23.09.1.1-s6pw3zgxapeujg4lxclc5oq6uve2xukt)
    [+] /opt/cray/pe/mpich/8.1.27/ofi/gnu/9.1 (external cray-mpich-8.1.27-yvsz3ybmwjrasfc3wglr74kws436kdxi)
    [+] /usr (external diffutils-3.6-cmszzchvhq7tkk5l7yh4pyobhkyvggkp)
    [+] /usr (external gmake-4.2.1-c6c6ilxfypykkx3h5cim2m2pwetff3am)
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libszip/2.1.1/gcc/7.5.0/cg5o
    [+] /usr (external pkg-config-0.29.2-xexiyjrydh2tgkwyarrkuyypp5j5kk6u)
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/zlib/1.2.13/gcc/7.5.0/g42i
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libmd/1.0.4/gcc/7.5.0/huw6
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libiconv/1.17/gcc/7.5.0/k4pm
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/xz/5.4.1/gcc/7.5.0/fvgu
    [+] /usr (external tar-1.34-c4brufknf7g5y3uyqt6p2abxskdr4cqp)
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libffi/3.3/gcc/7.5.0/as5r
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libxcrypt/4.4.35/gcc/7.5.0/u5te
    [+] /usr (external openssl-1.1.1l-ohtkismy4sfbvpeuaflwaxk6nhskejgm)
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/mbedtls/2.28.2/gcc/7.5.0/xeqd
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/bzip2/1.0.8/gcc/7.5.0/adam
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/metis/5.1.0/gcc/12.2.0/6pby
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/openblas/0.3.25/gcc/7.5.0/ga7p
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/util-linux-uuid/2.38.1/gcc/7.5.0/rhcs
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/ncurses/6.4/gcc/7.5.0/w4ge
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/nghttp2/1.52.0/gcc/7.5.0/qplz
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/hdf5/1.12.2/cray-mpich/8.1.27/gcc/12.2.0/5gpb
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libbsd/0.11.7/gcc/7.5.0/fb4m
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libunistring/1.1/gcc/7.5.0/222j
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libxml2/2.10.3/gcc/7.5.0/p2qi
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libssh2/1.11.0/gcc/7.5.0/nptl
    [+] /glade/u/apps/derecho/23.09/spack/opt/spack/parmetis/4.0.3/cray-mpich/8.1.27/gcc/12.2.0/7436
    ==> Installing hypre-2.30.0-ejdvsxbw5o7bjjfyhm43u3f6v6qgs4te [28/39]
    ==> No binary for hypre-2.30.0-ejdvsxbw5o7bjjfyhm43u3f6v6qgs4te found: installing from source
    ==> Using cached archive: /glade/derecho/scratch/benkirk/temp/spack/cache/_source-cache/archive/8e/8e2af97d9a25bf44801c6427779f823ebc6f306438066bba7fcbc2a5f9b78421.tar.gz
    ==> No patches needed for hypre
    ==> hypre: Executing phase: 'autoreconf'
    ==> hypre: Executing phase: 'configure'
    ==> Error: ProcessError: Command exited with status 77:
        '/glade/derecho/scratch/benkirk/temp/spack/derecho/23.09/builds/spack-stage-hypre-2.30.0-ejdvsxbw5o7bjjfyhm43u3f6v6qgs4te/spack-src/src/configure' '--prefix=/glade/work/benkirk/spack-downstreams/derecho/23.09/opt/spack/hypre/2.30.0/cray-mpich/8.1.27/gcc/7.5.0/ejdv' '--prefix=/glade/work/benkirk/spack-downstreams/derecho/23.09/opt/spack/hypre/2.30.0/cray-mpich/8.1.27/gcc/7.5.0/ejdv' '--with-lapack-libs=sci_gnu' '--with-lapack-lib-dirs=/opt/cray/pe/libsci/23.09.1.1/GNU/10.3/x86_64/lib' '--with-blas-libs=openblas' '--with-blas-lib-dirs=/glade/u/apps/derecho/23.09/spack/opt/spack/openblas/0.3.25/gcc/7.5.0/ga7p/lib' '--with-MPI' '--with-MPI-lib-dirs=/opt/cray/pe/mpich/8.1.27/ofi/gnu/9.1/lib' '--with-MPI-include=/opt/cray/pe/mpich/8.1.27/ofi/gnu/9.1/include' '--without-openmp' '--disable-bigint' '--disable-mixedint' '--disable-complex' '--enable-shared' '--without-superlu' '--without-mli' '--without-fei' '--disable-debug' '--without-cuda' '--disable-curand' '--disable-cusparse' '--without-hip' '--disable-rocrand' '--disable-rocsparse' '--enable-fortran'

    2 errors found in build log:
         15    checking build system type... x86_64-pc-linux-gnu
         16    checking host system type... x86_64-pc-linux-gnu
         17    checking whether make sets $(MAKE)... yes
         18    checking for ranlib... ranlib
         19    checking for gcc... /opt/cray/pe/mpich/8.1.27/ofi/gnu/9.1/bin/mpicc
         20    checking whether the C compiler works... no
      >> 21    configure: error: in `/glade/derecho/scratch/benkirk/temp/spack/derecho/23.09/builds/spack-stage-hypre-2.30.0-ejdvsxbw5o7bjjfyhm43u3f6v6qgs4te/spack-src/src':
      >> 22    configure: error: C compiler cannot create executables
         23    See `config.log' for more details
    ```
    The root cause of this failure is that Spack is trying to build the `hypre` dependency with the base OS compiler (`gcc@7.5.0`), however this compiler is incompatible with the system MPI implementation.



To fix this issue we need to be very explicit with the concretization by requiring the additional dependencies to be compiled with the same compiler.

???+ example "Fully specified `spack spec` concretization - *build succeeds*"
    === "CPU Only"
        ```pre
        $ spack spec -I -l petsc %gcc@12.2.0 ^cray-mpich@8.1.27  ^hypre%gcc@12.2.0 ^superlu-dist%gcc@12.2.0
        Input spec
        --------------------------------
         -   petsc%gcc@12.2.0
         -       ^cray-mpich@8.1.27
         -       ^hypre%gcc@12.2.0
         -       ^superlu-dist%gcc@12.2.0

        Concretized
        --------------------------------
         -   g2oylxs  petsc@3.20.2%gcc@12.2.0~X~batch~cgns~complex~cuda~debug+double~exodusii~fftw+fortran~giflib+hdf5~hpddm~hwloc+hypre~int64~jpeg~knl~kokkos~libpng~libyaml~memkind+metis~mkl-pardiso~mmg~moab~mpfr+mpi~mumps~openmp~p4est~parmmg~ptscotch~random123~rocm~saws~scalapack+shared~strumpack~suite-sparse+superlu-dist~sycl~tetgen~trilinos~valgrind~zoltan build_system=generic clanguage=C memalign=none arch=linux-sles15-x86_64_v3
        [e]  s6pw3zg      ^cray-libsci@23.09.1.1%gcc@12.2.0~mpi~openmp+shared build_system=generic arch=linux-sles15-x86_64_v3
        [e]  yvsz3yb      ^cray-mpich@8.1.27%gcc@12.2.0+wrappers build_system=generic arch=linux-sles15-x86_64_v3
        [e]  cmszzch      ^diffutils@3.6%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [e]  c6c6ilx      ^gmake@4.2.1%gcc@7.5.0~guile build_system=autotools patches=ca60bd9,fe5b60d arch=linux-sles15-x86_64_v3
        [^]  5gpbw4b      ^hdf5@1.12.2%gcc@12.2.0+cxx+fortran+hl~ipo~java+mpi+shared+szip~threadsafe+tools api=default build_system=cmake build_type=Release generator=make arch=linux-sles15-x86_64_v3
        [^]  k34xtup          ^cmake@3.26.3%gcc@7.5.0~doc+ncurses+ownlibs build_system=generic build_type=Release arch=linux-sles15-x86_64_v3
        [^]  uq6yiht              ^curl@8.1.2%gcc@7.5.0~gssapi~ldap+libidn2~librtmp~libssh+libssh2+nghttp2 build_system=autotools libs=shared,static tls=mbedtls,openssl arch=linux-sles15-x86_64_v3
        [^]  h3pxskh                  ^libidn2@2.3.4%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  222jsqf                      ^libunistring@1.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  qgbb6js                  ^libssh2@1.10.0%gcc@7.5.0+shared build_system=autotools crypto=mbedtls patches=011d926 arch=linux-sles15-x86_64_v3
        [^]  xeqdxhr                  ^mbedtls@2.28.2%gcc@7.5.0+pic build_system=makefile build_type=Release libs=shared,static arch=linux-sles15-x86_64_v3
        [^]  k6lzdqf                  ^nghttp2@1.48.0%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  cg5o2it          ^libszip@2.1.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [e]  xexiyjr          ^pkg-config@0.29.2%gcc@7.5.0+internal_glib build_system=autotools arch=linux-sles15-x86_64_v3
         -   pkt7p2t      ^hypre@2.30.0%gcc@12.2.0~caliper~complex~cuda~debug+fortran~gptune~int64~internal-superlu~magma~mixedint+mpi~openmp~rocm+shared~superlu-dist~sycl~umpire~unified-memory build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  6pby7bq      ^metis@5.1.0%gcc@12.2.0~gdb~int64~ipo~real64+shared build_system=cmake build_type=Release generator=make patches=4991da9,93a7903,b1225da arch=linux-sles15-x86_64_v3
        [^]  7436gng      ^parmetis@4.0.3%gcc@12.2.0~gdb~int64~ipo+shared build_system=cmake build_type=Release generator=make patches=4f89253,50ed208,704b84f arch=linux-sles15-x86_64_v3
        [^]  lmsy2vj      ^python@3.10.12%gcc@7.5.0+bz2+crypt+ctypes+dbm~debug+libxml2+lzma~nis~optimizations+pic+pyexpat+pythoncmd+readline+shared+sqlite3+ssl~tkinter+uuid+zlib build_system=generic patches=0d98e93,7d40923,f2fd060 arch=linux-sles15-x86_64_v3
        [^]  adam562          ^bzip2@1.0.8%gcc@7.5.0~debug~pic+shared build_system=generic arch=linux-sles15-x86_64_v3
        [^]  ioxwsfz          ^expat@2.5.0%gcc@7.5.0+libbsd build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  fb4m5js              ^libbsd@0.11.7%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  huw6hi3                  ^libmd@1.0.4%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  wsmcahk          ^gdbm@1.23%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  al2lizj          ^gettext@0.21.1%gcc@7.5.0+bzip2+curses+git~libunistring+libxml2+tar+xz build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  k4pmi3f              ^libiconv@1.17%gcc@7.5.0 build_system=autotools libs=shared,static arch=linux-sles15-x86_64_v3
        [^]  p2qilsy              ^libxml2@2.10.3%gcc@7.5.0~python build_system=autotools arch=linux-sles15-x86_64_v3
        [e]  c4brufk              ^tar@1.34%gcc@7.5.0 build_system=autotools zip=pigz arch=linux-sles15-x86_64_v3
        [^]  as5rojq          ^libffi@3.3%gcc@7.5.0 build_system=autotools patches=26f26c6 arch=linux-sles15-x86_64_v3
        [^]  u5teb4s          ^libxcrypt@4.4.35%gcc@7.5.0~obsolete_api build_system=autotools patches=4885da3 arch=linux-sles15-x86_64_v3
        [^]  jqrnm24              ^perl@5.38.0%gcc@7.5.0+cpanm+opcode+open+shared+threads build_system=generic arch=linux-sles15-x86_64_v3
        [^]  fizqd24                  ^berkeley-db@18.1.40%gcc@7.5.0+cxx~docs+stl build_system=autotools patches=26090f4,b231fcc arch=linux-sles15-x86_64_v3
        [^]  w4gepfm          ^ncurses@6.4%gcc@7.5.0~symlinks+termlib abi=none build_system=autotools arch=linux-sles15-x86_64_v3
        [e]  ohtkism          ^openssl@1.1.1l%gcc@7.5.0~docs+shared build_system=generic certs=system arch=linux-sles15-x86_64_v3
        [^]  npfqu2h          ^readline@8.2%gcc@7.5.0 build_system=autotools patches=bbf97f1 arch=linux-sles15-x86_64_v3
        [^]  a5yrh7q          ^sqlite@3.42.0%gcc@7.5.0+column_metadata+dynamic_extensions+fts~functions+rtree build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  rhcskli          ^util-linux-uuid@2.38.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  fvguvlm          ^xz@5.4.1%gcc@7.5.0~pic build_system=autotools libs=shared,static arch=linux-sles15-x86_64_v3
        [^]  nn2avnu      ^superlu-dist@8.1.2%gcc@12.2.0~cuda~int64~ipo+openmp~rocm+shared build_system=cmake build_type=Release generator=make arch=linux-sles15-x86_64_v3
        [^]  g42iifh      ^zlib@1.2.13%gcc@7.5.0+optimize+pic+shared build_system=makefile arch=linux-sles15-x86_64_v3
        ```
        The first column shows packages that will be compiled (`-`), are available already compiled upstream (`[^]`), or specified as an "external" available on the system (`[e]`).
        By forcing PETSc and its dependencies `hypre` and `superlu-dist` to use the same compiler we arrive at a consistent concretization that will succeed.  Since both of these packages require MPI, it is important they use a compiler version compatible with our MPI selection.

        ```pre
        $ spack install petsc %gcc@12.2.0 ^cray-mpich@8.1.27  ^hypre%gcc@12.2.0 ^superlu-dist%gcc@12.2.0
        ==> cray-libsci@23.09.1.1 : has external module in ['cray-libsci/23.09.1.1']
        [+] /opt/cray/pe/libsci/23.09.1.1/GNU/10.3/x86_64 (external cray-libsci-23.09.1.1-s6pw3zgxapeujg4lxclc5oq6uve2xukt)
        [+] /opt/cray/pe/mpich/8.1.27/ofi/gnu/9.1 (external cray-mpich-8.1.27-yvsz3ybmwjrasfc3wglr74kws436kdxi)
        [+] /usr (external diffutils-3.6-cmszzchvhq7tkk5l7yh4pyobhkyvggkp)
        [+] /usr (external gmake-4.2.1-c6c6ilxfypykkx3h5cim2m2pwetff3am)
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libszip/2.1.1/gcc/7.5.0/cg5o
        [+] /usr (external pkg-config-0.29.2-xexiyjrydh2tgkwyarrkuyypp5j5kk6u)
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/zlib/1.2.13/gcc/7.5.0/g42i
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libmd/1.0.4/gcc/7.5.0/huw6
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libiconv/1.17/gcc/7.5.0/k4pm
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/xz/5.4.1/gcc/7.5.0/fvgu
        [+] /usr (external tar-1.34-c4brufknf7g5y3uyqt6p2abxskdr4cqp)
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libffi/3.3/gcc/7.5.0/as5r
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libxcrypt/4.4.35/gcc/7.5.0/u5te
        [+] /usr (external openssl-1.1.1l-ohtkismy4sfbvpeuaflwaxk6nhskejgm)
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/bzip2/1.0.8/gcc/7.5.0/adam
        ==> Installing hypre-2.30.0-pkt7p2tqfyvhokczgzsggna47a45uv5c [16/31]
        ==> No binary for hypre-2.30.0-pkt7p2tqfyvhokczgzsggna47a45uv5c found: installing from source
        ==> Using cached archive: /glade/derecho/scratch/benkirk/temp/spack/cache/_source-cache/archive/8e/8e2af97d9a25bf44801c6427779f823ebc6f306438066bba7fcbc2a5f9b78421.tar.gz
        ==> No patches needed for hypre
        ==> hypre: Executing phase: 'autoreconf'
        ==> hypre: Executing phase: 'configure'
        ==> hypre: Executing phase: 'build'
        ==> hypre: Executing phase: 'install'
        ==> hypre: Successfully installed hypre-2.30.0-pkt7p2tqfyvhokczgzsggna47a45uv5c
          Stage: 2.24s.  Autoreconf: 0.00s.  Configure: 7.14s.  Build: 1m 14.89s.  Install: 1.03s.  Post-install: 0.64s.  Total: 1m 26.43s
        [+] /glade/work/benkirk/spack-downstreams/derecho/23.09/opt/spack/hypre/2.30.0/cray-mpich/8.1.27/gcc/12.2.0/pkt7
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/metis/5.1.0/gcc/12.2.0/6pby
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/util-linux-uuid/2.38.1/gcc/7.5.0/rhcs
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/ncurses/6.4/gcc/7.5.0/w4ge
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/hdf5/1.12.2/cray-mpich/8.1.27/gcc/12.2.0/5gpb
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libbsd/0.11.7/gcc/7.5.0/fb4m
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libxml2/2.10.3/gcc/7.5.0/p2qi
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/parmetis/4.0.3/cray-mpich/8.1.27/gcc/12.2.0/7436
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/readline/8.2/gcc/7.5.0/npfq
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/expat/2.5.0/gcc/7.5.0/ioxw
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/gettext/0.21.1/gcc/7.5.0/al2l
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/superlu-dist/8.1.2/cray-mpich/8.1.27/gcc/12.2.0/nn2a
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/gdbm/1.23/gcc/7.5.0/wsmc
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/sqlite/3.42.0/gcc/7.5.0/a5yr
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/python/3.10.12/gcc/7.5.0/lmsy
        ==> Installing petsc-3.20.2-g2oylxsmuytkrybcotolvtgou5ossbxv [31/31]
        ==> No binary for petsc-3.20.2-g2oylxsmuytkrybcotolvtgou5ossbxv found: installing from source
        ==> Using cached archive: /glade/derecho/scratch/benkirk/temp/spack/cache/_source-cache/archive/2a/2a2d08b5f0e3d0198dae2c42ce1fd036f25c153ef2bb4a2d320ca141ac7cd30b.tar.gz
        ==> No patches needed for petsc
        ==> petsc: Executing phase: 'configure'
        ==> petsc: Executing phase: 'build'
        ==> petsc: Executing phase: 'install'
        ==> petsc: Successfully installed petsc-3.20.2-g2oylxsmuytkrybcotolvtgou5ossbxv
          Stage: 10.65s.  Configure: 2m 25.38s.  Build: 3m 47.77s.  Install: 1m 23.96s.  Post-install: 13.80s.  Total: 8m 14.37s
        [+] /glade/work/benkirk/spack-downstreams/derecho/23.09/opt/spack/petsc/3.20.2/cray-mpich/8.1.27/gcc/12.2.0/g2oy
        ```

    === "CPU+GPU"
        ```pre
        $ spack spec -I -l petsc+cuda cuda_arch=80 %gcc@12.2.0 ^cray-mpich@8.1.27 ^hypre+cuda%gcc@12.2.0 cuda_arch=80 ^superlu-dist+cuda%gcc@12.2.0 cuda_arch=80
        Input spec
        --------------------------------
         -   petsc%gcc@12.2.0+cuda cuda_arch=80
         -       ^cray-mpich@8.1.27
         -       ^hypre%gcc@12.2.0+cuda cuda_arch=80
         -       ^superlu-dist%gcc@12.2.0+cuda cuda_arch=80

        Concretized
        --------------------------------
         -   o4gwd3u  petsc@3.20.2%gcc@12.2.0~X~batch~cgns~complex+cuda~debug+double~exodusii~fftw+fortran~giflib+hdf5~hpddm~hwloc+hypre~int64~jpeg~knl~kokkos~libpng~libyaml~memkind+metis~mkl-pardiso~mmg~moab~mpfr+mpi~mumps~openmp~p4est~parmmg~ptscotch~random123~rocm~saws~scalapack+shared~strumpack~suite-sparse+superlu-dist~sycl~tetgen~trilinos~valgrind~zoltan build_system=generic clanguage=C cuda_arch=80 memalign=none arch=linux-sles15-x86_64_v3
        [e]  s6pw3zg      ^cray-libsci@23.09.1.1%gcc@12.2.0~mpi~openmp+shared build_system=generic arch=linux-sles15-x86_64_v3
        [e]  yvsz3yb      ^cray-mpich@8.1.27%gcc@12.2.0+wrappers build_system=generic arch=linux-sles15-x86_64_v3
        [e]  ulf4uky      ^cuda@12.2.1%gcc@7.5.0+allow-unsupported-compilers~dev build_system=generic arch=linux-sles15-x86_64_v3
        [e]  cmszzch      ^diffutils@3.6%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [e]  c6c6ilx      ^gmake@4.2.1%gcc@7.5.0~guile build_system=autotools patches=ca60bd9,fe5b60d arch=linux-sles15-x86_64_v3
        [^]  5gpbw4b      ^hdf5@1.12.2%gcc@12.2.0+cxx+fortran+hl~ipo~java+mpi+shared+szip~threadsafe+tools api=default build_system=cmake build_type=Release generator=make arch=linux-sles15-x86_64_v3
        [^]  k34xtup          ^cmake@3.26.3%gcc@7.5.0~doc+ncurses+ownlibs build_system=generic build_type=Release arch=linux-sles15-x86_64_v3
        [^]  uq6yiht              ^curl@8.1.2%gcc@7.5.0~gssapi~ldap+libidn2~librtmp~libssh+libssh2+nghttp2 build_system=autotools libs=shared,static tls=mbedtls,openssl arch=linux-sles15-x86_64_v3
        [^]  h3pxskh                  ^libidn2@2.3.4%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  222jsqf                      ^libunistring@1.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  qgbb6js                  ^libssh2@1.10.0%gcc@7.5.0+shared build_system=autotools crypto=mbedtls patches=011d926 arch=linux-sles15-x86_64_v3
        [^]  xeqdxhr                  ^mbedtls@2.28.2%gcc@7.5.0+pic build_system=makefile build_type=Release libs=shared,static arch=linux-sles15-x86_64_v3
        [^]  k6lzdqf                  ^nghttp2@1.48.0%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  cg5o2it          ^libszip@2.1.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [e]  xexiyjr          ^pkg-config@0.29.2%gcc@7.5.0+internal_glib build_system=autotools arch=linux-sles15-x86_64_v3
         -   b7zm6wf      ^hypre@2.30.0%gcc@12.2.0~caliper~complex+cuda~debug+fortran~gptune~int64~internal-superlu~magma~mixedint+mpi~openmp~rocm+shared~superlu-dist~sycl~umpire~unified-memory build_system=autotools cuda_arch=80 arch=linux-sles15-x86_64_v3
        [^]  6pby7bq      ^metis@5.1.0%gcc@12.2.0~gdb~int64~ipo~real64+shared build_system=cmake build_type=Release generator=make patches=4991da9,93a7903,b1225da arch=linux-sles15-x86_64_v3
        [^]  7436gng      ^parmetis@4.0.3%gcc@12.2.0~gdb~int64~ipo+shared build_system=cmake build_type=Release generator=make patches=4f89253,50ed208,704b84f arch=linux-sles15-x86_64_v3
        [^]  lmsy2vj      ^python@3.10.12%gcc@7.5.0+bz2+crypt+ctypes+dbm~debug+libxml2+lzma~nis~optimizations+pic+pyexpat+pythoncmd+readline+shared+sqlite3+ssl~tkinter+uuid+zlib build_system=generic patches=0d98e93,7d40923,f2fd060 arch=linux-sles15-x86_64_v3
        [^]  adam562          ^bzip2@1.0.8%gcc@7.5.0~debug~pic+shared build_system=generic arch=linux-sles15-x86_64_v3
        [^]  ioxwsfz          ^expat@2.5.0%gcc@7.5.0+libbsd build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  fb4m5js              ^libbsd@0.11.7%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  huw6hi3                  ^libmd@1.0.4%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  wsmcahk          ^gdbm@1.23%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  al2lizj          ^gettext@0.21.1%gcc@7.5.0+bzip2+curses+git~libunistring+libxml2+tar+xz build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  k4pmi3f              ^libiconv@1.17%gcc@7.5.0 build_system=autotools libs=shared,static arch=linux-sles15-x86_64_v3
        [^]  p2qilsy              ^libxml2@2.10.3%gcc@7.5.0~python build_system=autotools arch=linux-sles15-x86_64_v3
        [e]  c4brufk              ^tar@1.34%gcc@7.5.0 build_system=autotools zip=pigz arch=linux-sles15-x86_64_v3
        [^]  as5rojq          ^libffi@3.3%gcc@7.5.0 build_system=autotools patches=26f26c6 arch=linux-sles15-x86_64_v3
        [^]  u5teb4s          ^libxcrypt@4.4.35%gcc@7.5.0~obsolete_api build_system=autotools patches=4885da3 arch=linux-sles15-x86_64_v3
        [^]  jqrnm24              ^perl@5.38.0%gcc@7.5.0+cpanm+opcode+open+shared+threads build_system=generic arch=linux-sles15-x86_64_v3
        [^]  fizqd24                  ^berkeley-db@18.1.40%gcc@7.5.0+cxx~docs+stl build_system=autotools patches=26090f4,b231fcc arch=linux-sles15-x86_64_v3
        [^]  w4gepfm          ^ncurses@6.4%gcc@7.5.0~symlinks+termlib abi=none build_system=autotools arch=linux-sles15-x86_64_v3
        [e]  ohtkism          ^openssl@1.1.1l%gcc@7.5.0~docs+shared build_system=generic certs=system arch=linux-sles15-x86_64_v3
        [^]  npfqu2h          ^readline@8.2%gcc@7.5.0 build_system=autotools patches=bbf97f1 arch=linux-sles15-x86_64_v3
        [^]  a5yrh7q          ^sqlite@3.42.0%gcc@7.5.0+column_metadata+dynamic_extensions+fts~functions+rtree build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  rhcskli          ^util-linux-uuid@2.38.1%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  fvguvlm          ^xz@5.4.1%gcc@7.5.0~pic build_system=autotools libs=shared,static arch=linux-sles15-x86_64_v3
         -   rwirlv2      ^superlu-dist@8.2.1%gcc@12.2.0+cuda~int64~ipo+openmp+parmetis~rocm+shared build_system=cmake build_type=Release cuda_arch=80 generator=make arch=linux-sles15-x86_64_v3
        [^]  5tno2tn          ^cmake@3.27.9%gcc@7.5.0~doc+ncurses+ownlibs build_system=generic build_type=Release arch=linux-sles15-x86_64_v3
        [^]  wsgus7v              ^curl@8.4.0%gcc@7.5.0~gssapi~ldap+libidn2~librtmp~libssh+libssh2+nghttp2 build_system=autotools libs=shared,static tls=mbedtls,openssl arch=linux-sles15-x86_64_v3
        [^]  nptl6x4                  ^libssh2@1.11.0%gcc@7.5.0+shared build_system=autotools crypto=mbedtls patches=011d926 arch=linux-sles15-x86_64_v3
        [^]  qplzqrc                  ^nghttp2@1.52.0%gcc@7.5.0 build_system=autotools arch=linux-sles15-x86_64_v3
        [^]  g42iifh      ^zlib@1.2.13%gcc@7.5.0+optimize+pic+shared build_system=makefile arch=linux-sles15-x86_64_v3
        ```

        The first column shows packages that will be compiled (`-`), are available already compiled upstream (`[^]`), or specified as an "external" available on the system (`[e]`).
        By forcing PETSc and its dependencies `hypre` and `superlu-dist` to use the same compiler we arrive at a consistent concretization that will succeed. Since both of these packages require MPI, it is important they use a compiler version compatible with our MPI selection.

        ```pre
        $ spack install petsc+cuda cuda_arch=80 %gcc@12.2.0 ^cray-mpich@8.1.27 ^hypre+cuda%gcc@12.2.0 cuda_arch=80 ^superlu-dist+cuda%gcc@12.2.0 cuda_arch=80
        ==> cray-libsci@23.09.1.1 : has external module in ['cray-libsci/23.09.1.1']
        [+] /opt/cray/pe/libsci/23.09.1.1/GNU/10.3/x86_64 (external cray-libsci-23.09.1.1-s6pw3zgxapeujg4lxclc5oq6uve2xukt)
        [+] /opt/cray/pe/mpich/8.1.27/ofi/gnu/9.1 (external cray-mpich-8.1.27-yvsz3ybmwjrasfc3wglr74kws436kdxi)
        [+] /glade/u/apps/common/23.08/spack/opt/spack/cuda/12.2.1 (external cuda-12.2.1-ulf4ukyupnfjq6nf4e4eqjccyiedqspy)
        [+] /usr (external diffutils-3.6-cmszzchvhq7tkk5l7yh4pyobhkyvggkp)
        [+] /usr (external gmake-4.2.1-c6c6ilxfypykkx3h5cim2m2pwetff3am)
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libszip/2.1.1/gcc/7.5.0/cg5o
        [+] /usr (external pkg-config-0.29.2-xexiyjrydh2tgkwyarrkuyypp5j5kk6u)
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/zlib/1.2.13/gcc/7.5.0/g42i
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libmd/1.0.4/gcc/7.5.0/huw6
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libiconv/1.17/gcc/7.5.0/k4pm
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/xz/5.4.1/gcc/7.5.0/fvgu
        [+] /usr (external tar-1.34-c4brufknf7g5y3uyqt6p2abxskdr4cqp)
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libffi/3.3/gcc/7.5.0/as5r
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libxcrypt/4.4.35/gcc/7.5.0/u5te
        [+] /usr (external openssl-1.1.1l-ohtkismy4sfbvpeuaflwaxk6nhskejgm)
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/mbedtls/2.28.2/gcc/7.5.0/xeqd
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/bzip2/1.0.8/gcc/7.5.0/adam
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/metis/5.1.0/gcc/12.2.0/6pby
        ==> Installing hypre-2.30.0-b7zm6wfust4sewswibwrihnvs65kop2s [19/39]
        ==> No binary for hypre-2.30.0-b7zm6wfust4sewswibwrihnvs65kop2s found: installing from source
        ==> Using cached archive: /glade/derecho/scratch/benkirk/temp/spack/cache/_source-cache/archive/8e/8e2af97d9a25bf44801c6427779f823ebc6f306438066bba7fcbc2a5f9b78421.tar.gz
        ==> No patches needed for hypre
        ==> hypre: Executing phase: 'autoreconf'
        ==> hypre: Executing phase: 'configure'
        ==> hypre: Executing phase: 'build'
        ==> hypre: Executing phase: 'install'
        ==> hypre: Successfully installed hypre-2.30.0-b7zm6wfust4sewswibwrihnvs65kop2s
          Stage: 3.18s.  Autoreconf: 0.00s.  Configure: 7.74s.  Build: 7m 26.03s.  Install: 1.65s.  Post-install: 0.78s.  Total: 7m 39.80s
        [+] /glade/work/benkirk/spack-downstreams/derecho/23.09/opt/spack/hypre/2.30.0/cray-mpich/8.1.27/gcc/12.2.0/b7zm
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/util-linux-uuid/2.38.1/gcc/7.5.0/rhcs
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/ncurses/6.4/gcc/7.5.0/w4ge
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/nghttp2/1.52.0/gcc/7.5.0/qplz
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/hdf5/1.12.2/cray-mpich/8.1.27/gcc/12.2.0/5gpb
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libbsd/0.11.7/gcc/7.5.0/fb4m
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libunistring/1.1/gcc/7.5.0/222j
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libxml2/2.10.3/gcc/7.5.0/p2qi
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libssh2/1.11.0/gcc/7.5.0/nptl
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/parmetis/4.0.3/cray-mpich/8.1.27/gcc/12.2.0/7436
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/readline/8.2/gcc/7.5.0/npfq
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/expat/2.5.0/gcc/7.5.0/ioxw
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/libidn2/2.3.4/gcc/7.5.0/h3px
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/gettext/0.21.1/gcc/7.5.0/al2l
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/gdbm/1.23/gcc/7.5.0/wsmc
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/sqlite/3.42.0/gcc/7.5.0/a5yr
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/curl/8.4.0/gcc/7.5.0/wsgu
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/python/3.10.12/gcc/7.5.0/lmsy
        [+] /glade/u/apps/derecho/23.09/spack/opt/spack/cmake/3.27.9/gcc/7.5.0/5tno
        ==> Installing superlu-dist-8.2.1-rwirlv2hihsbgc4okox6md46b4yl64jz [38/39]
        ==> No binary for superlu-dist-8.2.1-rwirlv2hihsbgc4okox6md46b4yl64jz found: installing from source
        ==> Using cached archive: /glade/derecho/scratch/benkirk/temp/spack/cache/_source-cache/archive/b7/b77d065cafa6bc1a1dcc15bf23fd854f54b05762b165badcffc195835ad2bddf.tar.gz
        ==> No patches needed for superlu-dist
        ==> superlu-dist: Executing phase: 'cmake'
        ==> superlu-dist: Executing phase: 'build'
        ==> superlu-dist: Executing phase: 'install'
        ==> superlu-dist: Successfully installed superlu-dist-8.2.1-rwirlv2hihsbgc4okox6md46b4yl64jz
          Stage: 0.64s.  Cmake: 36.32s.  Build: 1m 31.25s.  Install: 1.87s.  Post-install: 0.66s.  Total: 2m 13.38s
        [+] /glade/work/benkirk/spack-downstreams/derecho/23.09/opt/spack/superlu-dist/8.2.1/cray-mpich/8.1.27/gcc/12.2.0/rwir
        ==> Installing petsc-3.20.2-o4gwd3ure7zxizajatvqimkaiplo3ggv [39/39]
        ==> No binary for petsc-3.20.2-o4gwd3ure7zxizajatvqimkaiplo3ggv found: installing from source
        ==> Using cached archive: /glade/derecho/scratch/benkirk/temp/spack/cache/_source-cache/archive/2a/2a2d08b5f0e3d0198dae2c42ce1fd036f25c153ef2bb4a2d320ca141ac7cd30b.tar.gz
        ==> No patches needed for petsc
        ==> petsc: Executing phase: 'configure'
        ==> petsc: Executing phase: 'build'
        ==> petsc: Executing phase: 'install'
        ==> Warning: Module file /glade/work/benkirk/spack-downstreams/derecho/modules/23.09/cray-mpich/8.1.27/gcc/12.2.0/petsc/3.20.2.lua exists and will not be overwritten
        ==> petsc: Successfully installed petsc-3.20.2-o4gwd3ure7zxizajatvqimkaiplo3ggv
          Stage: 14.00s.  Configure: 3m 8.69s.  Build: 5m 7.66s.  Install: 17.96s.  Post-install: 9.82s.  Total: 8m 59.57s
        [+] /glade/work/benkirk/spack-downstreams/derecho/23.09/opt/spack/petsc/3.20.2/cray-mpich/8.1.27/gcc/12.2.0/o4gw
        ```


**Module customization**

We now have two different configurations of the same PETSc version available. To distinguish between them at the module level we can use `spack config edit modules` to define a custom rule for when `+cuda` is used:
```pre
      projections:
        all: '{name}/{version}'
        [...]
        petsc+cuda: petsc/{version}-cuda
```
Then after running `spack module lmod refresh && module avail` we can access our custom installations as usual.
