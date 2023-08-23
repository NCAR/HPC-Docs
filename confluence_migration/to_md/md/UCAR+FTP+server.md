# UCAR FTP server

**This service is temporarily unavailable.**

Authorized UCAR persons and NCAR personnel (individuals who have valid
NCAR scientist and project numbers) can use the UCAR FTP server to share
files with anyone who needs to download them ***if no secure method is
available***.

This server should not be used for data storage.

If you need an **ftp.ucar.edu** account, [submit a request
here](https://ithelp.ucar.edu/plugins/servlet/desk/site/global).

Some browsers, including Chrome and Firefox, no longer support the file
transfer protocol (FTP). If your preferred browser does not work with
FTP, consider using an installed [software
package](file:////display/RC/SCP+and+SFTP) or access the server from
your command line.

#### Page contents

- [Uploading files](#UCARFTPserver-Uploadingfiles)

- [Downloading files](#UCARFTPserver-Downloadingfiles)

## Uploading files

Log in to **ftp.ucar.edu** with your FTP client (see image) or by
entering the following on your command line.

ftp ftp.ucar.edu

You will be in your own personal directory (/pub/cisl/username, for
example) and can upload files only to that directory or subdirectories
that you create. Execute the usual FTP commands\* to put the files in
your login directory or a subdirectory.

Notify the intended recipient of the full path name to make the files
easy to locate.

Ask the recipient to download the files. Remove them from the server
once the recipient has downloaded them.

Keep in mind that anyone can access files kept on the server in a public
folder.

**Do not store sensitive or critical data there.**

![](media/image1.png)

When using FTP client software such as WinSCP, be sure to
select **FTP** and specify **Port 21** (as shown in the image
above) rather than SFTP and Port 22 to log in to ftp.ucar.edu.

## Downloading files

You do not need an account to *download* public files from the FTP
server.

Use one of the following methods if you do not have an account.

**Browser access**

Use your browser to access [ftp://ftp.ucar.edu](ftp://ftp.ucar.edu/).
Find the appropriate **/pub** subdirectory, select the files, and copy
them to your local machine.

**Command line FTP**

Start by entering the following on your command line.

ftp ftp.ucar.edu

Log in as “anonymous,” then use your email address as your password.

User ftp.ucar.edu:none: anonymous

331 Please specify the password.

Password: \[email address\] 230 Login successful.

ftp\>

At that point, simply change to the appropriate directory and use FTP
commands\* to copy the necessary files to your local machine.

Enter **quit** to log out.

\***FTP commands**: For a list of available FTP commands, enter the
command **help** after logging in. For basic information about an
individual command, specify the command, as in **help mput**.
