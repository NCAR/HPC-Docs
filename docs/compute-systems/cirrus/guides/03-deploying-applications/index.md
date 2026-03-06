# Deploying Applications

CIRRUS is a cloud-native platform built on top of Kubernetes. It utilizes GitOps and Argo CD to deploy and manage workloads defined by code stored in Git.

---

## Requirements

 - **A container image** to run the workloads
 - A Git repository containing a collection of YAML files known as **a Helm chart**

!!! note
    The Helm chart defines how CIRRUS deploys your workload, including which container images to run.

---

## Key Concepts

---

### Containers

Containers package code with all the requirements to run it in a single image that is small and portable. It will run the same on any hardware with a container engine. 

---

### Kubernetes (K8s)

Kubernetes (K8s) is a container orchestration platform. It handles scheduling and running containers across servers in the cluster.

---

### Helm charts

Helm charts are collections of YAML files organized in a specific structure that define different Kubernetes objects. 

---

### Cloud-native

The cloud is what your workload runs on. Cloud-native is building a workload designed to run in any cloud environment.

---

### GitOps

GitOps is a deployment methodology where the desired state of workloads is defined entirely in Git. The Git repository is a single source of truth for the running state of the workload. 

---

### Argo CD

Argo CD is the continuous delivery (CD) tool CIRRUS uses to implement GitOps. Argo CD continuously watches Git repositories for any changes between what's currently running, and what's defined in Git. If they become out of sync, Argo CD can automatically update the running workload to match the Git state.

---

## What's Next

- [Creating a container image](../03-deploying-applications/containerize.md)
- [Creating a Helm chart](../03-deploying-applications/additions.md)