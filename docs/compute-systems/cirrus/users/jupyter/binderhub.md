# CIRRUS Binder

!!! info
    Access to the Binder service is controlled via GitHub teams currently. If you already have access to the K8s JupyterHub you have Binder access. Access to the Binder instance can be requested by following this [link to the team in GitHub](https://github.com/orgs/NCAR/teams/2i2c-cloud-users). In the upper right of the team list there is a button to `Request to join`.

[Binder](https://mybinder.readthedocs.io/en/latest/index.html) is a tool that enables sharing of custom computing environments from code repository contents. For instance, if there is a code repository that contains some Jupyter Notebooks that explain how to do something, Binder can be used to launch a compute instance that is configured automatically to run the contents of the repository. The following documentation will cover the Binder instance hosted on the on-prem cloud resources at a high level. Utilize this [link to the Binder official documentation](https://mybinder.readthedocs.io/en/latest/index.html) to learn more about how the service runs or advanced use cases.

## Web UI

[https://binder.k8s.ucar.edu/](https://binder.k8s.ucar.edu/)

Binder is a web based service that enables a code repository link, with information about where to look in the repo, to create an individual compute instance configured to run the repository contents in a JupyterLab environment. Access the Binder Web UI via the link above to be greeted by a page that looks like the following:

<img src="https://ncar.github.io/cisl-cloud/_static/binder/binder.png"/>

Paste in the code repository URL, the Git ref if not main, and a path to a notebook to launch by default if you want. Click the `launch` button to build a containerized version of the repository, if one doesn't exist, and when complete it will redirect you to a JupyterHub instance that requires Authenticating with GitHub. 

### Create a Binder link

[![Binder](https://binder.k8s.ucar.edu/badge_logo.svg)](https://binder.k8s.ucar.edu/v2/gh/NCAR/cisl-cloud.git/docs?labpath=how-to%2Fbinderhub%2Fbinderhub.ipynb)

There is a dropdown at the bottom of the Build and launch box that contains `.md` and `.rst` code blocks that will provide a launch binder link like the one seen above. This can be used directly to provide a method to easily launch content. Clicking the launch binder button above will launch this notebook directly in to a Jupyterlab session.
