# Dask Introduction

[Dask](https://www.dask.org/) is a flexible parallel computing library for Python that helps scale common scientific libraries like NumPy, Pandas, and Xarray. It offers a smooth path to parallel processing without requiring a full rewrite of existing code.

Dask works by splitting your job into many small tasks that can run in parallel. At its core it relies on three key components:

- **Client** - the interface through which your code interacts with Dask
- **Scheduler** - coordinates the execution of tasks  
- **Workers** - execute the tasks in parallel

Dask clusters can be launched in a variety of ways depending on the resources and environment available:

- **LocalCluster**: Runs workers and scheduler on the same machine
- **GatewayCluster**: Creates distributed clusters with dedicated resources via dask-gateway
- **Dask-Jobqueue**: Connects to HPC schedulers (e.g., PBS, Slurm) to provision compute nodes

Dask also supports connecting to preexisting clusters, including those deployed to Kubernetes. You can connect using the Dask Client with the cluster's IP address or service name - using the Kubernetes service name is preferred for stability and portability.

---

## Dask LocalCluster

In Python you can utilize dask to create a cluster for parallel processing that shares resources with the system the code is running on. LocalCluster is the best way to get started using Dask. It allows time to understand the different components involved in implementing parallel computing. Python's standard interpreter, CPython, is single threaded and only runs on a single CPU core. Your computer likely has multiple CPU cores available and tools like Dask LocalCluster can be used to take advantage of more CPU cores. By starting here you will understand when LocalCluster is no longer enough and more resources are required to scale your application or analysis. An example of how to accomplish this in your Python code can be seen below:

```python
from dask.distributed import Client, LocalCluster

cluster = LocalCluster(
    'cluster-name',
    n_workers = 4
)
client = Client(cluster)
client
```

This creates a Dask cluster with 4 workers sharing your system's local resources. On NCAR's JupyterHub, running this will automatically display a Dask dashboard widget. The dashboard provides real-time insights into your cluster's activity.

<img src="../../../media/dask/dask-local.png"/>

You can also paste the dashboard URL into the Dask Lab Extension (available in the JupyterHub sidebar) to open visual dashboards and tile them next to your notebooks.

<img src="../../../media/dask/dask-extension.png"/>

!!! note
    Be sure to run `cluster.close()` when your computations are finished. Idle clusters are automatically closed by default.

Just like with LocalCluster, the dashboard URL can be used with the Dask extension to visually monitor your job and cluster activity in real time.

## Dask GatewayCluster

When LocalCluster isn't sufficient, you can scale your application with Dask Gateway. On NCAR's Kubernetes JupyterHub, the `dask-gateway` package allows users to launch distributed Dask clusters with dedicated resources.

Here's an example of using GatewayCluster:

```python
from dask.distributed import Client
from dask_gateway import GatewayCluster

# Connect to Gateway and create a cluster
cluster = GatewayCluster("http://traefik-dask-gateway/services/dask-gateway/", 
                        public_address="https://jupyter.k8s.ucar.edu/services/dask-gateway/", 
                        auth='jupyterhub')  

cluster.adapt(minimum=2, maximum=20)  # Make an adaptable cluster with a min and max number of workers

client = Client(cluster)  # connect Client to Cluster
client # Display the client information and Dashboard URL
```

!!! note
    Be sure to run `cluster.close()` when your computations are finished. Idle clusters are automatically closed by default.

Just like with LocalCluster, the dashboard URL can be used with the Dask extension to visually monitor your job and cluster activity in real time.

<img src="../../../media/dask/dask-gw-client.png"/>

The Dashboard URL will bring you to a page where Dask cluster resources can be viewed in real time. The URL can also be copied and pasted into the Dask extension on the left as seen below.

<img src="../../../media/dask/dask-extension.png"/>

Each box can be dragged into your workspace and arranged as different tiles alongside your notebook. This enables you to monitor Dask resources while watching your notebooks run.

## Dask-Jobqueue

!!! important
    `dask-jobqueue` is supported **only** on the HPC JupyterHub. Use `dask-gateway` for scalable clusters on NCAR's Kubernetes JupyterHub.

The Dask-Jobqueue package will only work on the HPC JupyterHub. Dask-Gateway is the correct solution for deploying scalable Dask clusters on the NCAR K8s JupyterHub.

[Dask-Jobqueue](https://jobqueue.dask.org/en/latest/) is a Python module that simplifies the deployment of Dask clusters on HPC job scheduling systems like PBS, Slurm, SGE, LSF, and HTCondor.

Here's an example on how to use `dask_jobqueue` to provision a Dask cluster on a PBS scheduler:

```python
from dask_jobqueue import PBSCluster
from distributed import Client

cluster = PBSCluster(
    job_name = 'my-job-name',
    cores = 1,
    memory = '10GiB',
    processes = 1,
    local_directory = '/scratch',
    queue='queue-name',
    interface = 'ib0'
)

client = Client(cluster)
```

Full documentation is available in the **[dask-jobqueue docs](https://jobqueue.dask.org/en/latest/)**.

For a walkthrough, see Part 2 of the "Using Dask on HPC Systems" video on the **[CISL YouTube channel](https://www.youtube.com/watch?v=E4utSzWgJEo)**.