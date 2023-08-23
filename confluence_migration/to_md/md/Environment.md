# Environment

The Derecho HPC system uses a Linux operating system and, for scheduling
jobs, Altair PBS Professional (PBS Pro). The system supports widely used
shells on its login and compute nodes. Users also have several compiler
choices. See [Compiling code on NCAR
systems](file:////display/RC/Compiling+code+on+NCAR+systems) for those
details.

**Operating system:** Cray Linux Environment / SUSE Linux.

**Scheduler:** See [Starting and managing jobs with
PBS](file:////display/RC/Starting+and+managing+jobs+with+PBS) for
documentation about scheduling jobs.

**Shells: **The default login shell for new Derecho users is **bash**.
To change your default to **tcsh** or other available shell, use the
Systems Accounting Manager ([SAM](https://arc.ucar.edu/sam)). It may
take several hours for a change to take effect. You can confirm which
shell is set as your default by entering the following on your command
line:

echo \$SHELL

#### Page contents

- [Logging in](#Environment-Loggingin)

- [Environment modules](#Environment-Environmentmodules)

## Logging in

To log in, start your terminal or Secure Shell client and run an **ssh**
command as shown here:

ssh -X username@system_name.ucar.edu

OR

ssh -X username@system_name.hpc.ucar.edu

Some users (particularly on Macs) need to use **-Y** instead
of **-X** when calling SSH to enable X11 forwarding.

You can use this shorter command if your username for the system is the
same as your username on your local computer:

ssh -X system_name.ucar.edu

OR

ssh -X system_system_name.hpc.ucar.edu

After running the ssh command, you will be asked to authenticate to
finish logging in.

## Environment modules

CISL provides an extensive set of **environment modules** to manage the
Derecho system's environment variables, compilers, libraries, and other
software. You can use some modules regardless of which compiler is
loaded, while others are compiler-dependent.

See [Environment modules](file:////display/RC/Environment+modules) for
information about essential commands and how to set up and save
customized environments for your work.
