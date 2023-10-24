# Data transfers and sharing

The best way to transfer files between systems or to share data with
colleagues depends on the context. For example, you might want to move
or copy data that you own from the GLADE system to a university storage
resource or from GLADE to NCAR Campaign Storage. At another time, you
might want to share data that you have on GLADE with someone who does
not have access to NCAR systems.

There are several ways of accomplishing these transfer and sharing
tasks. Review the descriptions of each below and follow the links
provided for details.

## Transferring files between systems

### Globus

CISL recommends using Globus to transfer files between systems – for
example, between non-NCAR facilities and the resources that CISL
manages. The Globus platform also enables users to transfer files
between their GLADE file spaces and the NCAR Campaign Storage file
system.

Globus has both web and command line interfaces, and its Globus Connect
feature enables users to move files to and from laptop or desktop
computers and other systems. Globus has a typical transfer rate that
ranges from 100 to 200 MBps. [More information.](globus/index.md)

### SCP and SFTP

The installed Secure Copy Protocol (SCP) and Secure FTP (SFTP) utilities
are best suited to transferring small numbers of small files to or from
a local computer and the resources that CISL manages. [More information](./scp-and-sftp.md).

These other tools also can be used to make secure transfers between your
local computer and CISL systems:

- [PSCP / PSFTP](./scp-and-sftp.md#pscp-and-psftp) – PuTTY utilities
  including a Windows version

- [WinSCP](./scp-and-sftp.md#winscp) – SCP and SFTP transfers with a
  graphical user interface for Windows users

### BBCP

BBCP is a multi-streaming utility for transferring large files. It
splits files into multiple streams that are transferred simultaneously,
so it is faster than the single-streaming SCP and SFTP utilities.
[More information](./scp-and-sftp.md#bbcp).

## Sharing data with colleagues

### Globus

In addition to the features described above, Globus enables users to
share files with colleagues and others who do not have NCAR user
accounts. [More information](globus/Sharing+data+and+making+unattended+transfers.md).

### Sharing via Google Drive and other services

Individuals who have GLADE access can copy files from GLADE and then
share them with others via Google Drive or services such as DropBox and
Amazon Web Services. [More information](globus/index.md#globus-for-google-drive).
