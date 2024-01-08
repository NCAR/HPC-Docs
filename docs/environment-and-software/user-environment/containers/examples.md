# Sample Containerized Workflows

!!! warning
    This page contains a sample of containerized workflows that demonstrate various techniques built up in practice, often from resolving user issues.
    We do not necessarily endorse or support each use case, rather these examples are provided in hopes they may be useful to demonstrate (i) sample
    containerized workflows, and (ii) solutions to various problems you may encounter.

## NVIDIA's NGC containers

NVIDIA's [NGC](https://catalog.ngc.nvidia.com) is a catalog of software optimized for GPUs. [NGC containers](https://catalog.ngc.nvidia.com/containers) allow you to run data science projects "out of the box" without installing, configuring, or integrating the infrastructure.

### NVIDIA's Modulus physics-ML framework
[NVIDIA Modulus](https://docs.nvidia.com/modulus/index.html)  is an open source deep-learning framework for building, training, and fine-tuning deep learning models using state-of-the-art Physics-ML methods. NVIDIA provides a frequently updated Docker image with a containerized PyTorch installation that can be run under Apptainer, albeit with some effort.  Because the container is designed for Docker, some additional steps are required as discussed below.

???+ example "Running containerized NVIDIA-Modulus on a single Casper GPU"

    1. Rather than pull the container and run as-is, we will create a derived container that allows us to encapsulate our desired changes. The primary reason for this is the Modulus container assumes the container is writable and makes changes during execution.   Since we will run under Apptainer using a compressed, read-only image, this fails. Therefore we will make our own derived image and make the requisite changes during the build process.

        This is accomplished first by creating a simple Apptainer definition file:
        ```pre title="my_modulus.def"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/AI_ML/NGC/apptainer/modulus/modulus.def:1:15"
        ```
        The definition file begins by pulling a specified version of the Modulus container, then modifying it in our `%post` step.  In `%post` we update the `pip` Python package installer, use `pip` to install some additional Python packages not in the base image but required for the examples run later, and finally removes a conflicting path from the source image.


        Using the `my_modulus.def` file we now create our derived container and store it as a SIF:
        ```pre
        module load apptainer
        TMPDIR=/var/tmp/ singularity build my_modulus.sif my_modulus.def
        ```
        Note in this step we have explicitly set `TMPDIR` to a local file system, as occasionally containers fail to build on the large parallel file systems usually used for `TMPDIR` within NCAR.  (The failure symptoms are usually fatal error messages related to `xattrs`.)

    2. Fetch some examples so we can test our installation:
       ```pre
       git clone https://github.com/NVIDIA/modulus.git
       ```

    3. Run the container in an interactive session on a single Casper GPU. We will launch an interactive session, then run the container interactively with the `singularity shell` command.
       ```pre
       # Interactive PBS submission from a login node:
       qsub -I -A <ACCOUNT> -q casper -l select=1:ncpus=4:mpiprocs=4:ngpus=1 -l gpu_type=v100 -l walltime=1:00:00

       # Then on the GPU node:
       module load apptainer
       singularity shell \
                   --nv --cleanenv \
                   --bind /glade/work \
                   --bind /glade/campaign \
                   --bind /glade/derecho/scratch \
                   ./my_modulus.sif
       ```
       Note the command line arguments to `singularity shell`:
           - `--nv`: enable Nvidia support,
           - `--cleanenv`: clean environment before running container, causing the container to be launched with no knowledge of environment variables set on the host.  This is default behavior for Docker, and is required in this case to prevent conflicting `CUDA_*` and other environment variable settings from confusing the contanierized PyTorch.
           - `--bind /glade/work` etc...:  binds host file systems into the container, allowing us to read and write from GLADE.

     4. Now we are inside the container, as evidenced by the `Apptainer>` command line prompt in the final step of this example.  We will run one of the sample problems checked out in step 3:
       ```pre
       Apptainer> cd modulus/examples/cfd/darcy_fno/
       Apptainer> python ./train_fno_darcy.py
       Warp 0.10.1 initialized:
          CUDA Toolkit: 11.5, Driver: 12.3
          Devices:
            "cpu"    | x86_64
            "cuda:0" | Tesla V100-SXM2-32GB (sm_70)
          Kernel cache: /glade/u/home/benkirk/.cache/warp/0.10.1
       [21:04:13 - mlflow - WARNING] Checking MLFlow logging location is working (if this hangs its not)
       [21:04:13 - mlflow - INFO] MLFlow logging location is working
       [21:04:13 - mlflow - INFO] No Darcy_FNO experiment found, creating...
       [21:04:13 - checkpoint - WARNING] Provided checkpoint directory ./checkpoints does not exist, skipping load
       [21:04:13 - darcy_fno - WARNING] Model FourierNeuralOperator does not support AMP on GPUs, turning off
       [21:04:13 - darcy_fno - WARNING] Model FourierNeuralOperator does not support AMP on GPUs, turning off
       [21:04:13 - darcy_fno - INFO] Training started...
       Module modulus.datapipes.benchmarks.kernels.initialization load on device 'cuda:0' took 205.84 ms
       Module modulus.datapipes.benchmarks.kernels.utils load on device 'cuda:0' took 212.94 ms
       Module modulus.datapipes.benchmarks.kernels.finite_difference load on device 'cuda:0' took 670.44 ms
       [21:04:46 - train - INFO] Epoch 1 Metrics: Learning Rate =  1.000e-03, loss =  6.553e-01
       [21:04:46 - train - INFO] Epoch Execution Time:  3.241e+01s, Time/Iter:  1.013e+03ms
       [21:05:14 - train - INFO] Epoch 2 Metrics: Learning Rate =  1.000e-03, loss =  4.255e-02
       [21:05:14 - train - INFO] Epoch Execution Time:  2.812e+01s, Time/Iter:  8.786e+02ms
       [...]
       ```

       ---

       While this example demonstrated running the container interactively, alternatively steps 3 and 4 can be combined to be run inside a PBS batch job.

### Popular AI/ML tools
Optimized Tensorflow and PyTorch models are available directly from the NGC.

???+ example "Running AI/ML tools from NGC containers"

    **Building an image with Apptainer**

    Anticipating that we may want to make additions to the container, we will build our own derived Apptainer image using a Definition file.
    === "Tensorflow"
        ```pre title="ngc_tensorflow.def"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/AI_ML/NGC/apptainer/tensorflow/tensorflow.def::6"

        [...]
        ```
        ```bash
        module load apptainer
        TMPDIR=/var/tmp/ singularity build my_image.sif ngc_tensorflow.def
        ```

    === "PyTorch"
        ```pre title="ngc_pytorch.def"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/AI_ML/NGC/apptainer/pytorch/pytorch.def::6"

        [...]
        ```
        ```bash
        module load apptainer
        TMPDIR=/var/tmp/ singularity build my_image.sif ngc_pytorch.def
        ```

    **Run the image**

    ```pre
    module load apptainer
    singularity shell \
                --nv --cleanenv \
                --bind /glade/work \
                --bind /glade/campaign \
                --bind /glade/derecho/scratch \
                ./my_image.sif
    [...]
    Apptainer>
    ```
    We are now inside the container. Note the command line arguments to `singularity shell`:  `--nv --cleanenv` enables NVIDIA support with a clean environment; `--bind /glade/work` etc...:  binds host file systems into the container, allowing us to read and write from GLADE.

---

## Building and running containerized FastEddy under MPI on GPUs

!!! warning inline end
    While the result of this demonstration is a functional application, we recommend against using this container for production FastEddy workflows!

    **It is much easier to simply build FasyEddy "bare metal" when operating inside the NCAR HPC environment!!**

This example demonstrates building a containerized version of [FastEddy](https://ral.ucar.edu/fasteddy) from the [open-source variant hosted on GitHub](https://github.com/NCAR/FastEddy-model).  It is **_provided for demonstration purposes_** because it demonstrates several common issues encountered when running GPU-aware MPI applications inside containers across multiple nodes, particularly when binding the host MPI into the container, and the source code is open for any interested user to follow along and adapt.


### About FastEddy

FastEddy is a large-eddy simulation (LES) model developed by the Research Applications Laboratory (RAL) here at NCAR. The fundamental premise of FastEddy model development is to leverage the accelerated and more power efficient computing capacity of graphics processing units (GPU)s to enable not only more widespread use of LES in research activities but also to pursue the adoption of microscale and multiscale, turbulence-resolving, atmospheric boundary layer modeling into local scale weather prediction or actionable science and engineering applications.

### Containerization approach

The container is built **off-premises** with `docker` from three related images, each providing a foundation for the next.  We begin with a

1.  Rockylinux version 8 operating system with OpenHPC version 2 installed, then add
2.  a CUDA development environment and a CUDA-aware MPICH installation on top, and finally add
3.  the FastEddy source and compiled program.

A benefit of this layered approach is that the intermediate images created in steps 1 and 2 can be beneficial in their own right, providing base layers for other projects with similar needs. Additionally, by building the image externally with Docker we are able to switch user IDs within the process (discussed further below), which has some benefits when using containers to enable *development* workflows.

### Building the image

!!! info inline end "Build framework"
    For complete details of the build process, see the Docker-based container build framework described [here](https://github.com/benkirk/containers).

The image was built external to the HPC environment and then pushed to Docker Hub. (For users only interested in the details of *running* such a container, see [instructions for running the container](#running-the-container-on-derecho) below.)

In this case a simple Mac laptop with `git`, GNU `make`, and `docker` all installed locally was used and the process takes about an hour; any similarly configured system should suffice. No GPU devices are required to build the image.


#### The base layer

???+ example "The Rockylinx 8 + OpenHPC base layer"
    For the base layer we deploy an [OpenHPC v2](https://openhpc.community/openhpc-2-0-released) installation on top of a Rocklinux v8 base image.  OpenHPC provides access to many pre-complied scientific libraries and applications, and supports a matrix of compilers and MPI permutations. and we will select one that works well with Derecho.  Notably, at present OpenHPC does **not** natively support CUDA installations, however we will address this limitation in the subsequent steps.

    ```pre title="rocky8/OpenHPC-mpich/Dockerfile" linenums="1"
    ---8<--- "https://raw.githubusercontent.com/benkirk/containers/main/containers/rocky8/OpenHPC-mpich/Dockerfile"
    ```
    **Dockerfile Steps**

    1. The image begins with a minimal Rockylinux v8 image, and adds a utility script `docker-clean` copied from the build host.
    2. We parameterize several variables with build arguments using the `ARG` instructions.  (Build arguments are available within the image build process as environment variables, but *not* when running the resulting container image; rather `ENV` instructions can be used for those purposes. For a full discussion of `Dockerfiles` and supported instructions see [here](https://docs.docker.com/engine/reference/builder/).)
    3. We then perform a number of `RUN` steps.  When running `docker`, each `RUN` step creates a subsequent *layer* in the image. (We follow general Docker [guidance](https://docs.docker.com/develop/develop-images/instructions/) and also strive to [combine related commands](https://stackoverflow.com/questions/39223249/multiple-run-vs-single-chained-run-in-dockerfile-which-is-better) inside a handful of `RUN` instructions.)

        1. The first `RUN` instruction takes us from the very basic Rockylinux 8 source image to a full OpenHPC installation.  We add a non-privileged user `plainuser` to leverage later, update the OS image with any available security patches, and then generally follow an [OpenHPC installation recipe](https://github.com/openhpc/ohpc/releases/download/v2.7.GA/Install_guide-Rocky8-Warewulf-SLURM-2.7-aarch64.pdf) to add compilers, MPI, and other useful development tools.
        2. The second `RUN` step works around an issue we would find later when attempting to run the image on Derecho.  Specifically, the OpenHPC `mpich-ofi` package provides support for the long-deprecated MPI C++ interface.  This is not present on Derecho with the `cray-mpich` implementation we will ultimately use to run the container.  Since we do not need this support, here we hack the `mpicxx` wrapper so that it does not link in `-lmpicxx`, the problematic library.
        3. The third and following `RUN` instructions steps create a directory space `/opt/local` we can use from our unprivileged `plainuser` account, copy in some more files, and then switch to `plainuser` to test the development environment by installing some common MPI benchmarks.

    **Discussion**

    - OpenHPC v2 supports both OpenSUSE and Rocklinux 8 as its base OS. It would be natural to choose OpenSUSE for similarity to Casper and Derecho, however by choosing instead Rocklinux we gain access to a different build environment, which has benefits for developers looking to improve portability.  This process followed here can also be thought of as a "roadmap" for deploying the application at similarly configured external sites.

    - OpenHPC supports `openmpi` and `mpich` MPI implementations, with the latter in two forms: `mpich-ucx` and `mpich-ofi`.  In this example we intentionally choose `mpich-ofi` with prior knowledge of the target execution environment.  On Derecho the primary MPI implementation is `cray-mpich` (itself forked from `mpich`) which uses an HPE-proprietary `libfabric` interface to the Slingshot v11 high-speed communication fabric.

    - Notice that each `RUN` step is finalized with a [`docker-clean` command](https://github.com/benkirk/containers/blob/main/extras/docker-clean).  This utility script removes temporary files and cached data to minimize the size of the resulting image layers.  One consequence is that the first `dnf` package manager interaction in a `RUN` statement will re-cache these data.  Since cached data are not relevant in the final image - especially when run much later on - we recommend removing it to reduce image bloat.

    - In this example we are intentional switching between `root` (the default user in the build process) and our unprivileged `plainuser` account.  Particularly in development workflows, we want to be sure compilation and installation steps work properly as an unprivileged user, and tools such as the `lmod` module system and `mpiexec` often are intended *not* to be used as `root`.

    - Since MPI container runtime inregration can be a pain point at execution, we install [OSU's](https://mvapich.cse.ohio-state.edu/benchmarks/) and [Intel's](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-mpi-benchmarks.html) MPI benchmark suites to aid in deployment testing, independent of any user application.

    ---

    **Building the image**
    ```console
    docker build --tag <dockerhub_username>/rocky8-openhpc-mpich:latest .
    ```


#### Adding CUDA & CUDA-aware MPICH

???+ example "Adding CUDA + CUDA-aware MPICH"
    Next we add CUDA and add a CUDA-aware MPI installation.  We choose a specific version of the open-source MPICH library (both to closely match what is provided by OpenHPC and for Derecho compatibility) and configure it to use the pre-existing OpenHPC artifacts (`hwloc`, `libfabric`) as dependencies. For both `cuda` and the new `mpich` we also install "modulefiles" so the new additions are available in the typical module environment.  Finally, we re-install one of the MPI benchmark applications, this time with CUDA support.
    ```pre title="rocky8/OpenHPC-cuda/Dockerfile" linenums="1"
    ---8<--- "https://raw.githubusercontent.com/benkirk/containers/main/containers/rocky8/OpenHPC-mpich-cuda/Dockerfile"
    ```

    **Dockerfile Steps**

    1. We switch back to the `root` user so we can modify the operating system installation within the image.

    2. The first `RUN` instruction installs a full CUDA development environment and some additional development packages required to build MPI later.

    3. The next `RUN` instructions install modulefiles into the image so we can access the CUDA and (upcoming) MPICH installation, and clean up file permissions.  The remaining steps are executed again as our unprivileged `plainuser`.

    4. The fourth `RUN` instruction downloads, configures, and installs MPICH.  The version is chosen to closely match the baseline MPICH already installed in the image and uses some of its dependencies, and we also enable CUDA support.

    5. In the final `RUN` instruction we re-install one of the MPI benchmark applications, this time with CUDA support.

    **Discussion**

    - There are several ways to install CUDA, here we choose a "local repo" installation because it allows us to control versions, but are careful also to remove the downloaded packages after installation, freeing up 3GB+ in the image.

    - The CUDA development environment is very large and it is difficult to separate unnecessary components, so is step increases the size of the image from ~1.2GB to 8.8GB. We leave all components in the development image, including tools we will very likely not need *inside* a container such as `nsight-systems` and `nsight-compute`.  For applications built on top of this image, a user could optionally remove these components later to decrease their final image size (demonstrated next).

    ---

    **Building the image**
    ```console
    docker build --tag <dockerhub_username>/rocky8-openhpc-mpich-cuda:latest .
    ```

#### Building FastEddy

???+ example "Adding FastEddy"
    ```pre title="rocky8/OpenHPC-FastEddy/Dockerfile" linenums="1"
    ---8<--- "https://raw.githubusercontent.com/benkirk/containers/main/containers/rocky8/OpenHPC-FastEddy/Dockerfile"
    ```
    **Dockerfile Steps**

    1. Again we switch back to `root` for performing operating system level tasks, as our base image left us as `plainuser`.
    2. The first `RUN` instruction installs the development package for NetCDF - an additional application dependency not already satisfied.  We also remove some particularly large CUDA components from the *development* image not required in the final *application* image.
    3. Then again as `plainuser`, the next `RUN` instruction downloads the FastEddy open-source variant.  We make some changes to the definition of a few hard-coded `make` variables so that we can specify installation paths during linking later.
    4. The final `RUN` instruction then builds FastEddy.  We build up and use custom `INCLUDE` and `LIBS` variables, specifying some unique paths for the particular build environment.

    **Discussion**

    - When building the image locally with Docker, the space savings from step (2) are not immediately apparent.  This is a result of the Docker "layer" approach: the content still exists in the base layer and is only "logically" removed by the commands listed above.  The space savings is realized on the HPC system when we "pull" the image with `singularity`.
    - If an even smaller container image is desired, even more components could be stripped: CUDA numerical libraries the application does not need, or even the containerized MPIs after we are done with them.  As we will see next, we replace the container MPI with the host MPI at run-time, so technically no MPI is required inside the container when we are done using it for compilation.

    **Building the image**
    ```console
    docker build --tag <dockerhub_username>/rocky8-openhpc-fasteddy:latest .
    ```

    **Pushing the image to Docker Hub**
    ```console
    docker push <dockerhub_username>/rocky8-openhpc-fasteddy:latest
    ```

### Running the container on Derecho
With the container built from the steps above (or simply pulling the resulting image from Docker Hub), we are now ready to run a sample test case on Derecho.  We choose `Example02_CBL.in` from the [FastEddy Tutorial](https://fasteddytutorial.readthedocs.io/en/latest/cases/CBL.html) and modify it to run on 24 GPUs (full steps listed [here](https://github.com/NCAR/hpc-demos/tree/main/containers/tutorial/apptainer/FastEddy)).  The PBS job script listed below shows the steps required to "bind" the host MPI into the container.

???+ example "Containerized FastEddy PBS Script"
    ```bash title="run_fasteddy_container.pbs"
    ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/apptainer/FastEddy/run_fasteddy_container.pbs"
    ```

    **Discussion**

    The `mpiexec` command is fairly standard.  Note that we are using it to launch `singularity`, which in turn will start up the containerized `FastEddy` executable.

    The `singularity exec` command line is complex, so let's deconstruct it here:

    - We make use of the `--bind` argument first to mount familiar GLADE file systems within the container,

    - and again to "inject" the host MPI into the container (as described [here](./working_with_containers.md#running-containerized-mpi-applications)).  The `/run` directory necessity is not immediately obvious but is used by Cray-MPICH as part of the launching process.

    - We also need to use the `--env` to set the `LD_LIBRARY_PATH` inside the image so that the application can find the proper host libraries.  Recall when we built the FastEddy executable in the containerized environment it had no knowledge of these host-specific paths.  Similarly, we use `--env` to set the `LD_PRELOAD` environment variable inside the container.  This will cause a particular Cray-MPICH library to be loaded prior to application initialization.  This step is not required for "bare metal" execution.

    - We set some important Cray-MPICH specific `MPICH_*` environment variables as well to enable CUDA-awareness (`MPICH_GPU_*`)  and work around an MPI run-time error  (`MPICH_SMP_SINGLE_COPY_MODE`) that will otherwise appear.
      - Finally, a note on the `--bind /usr/lib64:/host/lib64` argument.  Injecting the host MPI requires that some shared libraries from the host's `/usr/lib64` directory be visible inside the image.  However, this path also exists inside the image and contains other libraries needed by the application.  We cannot simply bind the hosts directory into the same path, doing so will mask these other libraries.  So we bind the host's `/usr/lib64` into the container image at `/host/lib64`, and make sure this path is set in the `LD_LIBRARY_PATH` variable as well.  Because we want these particular host libraries found as last resort (not taking precedence over similar libraries in the container, we append `/host/lib64` to the `LD_LIBRARY_PATH` search path.


    The arguments above were determined iteratively through trial and error.  Such is the reality of containerized MPI applications and proprietary host MPI integration. Feel free to experiment with the PBS file, omitting some of the `--bind` and `--env` arguments and observing the resulting error message, however  **do NOT modify the `MPICH_GPU_*` variables**, doing so may trigger a very unfortunate kernel driver bug and render the GPU compute nodes unusable.


    **Pulling the image**

    We begin with pulling the image from Docke Hub and constructing a SIF. (If you want to test your own built/pushed image, replace `benjaminkirk` with your own `<dockerhub_username>` as specified in the tag/push operations listed above.)
    ```console
    derecho$ singularity pull rocky8-openhpc-fasteddy.sif docker://benjaminkirk/rocky8-openhpc-fasteddy:latest
    [...]

    derecho$ ls -lh rocky8-openhpc-fasteddy.sif
    -rwxr-xr-x 1 someuser ncar 3.1G Dec  5 17:08 rocky8-openhpc-fasteddy.sif
    ```

    **Running the job**
    ```console
    derecho$ mkdir ./output
    derecho$ qsub -A <account> run_fasteddy_container.pbs
    derecho$ tail -f fasteddy_job.log
    ```

---

## "Faking" a native installation of containerized applications

Occasionally it can be beneficial to "hide" the fact that a particular application is containerized, typically to simplify the user interface and usage experience.
In this section we follow a clever approach deployed by the [NIH Biowulf team](https://hpc.nih.gov/apps/singularity.html) and outlined [here](https://singularity-tutorial.github.io/07-fake-installation/) to enable users to interact transparently with containerized applications without needing to know any details of the run-time (`singularity`, `ch-run`, etc...).

The basic idea is to create a `wrapper.sh` shell script that

1. Infers the name of the containerized command to run,
2. Invokes the chosen run-time transparently to the user, and
3. Passes along any command-line arguments to the containerized application.

Consider the following directory tree structure, taken from a production deployment:
```bash title="Directory tree for 'faking' native installation of containerized applications"
/glade/u/apps/opt/leap-container/15/
├── bin/
│   ├── eog -> ../libexec/wrap_singularity.sh
│   ├── evince -> ../libexec/wrap_singularity.sh
│   ├── gedit -> ../libexec/wrap_singularity.sh
│   ├── geeqie -> ../libexec/wrap_singularity.sh
│   ├── gimp -> ../libexec/wrap_singularity.sh
│   ├── gv -> ../libexec/wrap_singularity.sh
│   ├── smplayer -> ../libexec/wrap_singularity.sh
│   ├── vlc -> ../libexec/wrap_singularity.sh
│   └── xfig -> ../libexec/wrap_singularity.sh
└── libexec/
    ├── Makefile
    ├── ncar-casper-gui_tools.sif
    └── wrap_singularity.sh
```


At the top level, we simply have two directories: `./bin/` (which likely will go into the user's `PATH`) and `./libexec/` (where we will hide implementation details).

**Constructing the `bin` directory**

The `./bin/` directory contains symbolic links to the `wrap_singularity.sh` script, where the name of the symbolic link is the containerized application to run.  For the example above, when a user runs `./bin/gv` for example, it will invoke the `wrap_singularity.sh` "behind the scenes."  In general there can be many application symbolic links in the `./bin/` directory, so long as the desired application exists within the wrapped container image.

**The `wrap_singularity.sh` wrapper script**

The `wrap_singularity.sh` script is written such that  whatever symbolic links you create to it will run inside of the container, inferring the application name from that of the symbolic link.
```bash  title="wrap_singularity.sh" linenums="1"
#!/bin/bash

#----------------------------------------------------------------------------
# environment
topdir="$(pwd)"
selfdir="$(dirname $(readlink -f ${BASH_SOURCE[0]}))"
requested_command="$(basename ${0})"
container_img="ncar-casper-gui_tools.sif"
#----------------------------------------------------------------------------

type module >/dev/null 2>&1 || source /etc/profile.d/z00_modules.sh
module load apptainer || exit 1

cd ${selfdir} || exit 1
[ -f ${container_img} ] || { echo "Cannot locate ${container_img}"; exit 1; }

cd ${topdir} || exit 1

singularity \
    --quiet \
    exec \
    -B /glade/campaign \
    -B /glade/derecho/scratch \
    -B /glade/work \
    -B /glade/u \
    ${selfdir}/${container_img} \
    ${requested_command} ${@}
```

Specifically:

- The command to execute is inferred from the shell argument `${0}` - the name of the script being executed.  Here is where the symbolic links from `./bin` are important:  If the symbolic link `./bin/gv` is invoked, for example, the script above will execute with the name `gv`.  This is accessible within the script as `${0}`, and is stored in the `requested_command` variable on line 7.
- Any command-line arguments passed to the executable are captured in the `${@}` environment variable, and are passed directly through as command-line arguments to the containerized application (line 27).
- We bind-mount the usual GLADE file systems so that expected data are accessible (lines 22-25).
- In this example we execute all commands in the same base container `ncar-casper-gui_tools.sif` (specified on line 8).  This is the simplest approach, however strictly not required.  (A more complex treatment could "choose" different base containers for different commands using a `bash` `case` statement, for example, if desired.)
- The container is launched with the users' directory `topdir` as the working directory.  This is required so that any relative paths specified are handled properly.
- In order to robustly access the required `apptainer` module, we first check to see if the `module` command is recognized and if not initialize the module environment (line 11), then load the `apptainer` module (line 12).  This allows the script to function properly even when the user does not have the module system initialized in their environment - a rare but an occasional issue.


While the example above wraps the Apptainer run-time, a similar approach works for Charliecloud and Podman as well if desired.



<!--  localwords:  Apptainer OpenHPC Derecho CBL FastEddy MPI Dockerfile plainuser CUDA MPICH NGC Casper Tensorflow
 -->
