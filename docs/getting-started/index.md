# Getting started with NCAR HPC Resources

!!! info "About this page"
	This document will guide you through the basics of using NCAR's
	supercomputers, storage systems, and services.


Once you are authorized to use NCAR compute and storage resources, and you have [an account and the necessary software](https://arc.ucar.edu/knowledge_base/74317885), you can follow the procedures described below to log in.


These pages provide information on compiling your code, submitting jobs, and performing other common tasks on all NCAR resources unless otherwise noted:

* [Compiling Code](compiling.md)
* [Starting and Managing Jobs with PBS](environment-modules.md)
* [Managing Your Allocation](getting-started/managing-your-allocation.md)

---

## New User Resources
* [New User Orientation](https://arc.ucar.edu/knowledge_base/68878414)
* [New User Training for HPC Systems :fontawesome-brands-youtube:](https://www.youtube.com/watch?v=CK5Hcl2eEj4)

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
	ssh -X username@casper.ucar.edu
	```
=== "Cheyenne"
	``` shell
	ssh -X username@cheyenne.ucar.edu
	```

After running the `ssh` command, you will be asked to authenticate to finish logging in.

The `-X` is optional and requests simple `X11` graphics forwarding to your client.

!!! tip
    Some users (particularly on Macs) need to use -Y instead of -X when calling ssh to enable X11 forwarding.

!!! info
    You can use this shorter command if your `username` for the NCAR systems is the same as your `username` on your local computer:

    === "Derecho"
        ``` shell
    	ssh -X derecho.hpc.ucar.edu
    	```
    === "Casper"
    	``` shell
    	ssh -X casper.ucar.edu
    	```
    === "Cheyenne"
    	``` shell
    	ssh -X cheyenne.ucar.edu
    	```
