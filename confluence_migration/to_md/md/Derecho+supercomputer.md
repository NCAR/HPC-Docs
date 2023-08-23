# Derecho supercomputer

Derecho, the new supercomputer NCAR installed in 2023, features 2,488
compute nodes with 128 AMD Milan cores per node and 82 nodes with four
NVIDIA A100 GPUs each. The HPE Cray EX cluster is a 19.87-petaflops
system that is expected to deliver about 3.5 times the scientific
throughput of the Cheyenne system. Additional hardware details are
available below.

![](media/image1.png)

See the following pages for user documentation that is relevant to all
NCAR systems (compiling code, environment module basics, managing
allocations), and the menu on the right of your screen for
system-specific information.

- [Getting started with NCAR
  systems](file:////display/RC/Getting+started+with+NCAR+systems)

- [New user orientation](file:////display/RC/New+user+orientation)

- [User support](file:////display/RC/User+support)

Additional Derecho documentation is in development. 

#### Estimating Derecho allocation needs

Derecho users can expect to see a **1.3x** improvement over the Cheyenne
system's performance on a core-for-core basis. Therefore, to estimate
how many CPU core-hours will be needed for a project on Derecho,
multiply the total for a Cheyenne project by **0.77**.

When requesting an allocation for Derecho GPU nodes, please make your
request in terms of GPU-hours (number of GPUs used x wallclock hours).
We encourage researchers to estimate GPU-hour needs by making
test/benchmark runs on Casper GPUs, but will accept estimates based on
runs on comparable non-NCAR, GPU-based systems.

## Derecho hardware

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 66%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>323,712 processor cores</strong>  </th>
<th>3rd Gen AMD EPYC™ 7763 Milan processors</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>2,488 CPU-only computation nodes</strong></td>
<td>Dual-socket nodes, 64 cores per socket<br />
256 GB DDR4 memory per node</td>
</tr>
<tr class="even">
<td><strong>82 GPU nodes</strong></td>
<td>Single-socket nodes, 64 cores per socket<br />
512 GB DDR4 memory per node<br />
4 NVIDIA 1.41 GHz A100 Tensor Core GPUs per node<br />
600 GB/s NVIDIA NVLink GPU interconnect</td>
</tr>
<tr class="odd">
<td><strong>328 total A100 GPUs</strong></td>
<td>40GB HBM2 memory per GPU<br />
600 GB/s NVIDIA NVLink GPU interconnect</td>
</tr>
<tr class="even">
<td><strong>6 CPU login nodes</strong></td>
<td>Dual-socket nodes with AMD EPYC™ 7763 Milan CPUs<br />
64 cores per socket<br />
512 GB DDR4-3200 memory</td>
</tr>
<tr class="odd">
<td><strong>2 GPU development and testing nodes</strong></td>
<td>Dual-socket nodes with AMD EPYC™ 7543 Milan CPUs<br />
32 cores per socket<br />
2 NVIDIA 1.41 GHz A100 Tensor Core GPUs per node<br />
512 GB DDR4-3200 memory</td>
</tr>
<tr class="even">
<td><strong>692 TB total system memory</strong></td>
<td>637 TB DDR4 memory on 2,488 CPU nodes<br />
42 TB DDR4 memory on 82 GPU nodes<br />
13 TB HBM2 memory on 82 GPU nodes</td>
</tr>
<tr class="odd">
<td><strong>HPE Slingshot v11 high-speed interconnect</strong></td>
<td>Dragonfly topology, 200 Gb/sec per port per direction<br />
1.7-2.6 usec MPI latency<br />
CPU-only nodes - one Slingshot injection port<br />
GPU nodes - 4 Slingshot injection ports per node</td>
</tr>
<tr class="even">
<td><strong>~3.5 times Cheyenne computational capacity</strong></td>
<td>Comparison based on the relative performance of CISL's High
Performance Computing Benchmarks run on each system.</td>
</tr>
<tr class="odd">
<td><strong>&gt; 3.5 times Cheyenne peak performance</strong></td>
<td>19.87 peak petaflops (vs 5.34)</td>
</tr>
</tbody>
</table>
