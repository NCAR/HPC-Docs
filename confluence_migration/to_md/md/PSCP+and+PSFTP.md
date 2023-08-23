# PSCP and PSFTP

PuTTY Secure Copy (PSCP) and PuTTY SFTP (PSFTP) enable you to transfer
files to another system after opening a command window on a Windows
computer. Both applications are available as free downloads.

Go to [the download
site](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) and
find the latest release version of
the **pscp.exe** and **psftp.exe** files.

Click on each and save them to your hard drive—for example, in
your **C:\Users\username\Downloads** folder or in **C:\Program Files**.

To run either program, first open a command window:

- Enter **cmd.exe** in the search field of your Start menu.

- Press **Enter**.

Then follow the applicable instructions below.

#### Page contents

- [PSCP transfer](#PSCPandPSFTP-PSCPtransfer)

- [PSFTP transfer](#PSCPandPSFTP-PSFTPtransfer)

## PSCP transfer

To copy a file or files using PSCP, open a command window and change to
the directory in which you saved **pscp.exe**.

C:\Users\jbsmith\>cd C:\Program Files

Then type **pscp**, followed by the path that identifies the files to
copy and the target directory, as in this example.

pscp C:\Users\jbsmith\directory\\.txt
jbsmith@cheyenne.ucar.edu:/glade/u/home/username

Press **Enter**, then follow your usual authentication procedures to
execute the transfer.

Token_Response:

file1.txt               \| 0 kB \|   0.5 kB/s \| ETA: 00:00:00 \| 100%

file1.txt               \| 0 kB \|   0.5 kB/s \| ETA: 00:00:00 \| 100%

file1.txt               \| 0 kB \|   0.5 kB/s \| ETA: 00:00:00 \| 100%

C:\Users\jbsmith\Downloads\>

When the transfer is complete, type **exit**, then press **Enter** to
close the command window.

## PSFTP transfer

Open your command window, then change to the directory in which you
saved **psftp.exe**.

C:\Users\jbsmith\>cd C:\Program Files

To start a session, type **psftp** followed by your login for the target
computer.

psftp jbsmith@cheyenne.ucar.edu

Press **Enter**, then follow your usual authentication procedures to log
in to the remote machine.

Token_Response: Remote working directory is /glade/u/home/jbsmith
psftp\>

Within the session that you just started, you can copy a file or files
from your computer to the remote system by changing between directories
as needed and executing multiple **put** commands\*.

Use **lcd** to change local directories, and **cd** to change
directories on the remote system, as in this example:

psftp\> lcd ..\documents

psftp\> lcd documents

New local directory is C:\Users\jbsmith\documents

psftp\> put file1.txt

local:file1.txt =\> remote:/glade/u/home/jbsmith/file1.txt

psftp\> cd /glade/scratch/jbsmith

Remote directory is now /glade/scratch/jbsmith

psftp\> mput file\*.txt

local:file1.txt =\> remote:/glade/scratch/jbsmith/file1.txt

local:file2.txt =\> remote:/glade/scratch/jbsmith/file2.txt

local:file3.txt =\> remote:/glade/scratch/jbsmith/file3.txt

psftp\>

To end the psftp session, type **exit**, then press **Enter**.

To close the command window, type **exit** again, then press **Enter**.

*\* To copy multiple files, you can use a wildcard and
an **mput** or **mget** command rather than **put** or **get**.*
