# Using FastX for remote desktops

The **FastX** remote desktop service gives users access to Casper for
performing lightweight tasks such as text editing, running programs such
as xxdiff and ncview, or running analysis scripts that consume little in
the way of graphics resources.

A user can log out of a FastX remote desktop and return to it later.
This service will remain available while NCAR and UCAR building closures
are in effect.

FastX sessions that consume excessive resources are subject to being
killed. For resource-intensive workloads that do not require GPU-based
rendering, consider starting a Casper job instead by running
an **execcasper **command from a FastX terminal window. For more
resource-intensive work with high-end, GPU-accelerated graphics,
consider using the [**vncmgr
script**](file:////display/RC/Using+remote+desktops+on+Casper+with+VNC) rather
than FastX.

FastX can be accessed through a web browser or a desktop client. How to
use both of these options is described below.

#### Page contents

- [Using FastX via web
  browser](#UsingFastXforremotedesktops-UsingFastXv)

- [Using FastX via web browser and ssh
  tunnel](#UsingFastXforremotedesktops-UsingFastXv)

  - [Alternatives for creating ssh
    tunnel](#UsingFastXforremotedesktops-Alternative)

- [Using the FastX desktop
  client](#UsingFastXforremotedesktops-UsingtheFas)

## Using FastX via web browser

To use FastX without installing any software, connect to the NCAR VPN
and use an updated version of any common browser. See the following
section for an alternative to using the VPN.

1.  Connect to the [NCAR VPN](file:////display/RC/VPN+access). 

2.  Go to [https://fastx.ucar.edu:3300](https://fastx.ucar.edu:3300/).

3.  Authenticate with your username and token response.

4.  Click the **+** button in the upper-left corner of the FastX
    window.  
      
    ![](media/image1.png)  
     

5.  In the next window, click the **KDE** button and then **Launch**.  
      
    ![](media/image2.png)  
     

6.  The KDE desktop will open in a new tab or a new browser window.
    Right-click on the desktop to start a Kconsole terminal window.  
      
    ![](media/image3.png)

Some users will find that their terminal environment configuration is
not complete (module commands will not be available, for example). To
initialize your environment, run the following command once you open the
Kconsole:

> **bash, ksh users:** source /etc/profile  
> **csh, tcsh users:** source /etc/csh.login

**If you want to retain your session** to return to it later, just log
out or kill the browser window. When you log in again, select the icon
to re-open the session.  
  
![](media/image4.png)

**If you do not want to retain your session**, terminate it as shown
here before logging out:  
  
![](media/image5.png)

## Using FastX via web browser and ssh tunnel

If you are *not connected* to or *do not want to connect* to the NCAR
VPN, you can still use FastX via web browser by creating an **ssh
tunnel** from your laptop or desktop to FastX.

1.  Start by running the following on your command line, inserting your
    own username.

> ssh -L 3300:fastx.ucar.edu:3300 -l username fastx.ucar.edu

2.  Authenticate as usual and you will be in a terminal session on a
    Casper node.  
     

3.  Leave that terminal session running, open your browser, and go
    to https://localhost:3300/. You may see a warning about the site
    being unsafe, but ignore the warning and continue.  
     

4.  Authenticate with your username and token response.  
     

5.  Continue as described in the previous section to launch
    the **KDE** desktop.

### Alternatives for creating ssh tunnel

To create a tunnel using PuTTY or SecureCRT, following the examples in
these video demonstrations:

- [PuTTY ssh tunnel](https://youtu.be/ES-HZFpJqlc)

- [SecureCRT ssh tunnel](https://youtu.be/yC65MMNxJxc)

After creating the tunnel, proceed as described in the previous section.

## Using the FastX desktop client

If you’re not connected to the NCAR VPN or prefer to use a faster, more
robust remote desktop service, consider downloading and installing
the [FastX desktop
client](https://www.starnet.com/download/fastx-client). Windows users:
If you do not have admin privileges to install the client on your
machine, choose the “Windows Nonroot” client.

1.  Start the FastX client.

2.  Click the **+** button in the upper-left corner.  
      
    ![](media/image6.png)  
     

3.  Fill in the fields of the pop-up boxes as follows:  
      
    **Host:**    fastx.ucar.edu  
    **User:**    Enter your username  
    **Port: **   22  
    **Name:**  CISL remote desktop (or any string)  
    **Run (advanced tab):**  
     /ncar/opt/fastx/latest/bin/fastx-protocol  
      
     ![](media/image7.png)![](media/image8.png)  
     

4.  Click **OK**.

5.  Select the remote desktop collection (double-click or
    press **Enter**).

6.  Authenticate with your username and token response.

7.  Click the **+** button in the upper-left corner of the next
    window.  
      
    ![](media/image6.png)  
     

8.  Select the **KDE** icon that displays **startkde** in the required
    command field.  
     

    1.  Double-click the icon to start the KDE desktop. You can then
        right-click on the desktop to get a Kconsole menu.  
          
        OR  
         

    2.  Double-click the **xterm** icon instead to get a single xterm.

> ![](media/image9.png)
