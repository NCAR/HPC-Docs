# CIRRUS Binder

!!! info
    Access to the Binder service is controlled via UCAR CIT credentials. If you have a UCAR CIT account you already have access to the K8s JupyterHub and Binder access.

[Binder](https://mybinder.readthedocs.io/en/latest/index.html) is a tool that enables sharing of custom computing environments from code repository contents. For instance, if there is a code repository that contains some Jupyter Notebooks that explain how to do something, Binder can be used to launch a compute instance that is configured automatically to run the contents of the repository. The following documentation will cover the Binder instance hosted on the on-prem cloud resources at a high level. Utilize this [link to the Binder official documentation](https://mybinder.readthedocs.io/en/latest/index.html) to learn more about how the service runs or advanced use cases.

## Web UI

[https://jupyter.k8s.ucar.edu/](https://jupyter.k8s.ucar.edu/)

Binder is a web based service that enables a code repository link, with information about where to look in the repo, to create an individual compute instance configured to run the repository contents in a JupyterLab environment. CIRRUS utilizes Binder as a service to integrate it directly in to JupyterHub. Access Binder by logging in to JupyterHub with you UCAR CIT credentials via the link above. Once logged in, select Choose Your Environment and use the dropdown to select Build your own image. It will look like the following:

<img src="../../../media/binder/binder.png"/>

Paste in the code repository URL and the Git ref if not HEAD. Click the `Build image` button to build a containerized version of the repository, if one doesn't exist. When the builds completes select the `Start` button to launch the custom environment. 
