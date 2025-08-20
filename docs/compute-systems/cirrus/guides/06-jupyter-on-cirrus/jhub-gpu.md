# Using GPUs

The CIRRUS JupyterHubs offer access to GPUs to support workloads that benefit from increased parallel processing capabilities. Specifically, the NCAR JupyterHub includes **NVIDIA A2 Tensor Core GPUs**.

GPU support can be enabled by selecting a GPU-enabled image under **Server Options** when starting your JupyterHub server, as shown below:

<img src="../../../media/jupyter/gpu-opts.png"/>

We currently provide Jupyter images with support for both **PyTorch** and **TensorFlow**.

## GPU Resource Sharing

To allow multiple users to share GPU resources efficiently, we utilize **NVIDIA time slicing**. This feature enables time-based sharing of GPU resources between users.

Read more in the [NVIDIA time slicing documentation](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/gpu-sharing.html)

### How time slicing works:

The GPU virtualization layer breaks the GPU's processing cores, memory, and other resources into time slices. These are allocated dynamically and fairly to each user or application by the GPU hypervisor. As a result, multiple users can run GPU-based workloads concurrently on the same physical GPU, improving overall hardware utilization.

---

## PyTorch Tutorial

The [PyTorch website](https://pytorch.org/tutorials/beginner/basics/intro.html) provides an excellent introduction to PyTorch through beginner-friendly example notebooks.

You can download or drag-and-drop the example notebooks into your JupyterHub session.

Use the **`cirrus-pytorch-base`** Python kernel, included with the PyTorch GPU image, to run the notebooks without any additional setup.

View the [PyTorch environment's package list on GitHub](https://github.com/NCAR/cirrus-jhub-images/blob/main/images/gpu-pyt-notebook/packages/cirrus-pytorch-base.yml)

## TensorFlow Tutorial

The [TensorFlow website](https://www.tensorflow.org/tutorials) offers a series of hands-on notebooks for learning the TensorFlow API.

These can also be uploaded directly to JupyterHub and executed using the **`cirrus-tensorflow-base`** Python kernel, which comes preloaded with required packages.

View the [TensorFlow environment's package list on GitHub](https://github.com/NCAR/cirrus-jhub-images/blob/main/images/gpu-tf-notebook/packages/cirrus-tensorflow-base.yml)