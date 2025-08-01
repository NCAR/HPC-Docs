---
short_title: CIRRUS Overview
---

![CIRRUS](../../media/CIRRUS_Logo_NCARBlue.png#only-light){width="640"}
![CIRRUS](../../media/CIRRUS_Logo_NCAR_DarkTheme.png#only-dark){width="640"}

# CIRRUS

**CIRRUS** (Cloud Infrastructure for Remote Research, Universities, and Scientists) is a Kubernetes-based cloud platform hosted at NSF NCAR. It provides flexible, scalable compute resources that complement traditional HPC systems, public cloud services, and local infrastructure.

---

<div markdown="1" style="max-width: 800px;">

## Getting Started Workflows

Choose your path based on your needs and experience level:

<table markdown="1" style="border:1px solid #666; border-collapse:collapse; margin:0 auto; border-radius:6px; overflow:hidden; font-size:0.9rem;">
  <thead>
    <tr>
      <th style="padding:8px 16px; text-align:center; background-color:#2e5eaa; color:#fff;">Basic Uses</th>
      <th style="padding:8px 16px; text-align:center; background-color:#2e5eaa; color:#fff;">Advanced Uses</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc;"><strong>1. Learn the Basics</strong><br/>Start with <a href="#platform-overview">CIRRUS Overview</a></td>
      <td style="padding:6px 12px; border:1px solid #ccc;"><strong>1. Review Architecture</strong><br/>Understand <a href="#platform-overview">Platform Overview</a> and <a href="#core-services">Core Services</a></td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc;"><strong>2. Understand Team Process</strong><br/>Review <a href="../02-interact-with-cirrus-team/agile.md">Team Interaction</a> and <a href="../02-interact-with-cirrus-team/create-tickets.md">Creating Tickets</a></td>
      <td style="padding:6px 12px; border:1px solid #ccc;"><strong>2. Plan Your Deployment</strong><br/>Study <a href="../03-deploying-applications/additions.md">Adding Applications</a> and <a href="../04-container-registry/index.md">Container Registry</a></td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc;"><strong>3. Explore Services</strong><br/>Try <a href="../06-jupyter-on-cirrus/jupyterhub.md">JupyterHub</a> for interactive computing</td>
      <td style="padding:6px 12px; border:1px solid #ccc;"><strong>3. Set Up CI/CD</strong><br/>Configure <a href="../05-github-actions/scale-sets.md">GitHub Actions</a> and <a href="../07-secret-manager/openbao.md">Secrets Management</a></td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc;"><strong>4. Request Access</strong><br/>Submit a <a href="../02-interact-with-cirrus-team/create-tickets.md">service request</a></td>
      <td style="padding:6px 12px; border:1px solid #ccc;"><strong>4. Deploy Applications</strong><br/>Use <a href="#gitops-deployment">GitOps workflow</a> with Helm charts</td>
    </tr>
  </tbody>
</table>

</div>

---

<div markdown="1">

## Documentation Guide

This documentation is organized into focused sections to help you find what you need:

### **[Introduction](index.md)**
Platform overview, services, and hardware specs. Start here to understand CIRRUS capabilities.

### **[Interact with CIRRUS Team](../02-interact-with-cirrus-team/)**
Learn how to work with the CIRRUS team and get support.

- **[agile methodology](../02-interact-with-cirrus-team/agile.md)** - How the team works and manages requests. Use this to understand our development process.
- **[create tickets](../02-interact-with-cirrus-team/create-tickets.md)** - How to submit requests and report issues. Use when you need help or want to request services.

### **[Deploying Applications](../03-deploying-applications/)**
Everything you need to containerize and deploy applications on CIRRUS.

- **[create containers](../03-deploying-applications/containerize.md)** - Step-by-step containerization guide. Perfect if you're new to containers or Docker.
- **[adding applications](../03-deploying-applications/additions.md)** - GitOps deployment with Helm charts. Use when you're ready to deploy your application.

### **[Container Registry](../04-container-registry/)**
Store, manage, and secure your container images with Harbor.

- **[harbor overview](../04-container-registry/index.md)** - Container registry introduction. Use to understand how to store and manage container images.
- **[image management](../04-container-registry/image-mgmt.md)** - Push/pull images, CLI usage. Use when you need to work with container images.
- **[vulnerability scanner](../04-container-registry/vulnerability-scan.md)** - Security scanning for images. Use to ensure image security.

### **[GitHub Actions](../05-github-actions/)**
Automate your CI/CD workflows with GitHub Actions on CIRRUS.

- **[runner scale sets](../05-github-actions/scale-sets.md)** - Automated CI/CD setup. Use to automate builds and deployments.
- **[best practices](../05-github-actions/best-practices.md)** - Security and operational guidelines. Use to secure your CI/CD pipelines.

### **[Jupyter on CIRRUS](../06-jupyter-on-cirrus/)**
Interactive computing, data analysis, and research environments.

- **[jupyterhub](../06-jupyter-on-cirrus/jupyterhub.md)** - Interactive computing environment. Use for data analysis and research.
- **[conda environments](../06-jupyter-on-cirrus/conda-envs.md)** - Custom Python environments. Use to manage dependencies.
- **[gpu usage](../06-jupyter-on-cirrus/jhub-gpu.md)** - GPU computing with PyTorch/TensorFlow. Use for machine learning and AI workloads.
- **[dask integration](../06-jupyter-on-cirrus/jhub-dask.md)** - Distributed computing. Use to scale computations across nodes.
- **[binder](../06-jupyter-on-cirrus/binderhub.md)** - Reproducible research environments. Use to share interactive notebooks.

### **[Secret Manager](../07-secret-manager/)**
Securely store and manage sensitive data like API keys and credentials.

- **[openbao](../07-secret-manager/openbao.md)** - Secure credential storage. Use to manage API keys and secrets.

### **[Service Level Agreements](../08-service-level-agreements/)**
Understand our service commitments and support levels.

- **[slas](../08-service-level-agreements/slas.md)** - Support levels and response times. Use to understand service commitments.

### **[Frequent Issues](../09-frequent-issues/)**
Troubleshooting guide for common problems and solutions.

- **[troubleshooting guide](../09-frequent-issues/index.md)** - Common problems and solutions. Use when encountering issues or errors.

</div>

---

## Platform Overview

### Kubernetes Foundation

CIRRUS is built on **Kubernetes (K8s)**, the industry-standard container orchestration platform. Kubernetes provides:

- **High availability** through automatic failover and load balancing
- **Self-healing** infrastructure that automatically replaces failed components
- **Scalable workloads** that can grow and shrink based on demand
- **Shared services** like networking, storage, and security that new applications can leverage immediately

This resilient, open-source foundation makes CIRRUS ideal for hosting research applications, data analysis workflows, and collaborative tools.

### Container Technology

CIRRUS applications run in **containers** - lightweight, portable packages that include everything needed to run an application. Containers offer:

- **Consistent environments** across development, testing, and production
- **Faster deployment** with pre-built dependencies
- **Resource efficiency** by sharing the host operating system
- **Portability** across different computing environments

---

## Core Services

### GitOps Deployment

CIRRUS uses **GitOps** for application deployment and management:

1. **Code repositories** store application configurations as Helm charts
2. **Argo CD** monitors repositories and automatically deploys changes
3. **Version control** provides audit trails and rollback capabilities
4. **Collaborative workflows** enable team-based development

For deployment guidance, see [adding applications](../03-deploying-applications/additions.md).

### Container Registry (Harbor)

**Harbor** provides secure, high-performance container image storage:

- **Local hosting** reduces network latency and increases transfer speeds
- **Vulnerability scanning** identifies security issues in container images
- **Access control** manages who can push and pull images
- **Web interface** available at https://hub.k8s.ucar.edu

Learn more: [container registry](../04-container-registry/index.md)

### Secrets Management (OpenBao)

**OpenBao** securely stores sensitive data like API keys and credentials:

- **Encrypted storage** protects secrets at rest
- **Secure injection** into applications via External Secrets Operator
- **UCAR authentication** using CIT credentials
- **Web interface** available at https://bao.k8s.ucar.edu

Learn more: [secret manager](../07-secret-manager/openbao.md)

### GitHub Actions Integration

**GitHub Actions runners** enable automated CI/CD workflows:

- **On-demand scaling** provisions runners as needed
- **Secure execution** in isolated environments
- **Direct integration** with CIRRUS services
- **Container builds** using remote BuildKit

Learn more: [github actions](../05-github-actions/scale-sets.md)

### JupyterHub Environment

**JupyterHub** provides interactive computing capabilities:

- **GPU support** with NVIDIA A2 and A10 Tensor Core GPUs
- **GLADE integration** for direct access to research datasets
- **Dask Gateway** for distributed computing workflows
- **Custom environments** via Binder for reproducible research

Learn more: [jupyter on CIRRUS](../06-jupyter-on-cirrus/jupyterhub.md)

---

## Hardware Resources

CIRRUS operates on **18 high-performance nodes** providing substantial computing power:

### Compute Specifications

| Resource Type | Quantity | Total Capacity |
|---------------|----------|----------------|
| **CPU Cores** | 832 cores | AMD EPYC 9354P + Intel Xeon Gold 6326 |
| **Memory** | 9.2 TB | 512 GB per node |
| **GPU Nodes** | 10 nodes | 5× NVIDIA A10, 5× NVIDIA A2 |
| **Storage** | 246.4 TB | High-speed NVMe across all nodes |
| **Network** | 25G/10G | High-bandwidth interconnect |

### Infrastructure Status

**Operational** (v1-beta production release)

---

## Getting Started

Ready to deploy on CIRRUS? Here's your path forward:

1. **Review** the [service level agreements](../08-service-level-agreements/slas.md)
2. **Containerize** your application using our [create containers](../03-deploying-applications/containerize.md)
3. **Submit** a deployment request via our [create tickets](../02-interact-with-cirrus-team/create-tickets.md)
4. **Deploy** using our GitOps workflow with Helm charts

Need help? The CIRRUS team is here to assist with onboarding, troubleshooting, and optimization.