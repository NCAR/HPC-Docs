# Using `uv` for Python Package Management

Our HPC users can also use **`uv`**, an extremely fast package and project manager written in Rust.

`uv` can act as a drop-in replacement for `pip` and `venv`, and is designed for high performance and reproducible Python workflows.

## What is `uv`?

[`uv`](https://github.com/astral-sh/uv) is a Python package and project manager written in Rust. It provides:

- Very fast environment and package operations (create, install, resolve).
- A unified interface that can replace:
  - `pip` for package installation and management.
  - `venv` for creating virtual environments.
- A modern, reproducible workflow for Python projects (including `pyproject.toml`-based projects).

While `uv` is not a replacement for Conda in all scenarios, it excels at
pure Python workloads where system-level dependencies are not required.

!!! warning "uv vs. Conda vs. Pixi: Choosing the right tool"
      `uv` is designed for pure Python projects and cannot install non-Python
      dependencies or packages in other languages. If your work requires these dependencies, use Conda or Pixi instead.
      `uv` works best when your project only needs Python packages available on [PyPI](https://pypi.org/).

!!! info "To read more about `uv`, visit the [official documentation](https://docs.astral.sh/uv/)."

---

## Using `uv` on NSF NCAR Systems

On our HPC systems, we provide a `uv` module that:

  - provides access to the `uv` command,
  - allows you to create lightweight, fast Python environments for your projects, and
  - configures `uv` to store cache and package data in your `/glade/work/$USER/uv` space to avoid filling your home directory quota.

Before using `uv`, ensure no conda environments are active:
```bash
conda deactivate
```

Then, load the `uv` module:
```bash
module load uv
```

The module will automatically unload any loaded conda modules to prevent conflicts.

!!! note "Cache location"
    The `uv` module automatically configures cache directories in
    `/glade/work/$USER/.cache/uv/` to prevent home directory quota issues.
    
## Creating and Activating a Virtual Environment with `uv`

`uv` can create virtual environments similar to `python -m venv`, but with improved performance and additional features.

To create an environment:

```bash
mkdir -p /glade/work/$USER/uv-envs

# Create a new uv virtual environment
uv venv /glade/work/$USER/uv-envs/myenv

# Activate the environment
source /glade/work/$USER/uv-envs/myenv/bin/activate   
```

Once your `uv` environment is active, you can install packages using uv’s pip interface:
```bash
uv pip install numpy pandas matplotlib
```

This behaves similarly to `pip`, but with **much** faster dependency resolution. 

Similarly you can update the `venv` using a `requirements.txt` file:
```bash
uv pip install -r requirements.txt
```

### Specifying Python Versions with `uv`
You can create virtual environments with specific Python versions using the `--python` flag.

```bash
uv venv /glade/work/$USER/uv-envs/myenv-py3.10 --python python3.10

source /glade/work/$USER/uv-envs/myenv-py3.10/bin/activate

python --version
```

If you do not specify a Python version, `uv` will use the default Python version available in your environment.

!!! tip "Environment location"
    Create virtual environments in `/glade/work/$USER` to avoid filling
    your home directory quota. Virtual environments can be several MBs-GBs 
    or larger depending on installed packages.

## Creating your own `uv` project

`uv`'s project-based workflow is recommended for research code and any
work you plan to share or reproduce later. Projects use a
`pyproject.toml` file to specify dependencies and automatically manage
lock files for exact reproducibility.

To create a new project:

```bash
cd /glade/work/$USER
uv init my-analysis
```

This creates a project directory with the following structure:

```
my-analysis/
├── pyproject.toml    # Project configuration and dependencies
├── README.md         # Project description
└── .python-version   # Pinned Python version
```

Now you can add dependencies to your project:

```bash
cd my-analysis
# Add packages
uv add numpy pandas matplotlib xarray
```

Each time you add packages, `uv` updates your `pyproject.toml` and creates
or updates a `uv.lock` file that pins exact versions of all
dependencies. This lock file ensures that anyone can reproduce your
exact environment.

To run Python in your project environment:

```bash
# Run a script
uv run python analyze_data.py

# Start an interactive Python session
uv run python
```

The `uv run` command automatically activates your project environment
before running the command, so you don't need to manually activate
anything.

!!! note "Project environments"
    `uv` stores project environments in a `.venv` directory within your
    project. You do not need to activate this environment manually when
    using `uv run`. Alternatively, you can activate it traditionally with
    `source .venv/bin/activate`; then use `python` as usual.


## Reproducing `uv` environments

One of `uv`'s key strengths is built-in support for reproducibility
through lock files.

### Using lock files

When you create a `uv` project and add dependencies, `uv` automatically
generates a `uv.lock` file that specifies exact versions of all
packages and their dependencies. 

To reproduce an environment from a project with a lock file:

```bash
# Clone or copy a project with pyproject.toml and uv.lock
cd my-analysis

# Install exact versions from lock file
uv sync --frozen
```

The `--frozen` flag tells `uv` to use the exact versions in the lock file
without attempting to update them. This ensures you get an identical
environment to the original.

!!! note "Lock files and version control"
    We strongly recommend committing `uv.lock` files to version control
    (Git) alongside your `pyproject.toml`. This allows colleagues and your
    future self to reproduce exact environments. The lock file is
    text-based and handles merge conflicts reasonably well.


## Creating Jupyter kernels for `uv` environments

`uv` environments can be used in JupyterLab sessions on the [NCAR JupyterHub](../../compute-systems/jupyterhub/index.md) service. There are two approaches to making `uv` environments available as Jupyter kernels.

### Creating Jupyter kernels for `uv` environments

First, install the `ipykernel` package into your `uv` environment:

```bash
source .venv/bin/activate
uv pip install ipykernel
```

At this point, your environment should appear automatically as a kernel
option when you start a Jupyter server on Derecho or Casper. This
method is convenient and ensures that all environment settings are
properly applied when the kernel launches.

You can also manually create a kernel specification with a custom name:

**For `uv` projects:**
```bash
uv run python -m ipykernel install --user --name=my-uv-analysis-kernel
```
This registers the `uv` environment as a Jupyter kernel named
`my-uv-analysis-kernel`.

!!! example "Using `uv` in Batch Jobs"
    The `uv` module can be loaded in batch scripts just like on login nodes.

    Here is an example PBS code using `uv` virtual environments:

    ```bash
    #!/bin/bash
    #PBS -N uv_venv_job
    #PBS -A PROJECT_CODE
    #PBS -l select=1:ncpus=4:mem=16GB
    #PBS -l walltime=02:00:00
    #PBS -q main

    # Load uv module
    module load uv

    # Activate your virtual environment
    source /glade/work/$USER/uv-envs/myenv/bin/activate

    # Run your script
    python analyze.py
    ```