# Conda environments

The NCAR JupyterHub utilizes an extension known as [nb_conda_kernels](https://github.com/Anaconda-Platform/nb_conda_kernels) to allow custom conda/mamba environments to be saved and persist across user sessions. These are stored in `/home/jovyan/my-conda-envs` because `/home/jovyan` is mounted on what is known as a [persistent volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).  

## Creating a new env

Most of the time well written code will contain a list of packages it requires to run. These typically will be in either a `requirements.txt` file (for `pip`) or an `environment.yml` file (for `conda`). The following example will follow a workflow where a [GitHub repository](github) that contains an `environment.yml` is cloned in to JupyterHub.

Let's say you are working on the geocat-examples repository found [here](https://github.com/NCAR/geocat-examples). You've followed the procedure to clone the repository in to your JupyterHub and now you want to work directly with the code. Before getting started we want to spin up an environment that contains all the packages required for the codebase. In the geocat-examples repository the package list is called `conda_environment.yml`. If in the `File Browser` you are in the directory containing the package list you can open a new `Launcher` tab and open the `Terminal`. This will open directly in the directory you were present in when launched. If you are not in the directory containing the package list `cd` to the appropriate directory or use the path in your `mamba env create` command like in the following example:
```
mamba env create -f conda_environment.yml
```

It will take a little while to install all the packages and create the environment. As long as everything finishes correctly you should see a message that the new environment can be activated by running `conda activate geocat-examples`. Please go ahead and run this to test that the new environment activates properly. To exit the environment run `conda deactivate`. When you go to select a Kernel in your notebook files now you will see the new environment listed along with the base environments that come preinstalled. Congratulations, this new environment is now saved to your JupyterHub instance and can be used at anytime. 

## Base Environments

### cisl-cloud-base

The NCAR JupyterHub has a custom conda environment, cisl-cloud-base, as the default base environment. This environment has been put together based on input from users, referencing other production Jupyter images, and requirements that were set to deliver to users. 

!!! info
This is just a default environment that provides common packages to try and enable users to get started quickly. Custom environments are supported and documentation on how to implement them can be found [here](./customize/env)

#### List of Packages used

An up to date list of packages and versions can be found directly at this [link to the file in GitHub](https://github.com/NCAR/cisl-cloud/blob/main/configs/jupyter/base-notebook/environment.yml)

### NPL

We also include the NCAR Python Library (NPL) conda environment and Python Kernel to users. This is a copy of the packages utilized for NPL that is hosted on HPC. We did have to upgrade a few specific versions to address vulnerabilities. For the most part versions will match what is used on HPC JupyterHub.

#### List of Packages used

An up to date list of packages and versions can be found directly at this [link to the file in GitHub](https://github.com/NCAR/cisl-cloud/blob/main/configs/jupyter/base-notebook/npl-2023b.yml)

### r-4.3

We provide a base R environment with a packages installed based off what is provided to users on HPC JupyterHub.

#### List of Packages used

An up to date list of packages and versions can be found directly at this [link to the file in GitHub](https://github.com/NCAR/cisl-cloud/blob/main/configs/jupyter/base-notebook/r-4.3.yml)
