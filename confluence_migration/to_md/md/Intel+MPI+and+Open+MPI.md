# Intel MPI and Open MPI

Some Cheyenne users need to run Intel MPI or Open MPI instead of the HPE
Message Passing Toolkit (MPT) MPI library that is loaded by default in
the Cheyenne environment.

To do this, modify a [PBS job
script](file:////display/RC/Cheyenne+job+script+examples) to load the
appropriate module or modules, then use the **mpirun** command (with -n
to specify the number of processes to use) instead of **mpiexec_mpt**.
See the examples below.

#### Page contents

- [For Intel MPI](#IntelMPIandOpenMPI-ForIntelMPI)

- [For Open MPI](#IntelMPIandOpenMPI-ForOpenMPI)

## For Intel MPI

To use Intel MPI, the binary must be compiled and linked against the
Intel MPI library with the Intel compiler.

Include the **module load** command in your script as shown below to
enable **impi** at runtime.

module load intel

module load impi

mpirun -n \[number of processes\] ./executable_name.exe

## For Open MPI

To use Open MPI, the binary must be compiled and linked against the Open
MPI library with either the Intel compiler or GNU compiler.

Include the **module load** command in your script as shown below to
enable **openmpi** at runtime. Also load the compiler that you used to
compile your executable.

module load openmpi

module load compiler_modulefile_name/n.n.n

mpirun -n \[number of processes\] ./executable_name.exe
