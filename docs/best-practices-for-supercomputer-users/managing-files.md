# Managing Files

## Set permissions when you create files

Set [permissions](../storage-systems/glade/setting-file-directory-permissions.md) when
you create a file. While you can change file ownership and permissions
after the fact, establishing them when you create the file will simplify
your life and save you time and effort later.

## Configure jobs to avoid massive directories

Ensemble runs, data assimilation runs, and other jobs generate tens or
hundreds of thousands of output files, log files, and others over time.
Such large numbers of files can be difficult to manage and remove from
GLADE file spaces when they are no longer needed. Configuring jobs to
place no more than 2,000 to 3,000 files in a single directory will make
them easier to manage.

See [Removing large numbers of files](../storage-systems/glade/removing-large-number-of-files.md) for how
to remove massive accumulations of files.

## Use scratch space for temporary files

The [GLADE scratch](../storage-systems/glade/index.md) file
space is a **temporary** space for data that will be analyzed and
removed within a short amount of time. It is also the recommended space
for **temporary files** that would otherwise reside in small /tmp or
/var/tmp directories that many users share.
See [Storing temporary files with TMPDIR](../pbs/storing-temporary-files.md) for
more information.

## Use the most appropriate storage system

Review and understand the intended uses of the [GLADE file spaces](../storage-systems/glade/index.md)
and the [NSF NCAR Campaign Storage](../storage-systems/glade/campaign.md) file
system. For example, use your `/glade/work` space to work with data
sets over time periods greater than what is permitted in the scratch
space. Individual NSF NCAR labs and project leads for universities that have
Campaign Storage allocations establish their own workflows and storage
policies.

## Store large files

Storing large files, such as tar files, is more efficient than storing
numerous small files. In the case of GLADE disk storage, this is because
the system allocates a minimum amount of space for each file, no matter
how small. That amount varies depending on which of several file spaces
holds the file. See [this GLADE documentation](../storage-systems/glade/index.md) for details.

## Avoid sharing home spaces

If you have an account for using the supercomputers, analysis, and
visualization systems that CISL manages, you have your own `/glade/u/home`
directory. Other users have their own home directories, too, so there is
no need to share by giving others write permission. Sharing often leads
to unnecessary confusion over file ownership as your work progresses.

If you and your colleagues need to write files to a common space,
consider using a work space or project space.

## Organize for efficiency

Organize your files and keep them that way. Arrange them in same-purpose
trees, for example. Say you have 20 TB of Mount Pinatubo volcanic
aerosols data. Keep the files in a subdirectory such as
`/glade/u/home/$USER/pinatubo` rather than scattered among unrelated
files or in multiple directories. Specialized trees are easier to share
with other users and to transfer to other users or projects as
necessary.

## Back up critical files

With the exception of users' `/glade/u/home` spaces, the GLADE and NSF NCAR
Campaign Storage file systems are not backed up. You are responsible for
replicating any data that you feel should be stored at an additional
location.

## Don't abandon files

Don't leave orphaned files behind. Before your involvement in a project
ends, transfer your files or arrange for someone else to take ownership
of them.

## Use Globus to transfer files

CISL recommends using [Globus](../storage-systems/data-transfer/globus/index.md)
to transfer large files or data sets between the GLADE centralized file
service, the [NSF NCAR Campaign Storage](../storage-systems/glade/campaign.md) file
system, and remote destinations such as university facilities. In
addition to web and command line interfaces, Globus offers a feature
called [Globus Connect Personal](https://www.globus.org/globus-connect-personal)
that enables users to move files easily to and from laptop or desktop computers and other systems.

Secure Copy Protocol ([SCP](../storage-systems/data-transfer/scp-and-sftp.md))
works well for transferring a few relatively small files between most systems.

Other methods for transferring files are documented on the page [Transferring Data](../storage-systems/data-transfer/index.md).
