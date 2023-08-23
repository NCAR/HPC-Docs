# Storing temporary files with TMPDIR

Using shared **/tmp**, **/var/tmp** or similar shared directories to
hold temporary files can increase the risk of your own programs and
other users' programs failing when no more space is available. Compilers
and utilities often create such temporary files without your knowledge
of their size or number.

Specifying your own directory for temporary files can help you avoid the
problem.

#### Page contents

- [Interactive use](#StoringtemporaryfileswithTMPDIR-Interac)

- [Batch use](#StoringtemporaryfileswithTMPDIR-Batchus)

## Interactive use

In *interactive use* on the login nodes, the default TMPDIR
is **/glade/scratch/\$USER**. You can change that by running the
commands shown below on your command line when you log in or
by [<u>setting the TMPDIR variable in your start
file</u>](file:////display/RC/Personalizing+start+files).

## Batch use

For *batch use*, CISL recommends setting TMPDIR within each batch script
for all batch jobs. Include these commands as the first two executable
lines of your batch script after the \#PBS directives or \#SBATCH
directives.

#### For bash and ksh users

export TMPDIR=/glade/scratch/\$USER/temp

mkdir -p \$TMPDIR

#### For csh and tcsh users

setenv TMPDIR /glade/scratch/\$USER/temp

mkdir -p \$TMPDIR
