# Using `Pixi` for Package Management

NCAR system users can use [**`Pixi`**](https://pixi.sh/latest/), a fast, modern package manager written in Rust that builds on the Conda ecosystem. 
Pixi provides a project-based workflow for managing dependencies across Python, R, C/C++, Julia, and other languages, while offering significantly faster dependency resolution and environment creation than Conda.

Pixi builds upon the foundation of the Conda ecosystem, but organizes dependencies around projects rather than user-level environments.

Each project has its own directory with a configuration file (`pixi.toml` or `pyproject.toml`) and a lock file that pins exact package versions, making it easy to reproduce and share environments. 

!!! note "uv vs. Pixi vs. Conda: Choosing the right tool"
    Pixi uses the same package repositories as Conda (conda-forge, etc.)
    but with much faster dependency resolution and environment creation. If
    you currently use Conda and find it slow, Pixi may be an excellent
    alternative. For pure Python projects, consider `uv`
    instead. 

!!! abstract "To read more about `Pixi`, visit the [official documentation](https://pixi.prefix.dev/dev/)."


## Using `pixi` on NSF NCAR HPC Systems

Pixi is available as an environment module on NCAR HPC systems.

Before using `pixi`, ensure no conda environments are activated by running:
```bash
conda deactivate
```

Then, load the `pixi` module:
```bash
module load pixi
```

By default, Pixi stores its cache in your home directory, which can quickly exceed your quota. The module automatically sets the cache location to `/glade/derecho/scratch/$USER/.cache/pixi`. You can verify that by running `pixi info` and confirming the Cache dir points to your scratch space, not your home directory.

!!! warning "conda, uv, and pixi module conflicts"
    If you have previously loaded either `conda` or `uv` modules in your session, you must unload them before loading `pixi`. For example:
    ```bash
    module unload conda
    module load pixi
    ```
    We do not allow concurrent loading of environment manager modules to prevent "environment stacking", in which a second environment (e.g., a `uv shell`) is erroneously loaded when another is already active (e.g., a conda environment).

### Creating your own Pixi project

To create a new project:

```bash
# create project directory
mkdir -p /glade/work/$USER/projects
cd /glade/work/$USER/projects

# initialize Pixi project
pixi init example-analysis
cd example-analysis
```
This creates a project directory (`example-analysis`) with a `pixi.toml` configuration file:

```
example-analysis/
├── pixi.toml      # Project configuration and dependencies
└── .gitignore     # Ignores Pixi environment directory
```

The `pixi.toml` file defines your project's dependencies and configuration.

!!! tip "Using `pyproject.toml` instead of `pixi.toml`"
    Pixi can also work with Python's standard `pyproject.toml` file instead of `pixi.toml`. This is particularly useful for existing Python projects or when you prefer following [PEP 621 packaging standards](https://peps.python.org/pep-0621/):

    ```bash
    # Create a new project using pyproject.toml
    pixi init --format pyproject example-analysis

    # Or add Pixi to an existing Python project with pyproject.toml
    cd my-existing-project
    pixi init --format pyproject
    ```

    When using `pyproject.toml`, Pixi stores its configuration in a `[tool.pixi]` section alongside your standard Python project metadata, allowing you to manage both traditional packaging information and Pixi dependencies in a single file.

    To learn more, see examples in the [Pixi documentation](https://pixi.prefix.dev/dev/python/pyproject_toml/). `uv` also supports `pyproject.toml` files for Python projects; see [Working with Python Projects with `uv`](./uv.md) for details.

### Managing Dependencies

Now you can add packages to your project:

```bash
# Add Python and packages
pixi add python numpy pandas matplotlib xarray
```

Each time you add packages, Pixi updates your `pixi.toml` file (or `pyproject.toml`) and creates or updates a `pixi.lock` file. 

This lock file pins exact versions of all packages and dependencies, ensuring anyone can reproduce
your exact environment.

!!! note "Project environments"
    Pixi stores environment files in a `.pixi` directory within your
    project. This directory should not be committed to version control. The
   `pixi.toml` (or `pyproject.toml`) and `pixi.lock` files contain everything needed to recreate the environment.

### Running commands in Pixi environments

To run commands in your project environment:

```bash
# Run Python script
pixi run python analyze_data.py

# Run any other commands such as :
pixi run pytest tests/
```

At any time, you can see the list of installed packages with:

```bash
pixi list
```

Alternatively, you can start an interactive shell with the environment activated. This is analogous to activating a conda environment:

```bash
# Start an interactive shell with environment activated (analogous to `conda activate myenv`)
pixi shell

# Now you can run commands directly
python analyze_data.py

# Run tests
pytest tests/
```

To exit the shell, type `exit` or press `Ctrl+D`.


!!! note "Using lock files"
    To reproduce an environment from a Pixi project:
    ```
    pixi install --frozen
    ```
    The `--frozen` flag tells Pixi to use the exact versions in the lock file without attempting to update them.

!!! note "Lock files and version control"
    We strongly recommend committing `pixi.lock` files to version control (Git) alongside your `pixi.toml` (or `pyproject.toml`). This allows colleagues and your future self to reproduce exact environments.

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

First, add `ipykernel` to your Pixi project:

```bash
cd /glade/work/$USER/projects/example-analysis
pixi add ipykernel
```

At this point, your Pixi environment should appear automatically as a kernel option when you start a Jupyter server on Derecho or Casper. The
kernel will be named based on your project name.

You can also manually create a kernel specification with a custom name:

```bash
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