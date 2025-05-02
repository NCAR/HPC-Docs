# CIRRUS JupyterHub

<div style="text-align:center">
<a href="https://jupyter.k8s.ucar.edu/">
<img src="../../../media/jupyter/jhub-logo.png" 
        alt="CIRRUS JupyterHub" 
        style="display: block; margin: 0 auto" />
CIRRUS JupyterHub</a>
</div>

## Overview

CIRRUS hosts a JupyterHub instance on Kubernetes (K8s). 

!!! info
    The K8s JupyterHub is available inside the NCAR network only so you must either be ***onsite*** or connected to the ***VPN***.

## Access
The [JupyterHub Login](https://jupyter.k8s.ucar.edu/) page is the portal to enter and spin up a personal and persistent Jupyter environment. 

Authentication is being handled via UCAR CIT username and password. Anyone with a UCAR CIT account is able to login.

## Initial Login

Once logged in to the JupyterHub there are a few details that will make it easier to navigate and understand how to utilize what is offered. 

### Server Options

Once logged in the first page displayed is titled `Server Options` and is also known as the spawn page. It's from here where the desired environment is selected and spun up for the user. The available selections are a NSF NCAR CPU Notebook, with 3 different resource sizes, 2 NSF NCAR GPU Notebooks, and a custom environment available. The custom environment enables the ability to launch images that are popular in the scientific research community, provide an image to launch, and building an image on the fly from a git repository, also known as Binder. For more information on using Binder, see [CIRRUS Binder](binderhub.md).

<img src="../../../media/jupyter/server-opts.png"/>

The NSF NCAR images are built and maintained by the CCPP team. Please report any issues you find in them using this [link to Report Issue](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&issuetype=10905).