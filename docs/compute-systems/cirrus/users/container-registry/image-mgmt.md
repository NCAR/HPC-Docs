# Image Management

The Harbor web interface can be accessed at the following URL : [https://hub.k8s.ucar.edu/](https://hub.k8s.ucar.edu/). 

To log in:

1. Click the "LOGIN WITH Entra ID" button
2. Enter your UCAR email address and password
3. Complete the additional security verification through Cisco Duo when prompted

This uses your existing UCAR Microsoft account credentials for secure access. 

!!! info
    Image pulling and pushing requires a container engine such as Docker, Podman, or Containerd. If you don't have one installed, Docker is the most common choice. For Docker installation instructions, see [Install Docker Engine](https://docs.docker.com/engine/install/).

## Harbor CLI Login

Harbor requires a CLI secret to authenticate with an email address via the command line. 

To get a CLI secret

1. Log in to [https://hub.k8s.ucar.edu/](https://hub.k8s.ucar.edu/)
2. Click on your email address in the top right hand corner 
3. Select User Profile from the dropdown. 
4. Copy the CLI secret using the button to the right of the hidden CLI secret.

<img src="../../../media/harbor/harbor-user-profile.png"/>

!!! info
    Harbor strongly recommends using robot accounts for CLI commands. For more information on creating robot accounts, see [Using Robot Accounts](#using-robot-accounts)


The command line syntax to use Docker for logging in to Harbor is as follows:

```
docker login https://hub.k8s.ucar.edu/
```

You will be prompted for a Username and Password. Use your ucar.edu email address and the CLI secret. You should get a message that your login was successful. Now you are able to pull images from private projects and push images directly to Harbor.

## Pull an image from Harbor

!!! info
    If the project that the image belongs to is private, you need to login to Harbor before you can pull the image. If an image is in a public project, you do not need to be logged in to pull that image. 

An image is pulled from Harbor using the `docker pull` command and specifying to pull it from the Harbor url. An example of what this command looks like is as follows:

```
docker image pull hub.k8s.ucar.edu/cirrus-jhub/cirrus-base:v1-stable
```

## Push an image to Harbor

!!! info
    Before you can push an image to Harbor, a corresponding project must be created in the Harbor interface. The default page on login is Projects and there is a button above the list of existing projects to create a new project. In order to push to an existing project you must be a member of that project with a Role of Developer, Maintainer, or Project Admin. If you need assistance creating projects or with permissions please open a ticket via the link [here](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&issuetype=10905).


!!! info
    This assumes you have an image built locally that you want to push to Harbor. Information on how to create container images locally can be found in this documentation [here](../hosting/containerize.md)

In order to push the built image to Harbor we first have to tag the image we want to push with our Harbor project information. Once the image is tagged it can be pushed to Harbor. An example of how to do this can be seen below:

```
docker tag cirrus-jhub/cirrus-base:v1-stable hub.k8s.ucar.edu/cislcloudpilot/cirrus-base:v1-stable
docker push hub.k8s.ucar.edu/cislcloudpilot/cirrus-base:v1-stable
```

The exact syntax used in each of these commands as it relates to Harbor Projects and Repositories can be see in the code block below:

```
docker tag SOURCE_IMAGE[:TAG] hub.k8s.ucar.edu/PROJECT/REPOSITORY[:TAG]
docker push hub.k8s.ucar.edu/PROJECT/REPOSITORY[:TAG]
```

Your image should now be in the Harbor project, ncote in the example. Harbor contains a vulnerability scanner that will scan your images for any known vulnerabilities and provide a lot of relevant information on what it finds. More information on how to use the scanner can be found at this [link](scanner.ipynb)

If your project is public it can be pulled by anyone on the network. This is a great way to share your work with others in a reproducible fashion. 

## Using Robot Accounts

A Project in Harbor can have multiple robot accounts with configurable permissions to perform various tasks. Instead of using a personal account when logging in to Harbor via code a robot account should be used instead.

!!! info
    In order to add a robot account you must have the role of Project Admin for the associated project.

After logging in to the Harbor UI, [https://hub.k8s.ucar.edu/](https://hub.k8s.ucar.edu/), with CIT credentials click on the project name listed where the robot account should be added. Once in the project there are several tabs for project settings including one named Robot Accounts. Select this tab to navigate to the Robot Accounts settings and click the button that says + NEW ROBOT ACCOUNT. This brings up a new window where the robot account can be named, the final account name will be robot-{Name}+{Name}, Expiration time, Description, and Permissions. Best practice is to set an Expiration time and not use the never expire option. Once created the only time the password, or secret, will be displayed pops up. Copy this now and store it in a safe location where it is not exposed in plain text publicly. A new secret can be generated by selecting the robot account and using the ACTION dropdown and the REFRESH SECRET option. 
