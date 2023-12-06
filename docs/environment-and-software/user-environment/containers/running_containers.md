## Introduction


### Accessing host file systems

---

### Interaction with environment variables

Different container run-times differ greatly in how they handle environment variables set *externally* on the host. Docker (and by similarity Podman) usually runs containers in a "clean" environment, that is, variables set on the host do not exist inside the container.  Charliecloud by contrast passes nearly all environment variables from the host into the container.  Apptainer takes a middle ground, by default passing along host environment variables, but this behavior can be changed with command-line arguments.

The Docker/Podman approach makes sense when containerizing small services or pieces of code that you want to run identically everywhere, independent of the host environment.  Conversely, the Apptainer & Charliecloud approach makes more sense when many critical.  Regardless, at some point when working with containers you will undoubtedly find an issue that is traced either to a variable being inherited from the host when you don't want it to be, or missing in the container when you really want it.

Each run-time  allows for environment variables to be set explicitly from the run (or exec) command line invocation:
!!! example "Container run-times and environment variables"
    **Host Environment**
    ```bash
    ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/apptainer/config_demo_env_vars.sh"
    ```

    === "Apptainer"
        ```pre  title="Definition File"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/apptainer/my_alpine.def"
        ```
        **Container Environment Examples**
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/apptainer/results/05_env_vars.sh.out"
        ```

    === "Charliecloud"
        ```pre  title="Dockerfile"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/charliecloud/Dockerfile.my_alpine"
        ```
        **Container Environment Examples**
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/charliecloud/results/05_env_vars.sh.out"
        ```
        **Discussion**
        Apparently, Charliecloud honors the `ENV` `Dockerfile` instruction but disregards it at run-time.

    === "Podman"
        ```pre title="Dockerfile"
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/podman/Dockerfile.my_alpine"
        ```
        **Container Environment Examples**
        ```console
        ---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/containers/tutorial/podman/results/05_env_vars.sh.out"
        ```





## Running containerized MPI applications
The interaction between MPI implementations and container run-times is unfortunately the single biggest pain point of running containers in the HPC environment.  If you're drawn to the "simplicity" promised by containerization but need to run on multiple nodes with MPI, we strongly encourage you to fully consider this section before going further. (The issues are well described [here](https://apptainer.org/docs/user/latest/mpi.html).)

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

<!--  LocalWords:  Podman Charliecloud Apptainer Dockerfile MPI
 -->
