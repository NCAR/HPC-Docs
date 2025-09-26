---
short_title: CIRRUS Overview
---

![CIRRUS](../../media/CIRRUS_Logo_NCARBlue.png#only-light){width="640"}
![CIRRUS](../../media/CIRRUS_Logo_NCAR_DarkTheme.png#only-dark){width="640"}

# CIRRUS

**CIRRUS** (Cloud Infrastructure for Remote Research, Universities, and Scientists) is a Kubernetes-based cloud platform hosted at NSF NCAR. It provides flexible, scalable compute resources that complement traditional HPC systems, public cloud services, and local infrastructure.

---

<div markdown="1" style="max-width: 95%; margin-left:0;">

## Getting Started Workflows

Choose your path based on your needs and experience level:

<table markdown="1" style="border:1px solid #666; border-collapse:collapse; margin:0 0 0 0; border-radius:6px; overflow:hidden; font-size:0.9rem;">
  <thead>
    <tr>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;">Basic Uses</th>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;">Advanced Uses</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>1. Learn the Basics</strong><br/>Start with <a href="#platform-overview">CIRRUS Overview</a></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>1. Review Architecture</strong><br/>Understand <a href="#platform-overview">Platform Overview</a> and <a href="#core-services">Core Services</a></td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>2. Understand Team Process</strong><br/>Review <a href="../02-interact-with-cirrus-team/agile.md">Team Interaction</a> and <a href="../02-interact-with-cirrus-team/create-tickets.md">Creating Tickets</a></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>2. Plan Your Deployment</strong><br/>Study <a href="../03-deploying-applications/additions.md">Adding Applications</a> and <a href="../04-container-registry/index.md">Container Registry</a></td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>3. Explore Services</strong><br/>Try <a href="../06-jupyter-on-cirrus/jupyterhub.md">JupyterHub</a> for interactive computing</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>3. Set Up CI/CD</strong><br/>Configure <a href="../05-github-actions/scale-sets.md">GitHub Actions</a> and <a href="../07-secret-manager/openbao.md">Secrets Management</a></td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>4. Request Access</strong><br/>Submit a <a href="../02-interact-with-cirrus-team/create-tickets.md">service request</a></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>4. Deploy Applications</strong><br/>Use <a href="#gitops-deployment">GitOps workflow</a> with Helm charts</td>
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

- **[agile methodology](../02-interact-with-cirrus-team/agile.md)**<br/>How the team works and manages requests. Use this to understand our development process.
- **[create tickets](../02-interact-with-cirrus-team/create-tickets.md)**<br/>How to submit requests and report issues. Use when you need help or want to request services.

### **[Deploying Applications](../03-deploying-applications/)**
Everything you need to containerize and deploy applications on CIRRUS.

- **[create containers](../03-deploying-applications/containerize.md)**<br/>Step-by-step containerization guide. Perfect if you're new to containers or Docker.
- **[adding applications](../03-deploying-applications/additions.md)**<br/>GitOps deployment with Helm charts. Use when you're ready to deploy your application.

### **[Container Registry](../04-container-registry/)**
Store, manage, and secure your container images with Harbor.

- **[harbor overview](../04-container-registry/index.md)**<br/>Container registry introduction. Use to understand how to store and manage container images.
- **[image management](../04-container-registry/image-mgmt.md)**<br/>Push/pull images, CLI usage. Use when you need to work with container images.
- **[vulnerability scanner](../04-container-registry/vulnerability-scan.md)**<br/>Security scanning for images. Use to ensure image security.

### **[GitHub Actions](../05-github-actions/)**
Automate your CI/CD workflows with GitHub Actions on CIRRUS.

- **[runner scale sets](../05-github-actions/scale-sets.md)**<br/>Automated CI/CD setup. Use to automate builds and deployments.
- **[best practices](../05-github-actions/best-practices.md)**<br/>Security and operational guidelines. Use to secure your CI/CD pipelines.

### **[Jupyter on CIRRUS](../06-jupyter-on-cirrus/)**
Interactive computing, data analysis, and research environments.

- **[jupyterhub](../06-jupyter-on-cirrus/jupyterhub.md)**<br/>Interactive computing environment. Use for data analysis and research.
- **[conda environments](../06-jupyter-on-cirrus/conda-envs.md)**<br/>Custom Python environments. Use to manage dependencies.
- **[gpu usage](../06-jupyter-on-cirrus/jhub-gpu.md)**<br/>GPU computing with PyTorch/TensorFlow. Use for machine learning and AI workloads.
- **[dask integration](../06-jupyter-on-cirrus/jhub-dask.md)**<br/>Distributed computing. Use to scale computations across nodes.
- **[binder](../06-jupyter-on-cirrus/binderhub.md)**<br/>Reproducible research environments. Use to share interactive notebooks.

### **[Secret Manager](../07-secret-manager/)**
Securely store and manage sensitive data like API keys and credentials.

- **[openbao](../07-secret-manager/openbao.md)**<br/>Secure credential storage. Use to manage API keys and secrets.

### **[Service Level Agreements](../08-service-level-agreements/)**
Understand our service commitments and support levels.

- **[slas](../08-service-level-agreements/slas.md)**<br/>Support levels and response times. Use to understand service commitments.

### **[Frequent Issues](../09-frequent-issues/)**
Troubleshooting guide for common problems and solutions.

- **[troubleshooting guide](../09-frequent-issues/index.md)**<br/>Common problems and solutions. Use when encountering issues or errors.

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

CIRRUS applications run in **containers**<br/>lightweight, portable packages that include everything needed to run an application. Containers offer:

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

CIRRUS operates on **18 high-performance nodes**, split between Mesa Lab & NWSC, providing substantial computing power:

### Compute Specifications

#### Site-Specific Hardware

<table markdown="1" style="border:1px solid #666; border-collapse:collapse; margin:0 0 0 0; border-radius:6px; overflow:hidden; font-size:0.9rem;">
  <thead>
    <tr>
      <th colspan="2" style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;">NWSC</th>
      <th style="padding:0 !important; background-color:#f8f9fa; border:none !important; width:8px !important; max-width:8px !important; min-width:8px !important;"></th>
      <th colspan="2" style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;">ML</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" style="padding:8px 12px; border:1px solid #ccc; background-color:#53565A; color:#fff; font-weight:bold; text-align:center;">GPU Nodes (5)</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td colspan="2" style="padding:8px 12px; border:1px solid #ccc; background-color:#53565A; color:#fff; font-weight:bold; text-align:center;">GPU Nodes (5)</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Manufacturer</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Supermicro</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Manufacturer</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Supermicro</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Model</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">SYS-120U-TNR</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Model</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">SYS-120U-TNR</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Type</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2 × Intel Xeon Gold 6326</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Type</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2 × Intel Xeon Gold 6326</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Speed</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2.90 GHz</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Speed</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2.90 GHz</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Cores</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">16 x 2</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Cores</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">16 x 2</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>GPU</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">1 × NVIDIA A2</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>GPU</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">1 × NVIDIA A10</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CUDA Driver</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">575.51.03</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CUDA Driver</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">575.51.03</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CUDA Runtime</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">12.9</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CUDA Runtime</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">12.9</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>RAM</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">512 GB</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>RAM</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">512 GB</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>NICs</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2 × 25G</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>NICs</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2 × 25G</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Storage</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">6 × 1.6TB NVMe</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Storage</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">6 × 3.2TB NVMe</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:8px 12px; border:1px solid #ccc; background-color:#53565A; color:#fff; font-weight:bold; text-align:center;">CPU Nodes (4)</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td colspan="2" style="padding:8px 12px; border:1px solid #ccc; background-color:#53565A; color:#fff; font-weight:bold; text-align:center;">CPU Nodes (4)</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Manufacturer</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Dell</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Manufacturer</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Dell</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Model</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">PowerEdge R6615</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Model</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">PowerEdge R6615</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Type</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2 × AMD EPYC 9354P</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Type</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2 × AMD EPYC 9354P</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Speed</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">3.25 GHz</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Speed</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">3.25 GHz</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Cores</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">32 x 1</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Cores</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">32 x 1</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>RAM</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">512 GB</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>RAM</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">512 GB</td>
    </tr>
    <tr style="background-color:#f8f9fa;">
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>NICs</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2 × 25G</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>NICs</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">2 × 25G</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Storage</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">8 × 1.6TB NVMe</td>
      <td style="padding:2px 4px; background-color:#f8f9fa; border:none;"></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Storage</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">8 × 1.6TB NVMe</td>
    </tr>
  </tbody>
</table>

#### Totals

<table markdown="1" style="border:1px solid #666; border-collapse:collapse; margin:0 0 0 0; border-radius:6px; overflow:hidden; font-size:0.9rem;">
  <thead>
    <tr>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;">Resource Type</th>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;">Total Quantity</th>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>CPU Cores</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">832 cores</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">AMD EPYC 9354P + Intel Xeon Gold 6326</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Memory</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">9.2 TB</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">512 GB per node</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>GPU Nodes</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">10 nodes</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">5× NVIDIA A10, 5× NVIDIA A2</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Storage</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">246.4 TB</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">High-speed NVMe across all nodes</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Network</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">25G/10G</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">High-bandwidth interconnect</td>
    </tr>
  </tbody>
</table>

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