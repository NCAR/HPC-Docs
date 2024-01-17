# Getting started with NCAR HPC Resources

!!! info "About this page"
	This document will guide you through the basics of using NCAR's
	supercomputers, storage systems, and services.


Once you are authorized to use NCAR compute and storage resources, and you have [an account](./accounts/index.md) and the [necessary software](../environment-and-software/index.md), you can follow the procedures described below to log in.


These pages provide information on compiling your code, submitting jobs, and performing other common tasks on all NCAR resources unless otherwise noted:


* Compiling Code on [Derecho](../compute-systems/derecho/compiling-code-on-derecho/index.md) or [Casper](../compute-systems/casper/compiling-code-on-casper/index.md)
* Understanding and Customizing your [User and Software Environment](../environment-and-software/index.md )
* [Starting and Managing Jobs with PBS](../pbs/index.md)
* [Managing Your Resource Allocation](../allocations/index.md)

---

!!!danger "Don’t run `sudo` on NCAR systems!"
    If you need help with tasks that you think require `sudo` privileges, or if you aren’t sure, please contact HPC User Support before trying to run `sudo` yourself. The command fails when unauthorized users run it and sends a security alert to system administrators.


## Logging In

To log in, start your terminal or Secure Shell client and run an `ssh` command as shown here:


=== "Derecho"
    ``` shell
	ssh -X username@derecho.hpc.ucar.edu
	```
=== "Casper"
	``` shell
	ssh -X username@casper.hpc.ucar.edu
	```
=== "Cheyenne"
	``` shell
	ssh -X username@cheyenne.ucar.edu
	```

After running the `ssh` command, you will be asked to authenticate to finish logging in.


The `-X` is optional and requests simple `X11` graphics forwarding to your client.  You can omit `username` in the command above if your Casper username is the same as your  username on your local computer.


!!! tip
    Some users (particularly on Macs) need to use -Y instead of -X when calling ssh to enable X11 forwarding.

---

## New User Resources
* [New User Orientation](../tutorials/new-user-training.md)
* [New User Training for HPC Systems](https://www.youtube.com/watch?v=CK5Hcl2eEj4)
* [Getting Started on Derecho](../compute-systems/derecho/index.md)
* [Getting Started on Casper](../compute-systems/casper/index.md)
