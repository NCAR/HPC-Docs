# NCAR benchmarking applications - 2019-2020 release

**31 March 2020 - Benchmark Q&As updated**

For questions and answers regarding the NWSC-3 HPC Benchmarks, refer to
the updated NWSC-3 Benchmarks Q&As document.

**19 March 2020 - Updated benchmarks released**

Please note that the NWSC-3 HPC Benchmarks have been updated to include
changes to the GOES and OSU MPI benchmarks. Prospective Offerors for the
NWSC-3 Request for Proposal (RFP), which will be released 2 April 2020,
should download the updated benchmark code, input cases, and
instructions (see below). NCAR does not plan to make any additional
changes to the HPC Benchmarks unless there are issues with the ones
provided here.

**19 July 2019 - Benchmarks released**

The NWSC-3 HPC Benchmarks are available ahead of an anticipated release
of the NWSC-3 Request for Proposal (RFP) in Q1 of 2020. NCAR does not
plan to make any changes to the HPC Benchmarks unless there are issues
with the ones provided here.


**Release Date:** July 19, 2019

**Last Updated:** March 19, 2020

Ensuring that real applications perform well on NCAR computing platforms
is critical for getting the best value out of complex and costly
high-performance computing and storage resources. Climate and weather
applications are large, often with millions of lines of code, and are
generally difficult to configure in a way that permits ease of use for
things such as system deployments, upgrades, and procurements.

Thus, NCAR has developed a suite of application kernels,
micro-benchmarks, and full applications with moderate input cases that
can be used as proxies for the full applications and still provide
meaningful information and insights into system performance. A few of
these are well-known benchmarks that are commonly used in HPC for
characterizing system performance.

NCAR's benchmarking applications are listed in the table below, along
with file names, sizes, and checksums. These packages include source
files, build scripts, and input data sets required to compile and run
the applications. In cases where the benchmarks depend on applications
and libraries that are not part of the package distributions, you will
find version number and download details in the README files.

Documentation and **benchmark download packages** are available through
the Globus-based NCAR Data Sharing Service. Instructions are given below
for obtaining a Globus account, installing the required Globus software,
and downloading the benchmark packages via the **NCAR HPC
Benchmarks** endpoint. See the Globus instructions below for more
information.

## Benchmarks

<table>
  <colgroup>
    <col style="width: 11%" />
    <col style="width: 14%" />
    <col style="width: 10%" />
    <col style="width: 17%" />
    <col style="width: 12%" />
    <col style="width: 32%" />
  </colgroup>
  <thead>
    <tr class="header">
      <th><strong>Name</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>File Contents</strong></th>
      <th><strong>File Name</strong></th>
      <th><strong> Size<br />
          (Bytes)</strong></th>
      <th><strong>  MD5 Checksum</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr class="odd">
      <td rowspan="2">CLUBB</td>
      <td rowspan="2">Physics Kernel</td>
      <td>Instructions</td>
      <td>CLUBB_2019-05-19.pdf</td>
      <td>63246</td>
      <td>006fb83f72d3cc4042c361701f837ea4</td>
    </tr>
    <tr class="even">
      <td>Benchmark Files</td>
      <td>CLUBB_2019-05-19.tar.gz</td>
      <td>184931304</td>
      <td>626d0c5108f76c662d8e722fa64cfe82</td>
    </tr>
    <tr class="odd">
      <td rowspan="2">DART_WRF</td>
      <td rowspan="2">Model Kernel</td>
      <td>Instructions</td>
      <td>DART_WRF_2019-05-20.pdf</td>
      <td>59749</td>
      <td>cbe78c13a80073910c0275467c52ee2c</td>
    </tr>
    <tr class="even">
      <td>Benchmark Files</td>
      <td>DART_WRF_2019-05-20.tar.gz</td>
      <td>258607013</td>
      <td>a388e961fce0960d096417cd45e1f00f</td>
    </tr>
    <tr class="odd">
      <td rowspan="2">GOES</td>
      <td rowspan="2">ML Benchmark</td>
      <td>Instructions</td>
      <td>GOES16_2020-04-27.pdf </td>
      <td>71665</td>
      <td>1d9ba301526d25cd768304e14fa5ab14</td>
    </tr>
    <tr class="even">
      <td>Benchmark Files</td>
      <td>GOES16_2020-04-27.tar.gz</td>
      <td>3578032111</td>
      <td>5517e495689c75c4f71478d5d3f45e7e</td>
    </tr>
    <tr class="odd">
      <td rowspan="2">MG2</td>
      <td rowspan="2">Physics Kernel</td>
      <td>Instructions</td>
      <td>MG2_2019-05-20.pdf</td>
      <td>61804</td>
      <td>c13a288f425993504ab9ce5db692c008</td>
    </tr>
    <tr class="even">
      <td>Benchmark Files</td>
      <td>MG2_2019-05-20.tar.gz</td>
      <td>85366943</td>
      <td>25ebc145a374d3ccd1d410f9d495261a</td>
    </tr>
    <tr class="odd">
      <td rowspan="3">MPAS-A*</td>
      <td rowspan="3">GPU-capable Atmospheric Model</td>
      <td>Instructions</td>
      <td>MPAS_2019-06-26.pdf</td>
      <td>274813</td>
      <td>cf523aa8e3a9d889d11817d0d07edca9<br />
      </td>
    </tr>
    <tr class="even">
      <td>Benchmark Files</td>
      <td colspan="3">(For access, follow the instructions below)</td>
    </tr>
    <tr class="odd">
      <td>Input Data</td>
      <td>MPAS_2020-04-27_data.tar.gz</td>
      <td>17270465681</td>
      <td>0ced450ce164b86cb9a6c82a5dcfd966</td>
    </tr>
    <tr class="even">
      <td rowspan="2">Stream</td>
      <td rowspan="2">Memory Bandwidth</td>
      <td>Instructions</td>
      <td>Stream_2019-05-22.pdf</td>
      <td>69436</td>
      <td>577d9da38eed93d782d6a046c36d7353</td>
    </tr>
    <tr class="odd">
      <td>Benchmark Files</td>
      <td>Stream_2019-05-22.tar.gz</td>
      <td>20743</td>
      <td>23d9d58f8d709553c7e409ab1b1e44cc</td>
    </tr>
    <tr class="even">
      <td rowspan="2">WACCM</td>
      <td rowspan="2">Physics Kernel</td>
      <td>Instructions</td>
      <td>WACCM_2019-05-19.pdf</td>
      <td>62391</td>
      <td>6bb2d8bd1df3471ad93a17540e2c2c17</td>
    </tr>
    <tr class="odd">
      <td>Benchmark Files</td>
      <td>WACCM_2019-05-19.tar.gz</td>
      <td>18289529</td>
      <td>b31c36c58f5ecbbb613caaa39b663b32</td>
    </tr>
    <tr class="even">
      <td rowspan="2">WRF</td>
      <td rowspan="2">Weather Research and Forecasting (WRF) Model</td>
      <td>Instructions</td>
      <td>WRF_2019-09-06.pdf</td>
      <td>93213</td>
      <td>2a47071030e4417d4873938333a60af9</td>
    </tr>
    <tr class="odd">
      <td>Benchmark Files</td>
      <td>WRF_2019-09-06.tar.gz</td>
      <td>9778202346</td>
      <td>bec5bf5cc682b14ebb30a2da51d381ab</td>
    </tr>
    <tr class="even">
      <td rowspan="2">OSU MPI</td>
      <td rowspan="2">MPI Communications Benchmark</td>
      <td>Instructions</td>
      <td>osu-micro-benchmarks-5.5_2020-03-12.pdf</td>
      <td>62732</td>
      <td>4baea167d0698973e751b75e578ac6bb</td>
    </tr>
    <tr class="odd">
      <td>Benchmark Files</td>
      <td>osu-micro-benchmarks-5.5_2020-03-12.tar.gz</td>
      <td>765369</td>
      <td>bcb970d5a1f3424e2c7302ff60611008</td>
    </tr>
  </tbody>
</table>

## Globus instructions

### Step 1: Obtain a Globus account

Go to [www.globus.org](https://www.globus.org/) and click the **Sign
Up** button in the upper-right corner.

### Step 2: Install Globus Connect Personal

Go to <https://www.globus.org/globus-connect-personal> and install the
version of Globus Connect Personal appropriate for your computer.
Versions are available for Mac OS X, Linux, and Windows.

### Step 3: Use Globus to download benchmarks

1.  Access the **NCAR HPC Benchmarks** folder on Globus. (You will need
    to log in to Globus with the account created in Step 1.)

2.  Select the files you wish to download and click **Transfer or
    Sync** to in the right-hand pane.

3.  Select the endpoint you wish to transfer files to. This can be the
    computer where you installed Globus Connect Personal in Step 2, or
    another Globus endpoint to which you have access.

4.  Click on the **Start** button below the file manager to initiate the
    transfer.

Your download will be submitted through the Globus Transfer service. You
will receive an email when your transfer has completed. You can monitor
the transfer by clicking **Activity** in the left-hand menu to bring up
the Globus Activity view.

!!! note "MPAS-A benchmark access"
    Access to the MPAS-A benchmark code is restricted. To obtain access, follow the instructions below.

    **Instructions for obtaining NWSC-3 MPAS-A benchmark source code**

    Code releases for the MPAS-A GPU project will occur through the
    open-source GitHub site. However, before you may access the site, you
    are required to sign the [MPAS-A Confidentiality
    Agreement](https://kb.ucar.edu/download/attachments/81887359/MPAS-A%20Confidentiality%20Agreement.pdf?version=1&modificationDate=1651851636000&api=v2).
    To obtain access to the MPAS-A GPU GitHub site, send both your signed
    MPAS-A Confidentiality Agreement and your GitHub account/login
    to [Alison Propes](mailto:apropes@ucar.edu), UCAR's
    Subcontract/Procurement Manager.

    Note that all materials (including source code, products derived from
    source code, and documents) related to NWSC-3 MPAS should **not** be
    distributed, either formally or informally, in any form. Publishing any
    kind of results obtained from the NWSC-3 MPAS-A source code requires
    written consent from UCAR.
