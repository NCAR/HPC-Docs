# Using Containers on NCAR Systems

## Introduction

A container is a unit of software that packages code with its required dependencies in order to run in an isolated, controlled environment. This allows you to run an application in a way that is predictable, repeatable, and without the uncertainty of inconsistent code execution across diverse development and production environments. A container will always start up and run code the same way, regardless of what machine it exists on.

### Terminology
 - **Operating System** (OS): This is the software that manages all other software on a computer, along with the hardware.

 - **Kernel**: This is the core component of the OS that handles interacting with a machine’s hardware. The kernel translates requests for physical resources - CPU cycles, RAM, I/O, etc... - between software processes and the hardware.

 - **Container Image**: An image is a read-only template that contains all the code, dependencies, libraries, and supporting files that are required to launch a container. This is a unit of software that packages code with its required dependencies in order to run in an isolated, controlled environment. *Container images virtualize an OS, but not a kernel* (in contrast to heavier-weight virtual machine technology).  Images can be built manually, or retrieved from one of several *Image Registries*.

    - **Image Registry**: This is a solution for container image storage and sharing. Several popular examples are [Docker Hub](https://hub.docker.com/), [Quay.io](https://quay.io/) and [GitHub's container registry](https://github.blog/2021-06-21-github-packages-container-registry-generally-available/).  Additionally, private image registries can be implemented.

    - **Image Repository**: This is a specific location for a container image within an image registry. It contains the latest image along with the history of it within a registry.

- **Containers**: A container is an instance of an image. Running a container requires a container runtime environment and a CPU instruction set architecture (e.g. `x86_64`, `arm64`) compatible with the image from which the container is instantiated. A single container image can be used to run many container instances.

 - A **Container Runtime** is a software component that can run containers on a host operating system. Container runtimes are responsible for loading container images from a repository, monitoring local system resources, isolating system resources for use of a container, and managing container life cycle.  **Container Engines** are complete solutions for container technologies - including the container, the container runtime underlying it, the container image and the tools to build it, and potentially can include container image registries.

### Container Runtimes in an HPC Environment

The most poplar container runtime is [Docker](https://www.docker.com/), and nearly all other container platforms seek to be compatible with Docker.  Unfortunately, Docker's original design required elevated privileges and therefore was incompatible with shared HPC systems from a security perspective.  (These limitations have been addressed to some extent with recent developments in "rootless" Docker, however it is still rare to find Docker installed on HPC systems.)  Due to Docker's ubiquity and common tooling we will discuss it later as a viable platform for *local* container image development, for example when running Docker on a laptop or external system.

To address Docker's security concerns, a number of alternative runtimes better suited for HPC use have been developed.  Some notable examples include [Apptainer](https://apptainer.org/) (formerly, Singularity), [Charliecloud](https://hpc.github.io/charliecloud/), and [Podman](https://podman.io/), which are all currently installed on NCAR's HPC resources and available through the [module](../modules.md) system.

??? info "Charliecloud vs. Apptainer vs. Podman - Which is right for me?"
    Unfortunately, with the current state of container technology on HPC systems it is difficult to provide a single recommended runtime.  If you are familiar with one of these tools already, by all means use it - we will strive to maintain the most popular tools that are compatible with our security requirements.

    For users beginning to work with containers, here are some general considerations:

    - **Apptainer** and the Singularity family of tools that precedes it was created from the outset to run complex applications on HPC clusters in a simple, portable, and reproducible way. It is well documented, stable, and mature.  Probably the most significant drawback to Apptainer is *building* images, as it relies on its own recipe [definition file format](https://apptainer.org/docs/user/main/definition_files.html) - known as "`def` files" -  somewhat limiting build interoperability with other tools, including Docker.  If you have an existing Singularity `def` file, use Apptainer.  If you have relatively complex Docker build recipes (e.g. `Dockerfiles`) or want easy interoperability with other tools in the build stage, you may consider one of the other alternatives.

    - **Charliecloud** similarly runs containers with no privileged operations or daemons and minimal configuration changes on HPC center resources, and is also designed for HPC from the outset.  Charliecloud's build steps are largely compatible with `Dockerfile` definition recipes, making it a good choice for users already invested in the Docker build process.  By default Charliecloud stores container images in a directory tree, which can be performance limiting for large scale jobs on parallel file systems (see [this paper](https://par.nsf.gov/servlets/purl/10167819) for more information), however this limitation is largely overcome when using compressed SqushFUSE image files.  Perhaps the one drawback to Charliecloud is that it appears less widely deployed across HPC sites that Apptainer, with a smaller community support base.

    - **Podman** is envisioned as a complete replacement for Docker, which has benefits and drawbacks in an HPC environment.  If you have a complex Docker workflow, Podman *might* be a drop-in replacement.  The caveat is that some features supported in Podman are not implemented in an HPC environment due to security concerns, such as switching user IDs within a `Dockerfile`, etc...  Podman has widespread industry support beyond just the HPC community.  One downside to Podman is at present containers are straightforward to install at an individual level, but somewhat difficult to share within a group of users, as Podman does not easily support running containers from single compressed image files, limiting scalability when used under MPI.

    !!! danger "We cannot support all use cases for each runtime"
        NCAR CISL staff will attempt to support containerized workflows using at least one of the tools mentioned above, and may recommend one tool over others given a specific use case.  Due to both technical and personnel resource limitations we cannot force-fit any particular tool simply based on a users' personal preference.

## Use Cases

Based on [feedback from NCAR HPC users](https://docs.google.com/presentation/d/1FSAIjTrYPCumMm6HX9i0OVa3BUfSK-QNmNzW4ve9G_g/edit?usp=sharing), some of the more common use cases envisioned for containers on our HPC systems are:

1. To insulate a users' application from changes in the host environment,

2. To run applications developed elsewhere, particularly when difficult to install directly, and

3. To run legacy applications that are difficult to build with a modern software stack.

Additionally, users expressed a desire to:

1. Deploy in-house developed applications within a container to make it easier for others to install,

2. Offer trainings outside of NCAR resources in a controlled environment, and

3. Use cloud-based systems, but with a NCAR-HPC "look and feel."

To support these needs users must:

-  Be able to run modeling codes across many nodes with MPI (with or without GPUs), or

-  Run specialized containers within a single node as part of an analysis workflow.

We address all of these use cases in our discussion of [building](./building_containers.md) and [running](./running_containers.md) containers.


---

## References

 1. [Containers@TACC](https://containers-at-tacc.readthedocs.io/)
 2. [DigitalOcean's Introduction to Containers](https://www.digitalocean.com/community/conceptual-articles/introduction-to-containers)
 3. [Open Container Initiative](https://opencontainers.org/about/overview/)

<!--  LocalWords:  runtime runtimes Apptainer HPC
 -->
