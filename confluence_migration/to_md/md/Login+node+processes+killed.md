# Login node processes killed

## Problem

The Cheyenne system automatically kills processes that consume excessive
resources when running on the login nodes.

## Solution

- Use the system's [compute
  nodes](file:////display/RC/Starting+Cheyenne+jobs) instead of the
  login nodes.

- Follow the guidelines below for appropriate use of login nodes.

### Appropriate use of login nodes

> Users may run short, non-memory-intensive processes interactively on
> the Cheyenne system's login nodes. These include tasks such as text
> editing or running small serial scripts or programs.
>
> However, the login nodes **may not** be used to run processes that
> consume excessive resources. This is to ensure an appropriate balance
> between user convenience and login node performance.
>
> This applies to individual processes that consume excessive amounts of
> CPU time, more than a few GB of memory, or excessive I/O resources. It
> also applies collectively to multiple concurrent tasks that an
> individual user runs.
>
> Processes that use excessive resources on the login nodes are
> terminated automatically. Affected users are informed by email that
> their sessions were terminated. They are also advised to run such
> processes in batch or interactive jobs on the Casper cluster.
>
> See [Checking memory use](file:////display/RC/Checking+memory+use) for
> how to use the **peak_memusage** utility.
