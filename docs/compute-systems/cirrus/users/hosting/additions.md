# Adding Applications

CIRRUS utilizes a development strategy known as GitOps. A code repository is connected to the CIRRUS Continuous Deployment (CD) tool Argo CD. Changes are Continuously Integrated (CI) in to the code repository. When the changes have been tested and accepted a new container image can be built to incorporate the changes. The new image needs to be stored in a container registry to be utilized by CIRRUS. For more information on the CIRRUS container registry, see [Container Registry](../container-registry/index.md). The new image can then be used in the application definition stored in the code repository and that syncs automatically to update the deployment.

Administrator assistance is required to initially setup your application on CIRRUS. More details can be found at this [link on creating tickets](../../create-tickets). Below is a template for what a ticket Description should be for new deployments and the documentation after covers how to create and provide those details.

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
    FQDN's, and URL's, are required to be in the `*.k8s.ucar.edu` domain. Currently access to this domain, and the applications hosted in it, is restricted to UCAR internal networks and VPN connections. We are working to have an option for publicly accessible URL's.


## Helm Charts & Argo CD

Using custom [Helm charts](https://helm.sh/docs/topics/charts/) to manage and deploy applications on the on-prem cloud is the preferred method today. One of the Microservices provided as part of the on-prem cloud is [Argo CD](https://argo-cd.readthedocs.io/). Argo can be configured by a on-prem cloud Administrator to deploy, and automatically update, a Helm chart stored in a Git repository. We provide different Helm templates as examples of places to start out of the following repository. 

* [CIRRUS Helm Examples](https://github.com/NCAR/cirrus-helm-examples)

If you have a containerized version of your application and want to host it on the CISL cloud currently the best way to get started is by using this [link to submit a ticket](../../create-tickets) to the CIRRUS team. A member of the team can help make sure your Helm chart and application are configured and deployed successfully. 

### Unique Values

The Helm chart templates above contain detailed information in the README file about each set of unique values. A quick summary of what needs to be provided in the `web-app/values.yaml` file is below:

    - Application Name
    - A Fully Qualified Domain Name, typically your applications name followed by `.k8s.ucar.edu`
    - The URL path for the application. For simple apps this is usually `/` but an api for example could use `/api/v1/`
    - Container image to use. This can be a public container registry address or it can be the [Harbor internal registry](../harbor/harbor-intro)
    - Container port to expose. The port the application is run on such as `http://localhost:5000` is 5000

### Persistent Volumes

CIRRUS provides storage that attaches to container images and persists when the container is removed. Kubernetes refers to this as a [Persistent Volume (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). This ensures that any new data written to the PV is retained when containers are upgraded and swapped out. If data was written to a directory that only existed inside the container image it would be lost when a new image is deployed. PVs can be shared across multiple containers ensuring that complex applications can all access the same information.

#### Storage Classes

The underlying storage is defined by a Kubernetes object known as a storage class. A Kubernetes cluster can have multiple storage classes that connect to different backing storage infrastructure. CIRRUS utilizes [Ceph](https://docs.ceph.com/en/reef/) to create storage clusters and currently has 2 storage classes on each Kubernetes cluster which can be used to provision PVs. 

  - Ceph RDB
  - Ceph FS

!!! note
    Ceph RDB only allows access to a single container, ReadWriteOnce, while Ceph FS allows multiple containers, ReadWriteMany, to access the underlying storage. 

The Helm chart examples contain up to date storage class names to use in applications.  

### Test & Production

When automatically making changes to an application it's always best practice to test changes in a controlled environment before pushing those changes to a production instance. It's recommended to create a test branch of your repository, with a test Helm chart & FQDN, and add that to Argo CD along with your main branch. You can then push changes to the test branch, confirm functionality on your hosted test instance, and, if everything is working, merge those changes to your main branch.

## GitHub Actions

[GitHub Actions](https://docs.github.com/en/actions) can be utilized to streamline the CI/CD pipeline for your application. For example, a [workflow](https://docs.github.com/en/actions/using-workflows/about-workflows) can be created that has [jobs](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow) to build your container image, push it to a container registry, update your applications Helm chart with the new image details, and Argo CD will then automatically see the changes. Runners hosted on CIRRUS are available. For more information see, [GitHub Actions Runners](../github/scale-sets.md)

!!! important
    When tagging your container images avoid using the `:latest` tag. There's a number of different reasons for this but for CI/CD a primary one is that `:latest` never changes inside your applications Helm chart. If nothing changes there's nothing to synchronize and your application will not update. 

