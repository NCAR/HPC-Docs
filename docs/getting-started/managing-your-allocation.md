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
be aware that event failed jobs use some of your allocation, so be
proactive in identifying reasons for failures (and contact the
[NCAR Research Computing help desk](https://rchelp.ucar.edu/) if you need
assistance).

## Guidelines and allocation management

The project lead may authorize a project administrator (project admin)
to perform some tasks on behalf of the project, such as adding or
removing users. To designate a project admin, submit a request through
the [NCAR Research Computing help desk](https://rchelp.ucar.edu/).

Here are some guidelines for managing user access to an allocation:

- Establish user accounts only for appropriate personnel and make users
  aware of
  relevant [responsibilities](./user-responsibilities.md) and
  [best practices](./best-practices-for-supercomputer-users.md).

- Request removal of users' accounts when those individuals are no
  longer associated with your project.

### Adding and removing user accounts

Some users who are authorized to share access to a project's allocation
are identified when the allocation is requested. PIs, project leads, and
project admins can also add other users to their projects any time after
receiving an allocation award.

To add new user accounts for a project, send a request through the help
desk link above or call 303-497-2400. Include the user's name, email
address, phone number, and a full shipping address for delivery of the
new user's authentication token if a physical token is required. You do
not need to include a shipping address if the user already has a
CISL token.

A PI, project lead, or project admin can deauthorize or remove a user
from a project by contacting the help desk.

### Specifying project to be charged

A user account must be associated with at least one allocated project
and may be associated with more than one. You will have an
alphanumeric **project code** for each such project. These project codes
are used to charge your use of computing and storage resources against
the appropriate allocations. Take care to specify the correct project
code when you submit jobs.

Even if you have only one project code, you ***must*** specify the
project code to be charged when you submit a job. How to do this is
described in the documentation for each HPC system.

### Charges for computing

Projects must have allocations of both *CPU core-hours* and *GPU
hours* in order to use both types of nodes. Depending on which computing
resources are being used, charges are assessed in ***adjusted core-hours
or GPU hours*** or both in the case of hybrid jobs. These metrics are
defined as the number of processors requested multiplied by the duration
of the job in hours and, for Derecho and Cheyenne jobs, modified by *job
priority*.

| **Priority level** | **Charging factor** |
|--------------------|---------------------|
| Economy            | 0.7x                |
| Regular            | 1.0x                |
| Premium            | 1.5x                |

If you are concerned about your usage rate, contact the [NCAR Research
Computing help desk](https://rchelp.ucar.edu/) for guidance on running
jobs more efficiently and conserving your allocation. Sometimes jobs can
be configured to make better use of the compute resources, and you may
be able to save allocation by using a less-expensive priority level.
Seek help if you notice anything amiss with your allocation.

#### Charging formula

All jobs on Derecho and Casper are charged according to the following
formula:

> **wall-clock hours × requested resource (ncpus or ngpus) × queue
> factor**

!!! warning "Consider the impact of your choice of nodes before you submit a job on these systems."
    - When using *exclusive* nodes in the "main" submission queue on
      Derecho, *you will be charged for all CPUs or GPUs on those nodes
      regardless of how many you request*. For example, if you request two
      nodes with `ncpus = 18` on each node, you will still be charged for
      256 CPUs when running in main because those nodes are for your
      exclusive use when your job is running.

    - Conversely, when using *shared* nodes in the "develop" queue on
      Derecho or the "casper" queue on Casper, you will be charged only for
      the CPUs or GPUs that you requested.

!!! note
    When using GPU nodes, you are not charged for the CPU wall-time used
    on those nodes. However, it *is* possible for a job to incur both CPU
    and GPU costs if you use a heterogeneous mix of node types, with each
    node being charged according to the dominant resource type (GPUs take
    precedence).

### Tracking usage

Individuals can track their HPC system usage in the Systems Accounting
Manager (see below). SAM reports show usage data and charges against
your allocations. Charges for computing are calculated and updated
daily; storage use reports are updated weekly.

## Using the Systems Accounting Manager
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

### SAM reports

Log in to [sam.ucar.edu](https://sam.ucar.edu/app/home) and you will see
the following choices on the **Reports** menu:

- My Account Statements

- My 30/90 Day Use

- Project Search

If you are authorized to charge usage to multiple projects, you will see
them listed when you select either of the first two report types. Select
one of the projects listed to get information.

NCAR divisional users often have access to numerous projects, while
individual university users most often have just one or a few.

In either case, use **Project Search** to:

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
divisional projects. Your own statement may show lines for multiple
projects or subprojects, as is often the case for NCAR divisional
allocations.

#### My 30/90 Day Use

This selection lets you focus on your usage in relation to any 30- and
90-day usage thresholds that apply. Again, this is most common for NCAR
divisional projects.

#### Project Search

You can search by individual project code and get an account statement
as described above.

If you search by your username, you will see a list of any projects you
are associated with and you can select any of them to get an account
statement.

![project-search](managing-your-allocation/media/image2.png)
