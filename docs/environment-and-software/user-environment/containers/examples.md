# Sample Containerized Workflows

!!! warning
    This page contains a sample of containerized workflows that demonstrate various techniques built up in practice, often from resolving user issues.
    We do not necessarily endorse or support each use case, rather these examples are provided in hopes they may be useful to demonstrate (i) sample
    containerized workflows, and (ii) solutions to various problems you may encounter.

## Running NVIDIA's Modulus physics-ML optimized container
[NVIDIA Modulus](https://docs.nvidia.com/modulus/index.html)  is an open source deep-learning framework for building, training, and fine-tuning deep learning models using state-of-the-art Physics-ML methods. NVIDIA provides a frequently updated Docker image with a containerized PyTorch installation that can be run under Apptainer, albeit with some effort.  Because the container is designed for Docker, some additional steps are required as discussed below.

!!! example "Running containerized NVIDIA-Modulus on a single Casper GPU"

    1. Rather than pull the container and run as-is, we will create a derived container that allows us to encapsulate our desired changes. The primary reason for this is the Modulus container assumes the container is writable and makes changes during execution.   Since we will run under Apptainer using a compressed, read-only image, this fails. Therefore we will make our own derived image and make the requisite changes during the build process.

        This is accomplished first by creating a simple Apptainer definition file:
        ```pre title="my_modulus.def"
        Bootstrap: docker
        From: nvcr.io/nvidia/modulus/modulus:23.09

        %post
            # update pip
            python -m pip install --upgrade pip

            # use pip to install additional packages needed for examples later
            pip install warp-lang

            # Remove cuda compat layer (https://github.com/NVIDIA/nvidia-docker/issues/1256)
            # note that the source container attempts to do this at run-time, but that will
            # fail when launched read-only.  So we do that here instead.
            # (This issue will likely be resolved with newer versions of nvidia-modulus)
            rm -rf /usr/local/cuda/compat/lib
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
           -  `--nv`: enable Nvidia support,
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
       ...
       ```

       ---

       While this example demonstrated running the container interactively, alternatively steps 3 and 4 can be combined to be run inside a PBS batch job



<!--  LocalWords:  Apptainer
 -->
