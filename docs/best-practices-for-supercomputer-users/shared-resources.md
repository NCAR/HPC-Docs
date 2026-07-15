# Using Shared HPC Resources

Be considerate of others in the user community when you work with these
shared computing and storage resources. Here are a few key issues to
keep in mind.

## Use login nodes only for their intended purposes

You can run short, non-memory-intensive processes on the login nodes.
These include tasks such as text editing or running small serial scripts
or programs. Memory-intensive processes that slow login node performance
for all users are killed automatically and the responsible parties are
notified by email. See [Appropriate use of login nodes](../compute-systems/derecho/derecho-use-policies.md#appropriate-use-of-login-nodes)
for more information.

## Use the Derecho and Casper nodes that best meet your needs

The Derecho system and Casper nodes are configured for distinct
purposes. Derecho is best used for running climate and weather models
and simulations while the Casper cluster of nodes is for other
specialized work. Most Casper nodes are used for analyzing and
visualizing data while others feature large-memory, dense GPU
configurations that support explorations in machine learning and deep
learning.

This documentation explains how to get jobs running on the most
appropriate system for your work and on the individual types of nodes
that will best meet your needs:

- [Derecho Overview](../compute-systems/derecho/index.md)
- [Casper Overview](../compute-systems/casper/index.md)
- [Submitting jobs with PBS](../pbs/index.md)
  - [Sample Derecho PBS job scripts](../pbs/job-scripts/derecho-job-script-examples.md)
  - [Sample Casper PBS job scripts](../pbs/job-scripts/casper-job-script-examples.md)

For expert assistance or guidance in using these resources, contact
the [NSF NCAR Research Computing help desk](https://rchelp.ucar.edu/).

## Don't monopolize compute resources

Consider what impact you might have on the work of others and schedule
jobs accordingly. For example, avoid writing job submission scripts that
rapidly fill the scheduler with potentially concurrent compute resource
requests. Contact the Consulting Services Group for guidance if your
workload requires you to submit numerous jobs in a short time frame.
CISL monitors the use of these resources and will kill jobs when
necessary to ensure fair access for all users.

## Limit your use of shared licenses

Users share a limited number of licenses for running IDL, MATLAB,
Mathematica, and some other applications. Be familiar with and follow
the established
[license-use guidelines](../environment-and-software/data-analysis-and-visualization.md) to
ensure fair access for all users. CISL reserves the right to kill
jobs/tasks of users who monopolize these licenses.
