# CIRRUS Binder

!!! info
    Access to the CIRRUS Binder service is controlled via UCAR CIT credentials. If you have a UCAR CIT account, you already have access to the K8s JupyterHub and Binder.

**Binder** is a powerful tool that allows users to create custom computing environments directly from code repositories. It is commonly used to share reproducible Jupyter Notebooks that run exactly as intended, without requiring the end user to install packages or configure environments manually.

If a GitHub repository contains Jupyter Notebooks along with configuration files (e.g., `environment.yml` or `requirements.txt`), Binder can automatically launch a compute instance preconfigured with everything needed to run those notebooks.

The documentation below covers the Binder instance hosted on **CIRRUS**, NCAR's on-prem cloud platform.

For additional background or advanced functionality, refer to the official **[Binder documentation](https://mybinder.readthedocs.io/en/latest/index.html)**.  


---

## Web Interface

Access CIRRUS Binder through the JupyterHub portal:  
**https://jupyter.k8s.ucar.edu/**

Binder is integrated directly into the NCAR Kubernetes JupyterHub. After logging in with your UCAR CIT credentials:

1. Select **Choose Your Environment**.

2. Use the dropdown to select **Build your own image**.

3. You'll see a form like this:

<img src="../../../media/binder/binder.png"/>

4. **Repository URL** - Paste the URL to the code repository containing your notebooks and environment configuration files.

5. **Git Ref** - Optionally specify a branch, tag, or commit hash (defaults to HEAD).

6. Click **Build Image** to begin building a containerized version of the repository.

7. Once the build completes successfully, click the **Start** button to launch your custom JupyterLab environment.

This makes it easy to share reproducible research environments or tutorials with collaborators - just point them to your repository and they can launch it with one click.