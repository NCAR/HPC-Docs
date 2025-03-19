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