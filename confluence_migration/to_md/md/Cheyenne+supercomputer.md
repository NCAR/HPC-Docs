# Cheyenne supercomputer

Cheyenne is a 5.34-petaflops, high-performance computer built for NCAR
by SGI. The system was released for production work on January 12, 2017.

![](media/image1.jpeg)

An SGI ICE XA Cluster, the Cheyenne supercomputer features 145,152 Intel
Xeon processor cores in 4,032 dual-socket nodes (36 cores/node) and 313
TB of total memory.

Cheyenne's login nodes give users access to
the [<u>GLADE</u>](file:////display/RC/GLADE+file+spaces) shared-disk
resource and other storage systems.

Data storage components provided by DataDirect Networks (DDN) give the
GLADE system a total usable capacity of 38 PB. The DDN system transfers
data at the rate of 200 GBps, more than twice as fast as the previous
file system’s rate of 90 GBps.

[***Go to "Quick start on
Cheyenne"***](file:////display/RC/Quick+start+on+Cheyenne)

To log in, start your terminal or Secure Shell client and run an **ssh**
command as shown here:

ssh -X username@system_name.ucar.edu

OR

ssh -X username@system_name.hpc.ucar.edu

Some users (particularly on Macs) need to use **-Y** instead
of **-X** when calling SSH to enable X11 forwarding.

You can use this shorter command if your username for the system is the
same as your username on your local computer:

ssh -X system_name.ucar.edu

OR

ssh -X system_system_name.hpc.ucar.edu

After running the ssh command, you will be asked to authenticate to
finish logging in.

#### Page contents

- [Hardware](#Cheyennesupercomputer-Hardware)

- [Estimating core-hours
  needed](#Cheyennesupercomputer-Estimatingcore-ho)

## Hardware

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 66%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>145,152 processor cores</strong>  </th>
<th>2.3-GHz Intel Xeon E5-2697V4 (Broadwell) processors<br />
16 flops per clock</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>4,032 computation nodes</strong></td>
<td>Dual-socket nodes, 18 cores per socket</td>
</tr>
<tr class="even">
<td><strong>6 login nodes</strong></td>
<td>Dual-socket nodes, 18 cores per socket<br />
256 GB memory/node</td>
</tr>
<tr class="odd">
<td><strong>313 TB total system memory</strong></td>
<td>64 GB/node on 3,168 nodes, DDR4-2400<br />
128 GB/node on 864 nodes, DDR4-2400</td>
</tr>
<tr class="even">
<td><strong>Mellanox EDR InfiniBand<br />
high-speed interconnect</strong></td>
<td>Partial 9D Enhanced Hypercube single-plane interconnect
topology<br />
Bandwidth: 25 GBps bidirectional per link<br />
Latency: MPI ping-pong &lt; 1 µs; hardware link 130 ns</td>
</tr>
<tr class="odd">
<td><strong>3 times Yellowstone computational capacity</strong></td>
<td>Comparison based on the relative performance of CISL High
Performance Computing Benchmarks run on each system.</td>
</tr>
<tr class="even">
<td><strong>&gt; 3.5 times Yellowstone peak performance</strong></td>
<td>5.34 peak petaflops (vs. 1.504)</td>
</tr>
</tbody>
</table>

## Estimating core-hours needed

Cheyenne allocations are made in core-hours. The recommended method for
estimating your resource needs for an allocation request is to perform
benchmark runs. [<u>Some guidance is provided
here</u>](file:////display/RC/Determining+computational+resource+needs).

The core-hours used for a job are calculated by multiplying the number
of processor cores used by the wall-clock duration in hours. Cheyenne
core-hour calculations should assume that all jobs will run in the
regular queue and that they are charged for use of all 36 cores on each
node.
