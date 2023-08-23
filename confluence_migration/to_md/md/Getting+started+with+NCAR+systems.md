# Getting started with NCAR systems

Once you are authorized to use NCAR compute and storage resources, and
you have [an account and the necessary
software](file:////display/RC/User+accounts+and+HPC+system+access), you
can follow the procedures described below to log in.

These pages provide information on compiling your code, submitting jobs,
and performing other common tasks *on all NCAR resources* unless
otherwise noted:

- [Compiling code](file:////display/RC/Compiling+code+on+NCAR+systems)

- [Starting and managing jobs with
  PBS](file:////display/RC/Starting+and+managing+jobs+with+PBS)

- [Managing your
  allocation](file:////display/RC/Managing+your+allocation)

Additional [Derecho-specific
documentation](file:////display/RC/Derecho+supercomputer) is in
development.

Also see: [**<u>New user
orientation</u>**](file:////display/RC/New+user+orientation)

#### Don’t run sudo on NCAR systems

If you need help with tasks that you think require **sudo** privileges,
or if you aren’t sure, please contact [HPC User
Support](file:////display/RC/User+support) before trying to run sudo
yourself. The command fails when unauthorized users run it and sends a
security alert to system administrators.

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
