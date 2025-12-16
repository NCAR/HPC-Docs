# Using `Pixi` for Package Management

NCAR system users can also use [**`Pixi`**](https://pixi.sh/latest/), a fast package manager built in Rust that uses the conda ecosystem. 
Pixi provides a modern, project-based workflow for
managing dependencies across Python, R, C/C++, Julia, and other
languages, with significantly faster performance than traditional conda.

Pixi builds upon the foundation of the Conda ecosystem, introducing a workspace-centric approach rather than focusing solely on environments.
This project workspace approach offers a more organized and efficient way to manage dependencies and run code, tailored to modern development practices.

!!! note "uv vs. Pixi vs. Conda"
    Pixi uses the same package repositories as Conda (conda-forge, etc.)
    but with much faster dependency resolution and environment creation. If
    you currently use Conda and find it slow, Pixi may be an excellent
    alternative. For pure Python projects, consider `uv`
    instead.


## Using `pixi` on NCAR Systems

Pixi is available as an environment module on NCAR systems.

Before using `pixi`, ensure no conda environments are activated by running:
```bash
conda deactivate
```

Then, load the `pixi` module:
```bash
module load pixi
```

The module will automatically unload the system Conda modules to prevent conflicts.

This module:

- provides access to the `pixi` command.
- configures Pixi to store cache and package data in your
  `/glade/work` space to avoid filling your home directory quota.
- allows you to create fast, multi-language environments for your research.
- supports reproducible workflows through automatic lock file generation.

!!! note "Cache location"
    Unlike default Pixi behavior, the module redirects all cache locations to your `/glade/work/$USER` directory. This prevents your
    home directory quota from being exceeded by package caches. You do not
    need to configure this yourself.

You can verify that Pixi is properly loaded:
```bash
    pixi info
```
The cache directory should point to your work space, not your home directory.


### Creating your own Pixi project

To create a new project:

```bash
cd /glade/work/$USER/projects
pixi init example-analysis
cd example-analysis
```
This creates a project directory with a `pixi.toml` configuration file:

```
example-analysis/
├── pixi.toml      # Project configuration and dependencies
└── .gitignore     # Ignores Pixi environment directory
```

The `pixi.toml` file defines your project's dependencies and configuration. 

Now you can add packages:

```bash
# Add Python and packages
pixi add python numpy pandas matplotlib xarray

# Add system libraries
pixi add hdf5
```

Each time you add packages, Pixi updates your `pixi.toml` file and creates or updates a `pixi.lock` file. 

This lock file pins exact versions of all packages and dependencies, ensuring anyone can reproduce
your exact environment.

!!! note "Project environments"
    Pixi stores environment files in a `.pixi` directory within your
    project. This directory should not be committed to version control. The
    `pixi.toml` and `pixi.lock` files contain everything needed to
    recreate the environment.

### Running commands in Pixi environments

To run commands in your project environment:

```bash
# Run Python script
pixi run python analyze_data.py

# Run any other commands such as :
pixi run pytest tests/
```

Alternatively, you can start an interactive shell with the environment activated. This is analogous to activating a conda environment:

```bash
# Start an interactive shell with environment activated (equal to `conda activate myenv`)
pixi shell

# Now you can run commands directly
python analyze_data.py
pytest tests/
```

To exit the shell, type `exit` or press `Ctrl+D`.


!!! note "Using lock files"
        To reproduce an environment from a Pixi project:
        ```bash
        pixi install --frozen
        ```
        The `--frozen` flag tells Pixi to use the exact versions in the lock file without attempting to update them. 

        This ensures you get an identical environment to the original, which is critical for reproducible science.

### Sharing projects with colleagues

Pixi projects are self-contained and easy to share. See the example below:

```bash
# Person A creates and shares project
cd /glade/work/$USER/projects
pixi init shared-analysis
cd shared-analysis
pixi add python numpy xarray
git init
git add pixi.toml pixi.lock .gitignore
git commit -m "Initial project"
git push

# Person B reproduces environment
git clone <repository-url>
cd shared-analysis
module load pixi
pixi install --frozen
pixi run python analysis.py
```

Because Pixi uses conda channels, the same packages are available across different systems, making it easy to collaborate across NCAR systems or with external collaborators.

## Using Pixi environments in Jupyter

Pixi environments can be used in JupyterLab sessions on the [NCAR JupyterHub](../../compute-systems/jupyterhub/index.md) service.

### Creating Jupyter kernels for Pixi environments

First, add `ipykernel` to your Pixi project:

```bash
cd /glade/work/$USER/projects/example-analysis
pixi add ipykernel
```

At this point, your Pixi environment should appear automatically as a kernel option when you start a Jupyter server on Derecho or Casper. The
kernel will be named based on your project name.

You can also manually create a kernel specification with a custom name:

```bash
cd example-analysis
pixi run python -m ipykernel install --user --name=my-example-analysis-kernel
```

This registers the Pixi environment as a Jupyter kernel named `my-example-analysis-kernel`.


## Key Differences Between `Pixi` and `Conda/Mamba` commands

| Task                        | Conda/Mamba                                       | Pixi                                                                      |
|-----------------------------|---------------------------------------------------|---------------------------------------------------------------------------|
| Creating an Environment     | `conda create -n myenv -c conda-forge python=3.8` | `pixi init myenv` followed by `pixi add python=3.8`                       |
| Activating an Environment   | `conda activate myenv`                            | `pixi shell` within the workspace directory                               |
| Deactivating an Environment | `conda deactivate`                                | `exit` from the `pixi shell`                                              |
| Running a Task              | `conda run -n myenv python my_program.py`         | `pixi run python my_program.py`                                           |
| Installing a Package        | `conda install numpy`                             | `pixi add numpy`                                                          |
| Uninstalling a Package      | `conda remove numpy`                              | `pixi remove numpy`                                                       |


!!! abstract "Additional Resources"
    - [Pixi Official Documentation](https://pixi.sh/latest/)
    - [Getting Started with Pixi](https://pixi.sh/latest/getting-started/)
    - [Switching from Conda to Pixi](https://pixi.sh/latest/switching_from/conda/)
    - [Browse Conda Packages](https://conda-metadata-app.streamlit.app/?q=conda-forge)