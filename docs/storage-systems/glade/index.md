# GLADE file spaces

## Overview

The **Globally Accessible Data Environment** – a centralized file
service known as `GLADE` – uses high-performance Spectrum Scale and
Lustre shared file system technology to give users a common view of
their data across the HPC, analysis, and visualization resources that
CISL manages.

Data can remain in each of these spaces in accordance with the
policies summarized in the following table and detailed below. The
policies are subject to change; all changes will be announced in
advance. *Note that "Not purged" does not mean that your files can or
will reside in these spaces indefinitely,* only that retention depends
on your particular situation. Refer to the detailed retention
practices and policies for each file space.

As disk space is a limited resource shared by the entire user
community, long-term storage of infrequently accessed data should be
avoided. These spaces should be used as efficiently as possible so
that other projects can take advantage of the resource. The [Quasar
tape storage system](../quasar/index.md) is more appropriate for
long-term storage of infrequently accessed data.

<table>
  <colgroup>
    <col style="width: 33%" />
    <col style="width: 15%" />
    <col style="width: 9%" />
    <col style="width: 8%" />
    <col style="width: 35%" />
  </colgroup>
  <thead>
    <tr class="header">
      <th><strong>File space</strong></th>
      <th><p><strong>User quota</strong></p>
        <p><strong>(Size/Count)</strong></p></th>
      <th><strong>Backup</strong></th>
      <th><strong>Purge<br />
          policy</strong></th>
      <th><strong>Descriptions/notices</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr class="odd">
      <td><strong>Home:</strong><br />
        /glade/u/home/&ltusername&gt</td>
      <td>50 GB</td>
      <td>Yes</td>
      <td>Not purged</td>
      <td>User home directory.<br/> Ideal for small scripts, source code, and configuration files that benefit from backup.</td>
    </tr>
    <tr class="even">
      <td><strong>Scratch:<br />
        </strong>/glade/derecho/scratch/&ltusername&gt</td>
      <td>30TB / 10M</td>
      <td><font color="#ff0000">No</font></td>
      <td><font color="#ff0000"><strong>PURGED</strong></font><br>180 days</td>
      <td>Temporary space.<br/>
        Derecho's scratch file system also includes a limit of 10 Million on a users'
        total number of files</td>
    </tr>
    <tr class="odd">
      <td><strong>Work:</strong><br />
        /glade/work/&ltusername&gt</td>
      <td>2 TB</td>
      <td><font color="#ff0000">No</font></td>
      <td>Not purged</td>
      <td>User work space.<br /> Ideal for compiled code, conda environments, and similar large holdings that do not require backup.</td>
    </tr>
    <tr class="even">
      <td><strong>Campaign Storage:</strong><br />
        /glade/campaign</td>
      <td>N/A</td>
      <td><font color="#ff0000">No</font></td>
      <td>Not purged</td>
      <td>Project space allocations (via allocation request)</td>
    </tr>
    <tr class="odd">
      <td colspan="5">
        <a href="https://arc.ucar.edu/system_status"><strong>GLADE system status report</strong></a>
      </td>
    </tr>
  </tbody>
</table>

---

!!! tip "Best Practices"

    **Check your space usage regularly with `gladequota`.**

    Check your space usage regularly with ***gladequota*** [as described below](#gladequota-command), and [remove data](./removing-large-number-of-files.md) that you no longer need.

    **Conserve space with large files.**

    You can conserve GLADE space by storing large files, such as tar
    files, rather than numerous small, individual files. This is
    because the system allocates a minimum amount of space for each
    file (currently configured to 16KB), no matter how small the file
    is. Thus 16KB is the smallest amount of space the system can
    allocate to a file, including empty files, directories and
    symlinks.

## Status
=== "File Volume"
    <p align="left">
        <iframe width="680" height="340" frameborder="0" src="https://status.cisl.ucar.edu/uss/glade_status/glade_status_BSK.html"></iframe>
    </p>

=== "File Count"
    <p align="left">
        <iframe width="680" height="340" frameborder="0" src="https://status.cisl.ucar.edu/uss/glade_status/glade_status_counts_BSK.html"></iframe>
    </p>

## Home space

Each user has a `/glade/u/home/<username>` space with a quota of 50
GB\* for managing scripts, source code, and small data sets. It is
backed up weekly, with backups retained for several months. CISL also
creates [snapshots](./recovering-files-from-snapshots.md) of the space
to enable users to recover deleted files quickly and easily.

\* *As discussed [below](./index.md#gladequota-command), the system
stores dual copies of users' data for increased data integrity and
safety. For this reason some space reporting tools will show 100 GB
due to this replication.*

### Backup policy

- Your `/glade/u/home` directory is backed up several times a week
  while your account is open. Each backup is kept for several
  weeks. The frequency and scheduling of backups and the length of
  time they are kept may change with no prior notice.
- If you are unable to find files that you would like to restore in
  the snapshots of your home directory, contact the [NSF NCAR Research Computing help desk](https://rchelp.ucar.edu/)
  to request restoration of the files if they are in a backup.
- Core dump files are not backed up. Core dump file names typically
  follow this format: `core.xxxxx` (where the extension can include
  from one to five digits).
- CISL does not purge or scrub your home directory, and deletes files
  only as stated in the following data retention policy.

### Data retention policy

- User accounts are closed 90 days after your last active project
  expires or 90 days after your account is removed from all active
  projects.
- **When your account is closed, files will remain in your home
  directory for 30 days, after which CISL backs up the final contents
  and removes them from the file system.** This backup is retained for
  six months after account closure.
- Note that your project and group memberships are also terminated
  when your account is closed, which can limit other users' ability to
  access your files based on shared group permissions.
- As long as your account remains active, files are retained in your
  home directory.
- Again, core dump files are not backed up.

## Work space

Your `/glade/work/<username>` space is best suited for actively
working with datasets over time periods greater than what is permitted
in the scratch space. The default quota for these spaces is 2 TB.
This space is not purged or scrubbed. CISL deletes files only as
stated in the following data retention policy.

### Data retention policy

- User accounts are closed 90 days after your last active project
  expires or 90 days after your account is removed from all active
  projects.
- **When your user account is closed, files in your work space are
  retained for an additional 30 days before being deleted**.
- Files are not recoverable from backups, as there are none.
- As long as your account remains open, your work directory files are
  retained.

## Scratch file space

Each user has a `/glade/derecho/scratch/<username>` space by default,
with an individual quota of 30 TB. The scratch file space is intended
to support output from large-scale capability runs as well as
computing and analysis workflows across CISL-managed resources. It is
a *temporary* space for data to be analyzed and removed (or
automatically purged).

If you will need to occupy more than your quota of scratch space at
some point, contact the [NSF NCAR Research Computing help desk](https://rchelp.ucar.edu/)
to request a temporary increase. Include a paragraph justifying your
need for additional space when making your request.

### Purge policy

Individual files are removed from the scratch space automatically if
they have not been accessed (for example: modified, read, or copied)
in more than **180 days**. A file's *access time* - (`atime`) is updated
at most once per day for purposes of I/O efficiency. To check a file's
`atime`, run `ls -ul filename`.

!!! warning
    Users may not run `touch` or similar commands for the purpose of
    altering their files' timestamps to circumvent this purge policy.

    CISL staff will reduce the scratch quotas of users who violate
    this policy; running jobs may be killed as a result.

CISL routinely monitors scratch space usage to ensure that it remains
below the 90% mark and to determine if a reduction in the retention
period is necessary. We will announce in advance any changes to the
retention period.

To help us avoid the need to shorten the retention period, please use
this space conscientiously. Delete files that you no longer need as
soon as you're done with them rather than leave large amounts of data
sitting untouched for the full 180 days. If you need to retain data on
disk for more than 180 days, consider using your `/glade/work` space
or [Campaign Storage](#campaign-storage-space) space.

### Data retention policy

- Whether your account is open or closed, **files are purged from your
  scratch space automatically when they have not been accessed in 180 days.**
- Files are not recoverable from backups, as there are none.

## Campaign Storage space

Dedicated spaces on the `/glade/campaign` file system are available to
project teams through our [allocations process](../../allocations/index.md)
to support longer-term disk needs that are not easily accommodated by
the scratch or work spaces. The allocations are based on project needs
and resource availability. Requests are reviewed according to the
various allocation schedules.

If you have a user account associated with an allocated project but
lack the directory permissions you need for that project’s Campaign
Storage space, contact the [NSF NCAR Research Computing help desk](https://rchelp.ucar.edu/)
to request changes. Identify the directories and the permissions you
are requesting.

See [here](./campaign.md) for additional technical details on the
Campaign Storage file system.

### Campaign Storage allocations

The duration and use of a project’s Campaign Storage space is
controlled by NSF NCAR allocation policies. Specifically, the
following policies apply to Campaign Storage allocations:

- Campaign Storage is **not** intended to provide long-term or
  permanent preservation of a project’s data. For university users,
  long-term preservation of project data remains the responsibility of
  your home institution or the lead institution on the funded NSF
  award. Allocation requests should describe the PI’s plan for dealing
  with Campaign Storage data after the NSF award expires.
- Campaign Storage quotas will **not** be expanded to allow data from
  an earlier, expired project to be retained under a new NSF
  award. That is, researchers may not use a new NSF award to preserve
  data from an earlier award. Campaign Storage space requests must be
  justified in terms of the work associated with the active NSF award.
- Campaign Storage allocations (as with computing allocations) can
  remain active for the duration of the project’s funded NSF award,
  including any no-cost extensions.
- With suitable justification, CISL **may** be able to extend a
  Campaign Storage allocation for an additional 12 months beyond the
  end of the NSF award. Suitable justification may include papers or
  other works proceeding through the publication review process. *CISL
  reserves the right to decline these extra extensions or reduce
  Campaign Storage quotas after the end of the NSF award in order to
  ensure that disk space remains available to the community of
  researchers with active NSF awards.*
- Once a project has exhausted all policy options and ultimately
  expires, files are removed and the Campaign Storage space is
  reclaimed according to the following data retention policy.

### Data retention policy

- **90 days after project expiration**, project directories are
  emptied and scheduled for deletion.
- Individual users' files are **not** deleted from project space after
  their accounts are closed when the project remains active.
- Files are not recoverable from backups, as there are none.

### Managing Campaign Storage usage

Project-level Campaign Storage usage and data access reports are available as described in detail [here](campaign.md#usage-reporting).  These reports can help you understand how frequently your data is being accessed, quickly identify your largest directories, locate old data that has not been accessed recently, etc...

## Checking space usage

Knowing your quotas and usage is important.

**All files that you own** in the home, work, or scratch spaces are
counted against your quota for that space, regardless of the directory
in which they are stored. That is, if you write files to another
user's home or scratch space, for example, they still count against
*your* own quota for that space.

If you reach your disk quota for a GLADE file space (see `gladequota`
below), you may encounter problems until you remove files to make more
space available. For example, you may not be able to log in, the
system may appear hung, you may not be able to access some of your
directories or files, your batch jobs may fail, and commands may not
work as expected.

If you cannot log in or execute commands, contact the
[NSF NCAR Research Computing help desk](https://rchelp.ucar.edu/).
You can check your space usage as shown below.

### `gladequota` command
This command will generate a report showing your quota and usage
information:
```pre
$ gladequota

Current GLADE space usage: csgteam

  Space                                       Used        Quota      % Full    # Files
----------------------------------------- ------------ ------------ --------- -----------
/glade/derecho/scratch/csgteam              111.03 TiB   400.00 TiB   27.76 %    10226778
/glade/work/csgteam                           1.40 TiB     4.00 TiB   35.02 %     9153458
/glade/u/home/csgteam                        68.27 GiB   100.00 GiB   68.27 %      237251
----------------------------------------- ------------ ------------ --------- -----------
/glade/collections/cmip                       1.26 PiB     2.93 PiB   42.95 %     3326866
/glade/p/cisl/CSG                             1.69 TiB     5.00 TiB   33.79 %     8168998
/glade/u/apps                                 2.02 TiB    10.00 TiB   20.19 %    20038473
----------------------------------------- ------------ ------------ --------- -----------
Campaign: csgteam (user total)                1.41 TiB          n/a       n/a     9891104
/glade/campaign/cisl/csg                      7.94 TiB    23.00 TiB   34.54 %        2859
/glade/campaign/cisl/sssg0001               217.15 TiB   250.00 TiB   86.86 %    50606617
```

!!! note "`gladequota` and home directories"
    Output from the `gladequota` command will show the home space quota
    as 100 GB instead of 50 GB. This is because the system stores dual
    copies of users' data for increased data integrity and safety. In some
    circumstances, queries of storage utilization
    from `du` and `ls` will also report a duplicated data footprint in
    your home directory for the same reason.

---

## General data retention policies and procedures

### User data

User accounts are closed when they are no longer associated with an
active project. When your account is closed, several steps in the
process affect the accessibility of your data:

- 30 days after your account is closed, a final home directory backup
  is performed and the **home directory** is deleted. The home backup
  is retained for six months, after which it is deleted.
- 30 days after your account is closed, your **work space** is
  deleted. No backup is performed.
- Finally, your **scratch** files are deleted as they reach the end of
  current retention period.

**CISL has no ability to restore user data after the purge or removal
policies stated above have taken effect.**

### Campaign Storage (Project) data

The duration of a project’s Campaign Storage space is controlled by
NSF NCAR allocation policies. Specifically, the following policies
apply to Campaign Storage allocations:

- Campaign Storage is **not** intended to provide long-term or
  permanent preservation of a project’s data. For university users,
  long-term preservation of project data remains the responsibility of
  your home institution or the lead institution on the funded NSF
  award. Allocation requests should describe the PI’s plan for dealing
  with Campaign Storage data after the NSF award expires.
- Campaign Storage quotas will **not** be expanded to allow data from
  an earlier, expired project to be retained under a new NSF
  award. That is, researchers may not use a new NSF award to preserve
  data from an earlier award. Campaign Storage space requests must be
  justified in terms of the needs of the work associated with the
  active NSF award.
- Campaign Storage allocations (as with computing allocations) can
  remain active for the duration of the project’s funded NSF award,
  including any no-cost extensions.
- With suitable justification, CISL may be able to extend a Campaign
  Storage allocation for an additional 12 months beyond the end of the
  NSF award. Suitable justification may include papers or other works
  proceeding through the publication review process. *CISL reserves
  the right to decline these extra extensions or reduce Campaign
  Storage quotas after the end of the NSF award in order to ensure
  that disk space remains available to the community of researchers
  with active NSF awards.*
- Once a project has exhausted all policy options and ultimately
  expires, files are removed and the Campaign Storage space is
  reclaimed according to the following data retention policy.

When an allocated project approaches and reaches its expiration date,
the following process is used to delete that project’s associated
Campaign Storage data:

- **30 days before project expiration**, the project lead and admin
  will receive an email reminding them of the project’s pending
  expiration. The project team should assess remaining files and
  disposition appropriately in preparation for the end of the project.
- **90 days after project expiration**, project directories are
  emptied and scheduled for deletion.  At this point, any users with
  accounts remaining on the system will no longer have access to the
  projects' data. It is therefore *imperative* that any remaining
  project data be relocated during this 90 day post-expiry access window.
- Finally, files are removed as scheduled on the timeline described
  above for the relevant file system.


## Restoring data access
### Expired project data

**There is no expectation of file access after the 90 day post-expiry access window.**

### Collaborators' data

A typical request for data access comes not from the departing user,
but from remaining collaborators. Colleagues occasionally request
access to a departed user’s files, sometimes many months after the
account is terminated, when they realize the original owner set
permissions that limit their access.

While CISL has a limited ability to help in these situations, there
are also legal limits to what we can do. For example, CISL cannot
share files beyond the clear intent of the original owner as inferred
from the UNIX file permissions.

#### Project files
Files in a project’s Campaign Storage space are deemed owned by the
**project**, and we can help update permissions as needed to make them
visible to the group. Such modifications require the approval of
the project lead or project admin.

#### Users' files
Files in the home, work, or scratch spaces are owned by the
**user**. If a collaborator would like access to a file that was
previously group- or world-readable, we may be able to help. If the
original file was restricted to user-only read, however, we cannot
override those intentions without explicit permission from the
original owner. The only exceptions to this policy are in compliance
with broader UCAR IT records or investigation policies as described in
UCAR's 1-7 Information Security Policy.
