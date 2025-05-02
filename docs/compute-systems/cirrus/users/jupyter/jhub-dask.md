# Dask Introduction

[Dask](https://www.dask.org/) is a solution that enables you to scale Python libraries. It mimics popular scientific libraries such as numpy, pandas, and xarray that enables an easier path to parallel processing without having to refactor your code. 

There are 3 components to parallel processing with Dask: the client, the scheduler, and the workers. 

The Client is best envisioned as the application that communicates with Dask. In Python applications this is handled when you define `client = Client(CLUSTER_TYPE)`. A Dask cluster comprises of a single scheduler that manages the execution of tasks on workers. The `CLUSTER_TYPE` can be defined in a number of different ways.

- You can spin up a LocalCluster, a cluster running on the same hardware as the application and sharing the available resources, directly in Python with `dask.distributed`. 

- You can spin up a dedicated dask cluster with its own resources with `dask.gateway`. 

- You can also utilize `dask_jobqueue` to connect to the HPC Slurm and PBS job schedulers to provision resources for you.

The `dask.distributed` client python module can also be used to connect to existing clusters. You can deploy a Dask Scheduler and Workers to kubernetes without using a Python function to create a dask cluster. The `dask.distributed` Client is configured to connect to the scheduler either by IP or by the k8s service name with the later being preferred because we can set the name but not the IP.     

## Dask LocalCluster

In Python you can utilize dask to create a cluster for parallel processing that shares resources with the system the code is running on. [LocalCluster](https://docs.dask.org/en/stable/deploying-python.html#localcluster) is the best way to get started using Dask. It allows time to understand the different components involved in implementing parallel computing. Python's standard interpreter, CPython, is single threaded and only runs on a single CPU core. Your computer likely has multiple CPU cores available and tools like Dask LocalCluster can be used to take advantage of more CPU cores. By starting here you will understand when LocalCluster is no longer enough and more resources are required to scale your application or analysis. An example of how to accomplish this in your Python code can be seen below:

```
from dask.distributed import Client, LocalCluster

cluster = LocalCluster(
    'cluster-name',
    n_workers = 4
)
client = Client(cluster)
client
```

This will start 4 Dask workers and a scheduler on local resources. If you run this Python code on the NCAR JupyterHub instance you will see a Widget that you can expand and explore your cluster options. An example of this can be seen in the image below:

<img src="../../../media/dask/dask-local.png"/>

On the NCAR JupyterHub the dashboard links will take you to a Dask dashboard page. The URL can also be copied and pasted in to the Dask extension on the left as seen below.

<img src="../../../media/dask/dask-extension.png">

Each box can be dragged in to your workspace and arranged as different tiles alongside your notebook. This enables you to monitor Dask resources while watching your notebooks run. 

## Dask GatewayCluster

When `LocalCluster` is no longer sufficient and you are maxing out local resources it's time to scale your application and create a separate Dask cluster with it's own dedicated resources. In the NCAR JupyterHub `dask_gateway` is utilized to provision a Dask [GatewayCluster](https://gateway.dask.org/api-client.html#gatewaycluster) via Python. An example of how to launch Dask Gateway in Python can be seen below.

```python
from dask.distributed import Client
from dask_gateway import GatewayCluster

cluster = GatewayCluster()  # connect to Gateway and create a cluster

cluster.adapt(minimum=2, maximum=20)  # Make an adaptable cluster with a min and max number of workers

client = Client(cluster)  # connect Client to Cluster
client # Display the client information and Dashboard URL
```

!!! info
    It is best practice to run `cluster.close()` at the end of your computations. GatewayCluster should close idle clusters automatically.


<img src="../../../media/dask/dask-gw-client.png">

The Dashboard URL will bring you to a page where Dask cluster resources can be viewed in real time. The URL can also be copied and pasted in to the Dask extension on the left as seen below.

<img src="../../../media/dask/dask-extension.png">

Each box can be dragged in to your workspace and arranged as different tiles alongside your notebook. This enables you to monitor Dask resources while watching your notebooks run. 

## Dask-Jobqueue

!!! info
The Dask-Jobqueue package will only work on the HPC JupyterHub. Dask-Gateway is the correct solution for deploying scalable Dask clusters on the NCAR K8s JupyterHub.

[Dask-Jobqueue](https://jobqueue.dask.org/en/latest/) is a Python module that enables an easy way to deploy Dask clusters on HPC job queueing systems like PBS, Slurm, MOAB, SGE, LSF, and HTCondor. An example on how to use `dask_jobqueue` to provision a Dask cluster on a PBS scheduler can be seen below:

```
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

The Dask-Jobqueue documentation [here](https://jobqueue.dask.org/en/latest/configuration-setup.html) provides a much greater in depth explanation of each of these values and how to customize them appropriately. There is also a YouTube video on the CISL YouTube channel called "Using Dask on HPC Systems" that is very informative. The beginning of part 2 goes over dask_jobqueue on NCAR HPC resources and can be viewed [here](https://www.youtube.com/watch?v=E4utSzWgJEo) 

