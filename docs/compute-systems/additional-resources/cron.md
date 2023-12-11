
Occasionally users may want to automate a common recurring task.  Typical use cases are to initiate batch jobs, transfer input data from an external site, or run some automated testing. The UNIX `cron` service allows users to schedule scripts to be run based on a recurrence rule.  As of December 2023 we have deployed a high-availability `cron` service independent of the individual HPC systems to support these workflows.  This separated, HA solution allows us to perform maintenance on the HPC resources while not interrupting `cron` workflows that can tolerate the downtime.



## Logging in

Once you have [an HPC systems account](../../getting-started/accounts/index.md),
you can log in to `cron.hpc.ucar.edu` via `ssh` command as shown here:
```
ssh username@cron.hpc.ucar.edu
```

This will place you on one of the high-availability `cron` servers.

### Cron server IP addresses
For certain automation workflows, external sites need to "allow" access from NCAR's systems based on IP address.

- `cron1.hpc.ucar.edu`:  XX.YY
- `cron2.hpc.ucar.edu`:  XX.ZZ

## User environment and resource restrictions.

Each user is placed into a *control group* to limit overall system resource utilization.  User `cron` processes are limited to a single CPU core and 1GB of system memory.  The typical [GLADE file systems](../../storage-systems/glade/index.md) are accessible, however there is no default software environment provided.

---

## Installing and editing `crontab` entries
To schedule a process with `cron`, a user must establish a `crontab` entry. This can be done interactively by running the command `crontab -e` to edit your crontab directly, or by creating a file and "installing" it with `crontab <filename>`.  In either case, the `crontab` entry has a very particular, fixed format.


### `crontab` syntax

```pre title="sample crontab format"
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
That is, 5 fields defining the recurrence rule, and a command to execute.  The syntax also supports ranges and stepping values, some examples:

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

You can list your current crontab entries via `crontab -l`.

### `crontab` commands

Keep  your `crontab` commands as simple as possible, and do not make any assumptions regarding the execution environment (paths, initial working directories, environment variables, etc...). We also recommend redirecting script output to aid in monitoring and debugging.   The *command* can be a short sequence of commands chained together with the shell operator `&&` if desired, for example:
```pre
# run every night at 23:04 (11:04 PM):
4 23 * * * cd /glade/work/<username>/my_cron_stuff/ && ./run_nightly.sh  &>> ./run_nightly.log
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
This will abort the job if the `cd` fails.  (The `|| exit 1` construct is executed only if the first command exists with a failure status.) Without this type of pedantic error checking the script would continue to run, and the remainder of the script would attempt to run, but in the wrong directory!

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

### Sample Cron script

<!--  LocalWords:  cron HPC crontab lockfile scriptdir
 -->
