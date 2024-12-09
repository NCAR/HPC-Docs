# Getting Started with NSF NCAR HPC Resources

## Eligibility is simple

* To use Derecho, you must be a U.S.-based researcher. 
* Your research must be in the Earth system sciences or related to Earth system science.
* Most projects require an NSF award, but we do offer access to graduate students, postdocs, new faculty, and for classroom use or data analysis without NSF funding.

That’s all — really!


## Here's how to start

* Check out [what we offer](https://www.cisl.ucar.edu/computing-data) to confirm that Derecho meets your project’s needs.
* Visit the [allocations](https://arc.ucar.edu/xras_submit/opportunities) page on the [ARC Portal](https://arc.ucar.edu/).
* Make sure you are signed in, or create a new profile.
* Click [Opportunities](https://arc.ucar.edu/xras_submit/opportunities).
* Select a project type. You may refer to [project type descriptions](https://ncar-hpc-docs.readthedocs.io/en/latest/allocations/university-allocations/).
* Fill out a brief request form with information about your project.
* Our team will review your request — most requests are approved within a day or two.
* You can keep track of your request’s status through the [“My Allocations”](https://arc.ucar.edu/xras_submit/opportunities) tab.


## We're here to help

Having a problem? No worries! 

Search through our comprehensive user documentation or contact the [Help Desk](https://ithelp.ucar.edu/plugins/servlet/desk/site/rc) — our team of live 
consultants are happy to communicate with you personally to solve your problem.

Getting back on track is quick and easy!


## About this page

Once you are authorized to use NSF NCAR compute and storage resources, and you have [an account](./accounts/index.md) and the [necessary software](../environment-and-software/index.md), you can follow the procedures described below to log in.

These pages provide information on compiling your code, submitting jobs, and performing other common tasks on all NSF NCAR resources unless otherwise noted:

* Compiling Code on [Derecho](../compute-systems/derecho/compiling-code-on-derecho/index.md) or [Casper](../compute-systems/casper/compiling-code-on-casper/index.md)
* Understanding and Customizing your [User and Software Environment](../environment-and-software/index.md )
* [Starting and Managing Jobs with PBS](../pbs/index.md)
* [Managing Your Resource Allocation](../allocations/index.md)

---

!!!danger "Don’t run `sudo` on NSF NCAR systems!"
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
