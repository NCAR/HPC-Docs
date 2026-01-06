# Kubernetes API Access

The kubernetes api can be accessed by a utility called kubectl and our clusters are integrated with the UCAR user authentication. These utilities are well documented online so we will point to external documentation for most of this and provide additional instructions as necessary.

## Install kubectl
See https://kubernetes.io/docs/tasks/tools/#kubectl 

## Install Azure kubelogin

See https://azure.github.io/kubelogin/install.html

## Set up your kubernetes config file

`kubectl` uses either `~/.kube/config` by default or the KUBECONFIG environment variable to know which file to load its configuration from. We recommend using the default file location.

The CIRRUS team will provide you with the necessary configuration file.

## Login

Once the utilities are installed correctly when you use kubectl it will start the login process by asking you to go to a microsoft/azure url and what account to log in with. It also uses two factor authentication.

## Extra Tips

The kubectl quick reference is very useful https://kubernetes.io/docs/reference/kubectl/quick-reference/

Enable shell completion for the kubectl command. This will allow tab completing resources.
https://kubernetes.io/docs/reference/kubectl/quick-reference/#kubectl-autocomplete


You will be typing `kubectl` a lot so alias it to `k`. Make sure to enable bash completion for the alias. This should be put in `~/.bashrc` https://kubernetes.io/docs/reference/kubectl/quick-reference/#bash

Switching clusters and namespaces may also happen frequently. To make this easier install the kubectx and kubens utilities. https://github.com/ahmetb/kubectx

Because you are switching clusters and namespaces it is easy to lose track of where you are. To help with this install kube-ps1 to modify your shell with the context and namespace you are currently working in. https://github.com/jonmosco/kube-ps1




