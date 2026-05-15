# Job Composer

The Job Composer provides a graphical interface for creating, configuring, and submitting batch jobs to Derecho or Casper without requiring SSH access or command-line interaction. It is accessible from the Open OnDemand (OOD) portal at [ondemand.hpc.ucar.edu](https://ondemand.hpc.ucar.edu) by selecting **Jobs > Job Composer** from the top navigation menu.

Jobs created through the composer are stored in a dedicated workspace directory on the file system. Each job directory contains the submission script and any associated input files, and can be reused or copied for future runs.

## Submitting a Job

### From a Default Template

The default template provides a minimal PBS job script that can be edited directly in the browser. This is the recommended starting point for new users.

1. Select **New Job > From Default Template** from the Job Composer toolbar.
2. A new job entry will appear in the job list with the status **Not Submitted**. The right-hand panel shows the job details and a file listing for the job directory.
3. Click **Job Options** to set the job name, submission script filename, and target cluster (Derecho or Casper).
4. Click **Open Editor** to open the submission script in the browser-based editor. Modify the PBS directives and job commands as needed (see [example scripts](#example-scripts) below), then save the file.
5. Click **Submit** to queue the job.

The job status will update from **Not Submitted → Queued → Running → Completed** (or **Failed**). Output files are accessible through the **Folder** button in the job listing once the job finishes.

### From a Specified Path

Use this method when you have an existing directory on the file system containing a job script and input files you want to submit directly.

1. Select **New Job > From Specified Path**.
2. In the dialog, provide:
    - **Path**: the full path to the directory containing your job script (e.g., `/glade/work/username/myjob/`)
    - **Job Name**: a display label for the job in the composer
    - **Script**: the filename of the PBS submission script within that directory
    - **Cluster**: Derecho or Casper
3. Click **Create New Job**. The composer will reference the files at that path rather than copying them.
4. Review the script via **Open Editor** and click **Submit** when ready.

!!! note
    Files are not copied when using **From Specified Path**. Any changes made to the script in the editor will modify the original file in the source directory.

### From a Saved Template

If you have previously created a [job template](#creating-and-managing-job-templates), you can create new jobs from it to avoid re-entering configuration each time.

1. Select **New Job > From Template**.
2. Select the desired template from the list.
3. The composer creates a new job directory by copying the template's files into a new workspace.
4. Click **Job Options** to adjust any per-run settings, then edit the script and submit as usual.

### From an Existing Job

To duplicate a job you have already run (for example, to rerun with minor changes):

1. Select the job in the job list.
2. Click **New Job > From Selected Job**.
3. A new job directory is created as a copy of the selected job, including all files and script settings.

---

## Example Scripts

### Derecho

```bash
#!/bin/bash
#PBS -N my_job
#PBS -A <project_code>
#PBS -q main
#PBS -l walltime=01:00:00
#PBS -l select=1:ncpus=128:mpiprocs=128
#PBS -j oe

### Load required modules
module reset
module load ncarenv intel

### Run the executable
mpiexec ./my_program
```

### Casper

```bash
#!/bin/bash
#PBS -N my_job
#PBS -A <project_code>
#PBS -q casper
#PBS -l walltime=02:00:00
#PBS -l select=1:ncpus=4:mem=50GB
#PBS -j oe

### Load required modules
module reset
module load ncarenv

### Run the executable
./my_program
```

Replace `<project_code>` with your active allocation. See [Job Script Examples](../../pbs/job-scripts/index.md) for a broader set of templates covering MPI, GPU, and array jobs.

!!! tip
    Set `#PBS -j oe` to combine standard output and error into a single file (`<job_name>.o<job_id>`), which simplifies reviewing output from the Job Composer's file listing.

---

## Creating and Managing Job Templates

Templates allow you to define a reusable job configuration — including the submission script and any supporting files — that can be shared across multiple job runs.

### Creating a Template

1. Navigate to the **Templates** tab at the top of the Job Composer panel.
2. Click **New Template**.
3. Provide:
    - **Template Name**: a descriptive label for the template
    - **Path**: the full path to a directory containing your template files (submission script, any required input stubs, etc.)
    - **Script**: the filename of the PBS script within that directory
    - **Cluster**: the default target cluster
    - **Notes** (optional): a description of what the template is for
4. Click **Save**. The template will appear in the Templates list and can be selected when creating new jobs.

!!! warning
    When a job is created from a template, all files in the template directory are copied into a new job workspace. Keep template directories lean — large input files should be referenced by path in the script rather than stored in the template directory itself.

### Editing a Template

1. Select the template in the Templates list.
2. Click **Edit** to update the template metadata (name, notes, default cluster, or script filename).
3. To modify the script or supporting files, navigate to the template directory via the [File Explorer](index.md#file-explorer) or a terminal session and edit the files directly. Changes take effect for all jobs created from the template going forward.

### Deleting a Template

Select the template and click **Delete**. This removes the template entry from the Job Composer but does **not** delete the source directory or any jobs previously created from it.

---

## Managing Jobs

### Monitoring Status

The Job Composer job list displays each job's current status. For a consolidated view of all running and queued jobs across Derecho and Casper, use **Jobs > Active Jobs** from the top navigation menu.

### Stopping a Job

Select a running job in the job list and click **Stop** to cancel it. This is equivalent to running `qdel <job_id>` from the command line.

### Viewing Output

Once a job completes, click the **Folder** button on the job entry to open the job's working directory in the File Explorer. Output files (e.g., `<job_name>.o<job_id>`) are listed there and can be viewed or downloaded directly in the browser.

### Deleting a Job

Select a job and click **Delete** to remove it from the Job Composer list. This also deletes the associated job workspace directory and all files within it.

!!! warning
    Job deletion is permanent. Download or copy any output files you want to retain before deleting a job.

---

## Getting Help

For assistance with the Job Composer or batch job submission at NSF NCAR, contact the [Consulting Services Group User Support Team](../../user-support/index.md) or submit a ticket to the [NSF NCAR Research Computing Help Desk](https://rchelp.ucar.edu).
