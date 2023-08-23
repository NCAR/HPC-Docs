# Batch job(s) crashing

## Problem

Your batch job crashes shortly after execution and the output provides
no explanation.

## Solution

If you suspect memory problems, examine recent changes to your code or
runtime environment.

Ask yourself questions like these:

- When did you last run the job successfully? Since then, was the
  model's resolution increased?

- Did you port your code from a computer having more memory?

- Did you add new arrays or change array dimensions?

- Have you modified the batch job script?

If the answer to those questions is “no,” your job might be failing
because you have exceeded your disk quota rather than because of a
memory issue. To check, follow these steps:

- Run the **gladequota** command on Cheyenne.

- Check the "% Full" column in the command's output.

- Clean up any GLADE spaces that are at or near 100% full.

- Look for core files or other large files that recent jobs may have
  created.

- Exceeding disk quota at runtime can result in symptoms that are
  similar to those resulting from memory problems. If running gladequota
  doesn't indicate a problem, consider using the Allinea DDT advanced
  memory debugger to isolate the problem.

If you have tried all of the above and are still troubled that your job
is exceeding usable memory, submit a help request at [NCAR Research
Computing](https://rchelp.ucar.edu) (login required) and include the
relevant job number(s). The consultant on duty can search the job logs
for information.

***Source: [CISL documentation
page](file:////display/RC/Checking+memory+use).***

## Related articles

- Page:

> [NCAR Strategic Capability (NSC)
> projects](file:////display/RC/NCAR+Strategic+Capability+%2528NSC%2529+projects)

- Page:

> [GLADE file spaces](file:////display/RC/GLADE+file+spaces)

- Page:

> [Debugging and profiling with Forge tools on
> Derecho](file:////display/RC/Debugging+and+profiling+with+Forge+tools+on+Derecho)

- Page:

> [New user orientation](file:////display/RC/New+user+orientation)

- Page:

> [Acknowledging NCAR and
> CISL](file:////display/RC/Acknowledging+NCAR+and+CISL)
