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

While `uv` is not a replacement for Conda in all scenarios, it excels at pure Python workloads where system-level dependencies are not required.

!!! note "uv vs. Pixi vs. Conda: Choosing the right tool"
      `uv` is designed for pure Python projects and cannot install non-Python
      dependencies or packages in other languages. If your work requires these dependencies, use Conda or Pixi instead.
      `uv` works best when your project only needs Python packages available on [PyPI](https://pypi.org/).

!!! info "To read more about `uv`, visit the [official documentation](https://docs.astral.sh/uv/)."

---

## Using `uv` on NSF NCAR HPC Systems

`uv` is available as an environment module on NCAR HPC systems.

Before using `uv`, ensure no conda environments are active:
```bash
conda deactivate
```

Then, load the `uv` module:
```bash
module load uv
```

By default, uv stores its cache in your home directory, which can quickly exceed your quota. The module automatically sets the cache location to `/glade/derecho/scratch/$USER/.cache/uv`. You can verify that by running `uv cache dir` and confirming the Cache dir points to your scratch space, not your home directory.


!!! warning "conda, uv, and pixi module conflicts"
    If you have previously loaded either `conda` or `pixi` modules in your session, you must unload them before loading `uv`. For example:
    ```bash
    module unload conda
    module load uv
    ```

## Working with Python Projects (Recommended)

`uv` supports managing Python projects, which define their dependencies in a `pyproject.toml` file.

You can create a new Python project using the `uv init` command:

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

The `pyproject.toml` file is where you define your project's dependencies.

!!! note "Using `pyproject.toml`"
    See [the official pyproject.toml guide](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/) for more details on getting started with the `pyproject.toml` format.

### Managing Dependencies

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

You can also install packages from a `requirements.txt` file:

```bash
uv add -r requirements.txt
```

You can remove packages with `uv remove`:

```bash
uv remove numpy
```

To upgrade packages to their latest compatible versions, use:

```bash
uv lock --upgrade-package numpy
```

The `--upgrade-package` flag will attempt to update the specified package to the latest compatible version, while keeping the rest of the lockfile intact.

!!! note
    See [`uv` documentation on dependency management](https://docs.astral.sh/uv/concepts/projects/dependencies/) for more advanced dependency management commands and scenarios.


### Running Commands in `uv` Project Environments

Now, to run Python in your project environment:

```bash
# Run a script
uv run python analyze_data.py

# Start an interactive Python session
uv run python
```

The `uv run` command automatically activates your project environment and keeps it in sync with your `pyproject.toml` and lockfile, guaranteeing your command runs in a consistent, locked environment.

You can use `uv pip list` to see installed packages in your project environment:

```bash
uv pip list
```

!!! note "Project environments"
    `uv` stores project environments in a `.venv` directory within your
    project. You do not need to activate this environment manually when
    using `uv run`. Alternatively, you can activate it traditionally with
    `source .venv/bin/activate`; then use `python` as usual.

---

## Creating and Activating a Virtual Environment with `uv`

`uv` can be used to create standalone virtual environments similar to `python -m venv`.

To create an environment:

```bash
mkdir -p /glade/work/$USER/uv-envs

# Create a new uv virtual environment
uv venv /glade/work/$USER/uv-envs/myenv

# Activate the environment
source /glade/work/$USER/uv-envs/myenv/bin/activate   
```
Once activated, you can use `python` commands within this environment just like a conda environment. If you use `uv run` commands, you do not need to activate the environment manually.

!!! info "Specifying Python Versions with `uv`"
    You can create virtual environments with specific Python versions using the `--python` flag.

        ```bash
        uv venv /glade/work/$USER/uv-envs/myenv-py3.10 --python python3.10

        source /glade/work/$USER/uv-envs/myenv-py3.10/bin/activate

        python --version
        ```
    If you do not specify a Python version, `uv` will use the default Python version available in your environment.

!!! note "Environment location"
    Create virtual environments in `/glade/work/$USER` to avoid filling
    your home directory quota. Virtual environments can be several MBs-GBs 
    or larger depending on installed packages.


### Low-level `uv pip` Commands
These commands are intended for legacy workflows or cases where the high-level project commands (`uv init`, `uv add`, `uv run`) do not provide enough control.

Once your `uv` environment is active, you can install packages using uv’s pip interface:
```bash
uv pip install numpy pandas matplotlib
```

This behaves similarly to `pip`, but with **much** faster dependency resolution.

Similarly you can install from a `requirements.txt` file:
```bash
uv pip install -r requirements.txt
```

or you can uninstall packages:
```bash
uv pip uninstall numpy
```

Other useful `uv pip` commands include:
- `uv pip check`: Check that the current environment has compatible packages.
- `uv pip tree`: View the dependency tree for the environment.
- `uv pip install -r pyproject.toml` : Install packages from a `pyproject.toml` file.


Locking packages in an environment can be done with:
- `uv pip compile`: Compile requirements into a lockfile.
- `uv pip sync`: Sync an environment with a lockfile.

!!! warning
    These commands do not exactly implement the interfaces and behavior of the tools they are based on. Consult the [pip compatibility guide](https://docs.astral.sh/uv/pip/compatibility/) for details.

---
## Reproducing `uv` Environments

One of `uv`'s key strengths is built-in support for reproducibility through lock files.

When you create a `uv` project and add dependencies, `uv` automatically generates a `uv.lock` file that specifies exact versions of all packages and their dependencies.

To reproduce an environment from a project with a lock file:
```bash
# Clone or copy a project with pyproject.toml and uv.lock
cd my-analysis

# Install exact versions from lock file
uv sync --frozen
```

The `--frozen` flag tells `uv` to use the exact versions in the lock file without attempting to update them.

!!! note "Lock files and version control"
    We strongly recommend committing `uv.lock` files to version control (Git) alongside your `pyproject.toml`. This allows colleagues and your future self to reproduce exact environments.


## Creating Jupyter kernels for `uv` environments

`uv` environments can be used in JupyterLab sessions on the [NCAR JupyterHub](../../compute-systems/jupyterhub/index.md) service.

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

```bash
uv run python -m ipykernel install --user --name=my-uv-analysis-kernel
```
This registers the `uv` environment as a Jupyter kernel named
`my-uv-analysis-kernel`.



## Using `uv` in Batch Jobs
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

    # Run your script
    uv run python analyze.py
    ```