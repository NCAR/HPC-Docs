
This page is intended to provide a high-level comparison of Derecho to Cheyenne, particularly for users comfortable with Cheyenne operations and looking for a reference guide for transitioning workflows.


## Processes & Procedures for Derecho vs. Cheyenne

- **Allocations**: Users must have a project allocation to use Derecho.  Derecho CPU and GPU resources are allocated as separate entities.

-  **Logging in**: `ssh` is required to access both systems.
    *Please note for Derecho the host name is* <strong>derecho<font color="#ff0000">.hpc.</font>ucar.edu</strong>

    !!! note "`ssh` access to Derecho vs. Cheyenne"
        === "Derecho"
            The fully-qualified domain name (FQDN) for Derecho is `derecho.hpc.ucar.edu`.
             ```pre
             ssh username@derecho.hpc.ucar.edu
             ```
        === "Cheyenne"
            The fully-qualified domain name (FQDN) for Cheyenne is `cheyenne.ucar.edu`.
             ```pre
             ssh username@cheyenne.ucar.edu
             ```

- **Home and Work file spaces**: Derecho and Cheyenne share the work spaces `/glade/u/home/${USER}` and `/glade/work/${USER}`.  No action is necessary to migrate or synchronize these file spaces.

- **Scratch file space**:  Users are allocated 30TB data / 12 Million files of scratch quota at `/glade/derecho/scratch/${USER}`.
    - *Moving Files from Cheyenne*: Derecho and Cheyenne have distinct scratch files systems. Users may access their Cheyenne scratch contents on Derecho from `/glade/cheyenne/scratch/${USER}`. No attempt is made to automatically transfer contents between the systems, as scratch storage is intended to be temporary and tied to specific job workflows.  (Users interested in duplicating contents between systems on their own may follow instructions [here](https://docs.google.com/document/d/1xwIPnhicMEk8RnKZsQZ8UtSNrBkm9NfDnnjvx5ChbDA/edit?usp=sharing).)

- **Project file space**:  The Campaign Storage file system is mounted across all of Derecho and Cheyenne, and should be used for shared project storage.  The Cheyenne project spaces `/glade/p/` and `/glade/collections/` are deprecated and are being migrated into `/glade/campaign/` as part of the Cheyenne decommissioning process.

- **PBS Job Submission**:  PBS is use to launch jobs on Derecho similar to Cheyenne.  Job submission and monitoring via `qsub`, `qstat`, `qdel` etc... are similar between the systems.
    - *Queues*: On Derecho the default PBS queue `main` takes the place of the three queues `regular`, `premium`, and `economy` on Cheyenne.
    - *Job Priority*: On Derecho users request a specific job priority via the `#PBS -l job_priority=<regular|premium|economy>` resource directive, instead of through distinct queues.
    - `select` *statements for CPU jobs*: Derecho CPU nodes have 128 cores.  A typical PBS resource selection statement is `#PBS -l select=10:ncpus=128:mpiprocs=128:ompthreads=1`.
    - *Memory*: Each CPU node has a maximum of 235GB of RAM available for user jobs.  Derecho CPU nodes are all identical - there is no notion of `largemem` or `smallmem` CPU nodes.  Users requiring more memory per core than the 235GB/128 default configuration allows will need to *under-subscribe* CPU nodes, that is, leave some cores idle in order to increase the effective memory-per-utilized core.

- **MPI Environment**:
    - *Launching jobs with* `mpiexec`:
    - *Process binding*:

---
## Comparison References
### User Environment Comparison

Click on the image below for a detailed comparison of Cheyenne and Derecho key user environment differences.
![](media/env_comp.png)

### Hardware Comparison

Click on the image below for a detailed comparison of Cheyenne and Derecho hardware.
![](media/hw_comp.png)

<!--  LocalWords:  Derecho derecho FQDN
 -->
