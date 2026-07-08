# CIRRUS Functions as a Service

Functions as a service (FaaS) is a cloud computing model where you develop small, modular pieces of code called functions, and a cloud provider executes them in response to specific events. In this model, you focus entirely on the code logic, while the serverless runtime manages the infrastructure. The cloud provider handles the physical hardware, the operating system, and the web server software.

CIRRUS uses an open source project called [Fission](https://fission.io) to provide an internally hosted function as a service provider. This documentation will frequently reference the project's own documentation and examples.

## Request Access

Contact the CIRRUS team via a Jira request or cirrus-admin@ucar.edu requesting access to the FaaS provider. For more information on creating requests, see [create tickets](../02-interact-with-cirrus-team/create-tickets.md). As part of this you will also receive access to the Kubernetes API server if you do not already have it. Function creation and management is managed directly through the API without a GUI.

## Set up

Download and install the Fission CLI: https://fission.io/docs/installation/#install-fission-cli

[Download and install kubectl](../10-kubectl/kubectl.md)

## Fission Concepts

Functions execute inside a lightweight container environment that is managed by Fission to ensure there are resources available to service calls to the function. It is best to keep containers as small as possible but that can be hard with scientific python packages and conda.

Fission supports multiple [languages](https://fission.io/docs/usage/languages/) for executing functions

- Python
- Ruby
- NodeJS
- PHP
- Bash
- Go
- Java (JVM)
- Binaries

We recommend getting familiar with these Fission docs

- [Concepts](https://fission.io/docs/concepts/) and its sub topics on each of the main concepts
- [Builder](https://fission.io/docs/architecture/builder-pod/) - fission can compile source and build the package
- [Accessing URL Parameters](https://fission.io/docs/usage/function/accessing-url-params/) - functions are often called via http requests. Arguments and a payload need to be sent to the function.


## Best Practices

- Keep Functions in a relevant namespace to the application
- Use the CIRRUS image registry harbor for custom images
- Use the Fission cli to initially create the function objects but then move them into a git repository that can be controlled with a CD tool
- URL Paths are shared globally. In order to prevent URL conflicts utilize namespace or username prefixes on route paths.
- Environments are shared infrastructure. Create one per language you use and reuse it across all your functions in that language.

## Examples

### Create an environment (once per language, per namespace)

An environment provides the runtime for a language — every function you create plugs into one. You need one environment per language you use, and all of your functions in that language share it. The examples below use Python:

```
fission env create --name python --poolsize=1 \
  --image ghcr.io/fission/python-env \
  --builder ghcr.io/fission/python-builder \
  -n <your-namespace>
```

For other languages, see the [Fission environments list](https://fission.io/docs/usage/languages/) for the runtime and builder image pairs. Each environment keeps `poolsize` warm pods running against your namespace resource quota, so create environments for languages you are actually using.

### Create a function

#### **Hello world (no dependencies)**

Follow the official [fission.io Python example](https://fission.io/docs/usage/languages/python) to create a simple hello world function file, then deploy the single file directly:

```
fission fn create --name hello --env python --code hello.py -n <your-namespace>
```

#### **With pip dependencies**

Functions with pip dependencies use Fission's builder. Create your function file (e.g. `myfunc.py` — don't name it after a package you import) and a `requirements.txt`, then:

```
zip -r src.zip myfunc.py requirements.txt
fission fn create --name myfunc --env python --src src.zip --entrypoint myfunc.main -n <your-namespace>
fission pkg list -n <your-namespace>
```

Build status lives on the *package*, not the function. Wait for `BUILD_STATUS` to reach `succeeded`; build logs are in `fission pkg info --name <package-name> -n <your-namespace>`.

### Create a route

Routes expose a function on our shared FaaS URL. The same command works for any function — change the function name and path:

```
fission route create --function hello --name hello --url /<username>/hello \
  --route-provider gateway --gateway traefik/traefik-gateway \
  --route-host=fn.k8s.ucar.edu -n <your-namespace>
```

!!! warning "URL paths are shared"
    All routes share the `fn.k8s.ucar.edu` host, and paths are first-come,
    first-served across every user and namespace. Prefix your paths with
    something you own — your username, team, or project name — for example
    `/<username>/hello` or `/<project>/subset-request`.

    If you create a route whose path is already claimed, the existing route
    keeps working and yours shows `READY False` in `fission route list` —
    so a route stuck at `False` with no other errors usually means the path
    is taken. Pick a different path (`fission route delete --name <route-name>`,
    then recreate with a new `--url`).

### Test and troubleshoot

You can use `fission (env|fn|route|pkg) list` to view objects. To test the hello-world function use your browser to access `https://fn.k8s.ucar.edu/hello-<username>`.

If for some reason the URL returns a `404 page not found` error use `fission route list` to check the status of the route. If the value in the `READY` column is not True check to make sure everything got deployed to your assigned namespace. If that all looks right and it still doesn't work, create a [New Issue](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&issuetype=10903&customfield_10281=CCPP-108) in Jira and a CIRRUS team member will reach out to get it working.