---
short_title: Casper Overview
---

# Casper cluster

The Casper cluster is a system of specialized data analysis and visualization resources; large-memory, multi-GPU nodes; and high-throughput computing nodes.

Casper is composed of over 100 nodes featuring a mixture of Intel and AMD processors, with a variety of NVIDIA General Purpose Graphical Processing Units.

<!-- - 22 Supermicro SuperWorkstation nodes are used for data analysis and visualization jobs. Each node has 36 cores and up to 384 GB memory. -->
<!--     - 9 of these nodes also feature an NVIDIA Quadro GP100 GPU. -->
<!--     - 3 nodes feature a single NVIDIA Ampere A100 GPU. -->
<!-- - 18 nodes feature large-memory, dense GPU configurations to support explorations in machine learning (ML) and deep learning (DL) and general-purpose GPU (GPGPU) computing in atmospheric and related sciences. -->
<!--     - 4 of these nodes feature 4 NVIDIA Tesla V100 GPUs. -->
<!--     - 6 of these nodes feature 8 NVIDIA Tesla V100 GPUs. -->
<!--     - 8 of these nodes feature 4 NVIDIA Ampere A100 GPUs. -->
<!-- - 64 high-throughput computing (HTC) nodes for small computing tasks using 1 or 2 CPUs. -->
<!--     - 62 HTC nodes have 384 GB of available memory. -->
<!--     - 2 HTC nodes have 1.5 TB of available memory. -->
<!-- - 4 nodes are reserved for Research Data Archive workflows. -->

Please refer to the [hardware summary table](#hardware) below for detailed specifications.


---

## Quick Start
### Logging in

Once you have [an account](../../getting-started/accounts/index.md),
have reviewed the [Casper Use Policies](./casper-use-policies.md),
and have a Casper [resource allocation](../../getting-started/managing-your-allocation.md)
you can log in and run jobs on the Casper data analysis and visualization cluster.

To log in, start your terminal or Secure Shell client and run an ssh command as shown here:
```
ssh -X username@casper.hpc.ucar.edu

```

Some users (particularly on Macs) need to use `-Y` instead of `-X` when calling SSH to enable X11 forwarding.

You can omit `username` in the command above if your Casper username is the same as your  username on your local computer.

After running the `ssh` command, you will be [asked to authenticate](../../getting-started/accounts/duo/index.md#hpc-and-ssh-logins) to finish logging in.


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

-----

### Environment
The Casper HPC system uses **OpenSUSE Linux Version 15** and supports
widely used shells on its login and compute nodes. Users also have
several compiler and MPI library choices.

#### Shells
The default login shell for new Casper users is `bash`. You can
change the default after logging in to the Systems Accounting Manager
[(SAM)](../../getting-started/managing-your-allocation.md#using-the-systems-accounting-manager).
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


### Accessing software and compiling code
Casper users have access to Intel, NVIDIA, and GNU compilers. The **Intel** compiler and **OpenMPI** modules are loaded by default and provide access to pre-compiled [HPC Software](../../environment-and-software/hpc-software/index.md) and [Data Analysis and Visualization Resources](../../environment-and-software/data-analysis-and-visualization.md).

See this page for [a full discussion of compiling on Casper](./compiling-code-on-casper/index.md).

Many Casper data analysis and AI/ML workflows benefit instead from [using Conda](../../environment-and-software/user-environment/conda.md), especially [NCAR's Python Library (NPL)](../../environment-and-software/user-environment/conda.md/#the-ncar-python-library) or to gain access to several [Machine Learning Frameworks](../../environment-and-software/machine-learning-and-deep-learning.md).

-----

### Running jobs on Casper
Users can run a variety of types of jobs on Casper, including both traditional
[batch jobs submitted through PBS](../../pbs/index.md) and also interactive and/or graphics-intensive analysis, often through [remote desktops on Casper](./remote-desktop.md).

#### Job scripts
Job scripts are discussed broadly [here](../../pbs/job-scripts/index.md).
Users already familiar with PBS and batch submission may find [Casper-specific PBS job scripts](./starting-casper-jobs/casper-job-script-examples.md) helpful in porting their work.


---

## Casper hardware

<table>
  <tbody>
    <tr>
      <td style="text-align: left;">
        <strong>Data Analysis<br>&amp; Visualization nodes</strong></td>
      <td style="text-align: left;">
        <strong>22 Supermicro 7049GP-TRT SuperWorkstation nodes</strong><br>
        Up to 384 GB DDR4-2666 memory per node<br>
        2 18-core 2.3-GHz Intel Xeon Gold 6140 (Skylake) processors per node<br>
        2 TB local NVMe Solid State Disk<br>
        1 Mellanox ConnectX-4 100Gb Ethernet connection (GLADE, Campaign Storage, external connectivity)<br>
        1 Mellanox ConnectX-6 HDR100 InfiniBand link<br>
        1 NVIDIA Quadro GP100 GPU 16GB PCIe on each of 9 nodes<br>
        1 NVIDIA Ampere A100 GPU 40 GB PCIe on each of 3 nodes
      </td>
    </tr>
    <tr>
      <td style="text-align: left;">
        <strong>Machine Learning/Deep Learning <br>&amp; General Purpose GPU (GPGPU) nodes</strong>
      </td>
      <td style="text-align: left;">
        <strong>4 Supermicro SuperServer nodes with 4 V100 GPUs</strong><br>
        768 GB DDR4-2666 memory per node<br>
        2 18-core 2.6-GHz Intel Xeon Gold 6240 (Cascade Lake) processors per node<br>
        2 TB local NVMe Solid State Disk<br>
        1 Mellanox ConnectX-4 100Gb Ethernet connection (GLADE, Campaign Storage, external connectivity)<br>
        2 Mellanox ConnectX-6 HDR200 InfiniBand adapters. HDR100 link on each CPU socket<br>
        4 NVIDIA Tesla V100 32GB SXM2 GPUs with NVLink<br><br>

        <strong>6 Supermicro SuperServer nodes with 8 V100 GPUs</strong><br>
        1152 GB DDR4-2666 memory per node<br>
        2 18-core 2.6-GHz Intel Xeon Gold 6240 (Cascade Lake) processors per node<br>
        2 TB local NVMe Solid State Disk<br>
        1 Mellanox ConnectX-4 100Gb Ethernet connection (GLADE, Campaign Storage, external connectivity)<br>
        2 Mellanox ConnectX-6 HDR200 InfiniBand adapters, HDR100 link on each CPU socket<br>
        8 NVIDIA Tesla V100 32GB SXM2 GPUs with NVLink<br><br>

        <strong>4 Supermicro nodes with 4 A100 GPUs</strong><br>
        1024 GB memory per node<br>
        2 64-core 2.45-GHz AMD EPYC Milan 7763 processors per node<br>
        1.5 TB local NVMe Solid State Disk<br>
        4 Mellanox ConnectX-6 network adapters<br>
        4 NVIDIA Ampere A100 80GB SXM4 GPUs with NVLink</td>
    </tr>
    <tr>
      <td style="text-align: left;">
        <strong>High-Throughput Computing nodes</strong>
      </td>
      <td style="text-align: left;">
        <strong>62 small-memory workstation nodes</strong><br>
        384 GB DDR4-2666 memory per node <br>
        2 18-core 2.6-GHz Intel Xeon Gold 6240 (Cascade Lake) processors per node<br>
        1.6 TB local NVMe Solid State Disk<br>
        1 Mellanox ConnectX-5 100Gb Ethernet VPI adapter (GLADE, Campaign Storage, external connectivity)<br>
        1 Mellanox ConnectX-6 HDR200 InfiniBand VPI adapter. HDR100 link on each CPU socket<br><br>

        <strong>2 large-memory workstation nodes</strong><br>
        1.5 TB DDR4-2666 memory per node <br>
        2 18-core 2.3-GHz Intel Xeon Gold 6240 (Cascade Lake) processors per node<br>
        1.6 TB local NVMe Solid State Disk<br>
        1 Mellanox ConnectX-5 100Gb Ethernet VPI adapter (GLADE, Campaign Storage, external connectivity)<br>
        1 Mellanox ConnectX-6 HDR200 InfiniBand VPI adapter, HDR100 link on each CPU socket
      </td>
    </tr>
    <tr>
      <td style="text-align: left;">
        <strong>Research Data Archive<br>nodes (reserved for<br>RDA use)</strong>
      </td>
      <td style="text-align: left;">
        <strong>4 Supermicro Workstation nodes</strong><br>
        94 GB DDR4-2666 memory per node<br>
        2 16-core 2.3-GHz Intel Xeon Gold 5218 (Cascade Lake) processors per node<br>
        1.92 TB local Solid State Disk<br>
        1 Mellanox ConnectX-6 VPI 100Gb Ethernet connection (GLADE, Campaign Storage, internal connectivity)
      </td>
    </tr>
  </tbody>
</table>

---

## Status
### Nodes
<p align="left"><iframe width="680" height="1100" frameborder="0" src="https://www.cisl.ucar.edu/uss/queues_table/casper_nodes_BSK.html"></iframe></p>

#### GPU Usage
<p align="left"><iframe width="680" height="835" frameborder="0" src="https://www.cisl.ucar.edu/uss/queues_table/casper_gpu_status_BSK.html"></iframe></p>

### Queues
<p align="left"><iframe width="680" height="440" frameborder="0" src="https://www.cisl.ucar.edu/uss/queues_table/casper_queues_BSK.html"></iframe></p>


<!--  LocalWords:  Casper Derecho
 -->
