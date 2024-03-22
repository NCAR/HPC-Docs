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

The next time you run `module avail`, you should see a new module called `parallel-netcdf/1.12.3-debug`. This module (and any other downstream modules) will be annotated with a `(U)`, which signifies that the module is a user-generated downstream module.