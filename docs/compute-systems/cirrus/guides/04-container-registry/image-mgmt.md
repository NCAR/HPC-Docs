# Image Management with Harbor

## Harbor WebUI Login

The Harbor web interface can be accessed at the following URL: https://hub.k8s.ucar.edu/

To log in:

1. Click the **LOGIN WITH Entra ID** button
2. Enter your **UCAR email address and password**
3. Complete **Cisco Duo security verification** when prompted

This login flow uses your UCAR credentials via Microsoft Azure for secure access.

!!! info
    To pull or push images, you'll need a container engine such as Docker, Podman, or Containerd. Docker is the most common choice. **[Install Docker Engine](https://docs.docker.com/engine/install/)** if you don't already have one.

---

## Harbor CLI Login

Harbor requires a CLI secret to authenticate with an email address via the command line.

### To obtain a CLI secret:

1. Log in to https://hub.k8s.ucar.edu/
2. Click your **email address** (top right hand corner)
3. Select **User Profile**
4. **Copy the CLI secret** using the copy button next to it

<img src="../../../media/harbor/harbor-user-profile.png"/>

!!! tip
    Harbor recommends using robot accounts instead of personal credentials for CLI automation. See [Using Robot Accounts](#using-robot-accounts) below for more.

### To log in using Docker:

The command line syntax to log in to Harbor with Docker is:

```bash
docker login https://hub.k8s.ucar.edu/
```

You will be prompted for a **Username** and **Password**:
- Use your **UCAR email** as the username
- Paste the **CLI secret** as the password

A successful login message confirms access and enables you to push/pull from private projects.

---

## Pulling Images from Harbor

!!! note
    For private projects, make sure you're logged in to Harbor before pulling the image. Public project images can be pulled without authentication.

An image is pulled from Harbor using the `docker pull` command and specified to pull it from the Harbor URL.

**Example:**

```bash
docker image pull hub.k8s.ucar.edu/cirrus-jhub/cirrus-base:v1-stable
```

---

## Pushing Images to Harbor

!!! important
    Before you can push an image to Harbor, a project must first be created for you. At this time, only Harbor administrators can create new projects and assign user permissions.
    
    To request a new project or to be added to an existing project with the appropriate role (Developer, Maintainer, or Project Admin), please **[open a request](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&issuetype=10905)**.
    
    You will not be able to push images until your access has been provisioned by an admin.

Assuming you've already built a local image, follow the steps below to push to Harbor:

*Information on how to create container images locally can be found in our [create containers](../03-deploying-applications/containerize.md)*

### Steps:

1. **Tag the image** with the Harbor Project and repository info. Once the image is tagged it can be pushed to Harbor.

   ```bash
   docker tag cirrus-jhub/cirrus-base:v1-stable hub.k8s.ucar.edu/cislcloudpilot/cirrus-base:v1-stable
   ```

2. **Push the tagged image:**

   ```bash
   docker push hub.k8s.ucar.edu/cislcloudpilot/cirrus-base:v1-stable
   ```

### Command Syntax Reference

The exact syntax used in each of these commands as it relates to Harbor Projects and Repositories can be seen in the code block below:

```bash
docker tag SOURCE_IMAGE[:TAG] hub.k8s.ucar.edu/PROJECT/REPOSITORY[:TAG]
docker push hub.k8s.ucar.edu/PROJECT/REPOSITORY[:TAG]
```

!!! tip
    After pushing, your image will appear in the Harbor project. Harbor contains a vulnerability scanner that automatically scans your images for any known vulnerabilities and provides detailed reports on what it finds.
    
    For more information on how to use the scanner, please see [vulnerability scanner](vulnerability-scan.md).

!!! info
    If your project is public, it can be pulled by anyone on the network. This makes it easy to share reproducible builds with collaborators.

---

## Using Robot Accounts

A Project in Harbor can have multiple robot accounts with configurable permissions to perform various tasks. **Robot accounts are strongly recommended** to be used when logging in to Harbor via code instead of personal accounts.

!!! note
    You must have the role of **Project Admin** in Harbor to create or manage robot accounts.

### To create a robot account:

1. **Log in** to the [Harbor Web UI](https://hub.k8s.ucar.edu/) using your CIT credentials.
2. **Navigate** to your project
3. Click the **Robot Accounts** tab to navigate to Robot Account settings
4. Click **+ NEW ROBOT ACCOUNT**
5. In the new window that pops up, you can provide the following details:
   - **Name** (results in `robot${project}+{name}`)
   - **Expiration time** (best practice is to set an Expiration time and not use the never expire option)
   - **Description and permissions**

6. Once the robot account is created, a **one-time secret** will be displayed.
7. **Copy and store it securely**, as it will not be shown again and should not be exposed in plain text publicly.

If needed, you can generate a new secret later by selecting the robot account, opening the **ACTIONS** dropdown, and clicking **REFRESH SECRET**.