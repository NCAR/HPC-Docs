## CIRRUS Functions as a Service


Function as a service (FaaS) is a cloud computing model where you develop small, modular pieces of code called functions, and a cloud provider executes them in response to specific events. In this model, you focus entirely on the code logic, while the serverless runtime manages the infrastructure. The cloud provider handles the physical hardware, the operating system, and the web server software.


CIRRUS uses an open source project called [Fission](https://fission.io) to provide an internally hosted function as a service provider. This documentation will freqeuently reference the projects own documentation and examples.

### Request Access

Contact the cirrus team via Jira or cirrus-admin@ucar.edu requesting access to the faas provider. As part of this you will also receive access to the kubernetes api server. Function creation and management is managed through the api without a GUI.

### Set up

Download and install the fission cli: https://fission.io/docs/installation/#install-fission-cli

[Download and install kubectl](../10-kubectl/kubectl.md)

### Fission Concepts

Functions execute inside a lightweight container environment that is managed by fission to ensure there are resources available to service calls to the function. It is best to keep containers as small as possible but that can be hard with scientific python packages and conda.

Fission supports multiple [languages](https://fission.io/docs/usage/languages/) for executing functions

- Python
- Ruby
- NodeJS
- PHP
- Bash
- Go
- Java (JVM)
- Binaries

We recommend getting familiar with these fission docs

- [Concepts](https://fission.io/docs/concepts/) and its sub topics on each of the main concepts
- [Builder](https://fission.io/docs/architecture/builder-pod/) - fission can compile source and build the package
- [Accessing URL Parameters](https://fission.io/docs/usage/function/accessing-url-params/) - functions are often called via http requests. Arguments and a payload need to be sent to the function.



### Best Practices

- Keep Functions in a relevant namespace to the application
- Use the CIRRUS image registry harbor for custom images
- Use the fission cli to initially create the function objects but then move them into a git repository that can be controlled with a CD tool


### Examples

#### Python Hello World

Read this official fission.io example to create a simple python hello world function. When creating the route you can use our shared faas ingress url to host it. Follow these slight modifications for the best results:

Modify the environment creation to:
```
fission env create --name python --poolsize=1 --image ghcr.io/fission/python-env --builder ghcr.io/fission/python-env
```

Modify the `fission route create` command to be:

```
fission route create --function hello --name hello --url /hello-<username> --route-path=/hello-<username> --route-provider gateway --gateway traefik/traefik-gateway --route-host=fn.k8s.ucar.edu

```

https://fission.io/docs/usage/languages/python


You can use `fission (env|fn) list` to view objects. To test the hello-world function use your browser to access https://fn.k8s.ucar.edu/hello-<username>

