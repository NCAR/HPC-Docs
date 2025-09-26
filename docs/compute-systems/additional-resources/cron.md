!!! info "*Cheyenne* `crontab` archives"
    Users who previously had `cron` entries on Cheyenne can locate their old `crontab` files under `/glade/u/ssg/ch/archived_crontabs/`

Occasionally users may want to automate a common recurring task.  Typical use cases are to initiate batch jobs, transfer input data from an external site, or run some automated testing. The UNIX `cron` service allows users to schedule scripts to be run based on a recurrence rule.  As of December 2023 we have deployed a high-availability `cron` service independent of the individual HPC systems to support these workflows.  This separated, HA solution allows us to perform maintenance on the HPC resources while not interrupting `cron` workflows that can tolerate the downtime.

## Logging in

Once you have [an HPC systems account](../../getting-started/accounts/index.md),
you can log in to `cron.hpc.ucar.edu` via `ssh` command:
```
ssh username@cron.hpc.ucar.edu
```
After the usual [two-factor authentication process](../../getting-started/accounts/duo/index.md), this will place you on the high-availability `cron` server.

### Cron server IP address
For certain automation workflows external sites may need to "allow" access from NCAR's systems based on IP address.

- `cron.hpc.ucar.edu` : **`128.117.211.234`**

If you are performing automated connections to *remote sites* and encounter access issues, it may be necessary to work with the remote site's administrators to add this IP address to their trusted connections configuration (details are site- and process-specific, work with your remote site support team).

## Appropriate usage, user environment, and resource restrictions

The primary use case for this resources is to initiate routine, scheduled work that is primarily performed elsewhere, such as in the HPC batch environment on either Derecho or Casper.  As a result, the user software environment is intentionally sparse, and each user is placed into a *control group* limited to 1GB of system memory to protect system resource utilization. The typical [GLADE file systems](../../storage-systems/glade/index.md) are accessible, however there is no default software environment provided.

Typical usage of this `cron` resource is:

1. Interacting with PBS,
2. Performing small, automated file processing activities, and
3. Connecting to the HPC systems directly through `ssh` to perform additional processing tasks.





### Accessing PBS commands
The typical [PBS commands](../../pbs/index.md) ``qsub`, `qstat`, etc... are available by default, and users can access both Derecho and Casper PBS queues from the `cron` system provided that PBS server names are appended to the usual queue specifications (similar to the usual PBS cross-submission described [here](../../pbs/peer-scheduling.md)):
=== "Derecho Access"
    Command-line specification of a Derecho queue:
    ```console
    cron$ qsub -q main@desched1 [...]
    ```
    PBS Script specification of a Derecho queue:
    ```bash
    #PBS -q main@desched1
    ```
=== "Casper Access"
    Command-line specification of a Casper queue:
    ```console
    cron$ qsub -q casper@casper-pbs [...]
    ```
    PBS Script specification of a Casper queue:
    ```bash
    #PBS -q casper@casper-pbs
    ```

### Connecting to other NCAR HPC resources

The `cron` servers are trusted by other HPC resources, allowing users to `ssh` to other systems *without* additional two-factor authentication.  A common workflow then is for a small, lightweight script to be initiated on the `cron` servers which in turn runs additional commands on Derecho or Casper.
=== "Derecho Access"
    ```console
    # ssh to a Derecho login node and do something useful...
    cron$ ssh derecho "hostname && uptime"
    ```
=== "Casper Access"
    ```console
    # ssh to a Casper login node and do something useful...
    cron$ ssh casper "hostname && uptime"
    ```

---

## Installing and editing `crontab` entries
To schedule a process with `cron`, a user must establish a `crontab` entry. This can be done interactively by running the command `crontab -e` to edit your crontab directly, or by creating a file and "installing" it with `crontab <filename>`. Additionally, you can list your current crontab entries via `crontab -l`.  (See [`man crontab`](https://linux.die.net/man/1/crontab) for more details.)

In either case, the `crontab` entry has a very particular, fixed format.


### `crontab` syntax

```pre title="sample crontab entry format"
# ┌───────────── minute (0–59)
# │ ┌───────────── hour (0–23)
# │ │ ┌───────────── day of the month (1–31)
# │ │ │ ┌───────────── month (1–12)
# │ │ │ │ ┌───────────── day of the week (0–6) (Sunday to Saturday);
# │ │ │ │ │
# │ │ │ │ │
# │ │ │ │ │
  * * * * * <command to execute>
```
That is, 5 fields defining the recurrence rule, and a command to execute.  The syntax also supports ranges and stepping values. Some examples:

```pre title="sample crontab entries"
# run every 15 minutes:
*/15 * * * * <my rapid command>

# run every night at 23:04 (11:04 PM):
4 23 * * * <my daily command>

# 09:23 on every day-of-week from Monday through Friday.
23 9 * * 1-5 <my weekday commands>

# the first day of every-other month
0 0 1 */2 * <my infrequent command>
```
The [crontab guru](https://crontab.guru/) is a helpful resource for translating crontab time syntax into human-friendly time specifications.



### `crontab` commands

Keep  your `crontab` commands as simple as possible, and do not make any assumptions regarding the execution environment (initial working directories, environment variables, etc...). We also recommend redirecting script output to aid in monitoring and debugging.   The *command* can be a short sequence of commands chained together with the shell operator `&&` if desired, for example:
```pre
# run every night at 23:04 (11:04 PM):
4 23 * * * cd /glade/work/<username>/my_cron_stuff/ && ./run_nightly.sh &>> ./run_nightly.log
```
This will run the command `run_nightly.sh` from within the directory `/glade/work/<username>/my_cron_stuff/`, appending both standard output *and* standard error into the file `run_nightly.log`.



---

## Best practices for cron jobs

### Locking for exclusive execution
Many shell scripts are not designed to be run concurrently, and even for those that are, concurrent execution is often not the users' intent.  In such scenarios the user should make provisions so that only one occurrence of the script is running at a time.

*File locking* is a convenient mechanism to implement this behavior, whereby a process will only run after it has gained exclusive access to a resource - in this case a "lock file". This approach is particularly useful under `cron` - if a particular instance of a script is running slow, `cron` could re-launch the same script potentially many times.  File locking prevents such script "pile-up."

The utility `lockfile` can be incorporated into shell scripts as follows:

```bash title="using lockfile to prevent concurrent execution"
LOCK="${HOME}/.my_cron_job.lock"

remove_lock()
{
    rm -f "${LOCK}"
}

another_instance()
{
    echo "Cannot acquire lock on ${LOCK}"
    echo "There is another instance running, exiting"
    exit 1
}

lockfile -r 5 -l 3600 "${LOCK}" || another_instance
trap remove_lock EXIT
```

We declare two utility functions: `remove_lock` and `another_instance`.  The command `lockfile` will attempt to gain exclusive access to our `${LOCK}` file, retrying 5 times (`-r 5`).  If we cannot acquire the desired lock, `another_instance` prints some information and exits the script. Note that when the script exits - cleanly or not - we want to remove our lock file.  We use the bash `trap` mechanism to accomplish this by calling `remove_lock` at `EXIT`.

In this case we forcibly remove any "stale" lock files when more than an hour old (3,600 seconds, `-l 3600`) as defensive measure.  This would be appropriate for a short running script, when we can assume any leftover lock files beyond some threshold age are invalid. See [`man lockfile`](https://linux.die.net/man/1/lockfile) for additional options.

### Pedantic error checking
It is always a good idea to perform error checking inside shell scripts, but especially so when running under cron.  For example, when changing directories inside a script:
```bash
# go to desired directory, exit on failure:
cd /glade/work/${USER}/mydir || exit 1
[...]
```
This will abort the job if the `cd` fails.  (The `|| exit 1` construct is executed only if the first command exits with a failure status.) Without this type of pedantic error checking the script would continue to run, and the remainder of the script would attempt to run, but in the wrong directory - especially dangerous if later steps remove files!!

### Logging

In addition to any typical logging of expected output from your automated processes, it is beneficial to capture some information from the system as well.

For example,
```bash title="logging the execution environment"
timestamp="$(date +%F@%H:%M)"
cron_logdir="${HOME}/.my_cron_logs/"
scriptdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
mkdir -p ${cron_logdir} || exit 1
echo "[${timestamp}]: Running ${0} on $(hostname) from $(pwd); scriptdir=${scriptdir}" \
    | tee -a ${cron_logdir}/particular_tool.log
```
creates the following output:
```pre
[2023-12-11@14:33]: Running ./sample_cron_job.sh on derecho6 from [...]; scriptdir=[...]
```
which can be useful in the future; particularly many years from now if `cron` stops working for you and you have forgotten where your `cron` scripts were located.

## Sample Cron script and `crontab` processes

!!! example "Sample Cron script and `crontab` installation processes"

    Our `cron_driver.sh` script will submit two PBS batch jobs: one for prepossessing to run on Casper, and another model execution to run on Derecho.
	```bash title="cron_driver.sh"
	---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/cron/PBS_submissions/cron_driver.sh"
	```
    The script begins by establishing an exclusive file lock, performing some logging, and then moving to the intended run directory.
    The first job (`prep_job.pbs`) will create a file called `INPUT_DATA` which is used by the second job (`run_model.pbs`).  Because the second job depends on the first, we submit the second using a [PBS job dependency](../../pbs/job-dependencies.md).

    We also remove the `INPUT_DATA` at the beginning of the script - since it *should* be created by `prep_job.pbs`, we want to make sure that step functioned as intended.  In this way if `INPUT_DATA` exists when we execute `run_model.pbs` it can only be because the preceding step ran successfully - and our `INPUT_DATA` is not stale.

    **Sample `crontab` entries**

    First we prepare a simple text file that contains the entries for all our desired cron processes:
	```pre title="my_crontab:"
	---8<--- "https://raw.githubusercontent.com/NCAR/hpc-demos/main/cron/my_crontab"
	```

    **Installing `crontab` entries**

    We can then install, inspect, and edit our entries with the `crontab` command.
	```bash
	# Install my_crontab:
	cron$ crontab ./my_crontab
	```
    **Inspecting `crontab` entries**

	```console
	# Inspect installed crontab:
	cron$ crontab -l
	# run my frequent cron job every 15 minutes
	*/15 * * * * cd /glade/u/home/benkirk/my_cron/ && mkdir -p logs && ./frequent.sh &>> logs/frequent.log

	# run my hourly cron jobs at 10 minutes past every hour
	10 * * * * cd /glade/u/home/benkirk/my_cron/ && mkdir -p logs && ./hourly.sh &>> logs/hourly.log

	# run my daily cron jobs at 00:45 am.
	45 0 * * * cd /glade/u/home/benkirk/my_cron/ && mkdir -p logs && ./daily.sh &>> logs/daily.log
	```

    **Editing `crontab` entries**
	```bash
	# edit my crontab
    # (uses the default editor, or whatever is specified by the EDITOR environment variable)
	cron$ crontab -e
	```
<!--  LocalWords:  cron HPC crontab lockfile scriptdir Derecho Casper
 -->
