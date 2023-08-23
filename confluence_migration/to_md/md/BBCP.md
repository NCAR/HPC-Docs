# BBCP

The BBCP utility for transferring large files is an alternative for
users who are unable to
use [Globus](file:////display/RC/Globus+file+transfers) to transfer
data. BBCP splits the files into multiple streams that are transferred
simultaneously, so it is faster than the single-streaming SCP and SFTP
utilities.

To make transfers with BBCP, it must be installed on all the systems
where you want to use it. It is already installed on the NCAR systems
that CISL manages, including the [data-access
nodes](file:////display/RC/Using+data-access+nodes). Those nodes give
users access to the [GLADE file
spaces](file:////display/RC/GLADE+file+spaces) to facilitate data
transfers.

## Transfer examples

To transfer a file *from GLADE to a remote system* that uses bbcp, log
in to **data-access.ucar.edu** and follow this example. Replace "target"
with the intended pathname of the file you are transferring.

bbcp -w 4m -s 16 filename username@supersystem.univ.edu:target

To transfer a file *from a remote system to GLADE*, log in to the remote
system and follow this example. Replace "target" with the intended
pathname of the file you are transferring – for example,
/glade/u/home/\$USER/filename.

bbcp -w 4m -s 16 -V -D filename username@data-access.ucar.edu:target

## Detailed documentation

For complete details, see the official [BBCP man
page](http://www.slac.stanford.edu/~abh/bbcp/).
