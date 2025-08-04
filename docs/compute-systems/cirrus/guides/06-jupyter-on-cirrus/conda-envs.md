# Conda Environments

The NCAR JupyterHub uses the `nb_conda_kernels` extension to allow custom Conda/Mamba environments to be saved and persist across user sessions. 

These environments are stored in `/home/jovyan/my-conda-envs` because `/home/jovyan` is mounted on what is known as a [persistent volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

## Creating a New Environment

Most well-written code bases include a list of packages required to run, typically in either:

- `requirements.txt` (for pip)
- `environment.yml` (for conda or mamba) 

The example below walks through creating a Conda environment from the public GeoCAT-examples repository (https://github.com/NCAR/geocat-examples), which includes an `environment.yml` file named `conda_environment.yml`.

After cloning it into your JupyterHub instance, you can create the environment it uses.

  

### Steps:

1. **Open the File Browser** and navigate to the directory containing the `conda_environment.yml` file.

2. **Launch a new Terminal** via the Launcher tab. (The terminal opens in the current directory.)  
   If you're not in the correct directory, navigate using `cd` or provide the full path to the YAML file.

3. **Create the environment** using:
   ```bash
   conda env create -f conda_environment.yml
   ```

This process may take a few minutes. If it completes successfully, you'll see a message that the environment can be activated with:

```bash
conda activate geocat-examples
```

Run the command to confirm it activates correctly. To exit, run:

```bash
conda deactivate
```

Once created, this new environment will appear in the **kernel selection menu** in your notebooks, alongside the preinstalled base environments. It is now persistently available on your JupyterHub instance.

---

## Base Environments

### cirrus-base

The NCAR JupyterHub has a custom conda environment, `cirrus-base`, as the default base environment. This environment has been put together based on input from users, referencing other production Jupyter images, and requirements that were set to deliver to users.

An up to date list of packages and versions can be found directly at this [link to the file in GitHub](https://github.com/NCAR/cirrus-jhub-images/blob/main/images/base-notebook/packages/cirrus-base.yml)

### NPL (NCAR Python Library)

We also include the most recent version of **NCAR Python Library (NPL)** conda environment and Python Kernel to users. This is a copy of the packages utilized for NPL that is hosted on HPC.

An up to date list of packages and versions can be found directly at this [link to the file in GitHub](https://github.com/NCAR/cirrus-jhub-images/blob/main/images/base-notebook/packages/npl-2025a.yml)

### r-4.4

We provide a base R environment with packages mirroring the package set used in the HPC-hosted JupyterHub for R users.

An up to date list of packages and versions can be found directly at this [link to the file in GitHub](https://github.com/NCAR/cirrus-jhub-images/blob/main/images/base-notebook/packages/r-4.4.yml)