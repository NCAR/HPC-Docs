# Recovering files from snapshots

CISL creates **snapshots** of the [GLADE home file space](index.md#home-space) several times each day
in addition to multiple **backups** each week. These snapshots are
records of the state of the file system at various times.

Snapshots enable you to retrieve copies of deleted files yourself,
quickly and easily, or recover earlier versions of files that have been
revised. (To recover files or directories from backups rather than
snapshots, contact the [NCAR Research Computing help
desk](https://rchelp.ucar.edu/).)

The number of snapshots that are available at any one time varies, and
the intervals between snapshots may change at any time without prior
notice.

## Retrieving directories and files

If you need to retrieve directories or files, first determine if they
are available in one or more snapshots by running `snapls` as shown
below, then copy the files to your home space. The files will retain the
permissions that existed when the snapshot was created.

### Find a directory

To see if your current directory is present in any snapshots, just
run `snapls` on your command line. You can also specify a directory by
executing `snapls -ldhtr directory_name`.

In this example, your current directory is `/glade/u/home/username`. The
output from snapls identifies recent snapshots with date and time stamps
in this format: `YYYYMMDD-hhmmss`.

```pre
snapls

drwxr-xr-x 41 username ncar 16384 Jul 8 11:51
/glade/u/home/.snapshots/20200208-120001/username

drwxr-xr-x 41 username ncar 16384 Jul 7 10:49
/glade/u/home/.snapshots/20200207-110001/username

drwxr-xr-x 40 username ncar 16384 Jul 7 09:59
/glade/u/home/.snapshots/20200207-100001/username

drwxr-xr-x 40 username ncar 16384 Jul 7 13:25
/glade/u/home/.snapshots/20200207-180001/username
```

Change to /username in the most recent snapshot directory that is
identified.
```pre
cd /glade/u/home/.snapshots/20200208-120001/username
```

Copy the files that you need back to your home directory or a
subdirectory.
```pre
cp file1 file2 file3 /glade/u/home/username
```
### Find and copy a file

You can find an individual file by identifying it as in this example.
The output shows that `filename` is available in two snapshots.
```pre
snapls -ldhtr filename

drwxr-xr-x 40 username ncar 16384 Jul 7 09:59
/glade/u/home/.snapshots/20200207-100001/username

drwxr-xr-x 40 username ncar 16384 Jul 7 13:25
/glade/u/home/.snapshots/20200207-180001/username
```
When you identify the file you want, you can copy it back to your
current directory as shown here.
```pre
cp /glade/u/home/.snapshots/20200207-100001/username/filename .
```
## Comparing snapshots

You can use the `diff` command to identify changes that were made
between snapshots, as in this example.
```pre
diff /glade/u/home/.snapshots/20200208-100001/username/filename /glade/u/home/.snapshots/20200207-180001/username/filename
``

This can be useful if you need to roll back to an earlier version of a
file, but it is not a substitute for following version control best
practices.

The `diff` command is best used for comparing single files or small
directory trees within snapshots.
