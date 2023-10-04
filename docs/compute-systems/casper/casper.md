# Casper cluster

The Casper cluster is a system of specialized data analysis and visualization resources; large-memory, multi-GPU nodes; and high-throughput computing nodes.

Casper is composed of 100 nodes featuring Intel Skylake or Cascade Lake processors.

- 22 Supermicro SuperWorkstation nodes are used for data analysis and visualization jobs. Each node has 36 cores and up to 384 GB memory.
    - 9 of these nodes also feature an NVIDIA Quadro GP100 GPU.
    - 3 nodes feature a single NVIDIA Ampere A100 GPU.
- 10 nodes feature large-memory, dense GPU configurations to support explorations in machine learning (ML) and deep learning (DL) and general-purpose GPU (GPGPU) computing in atmospheric and related sciences.
    - 4 of these nodes feature 4 NVIDIA Tesla V100 GPUs.
    - 6 of these nodes feature 8 NVIDIA Tesla V100 GPUs.
- 64 high-throughput computing (HTC) nodes for small computing tasks using 1 or 2 CPUs.
    - 62 HTC nodes have 384 GB of available memory.
    - 2 HTC nodes have 1.5 TB of available memory.
- 4 nodes are reserved for Research Data Archive workflows.

Please refer to the [hardware summary table](#hardware) below for detailed specifications.

**Operating system: CentOS 7.8**

## Logging in on an NCAR system

To log in, start your terminal or Secure Shell client and run an ssh command as shown here:
```
ssh -X username@system_name.ucar.edu

```
Or
```
ssh -X username@system_name.ucar.edu

```

Some users (particularly on Macs) need to use -Y instead of -X when calling SSH to enable X11 forwarding.

You can use this shorter command if your username for the system is the same as your username on your local computer:
```
ssh -X system_name.ucar.edu 
```
OR 
```
ssh -X system_name.ucar.edu
```

After running the `ssh` command, you will be asked to authenticate to finish logging in.

## **Hardware**

|**Data Analysis<br>& Visualization nodes**|**22 Supermicro 7049GP-TRT SuperWorkstation nodes**<br>Up to 384 GB DDR4-2666 memory per node<br>2 18-core 2.3-GHz Intel Xeon Gold 6140 (Skylake) processors per node<br>2 TB local NVMe Solid State Disk<br>1 Mellanox ConnectX-4 100Gb Ethernet connection (GLADE, Campaign Storage, external connectivity)<br>1 Mellanox ConnectX-6 HDR100 InfiniBand link<br>1 NVIDIA Quadro GP100 GPU 16GB PCIe on each of 9 nodes<br>1 NVIDIA Ampere A100 GPU 40 GB PCIe on each of 3 nodes|
| :- | :- |
|**Machine Learning/Deep Learning <br>& General Purpose GPU (GPGPU) nodes**|**4 Supermicro SuperServer nodes with 4 V100 GPUs**<br>768 GB DDR4-2666 memory per node<br>2 18-core 2.3-GHz Intel Xeon Gold 6140 (Skylake) processors per node<br>2 18-core 2.6-GHz Intel Xeon Gold 6240 (Cascade Lake) processors per node<br>2 TB local NVMe Solid State Disk<br>1 Mellanox ConnectX-4 100Gb Ethernet connection (GLADE, Campaign Storage, external connectivity)<br>2 Mellanox ConnectX-6 HDR200 InfiniBand adapters. HDR100 link on each CPU socket<br>4 NVIDIA Tesla V100 32GB SXM2 GPUs with NVLink<br><br>**6 Supermicro SuperServer nodes with 8 V100 GPUs**<br>1152 GB DDR4-2666 memory per node<br>2 18-core 2.3-GHz Intel Xeon Gold 6140 (Skylake) processors per node<br>2 TB local NVMe Solid State Disk<br>1 Mellanox ConnectX-4 100Gb Ethernet connection (GLADE, Campaign Storage, external connectivity)<br>2 Mellanox ConnectX-6 HDR200 InfiniBand adapters, HDR100 link on each CPU socket<br>8 NVIDIA Tesla V100 32GB SXM2 GPUs with NVLink|
|**High-Throughput Computing nodes**|**62 small-memory workstation nodes**<br>384 GB DDR4-2666 memory per node <br>2 18-core 2.6-GHz Intel Xeon Gold 6240 (Cascade Lake) processors per node<br>1\.6 TB local NVMe Solid State Disk<br>1 Mellanox ConnectX-5 100Gb Ethernet VPI adapter (GLADE, Campaign Storage, external connectivity)<br>1 Mellanox ConnectX-6 HDR200 InfiniBand VPI adapter. HDR100 link on each CPU socket<br><br>**2 large-memory workstation nodes**<br>1\.5 TB DDR4-2666 memory per node <br>2 18-core 2.3-GHz Intel Xeon Gold 6240 (Cascade Lake) processors per node<br>1\.6 TB local NVMe Solid State Disk<br>1 Mellanox ConnectX-5 100Gb Ethernet VPI adapter (GLADE, Campaign Storage, external connectivity)<br>1 Mellanox ConnectX-6 HDR200 InfiniBand VPI adapter, HDR100 link on each CPU socket|
|**Research Data Archive<br>nodes (reserved for<br>RDA use)**|**4 Supermicro Workstation nodes**<br>94 GB DDR4-2666 memory per node<br>2 16-core 2.3-GHz Intel Xeon Gold 5218 (Cascade Lake) processors per node<br>1\.92 TB local Solid State Disk<br>1 Mellanox ConnectX-6 VPI 100Gb Ethernet connection (GLADE, Campaign Storage, internal connectivity)|

----
copy of https://arc.ucar.edu/knowledge_base/70549550
