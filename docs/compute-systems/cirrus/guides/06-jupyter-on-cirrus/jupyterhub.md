# CIRRUS JupyterHub

<div style="text-align:center">
<a href="https://jupyter.k8s.ucar.edu/">
<img src="../../../media/jupyter/jhub-logo.png" 
        alt="CIRRUS JupyterHub" 
        style="display: block; margin: 0 auto" />
CIRRUS JupyterHub</a>
</div>

CIRRUS hosts a JupyterHub instance on Kubernetes (K8s).

!!! important
    **A bug may occur when clicking icons in the Launcher tab to open new content.**  
    If you see the error message `n.map is not a function`, click any whitespace in the file browser panel on the left side. This will clear the error and allow the icons to function properly.

## Overview

CIRRUS JupyterHub is a multi-user environment where scientists can run notebooks close to their data and GPUs without worrying about infrastructure. It runs atop the same Kubernetes cluster that powers other CIRRUS services, so the experience mirrors production as closely as possible.

## Access

The CIRRUS JupyterHub is only accessible from within the **NCAR internal network**, either onsite or via VPN. Once connected, the [JupyterHub login page](https://jupyter.k8s.ucar.edu/) provides access to your personal and persistent Jupyter environment.

Authentication is handled via your **UCAR CIT username and password**. Anyone with a valid CIT account can log in.

## Initial Login

After logging in, you'll land on the **Server Options** page (also known as the "spawn page").  
From here, you can select and launch your desired computing environment.

### Server Options

Available environments include:

- **NSF NCAR CPU Notebooks** (with 3 different resource sizes)
- **NSF NCAR GPU Notebooks**
- **A Custom Environment option** that supports:
  - Launching popular scientific computing images
  - Providing your own image to launch
  - Building and launching an image from a Git repository (via **Binder** - a tool that creates reproducible computing environments from code repositories)

For more information on using Binder, see [binder](binderhub.md).

<img src="../../../media/jupyter/server-opts.png" width="80%" class="center" alt="JupyterHub server options"/>

The NSF NCAR images available in JupyterHub are built and maintained by the **CCPP team**.  
If you encounter any issues, please [report them here](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&issuetype=10905).

---