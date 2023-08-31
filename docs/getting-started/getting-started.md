# Getting started with NCAR HPC Resources

!!! info "About this page"
	This document will guide you through the basics of using NCAR's
	supercomputers, storage systems, and services.


Once you are authorized to use NCAR compute and storage resources, and you have [an account and the necessary software](https://arc.ucar.edu/knowledge_base/74317885), you can follow the procedures described below to log in.


These pages provide information on compiling your code, submitting jobs, and performing other common tasks on all NCAR resources unless otherwise noted:

* [Compiling Code](compiling.md)
* [Starting and Managing Jobs with PBS](environment-modules.md)
* [Managing Your Allocation](managing-jobs.md)

---

## New User's Resources
* [New User Orientation](https://arc.ucar.edu/knowledge_base/68878414)
* [:fontawesome-brands-youtube: New User Training for HPC Systems](https://www.youtube.com/watch?v=CK5Hcl2eEj4)

---

!!!warning "Don’t run `sudo` on NCAR systems!"
	If you need help with tasks that you think require `sudo` privileges, or if you aren’t sure, please contact HPC User Support before trying to run sudo yourself. The command fails when unauthorized users run it and sends a security alert to system administrators.


## Logging In 

To log in, start your terminal or Secure Shell client and run an `ssh` command as shown here:


=== "Derecho"
    ``` shell
=== "Casper"
	``` shell
	ssh -X username@casper.ucar.edu 
	```
=== "Cheyenne"
	``` shell
	ssh -X username@cheyenne.ucar.edu
	```

!!! tip 
		Some users (particularly on Macs) need to use `-Y` instead of `-X` when calling `SSH` to enable `X11` forwarding.

		=== "Derecho"
			``` shell
			ssh -Y username@derecho.hpc.ucar.edu
			```
		=== "Casper"
			``` shell
			ssh -Y username@casper.ucar.edu 
			```
		=== "Cheyenne"
			``` shell
			ssh -Y username@cheyenne.ucar.edu
			```

You can use this shorter command if your username for the system is the same as your username on your local computer:

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

After running the `ssh` command, you will be asked to authenticate to finish logging in.


---
This page is just a copy of https://arc.ucar.edu/knowledge_base/87655186 in mkdown for demonstrations with slight modifications.

