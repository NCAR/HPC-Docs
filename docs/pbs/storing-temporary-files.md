## Storing temporary files with `TMPDIR`

`/tmp`, `/var/tmp`, or similar shared directories to
hold temporary files can increase the risk of your own programs and
other users' programs failing when no more space is available. Compilers
and utilities often create such temporary files without your knowledge
of their size or number.

Specifying your own directory for temporary files can help you avoid the
problem.


### Interactive use

In *interactive use* on the login nodes, the default TMPDIR
is `/glade/derecho/scratch/$USER/tmp`. You can change that by running the
commands shown below on your command line when you log in or
by [setting the `TMPDIR` variable in your start file](../environment-and-software/user-environment/customizing.md).

### Batch use

For *batch use*, CISL recommends setting `TMPDIR` within each batch script
for all batch jobs. Include these commands as the first two executable
lines of your batch script after the `#PBS` directives.

=== "bash/zsh"
    ```bash
    export TMPDIR=$SCRATCH/tmp && mkdir -p $TMPDIR
    ```

=== "tcsh"
    ```tcsh
    setenv TMPDIR $SCRATCH/tmp && mkdir -p $TMPDIR
    ```

## Using `/local_scratch/` on Casper nodes
