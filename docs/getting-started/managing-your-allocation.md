# Managing your allocation

Actively managing and monitoring your allocation of computing and
storage resources will help ensure that you use these resources as
efficiently as possible. Allocations are made to the project lead, who
is designated in the allocation request. The project lead often is the
principal investigator (PI) for the associated funding awards.

The sections below describe how to perform basic administrative tasks
and use the Systems Accounting Manager
([SAM](https://sam.ucar.edu/app/home)) to monitor charges against your
allocation. All authorized users on a project can manage their own
preferences and review their own usage reports in SAM.

To get the most from your allocation, be sure to fully utilize the
compute resources you request and use available memory efficiently. Also
be aware that even failed jobs use some of your allocation, so be
proactive in identifying reasons for failures.

**Info**
***The NCAR Research Computing Help Desk can help you with these and other 
tasks related to managing your project. Visit [https://rchelp.ucar.edu](https://rchelp.ucar.edu) 
or call 303-497-2400.***

## Project admins

The project lead may authorize a project administrator (project admin)
to perform some tasks on behalf of the project, such as adding or
removing users. You can designate a project admin when you initially 
make your project request. To add a project admin after your project 
has been created, submit a request through the Help Desk.

## Adding and removing user accounts

Users who are authorized to share access to a project's allocation
may be identified when the allocation is requested. PIs, project leads, and
project admins can also add other users to their projects any time after
receiving an allocation award.

User accounts must not be shared, so the project lead or project admin should 
establish a user account for each collaborating individual and make them aware 
of relevant [responsibilities](https://ncar-hpc-docs.readthedocs.io/en/latest/getting-started/user-responsibilities/) and [best practices](https://ncar-hpc-docs.readthedocs.io/en/latest/getting-started/best-practices-for-supercomputer-users/).

To add new user accounts for a project, send a request through the Help
Desk. Include the user's name, email address, and phone number.

A PI, project lead, or project admin should deauthorize or remove a user
from a project by contacting the help desk. You should request removal of 
a user’s account when that individual is no longer associated with your project. 
Doing so makes sure your allocation isn’t consumed unexpectedly and helps keep 
NCAR systems secure.

## Specifying project to be charged

You will have an alphanumeric **project code** for each of your projects. 
A user account must be associated with at least one allocated project 
and may be associated with more than one. These project codes
are used to charge your use of computing and storage resources against
the appropriate allocations. *Take care to specify the correct project
code when you submit jobs.*

Even if you have only one project code, you ***must*** specify the
project code to be charged when you submit a job. How to do this is
described in the documentation for each HPC system.

## Charges for computing

Both Derecho and Casper have partitions with CPU-only nodes and with 
GPU-oriented nodes. The CPU-only nodes are included in allocations 
for "Derecho" and "Casper," while the GPU nodes are allocated as 
"Derecho GPU" and "Casper GPU." For Derecho and Casper allocations, 
charges are assessed in ***core-hours***, and for Derecho GPU and Casper 
GPU allocations, charges are assessed in ***GPU-hours***. 

Job charges are calculated as the number of cores or GPUs requested, 
respectively, multiplied by the duration of the job in hours. Derecho 
and Derecho GPU jobs are further multiplied by the job priority. 
(Jobs that use both types of nodes — so-called “hybrid jobs” — 
will have both a core-hours charge and a GPU-hours charge.)

| **Priority level** | **Charging factor** |
|--------------------|---------------------|
| Economy            | 0.7x                |
| Regular            | 1.0x                |
| Premium            | 1.5x                |


!!! warning "Consider the impact of your choice of queue before you submit a job on these systems."

    - In the "main" submission queue on Derecho, *you will be charged for 
      all CPUs or GPUs on those nodes regardless of how many cores or GPUs 
      you request*. Those nodes are for your job's exclusive use. For example, 
      if your PBS job script requests two nodes with `*ncpus* = 18` on each node, 
      you will still be charged for all 256 cores (128 cores per node) when running 
      in the "main" queue. Conversely, when using the "develop" queue on Derecho 
      or the "casper" queue on Casper, you will be charged only for the CPUs or 
      GPUs that you requested. Jobs submitted to those queues will share the nodes with other jobs.
      
If you are concerned about your usage rate, contact the Help Desk 
for guidance on running jobs more efficiently and conserving your 
allocation. Sometimes jobs can be configured to make better use of the compute 
resources, and you may be able to save allocation by using a less expensive 
priority level. Seek help if you notice anything amiss with your allocation.

!!! note
    When using GPU nodes, you are not charged for the CPU wallclock time 
    used on those nodes. However, it *is* possible for a job to incur 
    both CPU and GPU costs if you use a heterogeneous mix of node types, 
    with each node being charged according to the dominant resource type 
    (GPUs take precedence).

### Using SAM

Individuals can set some of their system preferences and track 
their HPC system usage in the Systems Accounting Manager. 
SAM reports show usage data and charges against
your allocations. Charges for computing are calculated and 
updated daily; storage use reports are updated weekly.

![sam](managing-your-allocation/media/sam.png)

### User preferences

Log in at [sam.ucar.edu](https://sam.ucar.edu/app/home) and
select *User*, then *Preferences*.

From there, you can:

- Change your **primary group** if you belong to more than one UNIX
  group for using NCAR computing resources.

- Specify your **default login shell** for the systems to which you have
  access.

- See what your **home directory** is on each system.

### Usage reports

Log in to [sam.ucar.edu](https://sam.ucar.edu/app/home) and you will see
the following choices on the **Reports** menu:

- My Account Statements

- My 30/90 Day Use

- Project Search

If you are authorized to charge usage to multiple projects, you will see
them listed when you select either of the first two report types. Select
one of the projects listed to get information.

Use **Project Search** to:

- go directly to a report on a specified project, or

- search by username to see all projects with which you are associated.

#### My Account Statements

Your **account statement** includes an overall report on the status of
your project’s computing and storage allocation and the usage associated
with it. If you are authorized to charge usage to more than one project,
you will have an account statement for each project.

![overall-usage-sam](managing-your-allocation/media/image1.png)

The overall usage report on project activity shows your allocations’
start and end dates, amounts allocated, and remaining balances.

The **Activity** link at the end of each line reveals more details: the
project’s allocation history, a monthly summary of job charges, and
other activity, such as refunds. You can select a month and then view or
download the individual job records.

Another table includes additional information regarding your project’s
status in relation to any 30- and 90-day usage thresholds that apply and
to any related projects. This is most common for NCAR users on
lab projects. Your own statement may show lines for multiple
projects or subprojects, as is often the case for NCAR lab 
allocations.

#### My 30/90 Day Use

This selection lets you focus on your usage in relation to any 30- and
90-day usage thresholds that apply. Again, this is most common for NCAR
lab projects.

#### Project Search

You can also search for a specific project code and get an account statement
as described above. If you search by your username, you will see a list of 
any projects you are associated with and you can select any of them to get 
an account statement.

![project-search](managing-your-allocation/media/image2.png)
