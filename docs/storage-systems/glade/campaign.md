# Campaign Storage file system

NSF NCAR Campaign Storage is a resource for medium-term storage of project
data, typically for three to five years, by NSF NCAR labs and universities
that have project allocations.

Campaign Storage is accessible in a number of ways that are described
below:

- through the Globus web and command-line interfaces

- from the Derecho and Casper clusters to facilitate data analysis and visualization
  workflows

!!! danger
    **Files stored on this system are not backed up. Users are responsible for replicating any data they feel should be stored at an additional location as backup.**

    **Files that are deleted or overwritten cannot be recovered.**

## Globus transfers

The Globus mapped collection established for the file system is **NSF NCAR
Campaign Storage**. How to make transfers to and from that collection is
documented here: [Globus file transfers](../data-transfer/globus/index.md).

How to make transfers using the command line interface is also covered
in detail in this tutorial: [Using Globus v5 at NSF NCAR (tutorial)](https://www.cisl.ucar.edu/events/using-globus-v5-ncar).

CAVEAT: The Globus interface for transferring data does not handle
symbolic links and does not create symbolic links on a destination
endpoint.

## HPC system use

The Campaign Storage file system can be accessed from the Casper and Derecho
clusters as `/glade/campaign` so users are able to:

- read and write data directly from their data analysis and
  visualization workflows.

- submit batch scripts to migrate data to the Campaign Storage resource.

## Data retention policy

Campaign Storage is designed to provide medium-term storage for project
data, typically for three to five years. While data will not be purged
automatically after five years, retaining data longer will reduce the
capacity for storing additional, new data. Users are expected to monitor
their holdings, remove files that are no longer needed, and move
necessary data to other storage options for longer-term preservation.
For additional details regarding Campaign Storage data retention, see
[here](../glade/index.md#data-retention-policy_3).

### NSF NCAR labs

**NSF NCAR researchers** are expected to collaborate with CISL's Digital
Asset Services Hub (log in to [Sundog](https://sundog.ucar.edu/)) to
develop data migration plans for storage needs that exceed five years.

### Universities

**University researchers** are expected to transfer their project data
to their home institutions or other alternative storage repositories
upon expiration of their NSF grant, as described in
[General data retention policies and procedures](./index.md#general-data-retention-policies-and-procedures).
CISL will not award storage space for researchers to carry data
forward from one grant to another.

## Allocations

### NSF NCAR labs

Each NSF NCAR lab has an allocation of Campaign Storage space, and the labs
manage how those allocations are used.

Users who have questions related to lab allocations should contact the
lab's own allocation representative.

### Universities

University users can request Campaign Storage space through the
[NSF NCAR Resource Allocation System](https://arc.ucar.edu/xras_submit/opportunities) as
supplements to their project allocations. Requests must include detailed
justification for the amount of space requested.

Because NSF NCAR is not currently funded to provide long-term data storage
services to the university community, university users' requests for
these allocations are prioritized based on the following factors.

**Higher priority is given to requests if:**

- You have an active project, supported by an active NSF award, for
  using Derecho.

- Your request is for a period of no more than three (3) months and to
  support migration of your data to your home institution.

**Lower priority is given to requests if:**

- Your need relates to satisfying external requirements or promises – to
  a publisher or agency, for example – to retain data for extended
  periods.

Any data requiring longer storage should be migrated to your home
institution or to another appropriate repository.

## Usage & Reporting

The Systems Accounting Manager
([SAM](../../getting-started/managing-your-allocation.md#using-sam)) provides overall
summary information about the use of Campaign Storage allocations and
other allocations.

### Access reports

CISL generates weekly usage reports throughout `/glade/campaign`
to help users manage their data. The reports provide a summary of when
files were last accessed, how much space is used, and details for the
top 25 users. The files are named `access_report.txt` and can be found
at the top-level of shared file spaces, for example
`/glade/campaign/<project_path>/access_report.txt`
(or similar, depending on the project).

<!-- !!! example "Understanding Campaign Storage `access_report.txt` Files" -->
<!--     Foo -->


### Usage reports

For project spaces with 50 TiB or more of data, detailed usage reports are created
every two weeks within a `/glade/campaign/<project_path>/.usage/`
directory. Two levels of reporting are available:

1. `summary.txt` contains information aggregated across the entire project.  The beginning of the file contains information regarding the number of files and directories, overall data volume, and top user and group usage.  The remainder of the file lists large directories and files, as described in the example below.
2. `users/<username>` contains usage information for files and directories whose contents are owned exclusively by a given user.

In this way, project members can evaluate quickly which directories consume the most space, which directories contain the largest number of files, and when contents were last accessed. Note that only paths visible to the user `csgteam` are included in these summaries because the scanning process runs without full administrator privileges.

!!! example "Understanding Campaign Storage Usage Reports"
    === "Large Directories"
        Several sections summarize the largest directories within a project.  The first list includes the absolute largest directories irrespective of contents access time.  Subsequent lists show directories whose contents were last accessed within specific time ranges:

        - 3-5 years ago,
        - 5-7 years ago, and
        - more than 7 years ago.

        In all cases the size corresponds to immediate file contents and is NOT recursive.  Similarly, the date shown is the *most recent access time* of any file contained within the directory itself, and is NOT recursive.

        Please consider removing large directories whose contents have not been accessed in years, or using the [HSM functionality described below](#hierarchical-storage-management-hsm-overview).
        ```pre
        #-------------------------------------------------------------------------------
        # Largest Directories, last access [3-5yrs):
        #-------------------------------------------------------------------------------
          16.47 TiB        9,324 2021-01-01 /glade/campaign/cesm/development/wawg/LastMillennium/b.e21.BWmaHIST.f19_g17.PaleoStrat.Last1000.003/ocn/proc/tseries/month_1/
          16.43 TiB        9,324 2022-01-19 /glade/campaign/cesm/development/wawg/WACCM6-MA-2deg/b.e21.BWmaHIST.f19_g17.PaleoStrat.Last1000.002/ocn/proc/tseries/month_1/
          15.01 TiB       13,306 2022-04-25 /glade/campaign/cesm/development/wawg/WACCM6-TSMLT-GEO/original/b.e21.BW.f09_g17.SSP245-TSMLT-GAUSS-DEFAULT.006/atm/hist/
          14.15 TiB       20,688 2020-12-15 /glade/campaign/cesm/development/amwg/runs/cam5_1_amip_run2/
          12.42 TiB       18,747 2022-07-02 /glade/campaign/cesm/development/palwg/Holocene-9ka/bg.e21.B1850G.f19_g17.HOLO_transient_9.0ka.001/ocn/hist/
        [...]
        ```


    === "'Bloated' Directories"
        Very large numbers of files complicate space management and can degrade overall file system performance.  We group the directories containing the most files in another section for easy identification - sorting by the second column.

        Please consider using tools such as `tar` to group many small files into a single, larger archive when appropriate.
        ```pre
        #-------------------------------------------------------------------------------
        # Bloated Dirs (file count):
        #-------------------------------------------------------------------------------
           5.09 TiB      294,600 2020-11-16 /glade/campaign/cesm/development/liwg/CESM21-CISM2-JG-BG-Dec2018/archive/BG_iteration_7_badtopo2/cpl/hist/
           8.98 TiB      263,900 2025-06-24 /glade/campaign/cesm/development/cvcwg/cvwg/b.e21.B1850.f09_g17.1dpop2/b.e21.B1850.f09_g17.1dpop2-gterm.005/ice/hist/
            7.8 TiB      235,625 2024-03-26 /glade/campaign/cesm/development/liwg/mirenvt/CO2/b.e21.B1850G.f09_g17_gl4.CMIP6-1pctCO2-4x-onewaycpl.003/ice/hist/
            6.4 TiB      193,401 2023-12-23 /glade/campaign/cesm/development/liwg/mirenvt/b.e21.B1850G.f09_g17_gl4.CMIP6-1pctCO2-4x-onewaycpl.003/ice/hist/
           6.42 TiB      188,500 2025-04-21 /glade/campaign/cesm/development/cvcwg/cvwg/b.e21.B1850.f09_g17.1dpop2/b.e21.B1850.f09_g17.1dpop2-gterm.001/ice/hist/
        [...]
        ```

    === "Large Files"
        The largest individual files are also easily located.  The date shown corresponds to the most recent access time, allowing users to quickly identify large files that have not been accessed recently.
        ```pre
        #-------------------------------------------------------------------------------
        # Largest Files:
        #-------------------------------------------------------------------------------
           5.51 TiB 2025-05-16 /glade/campaign/cesm/uhr/dyamond_tt100_reducedlnd/run/dyamond_tt100_reducedlnd.cam.r.2017-04-26-10800.nc
           5.51 TiB 2025-05-13 /glade/campaign/cesm/uhr/dyamond_tt100/run/dyamond_tt100.cam.r.2017-04-26-10800.nc
            3.8 TiB 2025-05-23 /glade/campaign/cesm/km-scale/cam77_dyamond1_clubbmf/run/cam77_dyamond1_clubbmf.cam.r.2016-08-03-00000.nc
           3.71 TiB 2025-04-07 /glade/campaign/cesm/km-scale/sl_cam77_zender_clubbaist-fix/run/sl_cam77_zender_clubbaist-fix.cam.r.2017-04-27-00000.nc
           3.71 TiB 2025-07-21 /glade/campaign/cesm/km-scale/sl_cam77_zender/run/sl_cam77_zender.cam.r.2017-04-27-00000.nc
        [...]
        ```
    ---

    For directories:

     - The sizes shown include direct contents within the directory only,
       and are not inclusive of any subdirectories (NOT recursive).
     - The date shown is the most recent access time of any file content within
       the directory (again, NOT recursive).

    For files, the date shown corresponds to the last access time.

---

## Automated data compression

Campaign Storage has an automated data compression feature for
long-duration data sets.  Our compression policy targets files that are
180 days old or older and 100MiB in size or larger for "z" compression
using [IBM Spectrum Scale file system
mechanisms](https://www.ibm.com/docs/en/spectrum-scale/5.0.5?topic=systems-file-compression) (details
below).

The action is transparent to the user – that is, no changes to metadata
timestamps or reported size occur, and subsequent reads of the data
proceed as usual. During a read, the compressed data are sent to the
file system client and then transparently uncompressed for application
use.

### Tool and accounting behavior

The number of blocks reported as consumed by the file will change. Note the
following tool-specific behavior:

| **Tool**       | **Output**                                                                            |
|----------------|---------------------------------------------------------------------------------------|
| `ls -l`        | shows original (uncompressed) file size                                               |
| `stat`         | shows compressed number of blocks, original file size                                 |
| `du`           | shows compressed file sizes. **du –apparent-size** shows original (uncompressed) size |
| `gladequota`   | shows project space usage *after* compression, as do SAM reports                      |

Individual data sets can be excluded from the compression algorithm, if
necessary. To discuss this option, please submit a request through the
[NSF NCAR Research Computing help desk](https://rchelp.ucar.edu/).

### Compression details

When a file is considered for compression, the algorithm tests
compression of chunks of the file. If the realized compression
efficiency of a given chunk is at least 10%, it is then stored
compressed on disk.

The compression status of a file can be queried via
the `mmlsattr` command. Follow this example:
```pre
/usr/lpp/mmfs/bin/mmlsattr -L filename
```

A file has been compressed if the `mmlsattr` output:

- includes "Misc attributes: COMPRESSION" – which indicates that the
  file was targeted for compression.

- does not include "flags: illCompressed" – which indicates the file was
  targeted or deferred but not yet compressed.

Several output examples are provided below.

User-driven manual compression is also possible before the automated
policy is triggered, if desired, via the `mmchattr` command:
```pre
/usr/lpp/mmfs/bin/mmchattr [-I defer] ╌compression z filename
```

- z: best compression (Campaign Storage default)

- If deferred, the file will be compressed during the next Campaign
  Storage policy execution rather than instantly.

### Examples

**Run du, ls, stat for an original uncompressed file**
```pre
$ du -h 1GB.dat && du -h --apparent-size 1GB.dat && ls -lh 1GB.dat && stat 1GB.dat
1000M 1GB.dat
1000M 1GB.dat
-rw-r-----+ 1 benkirk csg 1000M Mar  9 10:08 1GB.dat
File: 1GB.dat
Size: 1048576000 Blocks: 2048000    IO Block: 8388608 regular file
Device: 2dh/45d Inode: 1006073884  Links: 1
Access: (0640/-rw-r-----)  Uid: (38057/ benkirk)   Gid: ( 1564/     csg)
Access: 2022-03-09 10:08:00.479563000 -0700
Modify: 2022-03-09 10:08:01.486585235 -0700
Change: 2022-03-09 10:08:01.486585235 -0700
Birth: -
```

**Request compression manually**
```pre
$ /usr/lpp/mmfs/bin/mmchattr --compression z 1GB.dat
```

**Run du, ls, stat for a compressed file (note that metadata dates are not changed)**
```pre
$ du -h 1GB.dat && du -h --apparent-size 1GB.dat && ls -lh 1GB.dat && stat 1GB.dat
104M 1GB.dat
1000M 1GB.dat
-rw-r-----+ 1 benkirk csg 1000M Mar  9 10:08 1GB.dat
File: 1GB.dat
Size: 1048576000 Blocks: 212992     IO Block: 8388608 regular file
Device: 2dh/45d Inode: 1006073884  Links: 1
Access: (0640/-rw-r-----)  Uid: (38057/ benkirk)   Gid: ( 1564/     csg)
Access: 2022-03-09 10:08:00.479563000 -0700
Modify: 2022-03-09 10:08:01.486585235 -0700
Change: 2022-03-09 10:08:01.486585235 -0700
Birth: -
```

**List file attributes to verify a compressed file**
```pre
$ /usr/lpp/mmfs/bin/mmlsattr -L 1GB.dat
file name:            1GB.dat
metadata replication: 2 max 2
data replication:     1 max 2
immutable:            no
appendOnly:           no
flags:
storage pool name:    DATA
fileset name:         csg
snapshot name:
creation time:        Wed Mar  9 10:08:00 2022
Misc attributes:      ARCHIVE COMPRESSION (library z)
Encrypted:            no
```

**Request deferred compression of a file**
```pre
$ /usr/lpp/mmfs/bin/mmchattr -I defer --compression z 1GB_deferred.dat
```

Note that deferred compression is recommended when manually requesting
compression for a large number of files. In this case,
the `mmchattr` command will return immediately, and the file
compression will occur at the next regularly scheduled system interval.

**List file attributes (note that "illcompressed" indicates the compression has not yet been applied)**
```pre
$ /usr/lpp/mmfs/bin/mmlsattr -L 1GB_deferred.dat
file name:            1GB_deferred.dat
metadata replication: 2 max 2
data replication:     1 max 2
immutable:            no
appendOnly:           no
flags:                illcompressed
storage pool name:    DATA
fileset name:         csg
snapshot name:
creation time:        Wed Mar  9 10:07:17 2022
Misc attributes:      ARCHIVE COMPRESSION (library z)
Encrypted:            no
```

---

## Tape Archival

!!! note "Introducing Hierarchical Storage Management (HSM) for *infrequently read* data sets"
    Campaign Storage is logically connected to the [Quasar](../quasar/index.html) tape library, allowing users to easily request old - but still important - data to be moved to "cold storage." This feature leverages the hierarchical storage management (HSM) capabilities [built into](https://www.ibm.com/docs/en/spectrum-archive-ee/1.3.3?topic=overview-spectrum-archive-enterprise-edition-components) Spectrum Scale and Spectrum Archive.  HSM is ideal for long-term storage of data sets that are rarely read but are being kept perhaps for a publication requirement, or as "just-in-case" backups within a computational campaign.  Once HSM migrates data to tape, disk space - and project quota - are reclaimed for more productive, active use.

    Recalls from HSM should be infrequent, and generally take hours - or even days - to complete, depending on the total number and volume of files requested.


### Hierarchical Storage Management (HSM) Overview
Hierarchical Storage Management is a tiered storage capability that combines traditional disk-based storage with a tape subsystem.  Under HSM, old, "cold" data can be selectively migrated to tape, freeing up disk resources.  In our setup on Campaign Storage, data migration occurs only based on user request, and will target all files &ge;100MiB in size. Migrated files still appear resident on the file system; however, they must be [*recalled*](#recall-from-tape) from tape before they can be read.  Reading a migrated file without issuing a recall request will trigger a read error.

Once files are migrated to tape, they will no longer count against a project's quota. Thus, the primary use case for HSM is to free up space within a project on Campaign Storage for active data sets by placing old (but still relevant) data into cold storage.

All HSM interactions at the user level are performed with the `glade_hsm` command as described below.

#### Migration to tape
The `glade_hsm migrate` subcommand is used to relocate files/directories in preparation for HSM migration.  This command takes an input list of files or directories and simply relocates them into a `COLD_STORAGE/` directory at the same level of the directory tree.

This command returns immediately upon success, and logs the request so the system can begin batch migration.

Two things happen to files located within any `COLD_STORAGE*/` path:

1. All files are marked [*immutable*](https://lwn.net/Articles/786258), meaning neither their contents nor metadata can be modified.
2. Files &ge;100MiB will have their "data blocks" moved onto tape. They are still visible on the file system and maintain their original metadata (timestamps, permissions, ownership, etc.); however, their contents are moved from the disk subsystem onto tape.

While `glade_hsm migrate` returns immediately, file content tape migration occurs in the background by system processes. As data blocks are relocated onto tape, a corresponding amount of disk quota is reclaimed.

See `glade_hsm migrate --help` for additional details.

By default, HSM content is written to two separate tapes for redundancy in the very rare event of a tape problem. Users can optionally elect a single tape copy with the `--single-copy` argument, in which case contents will be staged into a `COLD_STORAGE_SINGLE_COPY/` directory.  For model outputs or similar data that could be recreated, users should strongly consider using the `--single-copy` functionality.  This effectively increases the available tape volume available for your own - and others' - use, as well as ultimately reducing e-waste.

In order to read or modify previously migrated files, they must first be [recalled](#recall-from-tape).

#### Recall from tape
After migration, items must be manually recalled before they can be read.  The recall process is controlled through the `glade_hsm recall`  subcommand.

Recall fetches the specified files or entire directories. When a recall is complete, the data blocks are restored from tape, allowing contents to be read again.  Additionally, the "immutability" property is removed, allowing for content modifications, metadata changes, or removal.

Once recalled - but while still underneath a `COLD_STORAGE*/` path - files remain readable for at least one week. When the next system migration policy is run, immutability will be re-enabled, and data blocks will be removed from the disk subsystem.  If file contents were modified, the new contents will be re-migrated to tape.  For the typical case where recalled files are only read (and not modified), the data on tape is still valid and therefore does not require re-migration.

See `glade_hsm recall --help` for additional details.

To *permanently* recall an item, simply `mv` it out from underneath its `COLD_STORAGE*/` path after it has been recalled.

#### Checking status
You can check the status of migrated files or directories - including the status of a previous recall request - by using the `glade_hsm status` subcommand.

For example, to check the status of each migrated sub-directory within a particular `COLD_STORAGE/` path:
```pre
$ glade_hsm status /glade/campaign/univ/uiuc0017/SouthAmerica_WRF4KM_PGW/COLD_STORAGE/*/
'/glade/campaign/univ/uiuc0017/SouthAmerica_WRF4KM_PGW/COLD_STORAGE/2000' HSM status:
  Total Files: 9,516 / Offline: 9,516
  Disk Volume:  4.65 MiB
  Total Volume: 45.88 TiB

'/glade/campaign/univ/uiuc0017/SouthAmerica_WRF4KM_PGW/COLD_STORAGE/2001' HSM status:
  Total Files: 9,490 / Offline: 9,490
  Disk Volume:  4.63 MiB
  Total Volume: 45.71 TiB
[...]
```
The (truncated) output above shows that each of the specified directories contains 9,490 files, and all are offline.  Each directory has a total of 45.71 TiB that currently reside on tape, with only 4.63 MiB of disk storage consumed.  This residual disk storage is simply the cost of storing the remaining file metadata.

See `glade_hsm status --help` for additional details.

### HSM best practices

- **Use [`gladequota`](index.md#gladequota-command) to check your project quota before beginning a recall**.
    - `glade_hsm` will report the volume of data to be recalled and prompt for confirmation:
    ```pre
    $ glade_hsm recall COLD_STORAGE/*
      Total Files: 4 / Offline: 2
      Disk Volume:  256.00 MiB
      Total Volume: 768.00 MiB
      Recall Volume: 512.00 MiB
    Are you sure you want to continue (y/n)? y
    2025-08-22@07:56:29: benkirk initiated recall request of 2 files
    2025-08-22@07:56:29: requested file list: '/glade/u/CS_HSM/requests/recall-benkirk-b96c869aa8c3fe52-2025-08-22@07:56:29.filelist'
    ```
    - Make sure there is adequate quota within your project to accommodate the recalled data volume.
    - If you attempt to recall more data than your quota allows, the recall will likely succeed (because it is run with administrator privileges) but will exhaust your project's quota, preventing you from writing any new files.

- Operate on directories when possible.

    - While operations on individual files are supported, operations on subdirectories tend to be more efficient when many files are involved.
    - You may issue a recall at any level deep within a `COLD_STORAGE*/` path, for example `glade_hsm recall ./COLD_STORAGE/myproj/case1/output/`
    - Recalling a small number of select individual files - for example model inputs, or a small number of `tar` files - is fine.

- Easily identify candidate data for HSM migration using the [usage reports described above](#usage-reports).

    - You can migrate even a single, large directory at the bottom of a directory tree if desired.

- If you would like to permanently remove items from cold storage, please [reach out to user support](../../user-support/index.md).  System engineers can help remove files without recalling them first.
<!--  LocalWords:  HSM hsm subcommand
 -->
