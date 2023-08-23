# SSH tunneling with PuTTY

#### Supplement to [Using remote desktops on Casper with VNC](file:////display/RC/Using+remote+desktops+on+Casper+with+VNC)

The output from your **vncmgr **command includes a line in this format.
(Each x is a number.)

ssh -l username -L xxxx:localhost4:xxxx casperxx.ucar.edu "bash
.vnctunnel-default"

Follow these steps to copy and paste the necessary information from that
command into the PuTTY interface for Windows.

- Load a PuTTY session with casperxx.ucar.edu as the hostname.

- Select *Connection*, then *SSH*. [Display screen
  image](file:////download/attachments/72581388/putty_vnctunnel1_2020.png%3fversion=1&modificationDate=1625279396000&api=v2).

- Enter the following in the **Remote command** field.

bash .vnctunnel-default

- Under *SSH*, select *Tunnels*. [Display screen
  image](file:////download/attachments/72581388/putty_vnctunnel2_2020.png%3fversion=1&modificationDate=1625279500000&api=v2).

- Paste the first four digits from the ssh command above into
  the **Source port** field.

- Paste the "localhost4:xxxx" into the **Destination** field.

- Click **Add**.

- Click **Open**, then log in.

- Follow the instructions provided in your terminal window to start your
  VNC client. Example instructions:

Starting SSH tunnel to the VNC server...

Now load VNC on your local computer and connect to:

localhost:xxxx

VNC will ask for a one-time password. Use the following:

xxxxxxxx

This terminal session will hang until the tunnel is killed.

To kill the tunnel, simply type C-c/Control-C.

Make sure you close VNC before you kill the tunnel!

*[Return to **<u>Using remote desktops on Casper with
VNC</u>**](file:////display/RC/Using+remote+desktops+on+Casper+with+VNC). *
