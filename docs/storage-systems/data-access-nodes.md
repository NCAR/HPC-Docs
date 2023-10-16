# Using data-access nodes

The data-access nodes are provided to enable authorized users to perform
a number of file-management operations. These include:

- managing file and directory permissions for [NCAR Campaign Storage](glade/campaign.md) data
  holdings.

- copying data from the [Research Data Archive](https://rda.ucar.edu/).

The data-access nodes are not compute nodes and any tasks users run on
them are run "at risk." They also are not intended for use as long-term
storage.

Short, non-memory-intensive processes are allowed, including such tasks
as text editing or running small scripts for transferring files. If any
task consumes excessive resources (determined at the discretion of the
CISL consultants or system administrators), a system administrator will
kill the process or processes and you will be notified.

No usage charges are assessed for reading data.

If you do not have an allocation but need to use the nodes to get data
from CISL storage resources, submit a [<u>Data Analysis
Allocation</u>](https://arc.ucar.edu/xras_submit/opportunities) request.

## Logging in

To use these resources, log in to **data-access.ucar.edu** and
authenticate as described in our [Authentication and
security](file:////display/RC/Authentication+and+security)
documentation.

Use **ssh** as follows if your username on your local computer is the
same as your UCAR username:

ssh data-access.ucar.edu

If your UCAR username and your username on your local computer are
different, log in with your UCAR username as follows:

ssh username@data-access.ucar.edu

## Using GLADE scratch

When you log in, you are in **/glade/u/home/username** by default. Use
your larger **scratch** or **work** file spaces to hold data that you
read out of Campaign Storage or other storage resources. You can also
read files from other GLADE file spaces to which you have been granted
read permissions.

See [GLADE](file:////display/RC/GLADE+file+spaces) for more information
about file spaces.

## Transferring files

To transfer data between data-access.ucar.edu and another system, use
any of these tools:

- [Globus](file:////display/RC/Globus+file+transfers) – the endpoint for
  data-access projects is `NCAR GLADE`

- [SCP/SFTP](file:////display/RC/SCP+and+SFTP)

- [BBCP](file:////display/RC/BBCP)

See those links for documentation.
