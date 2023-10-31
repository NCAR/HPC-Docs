
This page is intended to provide a high-level comparison of Derecho to Cheyenne, particularly for users comfortable with Cheyenne operations and looking for a reference guide for transitioning workflows.


## Processes & Procedures for Derecho vs. Cheyenne

- **Allocations**: Users must have a project allocation to use Derecho.  Derecho CPU and GPU resources are allocated as separate entities.

-  **Logging in**: `ssh` is used similarly to access both systems.
    *Please note for Derecho the host name is* <strong><tt>derecho<font color="#ff0000">.hpc.</font>ucar.edu</tt></strong>

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

- **Compiling**: Derecho maintains the `intel` compilers as default. Additional compilers are available through the module system, occasionally with different naming conventions.

    In general the compilers on Derecho are much newer than their counterparts on Cheyenne, for example the default version of the GNU Compiler Collection on Derecho is accessible via the `gcc/12.2.0` module, whereas Cheyenne's default is `gnu/10.1.0`.

    !!! danger "Check CPU architecture flags!!"
        When recompiling users should pay special attention to any architecture-specific CPU optimization flags.
        Derecho uses AMD Milan processors, which perform well with code compiled with `-march=core-avx2` under Intel and GCC.

        **DO use on Derecho**: `-march=core-avx2`

        Be especially careful not to use some other flags commonly used on Cheyenne, as these will create sub-optimal
        code that will run slower than otherwise possible, or may fail to execute altogether.
        <strong><font color="#ff0000">Do NOT use on Derecho</font></strong>: `-xHost` , `-axHost` , `-xCORE-AVX2` , `-axCORE-AVX2`


    ??? note "What's the difference between the `intel`, `intel-oneapi`, `intel-classic` modules?"
        Users migrating from Cheyenne and previous Casper deployments may
        note there are several "flavors" of the Intel compiler available
        through the module system.

        Intel is currently moving from their "classic" compiler suite to
        the new "OneAPI" family.  During this process both sets of
        compilers are available, but through different commands under different `module` selections:

        |  Module         | **Fortran** | **C** | **C++** |
        |-----------------|-------------|-------|---------|
        | `intel-classic` | `ifort`     | `icc` | `icpc`  |
        | `intel-oneapi`  | `ifx`       | `icx` | `icpx`  |
        | `intel`<br>(default) | `ifort` | `icx` | `icpx` |

        The `intel-classic` module makes the familiar `ifort/icc/icpc`
        compilers available, however it is expected these will be
        deprecated during Casper's lifetime.  At this stage we expect to
        keep existing compiler versions available, however there will be
        no further updates.

        The `intel-oneapi` module uses the new `ifx/icx/icpx` compilers.

        The default `intel` module presently uses the older `ifort`
        Fortran compiler along with the newer `icx/icpx` C/C++ compilers.
        This choice is intentional as the newer `ifx` does not reliably
        match the performance of `ifort` in all cases.  We will continue
        to monitor the progress of the OneAPI compilers and will change
        this behavior in the future.

        ---

        **Users migrating particularly old code bases from Cheyenne may wish
        to try the `intel-classic` compilers if `intel` causes excessive warnings
        that are not easily resolved.  The `intel-classic` compilers are less
        stringent with certain standards compliance checks. Note however this
        is not a permanent solution, as Intel will deprecate the Classic series
        at some point in Derecho's lifespan.**



- **PBS Job Submission**:  PBS is use to launch jobs on Derecho similar to Cheyenne.  Job submission and monitoring via `qsub`, `qstat`, `qdel` etc... are similar between the systems.
    - *Queues*: On Derecho the default PBS queue `main` takes the place of the three queues `regular`, `premium`, and `economy` on Cheyenne.

    - *Job Priority*: On Derecho users request a specific job priority via the `#PBS -l job_priority=<regular|premium|economy>` resource directive, instead of through distinct queues.

    - `select` *statements for CPU jobs*: Derecho CPU nodes have 128 cores.  A typical PBS resource selection statement is `#PBS -l select=10:ncpus=128:mpiprocs=128:ompthreads=1`.

    - *Memory*: Each CPU node has a maximum of 235GB of RAM available for user jobs.  Derecho CPU nodes are all identical - there is no notion of `largemem` or `smallmem` CPU nodes.  Users requiring more memory per core than the 235GB/128 default configuration allows will need to *under-subscribe* CPU nodes, that is, leave some cores idle in order to increase the effective memory-per-utilized-core.

- **MPI Environment**: Derecho and Cheyenne differ significantly in their default MPI configurations.  Derecho uses `cray-mpich` by default, vs. Cheyenne's Message Passing Toolkit (MPT) implementation.

    - *Launching jobs with* `mpiexec`: Derecho uses the `mpiexec` launcher specified by the MPI standard.  (There is no `mpiexec_mpt` on Derecho.) Additional command-line arguments are required to specify processor layout for `mpiexec`:
      ```pre
      mpiexec -n <# Total Ranks> -ppn <# Ranks Per Node > ./executable
      ```
      see `man mpiexec` on Derecho for additional details.

    - *MPI Environment Variables*: Any users leveraging MPT-specific environment variables in their job scripts to change default behavior should first test their application first with default configurations to determine if such approaches are still necessary, and if so will need to find `cray-mpich` equivalents - see `man intro_mpi` on Derecho or reach out to consulting for assistance.

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
