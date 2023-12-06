## General considerations

### Interaction with environment variables

Different container run-times differ greatly in how they handle environment variables set *externally* on the host. Docker (and by similarity Podman) usually runs containers in a "clean" environment, that is, variables set on the host do not exist inside the container.  Charliecloud by contrast passes nearly all environment variables from the host into the container.  Apptainer takes a middle ground, by default passing along host environment variables, but this behavior can be changed with command-line arguments.

The Docker/Podman approach makes sense when containerizing small services or pieces of code that you want to run identically everywhere, independent of the host environment.  Conversely, the Apptainer & Charliecloud approach makes more sense when many critical.  Regardless, at some point when working with containers you will undoubtedly find an issue that is traced either to a variable being inherited from the host when you don't want it to be, or missing in the container when you really want it.

Each run-time  allows for environment variables to be set explicitly from the run command line.  Additionally, when building containers you can generally embed environment variables as well.  Again, this behavior is run-time dependent as shown in the following example.

!!! example "Container run-times and environment variables"
    **Host Environment**

    We set the following variables on the host system prior to launching the container:
    ```bash
    ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/apptainer/config_demo_env_vars.sh"
    ```

    **Container Environment**

    We then construct a tiny container image (<10MB) from the minimal [Alpine Linux](https://www.alpinelinux.org/) distribution. When we run the container it will report the value of several environment variables: `HOST_VAR`, `CONTAINER_VAR`, `TOGGLE_VAR`, and `RANDOM_VAR` (if set).

    === "Apptainer"
        The Apptainer Definition file `%environment` section allows us to define variables that exist *inside* the container.
        ```pre  title="Definition File"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/apptainer/my_alpine.def"
        ```
        **Container Environment Examples**

        Running the container shows that `HOST_VAR` is passed in by default, and `TOGGLE_VAR` retains its value from inside the container definition unless explicitly passed via the `--env` argument. The argument `--cleanenv` prevents external variables from being passed.
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/apptainer/results/05_env_vars.sh.out"
        ```

    === "Charliecloud"
        The Charliecloud `Dockerfile` `ENV` section allows us to define variables, but its use seems inconsistent in practice.
        ```pre  title="Dockerfile"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/charliecloud/Dockerfile.my_alpine"
        ```
        **Container Environment Examples**

        Running the container shows that `HOST_VAR` is passed in by default, and `TOGGLE_VAR` always takes its value from the host. The argument `--set-env=VAR=val` allows variables to be passed to the container.  Despite being set with the `ENV` instruction, `CONTAINER_VAR` has disappeared.  The argument `--unset-env` can be passed to prevent certainspecified host varibles from passing into the container, with `--unset-env="*"` preventing any.
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/charliecloud/results/05_env_vars.sh.out"
        ```
        **Discussion**

        Apparently, Charliecloud honors the `ENV` `Dockerfile` instruction at build-time but disregards it at run-time.

    === "Podman"
        The Podman `Dockerfile` `ENV` section allows us to define variables that exist *inside* the container.
        ```pre title="Dockerfile"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/podman/Dockerfile.my_alpine"
        ```
        **Container Environment Examples**

        Running the container shows that `HOST_VAR` is not passed in by default, and `TOGGLE_VAR` retains its value from inside the container definition unless explicitly passed via the `--env` argument.
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/podman/results/05_env_vars.sh.out"
        ```

    ---

    **Summary**

    Each container run-time allows you to pass environment variables in via command line arguments, and have different default behaviors with respect to host-defined variables.  Some allow you to set default values that exist inside the container.  Our best guidance is simply be aware of what is defined in your execution environment, pass critical values via command line arguments to avoid ambiguity, and perform error checking on environment variable values inside your image to be safe.

    ---

    Full definitions of the test cases can be found [here](https://github.com/NCAR/hpc-demos/tree/main/containers/tutorial).


### Accessing host file systems

Similar to treatment of environment variables, each container run-time has unique behavior with respect to home and initial working directories inside containers.  By default all provide minimal access to the host file systems, however they allow for host directories to be "bind mounted" into the container upon request.  Following the same approach outlined above, we use our minimal container image to illustrate default and optional file system accessibility.

!!! example "Container run-times and mounting host file systems"

    === "Apptainer"
        The `singularity` `--bind` option allows host directories to be bind-mounted into the container.

        As shown below, by default the users' home directory is mounted.  The initial working directory (`PWD`) behavior depends on where the container is launched from, and if that path has been bind-mounted into the container or not (Steps 1 & 3).  The initial directory can be set explicitly with the `--pwd` flag (Step 2).
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/apptainer/results/04_bind_mounts.sh.out"
        ```

    === "Charliecloud"
        The `ch-run` `--bind` option allows host directories to be bind-mounted into the container.  Note that Charliecloud will not create
        new directories for the bind-mount locations, so we need to ensure they are created within our `Dockerfile`:
        ```pre  title="Dockerfile"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/charliecloud/Dockerfile.my_alpine"
        ```
        As shown below, by default the users' home directory is mounted.  The initial working directory (`PWD`) is the container file system root (`/`). In Step 2 we bind some of the common GLADE file systems into the container using the directories created in the `Dockerfile`.  Step 3 fails, showing Charliecloud refusing to bind-mount into `/random/other` since no such mount point exists in the base image.
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/charliecloud/results/04_bind_mounts.sh.out"
        ```
        **Discussion**

        Charliecloud will not create destination paths for bind-mounts inside the container.  Make sure you create such mount points when you build the image.

    === "Podman"
        The Podman `--volume` option allows host directories to be bind-mounted into the container.

        As shown below, by default the users' is placed into `/root` as a home directory,  The initial working directory (`PWD`) is the container file system root (`/`).
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/podman/results/04_bind_mounts.sh.out"
        ```

    ---

    **Summary**

    Each run-time has a method for accessing host directories within the container.  They are all different with how they treat the users' home and initial working directory inside the container.  Do not assume a given behavior, rather be explicit with changing directories and specifying full paths as necessary.

    ---

    Full definitions of the test cases can be found [here](https://github.com/NCAR/hpc-demos/tree/main/containers/tutorial).


---
## Running containerized MPI applications
The interaction between MPI implementations and container run-times is unfortunately the single biggest pain point of running containers in the HPC environment.  If you're drawn to the "simplicity" promised by containerization but need to run on multiple nodes with MPI, we strongly encourage you to fully consider this section before going further. (The issues are well described [here](https://apptainer.org/docs/user/latest/mpi.html).) First let us distinguish two use cases:

1. **Running MPI *inside* a container on a single node, using an MPI stack defined within the container**:  While somewhat limited, this case is fairly easy to handle since the complexities of interfacing with a high-speed network are largely eliminated.

2. **Running MPI *across* multiple nodes, launching the run-time with MPI from the host**:  This is the general case, and also where complications arise.  This is the focus of the remainder of this section.

When using MPI on the host to launch an MPI application that was compiled within the container, it is imperative the *host* and *container* MPI implementations be compatible.  In practice this means the pair should be from the same implementation (e.g. OpenMPI, or MPICH) and at similar versions - and the closer the versions the better. This means the container image can rarely be created without knowledge of the execution host environment.

For Casper, where we deploy OpenMPI by default, this is not too terribly complicated since most containerized operating systems can easily install similar versions. For Derecho, however, the default MPI is Cray's MPICH, which is proprietary and therefore difficult in general to install into an arbitrary container image.  In this case we must choose particular versions of MPI for the container image, knowing in advance they share heritage with the target host system.  This allows us to build MPI applications inside the container with a compatible - but readily available -  MPI.

We then follow the ["bind model"](https://apptainer.org/docs/user/latest/mpi.html#id1) approach when running the container in order to "replace" the container MPI with the host MPI, gaining access to the high-speed network and vendor MPI optimizations.  For a full demonstration of this process, see [our containerized FastEddy example](./examples.md#building-and-running-containerized-fasteddy-under-mpi-on-gpus).



---

## Running containerized GPU applications

Many GPU compute capabilities are directly available within containers to applications. CUDA, OpenMP and OpenACC offload codes will generally work without any special consideration.

An exception is interfacing directly with the kernel driver.  If you require such functionality, Apptainer provides the easiest support path through its `--nv` command line argument.  See the [Apptainer GPU documentation page](https://apptainer.org/docs/user/latest/gpu.html) for more details.
```pre
# running nvidia-smi from within the container, try 1:
casper$ singularity exec --cleanenv ./my_cuda_container.sif nvidia-smi
Failed to initialize NVML: Driver/library version mismatch

# running nvidia-smi from within the container, try 2:
casper$ singularity exec --nv --cleanenv ./my_cuda_container.sif nvidia-smi
NVIDIA-SMI 545.23.06              Driver Version: 545.23.06    CUDA Version: 12.3     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  Tesla V100-SXM2-32GB           On  | 00000000:89:00.0 Off |                    0 |
| N/A   30C    P0              39W / 300W |      0MiB / 32768MiB |      0%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+
[...]
```

<!--  LocalWords:  Podman Charliecloud Apptainer Dockerfile MPI MPICH
<!--  LocalWords:  OpenMPI FastEddy
 -->
 -->
