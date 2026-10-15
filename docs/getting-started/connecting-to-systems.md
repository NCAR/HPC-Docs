# Connecting to Clusters

## Terminal Connections with SSH

The usual workflow for connecting to cluster login nodes is to use SSH from a terminal on your local workstation or laptop, such as

```
 $ ssh -l <user-name> casper.hpc.ucar.edu
```
or
```
 $ ssh <user-name>@casper.hpc.ucar.edu
```
If the username on the local workstation is the same as the NCAR systems, then that can be omitted. Similarly, to log on to Derecho, issue commands like this
```
 $ ssh <user-name>@derecho.hpc.ucar.edu
```
`ssh` will prompt you for a password and ask you to confirm using the two-factor authentication with DUO as described in [Authenticating with Duo](accounts/duo/index.md#hpc-and-ssh-logins).

See also [Logging In](index.md#logging-in) in the Getting Started main page, which discusses compression and X11 forwarding. For various ways of streamlining the connection process, read the rest of this section.

### Setting up local SSH configuration

On Linux and Mac systems, you can add features to your `ssh` connection or shorten your command line by adding to your workstation's `~/.ssh/config` file. For example,
```
host casper
     HostName casper.hpc.ucar.edu

host derecho
     HostName derecho.hpc.ucar.edu
```
will allow you to connect by using the short-hand `ssh <user-name>@derecho`. As suggested in an NCAR HPC User Group blog post, "Streamlining two-factor authentication with `ssh`", you can limit the number of authentications for each cluster separately by including this in your `~/.ssh/config` file.
```
host casper derecho *.hpc.ucar.edu
    ControlMaster auto
    ControlPath ~/.ssh/cm-%C
    ControlPersist 12h
    ServerAliveInterval 120s
    ServerAliveCountMax 5
```
This creates a unique ControlPath file in `~/.ssh/` for each cluster. With this enabled, you will only be required to authenticate on the first connection to each cluster, `casper` or `derecho`, from your local computer. If you are connecting to both clusters, you will need to authenticate twice for multiple connections to both. Using `bao-getkey` on a Mac or Linux computer, as described below, it is possible to limit that to one authentication for connecting multiple times to both clusters.

### OpenBao Certificates

`bao-getkey` uses OpenBao's HTTP API to request a certificate-signed SSH key for passwordless SSH within the systems managed by the High-Performance Systems Group (HSG) at NSF NCAR. This includes the Derecho and Casper Clusters.

Specifically, this script does the following, all through our OpenBao instance:

1. Authenticate the user with NCAR's central authentication system
2. Request a new SSH key that is signed with a trusted certificate
3. Add the new private key and its certificate to your running `ssh-agent`

It is a BASH script installed in the default PATH on Casper and Derecho. You may either copy it to your local Linux or Mac computer and put it in a directory in your PATH to run it locally, or you can run it from the cluster and have the key forwarded back to your local computer's agent. These procedures will be described below.

#### Usage
```
    bao-getkey [-a] [-u <username>]
```
Options:

*  `-a`   Request a certificate with necessary options for administrators. This will only work for system administrators
*  `-u <username>`   Specify the NCAR username to authenticate with. This is useful if your username on the NSF NCAR clusters is different than the one on your local system. Most users who are not NCAR employees will need to use this option.

#### Running bao-getkey from your local computer

**Step 1: Copy the script to your computer.** Log in to Derecho or Casper and find where the script is:
```
 $ which bao-getkey
```
Then, on your local computer, copy it to a directory in your `PATH` (`~/bin` in this example) and make it executable:
```
 $ scp <user-name>@derecho.hpc.ucar.edu:/path/to/bao-getkey ~/bin/
 $ chmod +x ~/bin/bao-getkey
```

**Step 2: Make sure an `ssh-agent` is running.** `bao-getkey` stores the new key in your `ssh-agent`, so it fails if no agent is running. To check, run:
```
 $ ssh-add -l
```
If it lists keys or prints "The agent has no identities", an agent is running. If it prints "Could not open a connection to your authentication agent", there is none.

**Step 3: Get a key and connect.**

=== "Agent already running"

    Most macOS and Linux desktop sessions start an agent for you when you log in, and every terminal shares it. One `bao-getkey` authentication then works for Casper and Derecho, from any terminal, until the certificate expires. You don't need the `ControlPath` options in `~/.ssh/config`.
    ```
     $ bao-getkey -u <user-name>            # -u is optional if your local username matches
     $ ssh <user-name>@derecho.hpc.ucar.edu # <user-name> is optional if your local username matches
    ```

=== "No agent running"

    Start an agent first, then get the key:
    ```
     $ eval $(ssh-agent)                    # BASH/ZSH; for TCSH use: eval `ssh-agent -c`
     $ bao-getkey -u <user-name>            # -u is optional if your local username matches
     $ ssh <user-name>@derecho.hpc.ucar.edu # <user-name> is optional if your local username matches
    ```
    Only this terminal knows about this agent. To use the key from other terminals, see [Managing local agents](#managing-local-agents).

!!! tip
    Add `-A` to `ssh`, or set `ForwardAgent yes` in `~/.ssh/config`, if you also want to `ssh` from Derecho to Casper without authenticating again.


#### Running bao-getkey from Derecho or Casper

Since `bao-getkey` is installed on the Derecho and Casper login nodes and is already in your `PATH` there, this is the recommended route for anyone who can't conveniently run the script on their own machine, Windows users in particular.

The key goes into whichever `ssh-agent` the `SSH_AUTH_SOCK` environment variable points at. If you simply log in to a login node and run `bao-getkey`, the key ends up in an agent on that login node, which does nothing to help you log in from your own machine. To get the key into the agent on your own machine, connect with agent forwarding enabled using `ssh -A`, and `ssh-add` then adds the key back through the forwarded connection.

First make sure you have an agent running that can accept the key from `bao-getkey`. On local systems with BASH or ZSH, you simply run `eval $(ssh-agent)` first. For terminals with TCSH shells, the corresponding command is ``eval `ssh-agent -c` ``. On Windows, make sure the OpenSSH agent is running first. In PowerShell, as Administrator:
```
    Get-Service ssh-agent | Set-Service -StartupType Automatic
    Start-Service ssh-agent
```
Then connect to the cluster with agent forwarding and run the script. You will need to authenticate normally for this first login:
```
    $ ssh -A <username>@derecho.hpc.ucar.edu
    $ bao-getkey
    $ exit # optional
```
Note that you don't need the `-u` option here, since the script defaults to your username on the cluster, which is the one you want. Using this method, you will need to authenticate twice: once for the `ssh` and once for `bao-getkey`. Back on your own machine, `ssh-add -L` will show the new certificate, and logins from terminals with access to the agent will not prompt for a password until it expires.

This workflow relies on your local agent accepting keys added over the forwarded connection. The OpenSSH client and agent included with Windows support this. PuTTY and Pageant may not, so PuTTY users may need to use the OpenSSH client instead.

#### Managing local agents
If your local operating system does not create an agent file for you, you may manage the agent file yourself. After the exiting back your local workstation, you can make a note of `$SSH_AUTH_SOCK` and use it in subsequent terminals for connections. For example, in the first terminal
```
 $ echo $SSH_AUTH_SOCK > ~/my_agent_dir
```
Then in subsequent terminals, where SSH_AUTH_SOCK is not set,
```
 $ export SSH_AUTH_SOCK=$(cat ~/my_agent_dir)
 $ ssh -A <user-name>@<host>
```
This will use the key from the agent and not require authentication. You can also create an alias or wrapper script to automate this.

You can examine the OpenBao certificate using this command string:
```
 $ ssh-add -L | grep -- -cert-v01 | ssh-keygen -L -f -
```
The `grep` string "-cert-v01" selects the OpenBao certificate, and the `ssh-keygen` command unpacks it into a human readable form. Of particular interest is the line that starts with "Valid:" It shows the time at which the certificate expires.

#### Enabling agent forwarding by default and other useful configuration options

Adding `ForwardAgent yes` to your local `~/.ssh/config` file will allow you to drop the `-A` argument for `ssh` on your local computer (but not on the remote systems). Without forwarding enabled, you will not be able to make an additional `ssh` connection on the remote system to other HSG-managed hosts without authenticating again. With forwarding enabled, you will be able to make one additional hop without authenticating, because the remote system can use your local agent through the connection. To make further hops between HSG-managed systems, you need to use agent forwarding (ssh -A) there as well.

Here are some recommended settings for your local `~/.ssh/config`.
```
Host casper
    HostName casper.hpc.ucar.edu

Host derecho
    HostName derecho.hpc.ucar.edu

Host casper derecho *.hpc.ucar.edu
    ForwardAgent yes
    ControlMaster auto
    ControlPath ~/.ssh/cm-%C
    ControlPersist 12h
Host *
    ServerAliveInterval 120s
    ServerAliveCountMax 5
```

If you regularly use graphical applications with X11, consider adding this
```
   ForwardX11 yes
   ForwardX11Trusted yes
```
It's simplest to add `-X` or `-Y` on the command line when you need graphics.
If you do not set it in the `config`, `ForwardX11 yes` plus `ForwardX11Trusted yes` is the same as `ssh -Y`.
