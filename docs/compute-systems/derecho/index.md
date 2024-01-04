
# Derecho

Installed in 2023, Derecho is NCAR's latest supercomputer.  Derecho features 2,488 compute nodes with 128 AMD Milan cores per node and 82 nodes with four NVIDIA A100 GPUs each. The HPE Cray EX cluster is a 19.87-petaflops system that is expected to deliver about 3.5 times the scientific throughput of the Cheyenne system. Additional [hardware details](./index.md#derecho-hardware) are available below.

<img src="https://kb.ucar.edu/download/attachments/embedded-page/RC/User%20documentation%20for%20NCAR%20high-performance%20computing/derecho_logo1600X560.png?api=v2" width="350"/>

!!! warning "Derecho Monthly Maintenance Windows"
    **The first Tuesday of each month is generally be reserved for Derecho system maintenance**, as required to incorporate updates to Derecho's configuration and software during the early phase of the system lifespan. Scheduled outages may occasionally be extended (or canceled) as necessary on a case by case basis.

    NCAR/CISL works closely with the system vendor to determine the availability and criticality of software updates, and will re-evaluate the necessity of these monthly outages as the system and supporting software matures.

!!! note "Estimating Derecho Allocation Needs"
    Derecho users can expect to see a **1.3x** improvement over the Cheyenne system's performance on a core-for-core basis. Therefore, to estimate how many CPU core-hours will be needed for a project on Derecho, multiply the total for a Cheyenne project by **0.77**.

When requesting an allocation for Derecho GPU nodes, please make your request in terms of GPU-hours (number of GPUs used x wallclock hours). We encourage researchers to estimate GPU-hour needs by making test/benchmark runs on Casper GPUs, but will accept estimates based on runs on comparable non-NCAR, GPU-based systems.

## Quick Start
### Logging in

Once you have [an account](../../getting-started/accounts/index.md),
have reviewed the [Derecho Use Policies](./derecho-use-policies.md),
and have a Derecho [resource allocation](../../getting-started/managing-your-allocation.md)
you can log in and run jobs on the Derecho data analysis and visualization cluster.

To log in, start your terminal or Secure Shell client and run an ssh command as shown here:
```
ssh -X username@derecho.hpc.ucar.edu

```

Some users (particularly on Macs) need to use `-Y` instead of `-X` when calling SSH to enable X11 forwarding.

You can omit `username` in the command above if your Derecho username is the same as your  username on your local computer.

After running the `ssh` command, you will be [asked to authenticate](../../getting-started/accounts/duo/index.md#hpc-and-ssh-logins) to finish logging in.


Derecho has full access to [NCAR storage resources](../../storage-systems/index.md),
including [GLADE](../../storage-systems/glade/index.md).
Users can [transfer data](../../storage-systems/data-transfer/index.md) to and from Derecho.


To run data analysis and visualization jobs on the Derecho system's nodes, follow the
[procedures described here](./starting-derecho-jobs/index.md).
There is no need to transfer output files from Derecho for this since
Derecho and Casper mount the same `GLADE` file systems.


!!! danger "Don’t run `sudo` on NCAR systems!"
    If you need help with tasks that you think require `sudo`
    privileges, or if you aren’t sure, please contact HPC User Support
    before trying to run `sudo` yourself. The command fails when
    unauthorized users run it and sends a security alert to system
    administrators.

-----

### Environment
The Derecho HPC system uses a Cray variant of **SUSE Enterprise Linux** and supports
widely used shells on its login and compute nodes. Users also have
several compiler and MPI library choices.

#### Shells
The default login shell for new Derecho users is `bash`. You can
change the default after logging in to the Systems Accounting Manager
[(SAM)](../../getting-started/managing-your-allocation.md#using-the-systems-accounting-manager).
It may take several hours for a change you make to take effect. You
can confirm which shell is set as your default by entering `echo $SHELL`
on your Derecho command line.

#### Environment modules
The Derecho `module` utility enables users to easily load and unload
compilers and compatible software packages as needed, and to create
multiple customized environments for various tasks. See the
[Environment modules page](../../environment-and-software/user-environment/modules.md) for
a general discussion of `module` usage.  Derecho's default module
environment is listed [here](./derecho-modules.md).

-----


### Accessing software and compiling code
Derecho users have access to Intel, NVIDIA, and GNU compilers. The **Intel** compiler and **OpenMPI** modules are loaded by default and provide access to pre-compiled [HPC Software](../../environment-and-software/hpc-software/index.md) and [Data Analysis and Visualization Resources](../../environment-and-software/data-analysis-and-visualization.md).

See this page for [a full discussion of compiling on Derecho](./compiling-code-on-derecho/index.md).

Many Derecho data analysis and AI/ML workflows benefit instead from [using Conda](../../environment-and-software/user-environment/conda.md), especially [NCAR's Python Library (NPL)](../../environment-and-software/user-environment/conda.md/#the-ncar-python-library) or to gain access to several [Machine Learning Frameworks](../../environment-and-software/machine-learning-and-deep-learning.md).

-----

### Running jobs on Derecho
Users can run a variety of types of jobs on Derecho, including both traditional
[batch jobs submitted through PBS](../../pbs/index.md) and also interactive and/or graphics-intensive analysis, often through remote desktops on Derecho.
<!--[remote desktops on Derecho](./remote-desktop.md).-->

#### Job scripts
Job scripts are discussed broadly [here](../../pbs/job-scripts/index.md).
Users already familiar with PBS and batch submission may find [Derecho-specific PBS job scripts](./starting-derecho-jobs/derecho-job-script-examples.md) helpful in porting their work.



---

## Derecho Hardware

|**323,712 processor cores**  |3rd Gen AMD EPYC™ 7763 Milan processors|
| :- | :- |
|**2,488 CPU-only computation nodes**|Dual-socket nodes, 64 cores per socket<br>256 GB DDR4 memory per node|
|**82 GPU nodes**|Single-socket nodes, 64 cores per socket<br>512 GB DDR4 memory per node<br>4 NVIDIA 1.41 GHz A100 Tensor Core GPUs per node<br>600 GB/s NVIDIA NVLink GPU interconnect|
|**328 total A100 GPUs**|40GB HBM2 memory per GPU<br>600 GB/s NVIDIA NVLink GPU interconnect|
|**6 CPU login nodes**|Dual-socket nodes with AMD EPYC™ 7763 Milan CPUs<br>64 cores per socket<br>512 GB DDR4-3200 memory|
|**2 GPU development and testing nodes**|Dual-socket nodes with AMD EPYC™ 7543 Milan CPUs<br>32 cores per socket<br>2 NVIDIA 1.41 GHz A100 Tensor Core GPUs per node<br>512 GB DDR4-3200 memory|
|**692 TB total system memory**|637 TB DDR4 memory on 2,488 CPU nodes<br>42 TB DDR4 memory on 82 GPU nodes<br>13 TB HBM2 memory on 82 GPU nodes|
|**HPE Slingshot v11 high-speed interconnect**|Dragonfly topology, 200 Gb/sec per port per direction<br>1\.7-2.6 usec MPI latency<br>CPU-only nodes - one Slingshot injection port<br>GPU nodes - 4 Slingshot injection ports per node|
|**~3.5 times Cheyenne computational capacity**|Comparison based on the relative performance of CISL's High Performance Computing Benchmarks run on each system.|
|**> 3.5 times Cheyenne peak performance**|19\.87 peak petaflops (vs 5.34)|


---

##  Status

### Nodes
<p align="left"><iframe width="680" height="650" frameborder="0" src="https://www.cisl.ucar.edu/uss/queues_table/derecho_nodes.html"></iframe></p>

### Queues
<p align="left"><iframe width="680" height="440" frameborder="0" src="https://www.cisl.ucar.edu/uss/queues_table/derecho_queues.html"></iframe></p>
