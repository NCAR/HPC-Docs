# Process binding

How to pin MPI processes to CPU cores depends on if the programs are
pure MPI programs, hybrid MPI, or OpenMP programs. This [PBS Pro job
script
documentation](file:////display/RC/Cheyenne+job+script+examples) includes
examples of how commands mentioned below are used.

#### Page contents

- [Pure MPI programs (MPI only, no
  threads)](#Processbinding-PureMPIprograms(MPIonly,)

- [Hybrid MPI + OpenMP
  programs](#Processbinding-HybridMPI+OpenMPprograms)

## Pure MPI programs (MPI only, no threads)

For pure MPI programs, the **mpiexec_mpt** launcher automatically pins
MPI processes to CPU cores. This ensures that processes do not migrate
between the CPUs on a node during a run and results in better
performance.

## Hybrid MPI + OpenMP programs

The **omplace** command is an HPE wrapper script for use with
multithreaded MPI programs. Used in conjunction with
the **mpiexec_mpt** launcher, the omplace script pins processes and
threads to the CPUs and ensures optimal memory locality and performance.

Put the omplace command between the mpiexec_mpt command and your
executable, as in this example.

mpiexec_mpt omplace ./a.out
