# Quick start on Casper

Once you have [an account](../../getting-started/accounts/index.md),
have reviewed the [Casper Use Policies](./casper-use-policies.md),
and have a Casper [resource allocation](../../getting-started/managing-your-allocation.md)
you can log in and run jobs on the Casper data analysis and visualization cluster.

Casper has full access to [NCAR storage resources](../../storage-systems/index.md),
including [GLADE](../../storage-systems/glade/index.md).
Users can [transfer data](../../storage-systems/data-transfer/index.md) to and from Casper.


To run data analysis and visualization jobs on the Casper system's nodes, follow the
[procedures described here](./starting-casper-jobs/index.md).
There is no need to transfer output files from Derecho for this since
Derecho and Casper mount the same `GLADE` file systems.


!!! danger "Don’t run `sudo` on NCAR systems!"
    If you need help with tasks that you think require `sudo`
    privileges, or if you aren’t sure, please contact HPC User Support
    before trying to run `sudo` yourself. The command fails when
    unauthorized users run it and sends a security alert to system
    administrators.

## Logging In

To log in, start your terminal or Secure Shell client and run an `ssh` command as shown here:
```shell
ssh -X username@casper.ucar.edu
```

After running the `ssh` command, you will be asked to authenticate to finish logging in.

(The `-X` is optional and requests simple `X11` graphics forwarding to
your client. Some users (particularly on Macs) need to use `-Y`
instead of `-X` for `X11` forwarding. You can omit `username` in the
command above if your Casper username is the same as your username on
your local computer.)


-----

## Environment
The Casper HPC system uses **OpenSUSE Linux Version 15** and supports
widely used shells on its login and compute nodes. Users also have
several compiler and MPI library choices.

#### Shells
The default login shell for new Casper users is `bash`. You can
change the default after logging in to the Systems Accounting Manager
[(SAM)](../../getting-started/managing-your-allocation/index.md#using-the-systems-accounting-manager).
It may take several hours for a change you make to take effect. You
can confirm which shell is set as your default by entering `echo $SHELL`
on your Casper command line.

#### Environment modules
The Casper `module` utility enables users to easily load and unload
compilers and compatible software packages as needed, and to create
multiple customized environments for various tasks. See the
[Environment modules page](../../environment-and-software/user-environment/modules.md) for
a general discussion of `module` usage.  Casper's default module
environment is listed [here](./casper-modules.md).

-----


## Accessing software and compiling code
Casper users have access to Intel, NVIDIA, and GNU compilers. The **Intel** compiler and **OpenMPI** modules are loaded by default and provide access to pre-compiled [HPC Software](../../environment-and-software/hpc-software/index.md) and [Data Analysis and Visualization Resources](../../environment-and-software/data-analysis-and-visualization.md).

See this page for [a full discussion of compiling on Casper](./compiling-code-on-casper/index.md).

Many Casper data analysis and AI/ML workflows benefit instead from [using Conda](../../environment-and-software/user-environment/conda.md), especially [NCAR's Python Library (NPL)](../../environment-and-software/user-environment/conda.md/#the-ncar-python-library) or to gain access to several [Machine Learning Frameworks](../../environment-and-software/machine-learning-and-deep-learning.md).

-----

## Running jobs on Casper
Users can run a variety of types of jobs on Casper, including both traditional
[batch jobs submitted through PBS](../../pbs/index.md) and also interactive and/or graphics-intensive analysis, often through [remote desktops on Casper](./remote-desktop.md).

### Job scripts
Job scripts are discussed broadly [here](../../pbs/job-scripts/index.md).
Users already familiar with PBS and batch submission may find [Casper-specific PBS job scripts](./starting-casper-jobs/casper-job-script-examples.md) helpful in porting their work.

<!--  LocalWords:  Casper Derecho
 -->
