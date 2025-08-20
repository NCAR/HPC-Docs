# Adding Applications

CIRRUS utilizes a development strategy known as **GitOps**. A code repository is connected to the CIRRUS Continuous Deployment (CD) tool Argo CD. Changes are Continuously Integrated (CI) into the code repository. Once changes are tested and approved, a new container image is built to reflect them. That image must be pushed to a container registry so it can be used by CIRRUS.

!!! note
    For more information on using the CIRRUS container registry, see [Container Registry](../04-container-registry/index.md).

The new image can then be used in the application definition stored in the code repository and that syncs automatically to update the deployment.

---

## Application Onboarding

Initial application setup on CIRRUS requires assistance from a CIRRUS administrator. You'll need to submit a request ticket.

For more information on creating requests, see [create tickets](../02-interact-with-cirrus-team/create-tickets.md).

A typical request might look like:

```
Hello,

I have an application that I would like to host.

Link to GitHub repository: https://github.com/NicholasCote/docker-how-to/tree/app
GitHub branch: app
Helm chart folder: app-helm
URL to use: https://ncote-cloud-demo.k8s.ucar.edu/ 

Thank you
```

!!! note
    All FQDNs/URLs must reside within the `*.k8s.ucar.edu` domain. You may choose whether your application is accessible only within UCAR's internal network and VPN or is made publicly accessible on the internet.
    
    If you need assistance determining which option is appropriate for your project, please [submit a request](../02-interact-with-cirrus-team/create-tickets.md).

---

## Helm Charts & Argo CD

Using custom [Helm charts](https://helm.sh/docs/topics/charts/) to deploy and manage applications is currently the preferred approach on the CIRRUS on-prem cloud.

One of the services available in this environment is [Argo CD](https://argo-cd.readthedocs.io/), which can be configured by CIRRUS admins to automatically deploy and update Helm charts directly from a Git repository. We provide several example Helm chart templates in the following repository:

* **[CIRRUS Examples](https://github.com/NCAR/cirrus-examples)**

### Helm Chart Structure

Ensure your Helm chart follows the standard Kubernetes structure. For a standalone web application, a Helm chart directory should be organized like this (more complex apps may add additional manifests such as External Secrets, Persistent Volumes, etc., but for hosting a basic live website this is the bare-minimum example):

```
k8s/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── deployment.yaml
    ├── ingress.yaml
    └── service.yaml
```

**Key files to include in the `templates/` folder:**

- **`deployment.yaml`** - Defines how your application runs (containers, replicas, resources)
- **`ingress.yaml`** - Configures external access and routing to your application  
- **`service.yaml`** - Exposes your application within the Kubernetes cluster

These core Kubernetes manifests ensure your application can be properly deployed, accessed, and managed within the CIRRUS environment.

If you already have a containerized version of your application and want to deploy it on CIRRUS, we recommend starting by [submit a ticket](../02-interact-with-cirrus-team/create-tickets.md). A CIRRUS team member will assist in configuring and validating your deployment.

### Unique Helm Values

The Helm templates in the CIRRUS Helm Examples repo include a `README.md` with detailed instructions. Below is a quick overview of the required values in the `web-app-helm/values.yaml` file:

- **Application Name**
- **A Fully Qualified Domain Name (FQDN):** `<app-name>.k8s.ucar.edu`
  - Typically your application's name followed by `.k8s.ucar.edu`
- **Application URL Path:** For simple apps this is usually `/` but an API for example could use `/api/v1/`
- **Container image to use:** Can be a public image or one stored in the [Harbor internal registry](../04-container-registry/index.md)
- **Container port to expose:** The internal port your app listens on (e.g., 5000 for a Flask app on `http://localhost:5000`)

---

## Argo CD Access

CIRRUS can provide read-only access to Argo CD for monitoring your application deployments. This allows you to view application status, logs, and synchronization details without the ability to modify configurations.

### Requesting Argo CD Access

To request read-only access to your Argo CD project:

1. **[Submit a ticket](../02-interact-with-cirrus-team/create-tickets.md)** with the following information:

   - **Project name**: The name of your Argo CD project
   - **User email addresses**: List all UCAR email addresses that need read-only access to the project

Users granted access will be able to:

- View application deployment status and health
- Access application logs and events
- Monitor synchronization status between Git repository and deployed resources
- View resource manifests and configuration

!!! note
    Read-only access is scoped to your specific project only. Users cannot make changes to applications or access other projects.

### Application Health Alerting

CIRRUS can configure automated alerts for application synchronization issues and unhealthy deployments.

To request alerting for your applications:

1. **[Submit a ticket](../02-interact-with-cirrus-team/create-tickets.md)** including:

   - **Application names**: Specific applications you want alerts for
   - **Recipient email addresses**: List all email addresses that should receive alerts

Alerts will be sent when applications are out of sync or in an unhealthy state, helping you respond quickly to deployment issues.

---

## Persistent Volumes

CIRRUS provides storage that attaches to container images and persists when the container is removed. Kubernetes refers to this as a [Persistent Volume (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). This ensures that any new data written to the PV is retained when containers are upgraded and swapped out.

Without a PV, data written to a directory that only existed inside the container image would be lost when a new image is deployed.

PVs can be shared among multiple containers, allowing different components of your app to access the same data store.

### Storage Classes

The underlying storage is defined by a Kubernetes object known as a storage class. A Kubernetes cluster can have multiple storage classes that connect to different backing storage infrastructure.

CIRRUS uses **[Ceph](https://docs.ceph.com/en/reef/)**, a distributed storage system, and provides two storage classes per cluster:

- **Ceph RDB** - ReadWriteOnce: only one pod can mount volume at a time
- **Ceph FS** - ReadWriteMany: multiple pods can access the volume simultaneously

!!! note
    Use the [CIRRUS Examples](https://github.com/NCAR/cirrus-examples) repo for up-to-date storage class names.

---

## Test & Production Environments

When automatically making changes to an application, it's always best practice to test application changes in a controlled environment before pushing them to production.

We recommend creating a **test branch** of your repository, along with:

- A separate Helm chart folder (e.g., `app-helm-test`)
- A unique test FQDN (see [FQDN rule](#unique-helm-values)) (e.g., `test-app.k8s.ucar.edu`)

Configure Argo CD to track both the test and main branches. This allows you to validate updates in staging before merging into your main branch for production deployment.

---

## GitHub Actions (CI/CD Integration)

[GitHub Actions](https://docs.github.com/en/actions) can be utilized to streamline the CI/CD pipeline for your application. For example, a [workflow](https://docs.github.com/en/actions/using-workflows/about-workflows) can be created to:

1. **Build** your container image
2. **Push** the image to a container registry
3. **Update** the Helm chart with the new image tag
4. **Let Argo CD** detect and deploy the change automatically

CIRRUS-hosted GitHub Actions runners are available. For more information, see [GitHub Actions Runners](../05-github-actions/scale-sets.md).

### Important: Avoid using `:latest`

**Avoid tagging your container images with `:latest`**

**Why?** There are several reasons for this, but for CI/CD a primary one is that:

- **Kubernetes won't pull updated images** when the tag remains unchanged
- **If the tag stays the same, Argo CD won't sync** or trigger a deployment update
- **This defeats the purpose** of automated deployments

The `:latest` tag does not reflect changes in your application's Helm chart, so Argo CD has nothing to synchronize and the application will not update. Instead, use **explicit version tags** (e.g., `v1`, `v2`, date-based, or commit-based) to ensure changes are tracked and deployments are properly triggered.