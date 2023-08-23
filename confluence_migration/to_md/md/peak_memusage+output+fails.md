# peak_memusage output fails

## Problem

Your **peak_memusage** batch job returns zero length batch output and
error files, or the output provides partial or no results about memory
use, or the job contains the string “Killed” with no further
information.

## Solution(s)

This indicates the job terminated abnormally. The tools cannot provide
meaningful information when the executable being measured does not
execute properly. Try these steps:

1.  Check your output to see if the job is failing prior to memory tool
    output. If it is, correct the problem and rerun the job.

2.  If a parallel job provides only partial results or no results about
    memory use, run the job again using more nodes.

3.  If the parallel job fails when run across more nodes, consider using
    the Allinea DDT advanced memory debugger to isolate the problem.

***Source: [CISL documentation
page](file:////display/RC/Checking+memory+use).***

## Related articles

- Page:

> [Why did my Cheyenne job
> fail?](file:////pages/viewpage.action%3fpageId=23494657)

- Page:

> [Login node processes
> killed](file:////display/RC/Login+node+processes+killed)

- Page:

> [Batch job(s)
> crashing](file:////display/RC/Batch+job%2528s%2529+crashing)

- Page:

> [How to report a job
> failure](file:////display/RC/How+to+report+a+job+failure)

- Page:

> [Duo: Getting started with two-factor
> authentication](file:////display/RC/Duo%253A+Getting+started+with+two-factor+authentication)
