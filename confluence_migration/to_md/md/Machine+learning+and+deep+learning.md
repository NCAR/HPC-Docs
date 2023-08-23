# Machine learning and deep learning

CISL provides several libraries for users' machine learning and deep
learning (ML/DL) work **on Casper nodes**. 

These libraries have been compiled from source to use native CUDA (GPU)
and MPI libraries, increasing the capabilities over downloadable
distributions that are available online. The ML/DL library installations
can be found in NPL versions for Python 3.7.9.

Users load them by activating the NCAR Python Library
([NPL](file:////display/RC/Using+Conda+and+Python)).

The libraries available are:

- [TensorFlow](https://www.tensorflow.org/) machine learning library
  v2.3.1

- [PyTorch](https://pytorch.org/) machine learning library v1.7.1

- [scikit-learn](https://scikit-learn.org/) machine learning library
  v0.5.3

- [Horovod](https://eng.uber.com/horovod/) deep learning framework
  v0.21.0

- [Keras](https://keras.io/) deep learning library v2.4.3

## Starting a job

ML/DL workloads are most likely targeted toward NVIDIA's Tesla V100
hardware. To start an interactive job on a Casper node using a V100 GPU,
run the **execcasper** command with
the **ngpus=# **and **gpu_type=v100** resources set as shown in [this
documentation](file:////display/RC/Starting+Casper+jobs+with+PBS).

Then load the modules you need, including Python version 3.7.9,
and [activate the NPL](file:////display/RC/Using+Conda+and+Python).
