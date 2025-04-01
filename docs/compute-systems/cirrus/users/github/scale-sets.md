# GitHub Actions Runners

CIRRUS has the ability to connect to GitHub repositories and automatically provision and scale GitHub runners on demand. 

## Access

This feature is only available to repositories in the NCAR GitHub organization, https://github.com/NCAR. Access to individual repositories is not supported.

A GitHub API token belonging to a user with the admin role for the repository is required to connect a runner scale set. This requires adding a CIRRUS administrator as a collaborator with the admin role to the repository. 

## Requesting a Runner Scale Set

Administrator assistance is required to initially connect GitHub Runner scale sets on CIRRUS. More details can be found at this [link on creating tickets](../../create-tickets). Below is an example ticket description to add a new GitHub Runner scale set to a repository.

```
Hello,
I have an repository that I would like to connect a GitHub runner scale set to.

Link to GitHub repository: https://github.com/NCAR/<respository-name>

Thank you
```

The CIRRUS team will review the request and provide a GitHub user name to add.

## Adding a CIRRUS admin

Collaborators can be added to a repository via the access settings at a link structured like the following: 

```
https://github.com/NCAR/<respository-name>/settings/access
```

Use the Add people button to input and select the CIRRUS team members user name. This will bring up a page that allows the selection of a role for the invited user. Select Admin and then click the Add selection button. Please update the ticket once the CIRRUS admin shows in the Manage access window under Direct access.

## Using the Scale Set

Once the CIRRUS admin has connected a scale set to your repository they will provide the name of the scale set to use in the Actions workflow. Use this name when defining the `runs-on:` line in the Action workflow yaml file like the following

```
jobs:
  testing:
    runs-on: gh-arc-myrepo-scale-set
```

## Running Container builds

The scale sets deployed do not have privileged access and as a result can not directly access a container daemon. There is a buildkit service for docker buildx that can be used to offload container builds. Before building a container with docker specify the buildx remote driver by using the following,

`docker buildx create --use --driver=remote tcp://buildkitd.arc-systems.svc.ml-cluster.local:1234`

## Running Container tests

After a new container is built it can be run directly in a new GitHub Actions workflow job defined like this

```
jobs:
  test-container:
    runs-on: gh-arc-myrepo-scale-set
    container:
      image: hub.k8s.ucar.edu/myrepo/mynewimage:v1.2
    steps:
```