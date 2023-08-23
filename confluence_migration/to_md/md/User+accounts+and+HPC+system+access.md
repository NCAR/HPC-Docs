# User accounts and HPC system access

Users must have **accounts** in order to log in to the high-performance
computing (HPC) systems that CISL manages.

Connecting to one of these systems from a local computer is most
commonly done using **Secure Shell** (SSH) access and **X
Window** software.

As explained below, users have a number of ways to get what they need.

**See [VPN access](file:////display/RC/VPN+access) if you need to use
the virtual private network.**

#### Page contents

- [Accounts](#UseraccountsandHPCsystemaccess-Accounts)

- [Secure Shell access](#UseraccountsandHPCsystemaccess-SecureSh)

- [X Window System](#UseraccountsandHPCsystemaccess-XWindowS)

- [Troubleshooting tips](#UseraccountsandHPCsystemaccess-Troubles)

## Accounts

Individuals who have **user accounts** can log in to CISL-supported HPC
systems. Each person must have his or her own user account; they may not
be shared.

Accounts are established when an allocation is awarded or when a project
lead or project administrator later requests accounts for additional
individuals. [<u>Use this form to submit such
requests</u>](https://ithelp.ucar.edu/plugins/servlet/desk/portal/3/create/20).

Users are responsible for notifying CISL of changes in their contact
information (email, phone, address, and so on). If CISL personnel are
unable to reach a user when necessary, the user's account will be
locked. For additional information on responsibilities that come with
having a user account, see [<u>User
responsibilities</u>](file:////display/RC/User+responsibilities).

## Secure Shell access

Users commonly access the NCAR systems that CISL manages through a
terminal window or emulator with **Secure Shell (SSH)**. SSH encrypts
transmissions between computers. It provides interactive login, remote
command execution, and file transfer services. For systems with X Window
servers, SSH also can forward connections from the machine you log into
back to your display.

SSH clients are available for all major operating systems, including
UNIX, Linux, Microsoft Windows, and Mac OS X. Computers running Mac OS X
10.0.1 or later use OpenSSH.

### SSH clients and terminal window emulators

Here are links to some of the most popular SSH clients, which enable
users to establish secure connections through terminal windows:

- Cygwin

- [MobaXterm](https://mobaxterm.mobatek.net/) (includes X Window
  support)

- mRemoteNG

- [PuTTY](https://www.putty.org/)

- [SecureCRT](https://www.vandyke.com/products/securecrt/)

Client software is available for Apple's iPhones and iPads, too. Here
are two examples of SSH clients for iOS devices:

- [iSSH](https://sourceforge.net/projects/issh/)

- [<u>pTerm</u>](https://pkg.go.dev/github.com/pterm/pterm)

## X Window System

Users need an X Window System to be able to display graphics from the
HPC environment on their local machines and to enable X11 forwarding
when using interactive applications such as MATLAB. Mac computers and
Linux implementations typically come with the necessary X-display
support.

These are some of the commonly used X system products for Microsoft
Windows users:

- [MobaXterm](https://mobaxterm.mobatek.net/) (includes SSH client)

- [Cygwin/X](http://x.cygwin.com/)

- [Xming Server](https://sourceforge.net/projects/xming/)

Mac OS X users can [download XQuartz here](https://www.xquartz.org/).

To see if your local machine already has the necessary display support,
log in to the HPC system and run **xclock** on your command line. A
clock will be displayed if you have what you need.

If you get an error like the following one instead, install the
X-display software (or start it if it is already installed) on your
local machine.

Error: Can't open display:

Some users encounter the following message when trying to start
an **xterm** window after logging in or when running a job.

xterm Xt error: Can't open display: localhost:12.0

Removing the **.Xauthority** file from your /glade/u/home/username
directory as shown here may solve the problem. You will get a new
.Xauthority file the next time you log in.

rm .Xauthority

rm: remove regular file \`.Xauthority'? yes

## Troubleshooting tips

### Error message

Write failed: Broken pipe

### **What to do**

This indicates that your SSH connection has been broken. The simplest
solution is to reconnect.

Broken connections sometimes follow periods of inactivity. For example,
you may find yourself disconnected after leaving your terminal for a
while to go to lunch. You can address this by activating your SSH
client’s “keepalives” setting.

If you use PuTTY, for example, start the client, then
select **Connection** in the **Category** pane. (Click image to enlarge
it.) Enter **180** in the field that follows “Seconds between keepalives
(0 to turn off).” Be sure to save the change so the packets are sent
every three minutes.

![](media/image1.png)

Mac and Linux users sometimes need to include these lines in a
local **~/.ssh/config** file to enable persistent connections:

Host \*

  ServerAliveInterval 120

  ServerAliveCountMax 3

### Other considerations

- If you get the error message while you are typing, the root cause
  can’t be inactivity. The most likely cause is that your machine’s IP
  address has changed. For example, it may have switched from a wired to
  a wireless network. You can prevent some changes by telling your
  machine not to switch networks without asking you first. Check your
  operating system’s instructions for how to do that.

- If the problem persists, consider using a package such as [GNU
  Screen](https://www.gnu.org/software/screen/) or [tmux](http://tmux.github.io/),
  which allow you to restart a session right where it ended. This
  applies even if you ended the session yourself – for example, when
  leaving the office to start up again at home. Both are installed on
  the HPC systems that CISL manages. Just log in and run
  the **screen** command or load the tmux module and run **tmux**.
