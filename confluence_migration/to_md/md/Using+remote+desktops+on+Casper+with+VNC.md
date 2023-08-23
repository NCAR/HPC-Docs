# Using remote desktops on Casper with VNC

Most programs on Casper and Cheyenne are designed to run in the
terminal, but a few either require the use of a graphical interface or
work best in one. While using the default method – X-forwarding – is
sufficient for simple programs like text editors, it can be
prohibitively slow for more complex programs like MATLAB, IDL, VAPOR,
and RStudio.

When you log on to your workstation, you typically interact with
programs using a graphical desktop shell. With virtual network computing
(VNC), you can use a graphical desktop shell to work remotely on the
Casper data analysis and visualization cluster.

The remote desktop runs on Casper in a VNC session that is managed by
the *VNC server*. You access it with a *VNC client*, which runs on your
local workstation.

#### To get started

Download and install a VNC client on your local machine. CISL recommends
the [TigerVNC](https://tigervnc.org/) client and provides this video to
help Mac users install it: [Installing TigerVNC on a Mac
laptop](https://youtu.be/hVFN4AXLbWQ). (Installing on Windows machines
is less complex.)

[TurboVNC](https://www.turbovnc.org/) also works, but systems using Java
versions \>8 do not include the necessary runtime libraries to enable
TurboVNC's VNC viewer. Some other VNC clients – RealVNC, for example –
do not work well with the VNC software installed on Casper.

#### Page contents

- [Connecting to a VNC
  session](#UsingremotedesktopsonCasperwithVNC-Conn)

  - [Overview of the vncmgr
    script](#UsingremotedesktopsonCasperwithVNC-Over)

- [Customizing the Casper job and VNC
  server](#UsingremotedesktopsonCasperwithVNC-Cust)

- [Running vncmgr from your local
  machine](#UsingremotedesktopsonCasperwithVNC-Runn)

## Connecting to a VNC session

To begin using a remote desktop with VNC, you will need to start a VNC
session. Your session will run within a Casper job and can persist for
up to 24 hours.

These basic steps for starting a session are described in detail below:

- Run the **vncmgr** script, which enables you to configure your VNC
  desktop session and start both a Casper batch job and the VNC server.

- Connect to the Casper batch node with your VNC client, using a port
  that VNC specifies.

- Enter a one-time password to access your VNC session.

**If you are connected** to the NCAR Internal Network or using the [NCAR
VPN](file:////display/RC/VPN+access), you will be able to connect
directly to your session on the Casper batch node using the VNC client.

**If you are not** on the NCAR network or VPN, you will need to create
an SSH tunnel to connect your local machine and remote desktop. How to
create the SSH tunnel is described below.

### Overview of the vncmgr script

CISL provides the **vncmgr** script for initiating and managing VNC
sessions on Casper. How to run it is described in detail in the
following section. It can be used in interactive mode or command-line
mode.

**Interactive mode:** If you run the script without any command-line
arguments, it will launch in the interactive mode. In this mode, you can
start a new session, list existing sessions, query a session to retrieve
connection instructions and obtain a new one-time-password, and kill a
running session. The script enables you to name your session, state how
long you want the server to run, and select which desktop shell to use
(GNOME2, GNOME3, or KDE). It also allows for custom requests to both the
job scheduler and the VNC server program.

**Command-line mode:** In command-line mode, you specify a subcommand
and provide any desired options as command line arguments. Here are the
available commands:

- vncmgr list

- vncmgr create \[SESSION\] --account PROJECT \[--time WALLTIME …\]

- vncmgr query \[SESSION\]

- vncmgr kill \[SESSION\]

Choosing a name (SESSION) is optional. If you do not provide a name, the
name “default” will be assigned and referenced in each subcommand.

## Customizing the Casper job and VNC server

The **vncmgr** script allows you to customize both the Casper session in
which the server will run and the server itself. This customization can
be done in both interactive and command-line modes. The most common uses
involve increasing the resources allocated to your job. For example, you
could allocate 4 CPUs and 20 GB of memory to a 2-hour VNC session using
the command-line mode as follows:

**PBS syntax (in effect 3/29/2021)**

vncmgr create --account PROJECT --time 2:00:00 --job-opts="-l
select=1:ncpus=4:mem=20GB"

You do not need to specify GPU resources, as all VNC jobs are
automatically placed on nodes with NVIDIA Quadro GP100 GPUs.

Run **vncmgr --help** in a Cheyenne or Casper login session for more
information about using the script and customizing your session.

## Running vncmgr from your local machine

You can run the **vncmgr** command directly from your local machine as
shown in the example below without first starting a login session on
Cheyenne or Casper. While both command-line and interactive mode will
work, CISL recommends interactive mode as it will allow you to generate
new one-time passwords via the query option without having to
authenticate to Cheyenne every time.

**Example**

This demonstrates how to run **vncmgr**, create and configure a
customized VNC session, and then connect to the session with a VNC
client. In this example, the user is not connected to the NCAR VPN and
needs to use an SSH tunnel. ([Alternative for PuTTY
users](file:////display/RC/SSH+tunneling+with+PuTTY).) 

1.  Run this command to get started, using your own username:

> ssh -t -l username casper.ucar.edu /glade/u/apps/opt/vncmgr/vncmgr
>
> You will be prompted to authenticate, after which you will have access
> to the vncmgr menu. (If you exit vncmgr, you will have to rerun the
> command to regain access to it.)
>
>  

2.  Create your new VNC session with a name up to 10 characters long.
    The session is named "vapor" in this example. (Choose names that
    will help you avoid confusion if you run multiple sessions.)  
      
    ![](media/image1.png)  
     

3.  A series of prompts on the next screen (below) will ask you to
    specify:

>  - Your project code.  
>  - The wallclock time you want in HH:MM:SS format. The default is 4
> hours and the maximum is 24 hours.  
>  - Which desktop shell to use. The default setting is 2d, which
> configures your desktop to use a shell with
> the [MATE](https://mate-desktop.org/) user interface.  
>  - Any optional arguments. In the example, the user requests 20 GB of
> memory.
>
> All VNC jobs must run on a node with a GP100 GPU. If you specify
> custom resource requirements, those requirements will be modified if
> necessary to ensure that the job can run on the correct node.  
>   
> ![](media/image2.png)

4.  When the job starts, follow the instructions and choose how you want
    to connect to your VNC session: tunneling or using the UCAR internal
    network or VPN.  
      
    ![](media/image3.png)  
      
    Pressing enter at this point will return you to the interactive
    menu. Use the query option if you need to return to the instructions
    for creating the SSH tunnel later. 

5.  Your desktop on Casper will be displayed after you connect to the
    specified host and enter the onetime password. On the desktop, start
    a terminal from the list of applications.  
      
    ![](media/image4.png)

6.  To start an application, load any required modules and run the
    executable.  
      
    ![](media/image5.png)
