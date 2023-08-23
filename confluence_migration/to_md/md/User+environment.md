# User environment

The Cheyenne HPC system uses a Linux operating system and, for
scheduling jobs, Altair PBS Professional (PBS Pro). The system supports
widely used shells on its login and compute nodes. Users also have
several compiler choices. See [<u>Compiling
code</u>](file:////display/RC/Compiling+code) for those details.

**Operating system:** SUSE Linux.

**Scheduler:** See [<u>Submitting jobs with
PBS</u>](file:////display/RC/Starting+Cheyenne+jobs) for documentation
about scheduling jobs to run on Cheyenne.

**Shells: **The default login shell for new Cheyenne users is **bash**.
To change your default to **tcsh** or other available shell, use the
Systems Accounting
Manager ([<u>SAM</u>](file:////display/RC/Systems+Accounting+Manager)).
It may take several hours for a change to take effect. You can confirm
which shell is set as your default by entering the following on your
Cheyenne command line:

echo \$SHELL

#### Page contents

- [Logging in](#Userenvironment-Loggingin)

- [Environment modules](#Userenvironment-Environmentmodules)

- [Switching shells](#Userenvironment-Switchingshells)

## Logging in

To log in to the Cheyenne system, start your terminal or [<u>Secure
Shell
client</u>](file:////display/RC/User+accounts+and+HPC+system+access) and
run an **ssh** command as shown here:

ssh -X username@cheyenne.ucar.edu

Some users (particularly on Macs) need to use **-Y** instead
of **-X** when calling SSH to enable X11 forwarding.

You can use this shorter command if your Cheyenne username is the same
as your username on your local computer:

ssh -X cheyenne.ucar.edu

After running the ssh command, you will be asked
to [<u>authenticate</u>](file:////display/RC/Authentication+and+security) to
finish logging in.

## Environment modules

CISL provides an extensive set of **environment modules** to manage the
Cheyenne system's environment variables, compilers, libraries, and other
software. You can use some modules regardless of which compiler is
loaded, while others are compiler-dependent.

See [<u>environment
modules</u>](file:////display/RC/Environment+modules+on+Cheyenne) for
information about essential commands and how to set up and save
customized environments for your work.

## Switching shells

Users who run Linux **bash**, **csh**, or **ksh** commands to switch
from one shell to another in an interactive session sometimes encounter
a "module not found" diagnostic message. To avoid this, execute the
following after switching if your session will include
explicit invocations of the module commands.

In a tcsh script:

source /etc/profile.d/modules.csh

In a bash script:

source /etc/profile.d/modules.sh
