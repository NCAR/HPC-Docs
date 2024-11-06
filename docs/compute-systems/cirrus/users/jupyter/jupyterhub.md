# CIRRUS JupyterHub

## Overview

CIRRUS hosts a JupyterHub instance on Kubernetes (K8s). 

!!! info
    The K8s JupyterHub is available inside the NCAR network only so you must either be ***onsite*** or connected to the ***VPN***.


<span class="d-flex justify-content-center py-4">
    <a href="https://jupyter.k8s.ucar.edu/">
        <figure>
            <img src="https://ncar.github.io/cisl-cloud/_static/jhub-logo.png">
            <figcaption style="text-align:center">K8s JupyterHub</figcaption>
        </figure>
    </a>
</span>

## Access
The [JupyterHub Login](https://jupyter.k8s.ucar.edu/) page is the portal to enter and spin up a personal and persistent Jupyter environment. 

Authentication is being handled via GitHub and access is given to members of the following NCAR [team](https://github.com/orgs/NCAR/teams/2i2c-cloud-users). If you do not currently have access you can request to join the GitHub team. Please provide valid justification for your use case. A member of the team will process the request and will be in contact to confirm or coordinate your access.

### Requesting Access

Access is controlled via a GitHub team in the NCAR GitHub Organization . In order to gain access to the NSF NCAR K8s JupyterHub instance you will need to follow this [link to request to join the team](https://github.com/orgs/NCAR/teams/2i2c-cloud-users). In the upper right of the team list there is a button to `Request to join` that can be seen in the image below: 

<img src="https://ncar.github.io/cisl-cloud/_static/K8sJHub/gh-team-join.png" width="133%">

!!! info
    If you are not part of the NCAR Organization on GitHub you will get a 404 error when trying to navigate to the team page. Access can be granted to existing employees by following this [link to directions](https://ithelp.ucar.edu/plugins/servlet/desk/portal/2/article/87657797/GitHub) 

Once you request to join the team an email will be sent to owners and maintainers of the team notifying them of your request. After verifying that it's appropriate for you to join you will be added to the team and have access to your own environment on the NCAR JupyterHub.

!!! info
    We will try to verify your request as soon as possible. During normal business hours this should be accomplished within 24 hours. If it's over a weekend or holiday please allow time for the team to review the request as it's outside typical working times. 

## Initial Login

Once logged in to the JupyterHub there are a few details that will make it easier to navigate and understand how to utilize what is offered. 

### Server Options

Once logged in the first page displayed is titled `Server Options` and is also known as the spawn page. It's from here where the desired environment is selected and spun up for the user. There's a CPU Notebook, with 3 different resource sizes, and 2 GPU Notebook environments available.

<img src="https://ncar.github.io/cisl-cloud/_static/K8sJHub/server-opts.png"/>

The NSF NCAR images are built and maintained by the CCPP team. Please report any issues you find in them using the `REPORT ISSUE` link found at the top of this documentation.

### User Environment

Once logged in the default start up page for everyone looks like this:

<img src="https://ncar.github.io/cisl-cloud/_static/K8sJHub/jhub-main.png"/>