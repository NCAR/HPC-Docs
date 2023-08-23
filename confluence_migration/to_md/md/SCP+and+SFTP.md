# SCP and SFTP

Secure Copy Protocol (SCP) and Secure FTP (SFTP) are two utilities for
transferring files between remote systems and the NCAR systems that CISL
manages.

They are best suited for transferring small numbers of small files (for
example, fewer than 1,000 files totaling less than 200 MB). For
larger-scale transfers, we recommend
using [Globus](file:////display/RC/Globus+file+transfers).

You can make SCP and SFTP transfers between the GLADE storage system and
a remote machine if the remote machine accepts incoming SSH sessions. If
it doesn't, the transfer will hang or you will receive a message such as
"connection refused," depending on the system's firewall settings.

#### Page contents

- [From an NCAR system](#SCPandSFTP-FromanNCARsystem)

  - [SCP example](#SCPandSFTP-SCPexample)

  - [SFTP example](#SCPandSFTP-SFTPexample)

- [To an NCAR system](#SCPandSFTP-ToanNCARsystem)

## From an NCAR system

To make SCP and SFTP transfers from your GLADE file space to a remote
system, log in to **data-access.ucar.edu** and execute the
commands shown below.

Use SCP if you need to transfer a single file or if you want to transfer
multiple files with a single command by using a wildcard or recursive
option.

### **SCP example**

To transfer multiple files with similar names or extensions, follow this
example, in which **supersystem.univ.edu** is a fictitious remote
system.

scp /glade/u/home/pparker/mydata/\*.dat
pparker@supersystem.univ.edu:/home/pparker

### **SFTP example**

If you need to transfer many files from multiple directories to a remote
machine, doing so in an SFTP session is likely to be more efficient for
you than SCP.

Log in to **data-access.ucar.edu**, then start your transfer session
with the **sftp** command followed by your login information for the
remote system.

sftp pparker@supersystem.univ.edu

You will be asked to authenticate at this point.

Then, within the session, you can change between directories as needed
and execute **put** commands to copy files to the remote machine.
Use **lcd** to change local directories, and use **cd** to change
directories on the remote system, as shown in this example.

sftp\> lcd /glade/u/home/pparker/mydata

sftp\> put filename1

sftp\> lcd /glade/scratch/pparker

sftp\> cd /home/mydata

sftp\> put filename2

sftp\> quit

You can also transfer files from batch jobs running on an NCAR machine.

## To an NCAR system

To transfer files from a remote system to your GLADE file space, log in
to the remote system and reverse the procedures shown above.

For example:

scp /remotedir/\*.dat
pparker@data-access.ucar.edu:/glade/u/home/pparker/mydata

You will be asked to authenticate for each individual SCP command that
you execute to transfer files to the NCAR system.
