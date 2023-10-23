# Removing large numbers of files

The recommended way to remove thousands or hundreds of thousands of
files from a `GLADE` directory is by running a batch job on Casper.

Removing large numbers of files can take several hours, so you will need
to provide enough wall-clock time in the job to accommodate this. You
can use the sample script below with your own project code, job name,
and other customizations.

!!! danger "Test your file removal process first!!"
    Before removing large numbers of files, create a "play" directory inside your
    `/glade/derecho/scratch` user space and try the batch job with some fictional files
    and subdirectories to make sure that it does what you want. Carefully
    specify the files that you want removed before submitting a job like
    this.

### Create job script and submit

Create a job script following the example just below. To submit the job
when your script is ready, run the PBS Pro `qsub` command followed by
the name of your script file, as in this example:
```pre
qsub remove_files.pbs
```




#### Example scripts

!!! example "Removing files or complete subdirectories"

	=== "Removing Files"
		```bash title="remove_files.pbs"
		#!/bin/bash
		#PBS -N remove_files_job
		#PBS -A <project_code>
		#PBS -l select=1:ncpus=1
		#PBS -l walltime=24:00:00
		#PBS -j oe
		#PBS -q casper

		export TMPDIR=${SCRATCH}/temp && mkdir -p ${TMPDIR}

        # the subdirectory and file pattern for removal
        subdir="/glade/derecho/scratch/${USER}/directory_name"
	    file_pattern="files_to_remove*"

        # testing mode (set to False to actually remove files)
        test_only=True

        [[ True == ${test_only} ]] && do_echo="echo" || do_echo=""

        cd ${subdir} || { echo "cannot cd ${subdir}, aborting!!"; exit 1; }

        # use the "lfs find" command to locate files in the requested
        # subdirectory matching the specified file pattern.
        # We then send this list, NULL separated, to the xargs command
        # to do the removal.
        lfs find ${subdir} -type f -name "${file_pattern}" -print0 | \
            xargs -0 ${do_echo} rm -f
		```

	=== "Removing a Directory Tree"
		```bash title="remove_subdir.pbs"
		#!/bin/bash
		#PBS -N remove_files_job
		#PBS -A <project_code>
		#PBS -l select=1:ncpus=1
		#PBS -l walltime=24:00:00
		#PBS -j oe
		#PBS -q casper

		export TMPDIR=${SCRATCH}/temp && mkdir -p ${TMPDIR}

        # the subdirectory and file pattern for removal
        subdir="/glade/derecho/scratch/${USER}/directory_name"

        # testing mode (set to False to actually remove files)
        test_only=True

        [[ True == ${test_only} ]] && do_echo="echo" || do_echo=""

        cd ${subdir} || { echo "cannot cd ${subdir}, aborting!!"; exit 1; }

        # (1) use the "lfs find" command to locate files in the requested
        # subdirectory. We then send this list, NULL separated,
        # to the xargs command to do the removal.
        lfs find . ! -type d -print0 | \
            xargs -0 ${do_echo} rm -f

        # (2) remove the entire subdirectory tree
        cd -
        ${do_echo} rm -rf ${subdir}
		```
