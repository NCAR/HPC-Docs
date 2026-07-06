# Using Agentic Coding Assistants

Agentic coding assistants, including tools such as Claude Code, OpenAI Codex,
Gemini CLI, and GitHub Copilot, can read and edit files, run shell
commands, install software, and submit jobs on your behalf. That
autonomy is useful, but on a shared system it can cause problems
quickly: an assistant does not know NSF NCAR policy unless you tell it,
and everything it does runs under your account and against your
allocation. You remain fully responsible for the assistant's actions.
The practices below help you use these tools without disrupting other
users.

## Schedule heavy commands rather than running them on a login node

Light use of an assistant on a login node is fine. Use cases such as editing files,
inspecting code, small serial scripts, and short builds are all
appropriate, just as they are for any login-node work. The problem is
that assistants readily reach for heavier operations: long compilations,
test suites, data downloads, and analysis or model runs. These are the
memory and CPU intensive processes that should run on a batch node, not
a login node (see
[Use login nodes only for their intended purposes](./shared-resources.md#use-login-nodes-only-for-their-intended-purposes)).

Instruct the assistant to schedule heavy commands instead of running
them directly. The NCAR-provided `qcmd` command is well suited to this:
it submits a single command as a batch job and waits for it to finish,
so an assistant can use it as a drop-in wrapper for an expensive step.

```bash
# Run a heavy build on a batch node instead of the login node
qcmd -A <PROJECT> -- make -j 4
```

By default `qcmd` requests one node on the `develop` queue and waits for
completion; supply your project code with `-A` or the `PBS_ACCOUNT`
environment variable. For interactive development on a compute node, the
assistant can instead work inside a `qinteractive` session. See
[Submitting your first job](../pbs/index.md#submitting-your-first-job)
for `qcmd`, `qinteractive`, and `qsub`. The example configuration file ([AGENTS.md](#example-agentsmd-file))
below encodes this rule.

## Require approval before the assistant runs commands

Most assistants offer an automatic or "auto-accept" mode that runs
commands without asking. Do not use it on shared systems. Keeping a
human in the loop for shell commands lets you catch a runaway `qsub`
loop, a recursive delete, or a job that would consume a large portion of
your allocation before it executes. Review proposed commands, and
especially proposed job scripts, before approving them.

## Protect shared file spaces and permissions

An assistant creates, edits, moves, and deletes files. Make sure it does
so in the right place and with the right permissions:

- Confine the assistant to a project directory rather than pointing it
   at your whole `/glade/u/home` space or a space you share with
   colleagues.
- Have it use [GLADE scratch](../storage-systems/glade/index.md) for
   temporary and intermediate files, and reserve `work` and project
   spaces for durable output, following best practices such as
   [using the most appropriate storage system](./managing-files.md#use-the-most-appropriate-storage-system).
- Set [file and directory permissions](../storage-systems/glade/setting-file-directory-permissions.md)
   when files are created, and watch for an assistant loosening
   permissions (for example, `chmod 777`) to "make something work."
- Watch for assistants generating tens of thousands of files; the
   [2,000–3,000 files per directory](./managing-files.md#configure-jobs-to-avoid-massive-directories)
   guidance applies to agent-generated output too.

## Don't let the assistant search or traverse from high-level paths

To orient itself, an assistant will often search the file tree using commands like
`find`, `grep -r`, `ripgrep`, `du`, `ls -R`, `tree`, and similar. On
GLADE these commands query shared metadata servers, and a recursive walk
of a large tree creates a metadata "storm" that slows the file system for
everyone. The same command that is trivial on a laptop can be
disruptive here.

Instruct the assistant never to traverse or search at or above shared
roots such as `/glade`, `/glade/u/home`, `/glade/work`, or
`/glade/derecho/scratch`. It should only walk inside a specific
directory you own, for example `/glade/derecho/scratch/$USER/...` and
always bound the search with a depth limit (`-maxdepth`) and an exact
subpath rather than a broad wildcard.

Where a search is unavoidable inside your own Lustre scratch space,
`lfs find` queries Lustre metadata more efficiently than plain `find`.
On GPFS spaces (`home`, `work`, `campaign`) use a tightly scoped
`find` instead. The example configuration file below spells these rules out.

## Mind your allocation

Because an assistant can submit jobs and start processes, it can charge
core-hours and consume storage without you noticing. Review any job
script or `qsub` command it proposes, confirm the queue and resource
request, and check your usage afterward. See
[Managing allocations](./managing-allocations.md).

Before letting an assistant drive a large experiment, contact the
[NSF NCAR Research Computing help desk](https://rchelp.ucar.edu/) as you
would for any large run.

## Keep credentials and sensitive data out of reach

Assistants read files in their working directory and may transmit that
content to a cloud model. Do not run an assistant in a directory that
contains SSH private keys, API tokens, passwords, or restricted or
embargoed data. Keep secrets in environment variables or a secrets
store rather than in tracked files and tell the assistant which paths
to ignore.

## Give the assistant project context with an `AGENTS.md` file

Most assistants look for a Markdown instructions file in your project
and load it automatically before doing any work. `AGENTS.md` is an open,
cross-tool convention read by Codex, Gemini CLI, GitHub Copilot, Cursor,
and many others; Claude Code reads `CLAUDE.md` (and can also import
`AGENTS.md`). Placing one of these at the root of your project is the
most reliable way to make an assistant follow the practices above.
Be sure to keep it short and specific!

The example below is a starting point you can copy into a `CLAUDE.md` or
`AGENTS.md` file at the root of your project and adapt to your work.

!!! tip
    To support multiple tools from a single source, keep the content in
    `AGENTS.md` and make `CLAUDE.md` a symlink to it, or have `CLAUDE.md`
    contain a single line importing it using the syntax `@path/to/AGENTS.md`.

## Example `AGENTS.md` file

```markdown
# Working on NSF NCAR HPC shared systems

This assistant runs on **shared login nodes** (Derecho/Casper) and operates on
**GLADE**, a multi-petabyte shared parallel filesystem. Commands that are cheap on a
laptop can degrade the system for every other user here. Follow these rules in
addition to anything I ask.

## Filesystem traversal — never recurse/search from high-level paths

GLADE metadata servers are shared. A recursive walk or search of a large tree (find,
lfs find, du, ls -R, tree, grep -r, ripgrep/rg, wc -l over many files) hammers the
metadata servers and slows the filesystem for every user.

- NEVER run `find`, `lfs find`, `du`, `ls -R`, `tree`, `grep -r`, `rg`, or any
  recursive / globbing traversal or search at or above these levels:
  `/`, `/glade`, `/glade/u`, `/glade/u/home`, `/glade/work`, `/glade/campaign`,
  `/glade/derecho`, `/glade/derecho/scratch`, or any other shared root.
- Only traverse inside a specific user or project subdirectory you own or were pointed
  at — e.g. `/glade/derecho/scratch/$USER/...`, `/glade/work/$USER/...`,
  `/glade/u/home/$USER/...`. Never one level up from there.
- Always bound traversals: add `-maxdepth`, target an exact subpath, and avoid wildcard
  globs that expand to thousands of entries.
- Prefer locating files via a known path or a project index over searching the tree.

## Match the tool to the filesystem type

GLADE is a mix of filesystem technologies, and the right traversal tool differs:

- **Lustre** — `/glade/derecho/scratch` is Lustre. When you must search within your own
  scratch subdirectory, prefer `lfs find` over plain `find`: it queries Lustre metadata
  more efficiently and avoids per-file stat storms on the MDS. Still scope it to
  `/glade/derecho/scratch/$USER/...` and bound the depth.
- **GPFS** — `/glade/u/home`, `/glade/work`, and `/glade/campaign` are GPFS. `lfs`
  commands do not apply here. Use a tightly scoped `find` with `-maxdepth` against an
  exact subpath, never a broad GPFS tree.

## Compute — schedule heavy work, don't run it on a login node

Light use of a login node is fine: editing, inspecting code, small serial scripts,
and short builds. Heavy work should be scheduled on a batch node.

- Do NOT run CPU/GPU/memory-intensive work directly on a login node: long
  compilations, test suites, large data processing/downloads, model inference, or
  model runs.
- Schedule a single heavy command with `qcmd`, which submits it as a batch job and
  waits for completion: `qcmd -A <PROJECT> -- <command>` (e.g.
  `qcmd -A <PROJECT> -- make -j 4`). For multi-step or interactive work, use a
  `qinteractive` session or a `qsub` job script.
- Show me any `qcmd`/`qsub` command or job script and wait for approval before
  submitting — jobs cost core-hours against my allocation (project/account code:
  <PROJECT>).
- Cap build parallelism — never `make -j` unbounded; use a small fixed `-j` (e.g. 2–4).
- Don't load large files wholly into memory (`cat`/reading multi-GB files). Use
  `head`/`tail`/streaming, and read only the byte ranges you need.

## Processes & I/O

- Don't spawn many parallel processes or long-running background jobs. Prefer one
  foreground command at a time; clean up anything you background.
- Avoid tight polling loops (`tail -f`, repeated `ls`/`stat` in a loop).
- Write large or numerous outputs to scratch/work, never to `$HOME` (small, backed-up
  quota). Avoid creating huge numbers of tiny files — it's expensive on a parallel FS
  (keep under ~2,000–3,000 per directory).
- Use relative paths and `$USER`; never hardcode usernames or absolute home paths.

## Files, permissions, and secrets

- Set sensible permissions on new files; never use `chmod 777`. Ask before deleting
  files, changing permissions, or running anything recursive (`rm -rf`, `chmod -R`).
- Never read, print, or copy SSH keys, API tokens, passwords, or any
  restricted/embargoed data. Keep secrets in environment variables, not tracked files.

## Software environment

- Software is provided through Lmod. Use `module load <name>`; do not install system
  packages. Use a conda/virtualenv or `pip install --user` for Python packages.

## Code conventions (fill in for your project)

- <language/framework and versions, e.g. Fortran 2008, NetCDF-Fortran>
- Build command: <e.g. the job script that wraps `make`>
- Test command: <e.g. the qsub script that runs the test suite>
- <Any style rules that differ from defaults>

## When unsure

If a command might touch a large tree or use significant CPU/memory, stop and scope it
down (narrower path, depth limit, batch job) or ask before running it.
```
