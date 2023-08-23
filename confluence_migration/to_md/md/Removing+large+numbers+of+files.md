# Removing large numbers of files

The recommended way to remove thousands or hundreds of thousands of
files from a GLADE directory is by running a batch job on Casper.

Removing large numbers of files can take several hours, so you will need
to provide enough wall-clock time in the job to accommodate this. You
can use the sample script below with your own project code, job name,
and other customizations.

Before removing large numbers of files, create a "play" directory in
/glade/scratch/\$USER and try the batch job with some fictional files
and subdirectories to make sure that it does what you want. Carefully
specify the files that you want removed before submitting a job like
this.

### Create job script and submit

Create a job script following the example just below. To submit the job
when your script is ready, run the PBS Pro **qsub** command followed by
the name of your script file, as in this example:

qsub script_name

### Example script

\#!/bin/tcsh

\### bash users replace /tcsh with /bash -l

\#PBS -N remove_files_job

\#PBS -A project_code

\#PBS -l select=1:ncpus=1

\#PBS -l walltime=24:00:00

\#PBS -j oe

\#PBS -m abe

\#PBS -M email_address

\#PBS -q casper

setenv TMPDIR /glade/scratch/\$USER/temp

mkdir -p \$TMPDIR

\### bash users: export TMPDIR=/glade/scratch/\$USER/temp

\### See "man rm" for explanation of options f and v

rm -fv /glade/scratch/\$USER/directory_name/files_to_remove\*
