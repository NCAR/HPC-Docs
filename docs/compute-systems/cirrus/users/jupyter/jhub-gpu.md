# Using GPUs

The JupyterHubs offered have GPUs available to provide more processing cores for an expansion of parallel processing capabilities. The NCAR JupyterHub has Nvidia A2 Tensor GPUs. The GPUs can be utilized by selecting a GPU image from the Server Options like in the image seen below:

<img src="../../../media/jupyter/gpu-opts.png"/>

We currently offer a PyTorch & Tensorflow Jupyter image. Allowing multiple users to access GPU resources at the same time is currently being handled with NVIDIA time slicing. The NVIDIA documentation on this feature at this [link](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/gpu-sharing.html) provides more detail on the exact mechanism on how this is accomplished. The GPU virtualization layer divides the available GPU resources, including processing cores, memory, and other hardware components, into time slices or time intervals. Each time slice represents a portion of the GPU's processing power and memory. The GPU hypervisor manages the allocation of these time slices to different applications or users. It keeps track of which applications or users have active GPU tasks and assigns time slices to them in a fair and efficient manner. This allows multiple applications or users to share a single GPU, making more efficient use of the hardware and ensuring fair access to GPU resources.

## PyTorch Tutorial

The PyTorch website offers a great introduction in to using PyTorch with example notebooks. It can be found at this [link to learn the PyTorch basics](https://pytorch.org/tutorials/beginner/basics/intro.html). The example notebooks can be drag and dropped in to a JupyterHub session and ran with Kernels available on that JupyterHub. On the PyTorch image provided the cirrus-pytorch-base Python kernel would have all the packages required to get started.

## TensorFlow Tutorial

The TensorFlow website offers a great introduction in to using TensorFlow with example notebooks. It can be found at this [link to learn the TensorFlow basics](https://www.tensorflow.org/tutorials). The example notebooks can be drag and dropped in to a JupyterHub session and ran with Kernels available on that JupyterHub. On the TensorFlow image provided the cirrus-tensorflow-base Python kernel would have all the packages required to get started.

## Packages used in the PyTorch image

The living list of packages can be found directly at this [link to the GitHub repository](https://github.com/NCAR/cirrus-jhub-images/blob/main/images/gpu-pyt-notebook/packages/cirrus-pytorch-base.yml)

## Packages used in Tensorflow image

The living list of packages can be found directly at this [link to the GitHub repository](https://github.com/NCAR/cirrus-jhub-images/blob/main/images/gpu-tf-notebook/packages/cirrus-tensorflow-base.yml)