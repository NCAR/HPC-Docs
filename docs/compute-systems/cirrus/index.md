---
short_title: CIRRUS Overview
---

![CIRRUS](media/CIRRUS_Logo_NCARBlue.png#only-light){width="640"}
![CIRRUS](media/CIRRUS_Logo_NCAR_DarkTheme.png#only-dark){width="640"}

# CIRRUS

CIRRUS, Cloud Infrastructure for Remote Research, Universities, and Scientists, is a Kubernetes based cloud native platform hosted at NSF NCAR that provides flexible compute options with access to other High Performance Computing resources. The CIRRUS resources provide a supplement to computing needs that aren't fulfilled by the HPC offering, public cloud, or what is available to you locally. 

-----

## Kubernetes

Kubernetes, often referred to as K8s with the 8 simply standing for the number of letters being replaced, is a container orchestration platform. It was originally developed internally at Google and was release as open source in 2014. It has become the industry standard for container orchestration and all commercial cloud providers run K8s to help provide high availability and load balancing. For example, when a node or pod fails K8s will automatically reschedule where pods are hosted and spin up new pods to replace what failed. It does all this without manual intervention and, more often than not, without any interruptions to the services hosted on the cluster. New workloads can also take advantage of services already running on the cluster. Deploying a web application on Virtual Machines requires a lot of configuration to expose the application on the web. This can be sped up with Infrastructure as Code (IaC) tools like Ansible or Terraform for instance, but in K8s once you set up a reverse proxy or certificate manager new workloads can take advantage of these services without having to do a lot of custom configurations. Due to this resilience, flexibility, and the overall open source nature of K8s it is the ideal platform to host most CISL on-prem cloud workloads.

-----

## Containers

Containers remove all the frills of a typical operating system and provide a place for an application to run with only the packages required for that application. This creates an efficient deployment that is typically faster and easier to share with others as dependencies are baked in to the image. It is platform and hardware agnostic leading to the flexibility to run wherever there is a container runtime/engine available to launch the container. When thinking about solutions for open science and open source software development containers are a solution that helps facilitate both in a very big way.

-----

## Quick Start

### Continuous Integration and Continuous Delivery (CI/CD)

CIRRUS utilizes a CI/CD methodology known as GitOps to deploy and manage applications. A collection of YAML files, known as a Helm chart, creates a package that Kubernetes uses to deploy applications based on the desired state set in Git. A Git code repository is then connected to the CIRRUS Continuous Delivery tool Argo CD. Argo CD watches the Git repo for changes and updates the application state to match the contents of the repository automatically. This enables changes to be handled directly via Git and enables features like version control, history, and an easier means to collaborate. 

-----

### Container Registry
CIRRUS utilizes Harbor to provide a container registry based on open source software that is closer to the infrastructure running containers. A local registry allows us to utilize network infrastructure and available bandwidth between hardware for an increase in speed when pushing and pulling images locally. Harbor also includes an image scanner that will provide reports on any vulnerabilities that an image contains so we can address security concerns with images directly.

The Harbor web interface can be accessed at the following URL : https://hub.k8s.ucar.edu/. Credentials will be your CIT sso username and password. There is no need to specify a domain.

-----

### GitHub Actions runner scale sets
CIRRUS has the ability to connect to GitHub repositories and automatically provision and scale GitHub runners on demand.

-----
### JupyterHub
NSF NCAR runs a JupyterHub instance that’s hosted on CIRRUS. It has GPU capabilities, access to datasets stored on GLADE, and provides parallel computing capabilities via Dask Gateway. Authentication is handled via a GitHub team in the NCAR organization. In order to be added to that team you have to be a member of the NCAR GitHub organization.

CIRRUS also provides the ability to host unique JupyterHub for specialized tutorials. Administrators can be configured in the JupyterHubs Helm chart and those admins can approve or deny requests to join the JupyterHub instance via the Native Authenticator. 

-----

### Binder
Binder is a tool that enables sharing of custom computing environments from code repository contents. For instance, if there is a code repository that contains some Jupyter Notebooks that explain how to do something, Binder can be used to launch a compute instance that is configured automatically to run the contents of the repository. Utilize this link to the Binder official documentation to learn more about how the service runs or advanced use cases.

-----

## CIRRUS Hardware (18 Nodes)

### GPU Nodes (10)

CIRRUS currently has 5 nodes with 1 Nvidia A10 and 5 with 1 Nvidia A2

| System Information | Node Specifications |
|---|---|
| Manufacturer | Supermicro |
| Model | SYS-120U-TNR | 
| CPU Type | 2 x Intel Xeon Gold 6326 |
| CPU Speed | 2.90 GHz |
| CPU Cores | 16 | 
| RAM (GB) | 512 |
| NICs | 2 x 10G |
| Storage | 6 x 3.2TB NVMe |    

### CPU Nodes (8)

| System Information | Node Specifications |
|---|---|
| Manufacturer | Dell |
| Model | PowerEdge R6615 | 
| CPU Type | 2 x AMD EPYC 9354P |
| CPU Speed | 3.25 GHz |
| CPU Cores | 32 | 
| RAM (GB) | 512 |
| NICs | 2 x 25G |
| Storage | 8x1.6TB NVMe |    

### Totals

| CPU Cores | RAM | Local Storage |
|---|---|---|
| 832 | 9.2 TB | 246.4 TB|

---

##  Status

Operational (v1-beta production release)
