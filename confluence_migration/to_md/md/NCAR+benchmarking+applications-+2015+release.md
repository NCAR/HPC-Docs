# NCAR benchmarking applications- 2015 release

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

NCAR's benchmarking applications are listed in the tables below, along
with file names, sizes, and checksums. These packages include source
files, build scripts, and input data sets required to compile and run
the applications. In cases where the benchmarks depend on applications
and libraries that are not part of the package distributions, you will
find version number and download details in the README files.

#### Page contents

- [Application Benchmark
  Instructions](#NCARbenchmarkingapplications2015release)

- [Globus instructions](#NCARbenchmarkingapplications2015release)

  - [Step 1: Obtain a Globus
    account](#NCARbenchmarkingapplications2015release)

  - [Step 2: Install Globus Connect
    Personal](#NCARbenchmarkingapplications2015release)

  - [Step 3: Use Globus to download
    benchmarks](#NCARbenchmarkingapplications2015release)

**Release Date:** February 2, 2015

**Last Updated:** August 29, 2018

The **benchmark download packages** are available through the
Globus-based NCAR Data Sharing Service. Instructions are given below for
obtaining a Globus account, installing the required Globus software, and
downloading the benchmark packages via the **NCAR HPC
Benchmarks** endpoint. See the Globus instructions below for more
information.

Instructions for all benchmarks are available via Google Docs or direct
download at this link:

## [**Application Benchmark Instructions**](https://drive.google.com/folderview?id=0B_b29reTX0iFTWoyYW1ZWi1QaVk&usp=sharing)

These are the instructions for each of the application benchmarks in the
table below.

| **Application Benchmarks** | **Description**                                     | **File**                                                                                 | **Size (Bytes)** | **MD5 Checksum**                 |
|----------------------------|-----------------------------------------------------|------------------------------------------------------------------------------------------|------------------|----------------------------------|
| **HOMME**                  | HOMME benchmark and HOMME_COMM communication kernel | HOMME_v1.tar.gz                                                                          | 2728264          | b35d135f52b488d0bf9c1a07f2d02a93 |
| **HPCG**                   | High Performance Conjugate Gradient Solver          | hpcg-2.4_v1.tar.gz                                                                       | 69974            | fef8b6614ddaf3c45b8dd1b8fb867df7 |
| **LES**                    | Large Eddy Simulation benchmark                     | LES_v1.tar.gz                                                                            | 73200            | f9017e36b1ea0f02a2169770b37fad54 |
| **MG2**                    | Morrison Gettelman cloud microphysics kernel        | MG2kernel_v1.tar.gz                                                                      | 282822           | 53befeb7e418c074c80f6a5ad025144c |
| **MPAS-A**                 | MPAS Atmosphere benchmark                           | MPAS_3.2_v1.tar.gz                                                                       | 2259609261       | e9736920454952afb7e13c2e4f859457 |
| **POPperf**                | POP Ocean model benchmark                           | POPperf_v1.tar.gz                                                                        | 66480926         | 0fd078478dc6b5f326701ac09713fa49 |
| **WRF**                    | Weather Research and Forecasting model              | WRFV3_BENCH_v1.tar.gz                                                                    | 13260795166      | 4d5a7c02656dca8042cebe1e656c793b |
| **CESM**                   | Community Earth System Model                        | Used in numerical correctness and system acceptance testing. <http://www.cesm.ucar.edu/> |                  |                                  |

| **I/O and Microbenchmarks** | **Description**                                  | **File**                              | **Size (Bytes)** | **MD5 Checksum**                 |
|-----------------------------|--------------------------------------------------|---------------------------------------|------------------|----------------------------------|
| **STREAM**                  | Node level memory benchmark                      | STREAM_v1.tar.gz                      | 10268            | ee520d700a1fef3f746b9a8117952635 |
| **SHOC**                    | Scalable HeterOgeneous Computing (GPU benchmark) | shoc_v1.tar.gz                        | 10418387         | f3a4146180cb720a04104ee40bd161ea |
| **OSU-MPI**                 | MPI communication benchmarks                     | osu-micro-benchmarks-4.4.1_v1.tar.gz  | 151586           | 4bae164fc0aecd955adae1e9a9dc48d9 |
| **IOR**                     | I/O bandwidth and latency test                   | ncar_ior_v1.tgz                       | 144,608          | dc91a37af717005c87ec1752524ef67b |
| **pyReshaper**              | Application I/O kernel                           | pyResBench_v1.tgz                     | 1,938,268,372    | 67c9231e8bacb644d1a952b8793dc609 |
| **mdtest**                  | Metadata performance test                        | ncar_mdtest_v1.tgz                    | 93,074           | c9f69c6cdc335409f96ebce7764babad |

## Globus instructions

### Step 1: Obtain a Globus account

Go to [www.globus.org](https://www.globus.org/) and click the **Sign
Up** button in the upper-right corner.

### Step 2: Install Globus Connect Personal

Go to [www.globus.org](https://www.globus.org/).
Under **Products** select **Globus Connect** and then **Get Globus
Connect Personal**. Versions are available for Mac OS X, Linux and
Windows.

### Step 3: Use Globus to download benchmarks

1.  Log in at [www.globus.org](https://www.globus.org/) with your Globus
    account

2.  Select **Transfer Files**

3.  In the left-hand window, enter **NCAR HPC Benchmarks** as the
    endpoint

4.  In the right-hand window, enter an endpoint at your own site or the
    endpoint that you established with Globus Connect

5.  Select the benchmark files you wish to download and click the
    right-hand arrow

Your download will be submitted through the Globus Transfer service. You
will receive an email when your transfer has completed or you can
monitor from the Transfer window by selecting **refresh list** in the
right-hand window.
