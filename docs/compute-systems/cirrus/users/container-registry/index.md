# Container Registry

CIRRUS utilizes [Harbor](https://goharbor.io/) to provide a container registry based on open source software that is closer to the infrastructure running containers. A local registry allows us to utilize network infrastructure and available bandwidth between hardware for an increase in speed when pushing and pulling images locally. Harbor also includes an image scanner that will provide reports on any vulnerabilities that an image contains so we can address security concerns with images directly. 

The Harbor web interface can be accessed at the following URL : [https://hub.k8s.ucar.edu/](https://hub.k8s.ucar.edu/). Credentials will be your CIT sso username and password. There is no need to specify a domain. 

!!! info
    Access to Harbor is provided to all UCAR staff that are in Active Directory. It is limited to read-only access of public projects. Only administrators are allowed to create new projects.  Please submit a Jira request, using the link at the top of the Documentation, if you require access to push images. Please include a descriptive name for the project you would like created. The public repositories allow pulling images without being authenticated. 