# Overview

Users have the ability to customize and tailor their software environment to meet specific needs, using three different processes depending on use case:

!!! question "Modules vs. Conda - what's right for my use case?"
    The two main methods for gaining access to software are through the module systsem or conda environments. Understandably, this complexity is often the source of confusion.

    In general, users should prefer the [module system](modules.md) when leveraging
    performance-critical parallel computing, particularly with
    compiled languages and MPI.  NCAR's modules provide access to many
    versions of popular compiler suites, MPI implementations, and
    dependent software libraries, all compiled to achieve maximum performance
    on a particular host system CPU architecture.

    Conversely, [Conda](conda.md) provides a convenient mechanism for creating and
    sharing stand-alone, consistent software environments;
    particularly for Python and R usage. Conda environments are
    commonplace in data analysis and AI/ML workflows, where software
    packages often rely on a precise set of specifically configured
    dependencies.

    Conda packages typically work well in an HPC environment,
    with MPI being a common notable exception:  Conda-provided MPI implementations
    are usually configured for generic systems, and likely do not achieve
    optimal performance on "exotic" HPC networks.  If you run into difficulties
    with Conda and MPI packages, [reach out to consulting](../../user-support/index.md).


## Modules
Software [*modules*](./modules.md)  helps you identify software that is available on
the system and then load compatible packages. It manages complex
combinations of paths, environment variables, and dependencies automatically,
allowing many versions of software packages to be available across the
system, built with different combinations of compilers, communications libraries, etc...

Modules are a standard feature on most multi-user HPC systems to allow for
multiple, potentially conflicting versions of compilers and software to be available
to different users simultaneously.  See our
[Modules](modules.md) page for a full discussion of module usage.

## Conda
[Conda](./conda.md) is an open source package management
system and environment management system that runs on Windows, macOS,
and Linux. Conda installs, runs and updates packages and their
dependencies. Conda easily creates, saves, loads and switches between
environments on your local computer. It was created for Python
programs, but it can package and distribute software for any language.

Conda as a package manager helps you find and install packages. If you
need a package that requires a different version of Python, you do not
need to switch to a different environment manager, because `conda` is
also an environment manager. With just a few commands, you can set up
a totally separate environment to run that different version of
Python, while continuing to run your usual version of Python in your
normal environment.
(*For more details, see the [conda project documentation](https://docs.conda.io).*)

### Conda within an HPC Environment
NCAR system users [access Python via Conda environments](./conda.md), which
are self-contained installations of Python itself, Python packages,
and the software dependencies those packages rely on. We provide a
common `conda` module available through the [module system](./modules.md), and encourage all users to leverage
this common installation.

!!! tip "Prefer NCAR's common `conda` environment"
    While it is possible for users to install conda into their own
    personal workspaces, we discourage this approach.

    Instead, users shoud investigate the common `conda` environment
    module available through the [module system](./modules.md).  Using this common installation
    facilitates sharing environments between colleagues and is
    configured internally to make optimum use of the NCAR [GLADE file spaces](../../storage-systems/glade/index.md).

## Containers
