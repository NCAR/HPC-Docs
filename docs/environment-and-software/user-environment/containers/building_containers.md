!!! note
    This page is intended for users who need to fetch container images from an external repository, and/or build a container from a definition file.  If you simply want to run a container that has been shared with you through a GLADE file system path see [Running Containers](./running.md).


## Introduction
The first steps in running a container are usually (i) to "pull" a pre-existing container from an external repository, or (ii) to build a container according to a recipe. When a container is built locally, it is often desirable to then share it with a larger community, often by "pushing" the resulting image to an external repository.

The concepts are common regardless of container run-time, however the specifics vary. We will highlight these specific steps for each supported run time in the examples below.

### Example scenario

In the examples below we will work incrementally through a simple but realistic example use case: building a container using the latest version of a different operating system to provide tools not available on the host.  Specifically, we will:

1. Begin with a basic [Rocky Linux 9 container image](https://hub.docker.com/_/rockylinux) fetched from Docker Hub,

2. Demonstrate building our own derived container image with additional packages and tools, and

3. Demonstrate sharing the resulting image.


## Pulling a container from Docker Hub

!!! example "Pulling & converting a simple container image"
    === "Charliecloud"
        **Pulling & listing images**

        We will use the command `ch-image` from the `charliecloud` module to pull and list images:
        ```console title="ch-image pull & ch-image list"
        # Pull the requested image, storing into Charliecloud's internal format
        casper$ ch-image pull rockylinux/rockylinux:9
        pulling image:    rockylinux/rockylinux:9
        requesting arch:  amd64
        manifest list: downloading: 100%
        manifest: downloading: 100%
        config: downloading: 100%
        layer 1/1: 4031b03: downloading: 63.6/63.6 MiB (100%)
        pulled image: adding to build cache
        flattening image
        layer 1/1: 4031b03: listing
        validating tarball members
        layer 1/1: 4031b03: changed 34 absolute symbolic and/or hard links to relative
        resolving whiteouts
        layer 1/1: 4031b03: extracting
        image arch: amd64

        # List all known images
        casper$ ch-image list
        rockylinux/rockylinux:9
        ```
        See `ch-image --help` for more details and options.

        **Converting the image**

        !!! tip "Prefer Charliecloud's bundled SquashFUSE image format"
            After running the two commands above, the requested container has been downloaded and unpacked into Charliecloud's [storage directory tree](https://hpc.github.io/charliecloud/ch-image.html?highlight=storage%20directory#storage-directory) in its native format.  This often is on temporary storage, and it is advisable to use `ch-convert` to convert the image to one of several other [image formats](https://hpc.github.io/charliecloud/ch-convert.html#image-formats) before use.

        On NCAR's HPC systems we strive to support the `squash` SquashFS file system archive, which allows the container to be converted to a single, compressed file.  This is much better suited for use on large parallel file systems, and can easily be shared with other users.  The command `ch-convert` can be used to convert images between Charliecloud's [supported formats](https://hpc.github.io/charliecloud/ch-convert.html#image-formats).

        ```console title="ch-convert"
        # Convert from Charliecloud's internal format to a compressed SquashFUSE image
        casper$ ch-convert rockylinux/rockylinux:9 ./rocky9.sqfs
        Parallel mksquashfs: Using 72 processors
        Creating 4.0 filesystem on ./rocky9.sqfs, block size 65536.
        [=====================================================================|] 8075/8075 100%

        Exportable Squashfs 4.0 filesystem, gzip compressed, data block size 65536
                compressed data, compressed metadata, compressed fragments,
                compressed xattrs, compressed ids
                duplicates are removed
        Filesystem size 61709.90 Kbytes (60.26 Mbytes)
                35.85% of uncompressed filesystem size (172122.07 Kbytes)
        Inode table size 80336 bytes (78.45 Kbytes)
                27.36% of uncompressed inode table size (293634 bytes)
        Directory table size 88626 bytes (86.55 Kbytes)
                43.45% of uncompressed directory table size (203971 bytes)
        Number of duplicate files found 1875
        Number of inodes 8122
        Number of files 6194
        Number of fragments 693
        Number of symbolic links 909
        Number of device nodes 0
        Number of fifo nodes 0
        Number of socket nodes 0
        Number of directories 1019
        Number of hard-links 0
        Number of ids (unique uids + gids) 1
        Number of uids 1
                root (0)
        Number of gids 1
                root (0)
        ```
        See `ch-convert --help` for more details and options.

        **Running a simple command from the container**

        We cover [running containers in much more detail here](./running.md), however below we will use the command `ch-run` to inspect the contents of the file `/etc/os-release` *inside the container*:
        ```console title="ch-run"
        casper$ ch-run ./rocky9.sqfs -- cat /etc/os-release
        NAME="Rocky Linux"
        VERSION="9.2 (Blue Onyx)"
        ID="rocky"
        ID_LIKE="rhel centos fedora"
        VERSION_ID="9.2"
        PLATFORM_ID="platform:el9"
        PRETTY_NAME="Rocky Linux 9.2 (Blue Onyx)"
        ANSI_COLOR="0;32"
        LOGO="fedora-logo-icon"
        CPE_NAME="cpe:/o:rocky:rocky:9::baseos"
        HOME_URL="https://rockylinux.org/"
        BUG_REPORT_URL="https://bugs.rockylinux.org/"
        SUPPORT_END="2032-05-31"
        ROCKY_SUPPORT_PRODUCT="Rocky-Linux-9"
        ROCKY_SUPPORT_PRODUCT_VERSION="9.2"
        REDHAT_SUPPORT_PRODUCT="Rocky Linux"
        REDHAT_SUPPORT_PRODUCT_VERSION="9.2"
        ```
        This is functionally a `hello-world` type demonstration, and can be compared to the same file on the host to show we are indeed running in a different environment.

    === "Apptainer"
        **Pulling & listing images**

        We will use the command `singularity pull` from the `apptainer` module to pull our image ans save it in Singularity Image Format (SIF):
        ```console title="singularity pull"
        casper$ singularity pull ./rocky9.sif docker://rockylinux/rockylinux:9
        INFO:    Converting OCI blobs to SIF format
        INFO:    Starting build...
        Getting image source signatures
        Copying blob 4031b0359885 done
        Copying config 175264fac6 done
        Writing manifest to image destination
        Storing signatures
        2023/11/27 15:12:32  info unpack layer: sha256:4031b03598854f77c4ae1e53c2fdca86fdb41eb95f1f051416ce2e363fc8cdd2
        INFO:    Creating SIF file...
        ```
        !!! tip "Prefer Apptainer's SIF image format"
            Apptainer supports several image formats, including unpacked directory tree "sandboxes" and compressed read-only image bundles in Singularity Image Format (SIF). SIF images are much better suited for use on large parallel file systems than large directory trees, and can easily be shared with other users.

        **Running a simple command from the container**

        We cover [running containers in much more detail here](./running.md), however below we will use the command `ch-run` to inspect the contents of the file `/etc/os-release` *inside the container*:
        ```console title="singularity exec"
        casper$ singularity exec ./rocky9.sif cat /etc/os-release
        NAME="Rocky Linux"
        VERSION="9.2 (Blue Onyx)"
        ID="rocky"
        ID_LIKE="rhel centos fedora"
        VERSION_ID="9.2"
        PLATFORM_ID="platform:el9"
        PRETTY_NAME="Rocky Linux 9.2 (Blue Onyx)"
        ANSI_COLOR="0;32"
        LOGO="fedora-logo-icon"
        CPE_NAME="cpe:/o:rocky:rocky:9::baseos"
        HOME_URL="https://rockylinux.org/"
        BUG_REPORT_URL="https://bugs.rockylinux.org/"
        SUPPORT_END="2032-05-31"
        ROCKY_SUPPORT_PRODUCT="Rocky-Linux-9"
        ROCKY_SUPPORT_PRODUCT_VERSION="9.2"
        REDHAT_SUPPORT_PRODUCT="Rocky Linux"
        REDHAT_SUPPORT_PRODUCT_VERSION="9.2"
        ```
        This is functionally a `hello-world` type demonstration, and can be compared to the same file on the host to show we are indeed running in a different environment.

        ---

        !!! note "`apptainer` vs. `singularity`"
            As of version 3, the commands `apptainer` and `singularity` are synonymous.  We will use the latter as there is a wide array of existing documentation referencing the `singularity` executable across the internet.

    === "Podman"
        **Pulling & listing images**

        We will use the command `podman pull` and `podman images` from the `podman` module to pull and list images:
        ```console title="podman image pull & podman images"
        # Pull the requested image, storing into Podman's internal image format
        casper$ podman image pull docker://rockylinux/rockylinux:9
        Trying to pull docker.io/rockylinux/rockylinux:9...
        Getting image source signatures
        Copying blob 4031b0359885 done
        Copying config 175264fac6 done
        Writing manifest to image destination
        Storing signatures
        175264fac6da4392fb2a9761583c81f509745629daee81de29beb7051f360db7

        # list known (downloaded) images
        casper$ podman images
        REPOSITORY                       TAG         IMAGE ID      CREATED       SIZE
        docker.io/rockylinux/rockylinux  9           175264fac6da  6 months ago  181 MB
        ```


        **Running a simple command from the container**

        We cover [running containers in much more detail here](./running.md), however below we will use the command `ch-run` to inspect the contents of the file `/etc/os-release` *inside the container*:
        ```console title="podman run"
        casper$  podman run rockylinux/rockylinux:9 cat /etc/os-release
        NAME="Rocky Linux"
        VERSION="9.2 (Blue Onyx)"
        ID="rocky"
        ID_LIKE="rhel centos fedora"
        VERSION_ID="9.2"
        PLATFORM_ID="platform:el9"
        PRETTY_NAME="Rocky Linux 9.2 (Blue Onyx)"
        ANSI_COLOR="0;32"
        LOGO="fedora-logo-icon"
        CPE_NAME="cpe:/o:rocky:rocky:9::baseos"
        HOME_URL="https://rockylinux.org/"
        BUG_REPORT_URL="https://bugs.rockylinux.org/"
        SUPPORT_END="2032-05-31"
        ROCKY_SUPPORT_PRODUCT="Rocky-Linux-9"
        ROCKY_SUPPORT_PRODUCT_VERSION="9.2"
        REDHAT_SUPPORT_PRODUCT="Rocky Linux"
        REDHAT_SUPPORT_PRODUCT_VERSION="9.2"
        ```
        This is functionally a `hello-world` type demonstration, and can be compared to the same file on the host to show we are indeed running in a different environment.

        ---

        !!! note "Podman vs. Docker"
            Podman [seeks to be functionally equivalent with Docker](https://docs.podman.io/en/latest/), so many Docker commands you may be familiar with will work the same.




## Building a container from a definition file

## Pushing a container to Docker Hub

<!--  LocalWords:  Charliecloud's SquashFUSE casper
 -->
