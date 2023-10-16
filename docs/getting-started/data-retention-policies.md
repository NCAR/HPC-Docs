# General data retention policies and procedures

The following general guidelines apply to project and user data.
For a complete listing of all shared file systems, including
purge details for scratch space, see [GLADE file spaces](../storage-systems/glade/index.md).

## Project data

When a sponsored project approaches expiry, there are several
steps in the process that affect the accessibility of associated data:

- 30 days before expiration, the project PIs will receive an email
  reminding them of the pending expiration. The project team should
  assess remaining files and disposition appropriately in preparation
  for group deactivation.

- 90 days after project expiration, the UNIX group associated with the
  project is removed. At this point users with accounts remaining on the
  system will likely no longer have access permissions to the projects'
  data, as the primary group no longer exists. It is
  therefore *imperative* that any remaining project data be relocated
  and ownership permissions assessed prior to this group deactivation.

- Finally, files are removed as scheduled on the timeline described
  above for the relevant file system.

### Restoring access to project data

CISL has limited ability to modify access to project data after the
90-day post-expiry window. Such modifications require the approval of
the original project owner. CISL has no ability to restore data after
the purge or removal policies stated above have taken effect.

## User accounts

User accounts are deactivated when they are no longer associated with an
active project. When a user account is deactivated, several steps in the
process affect the accessibility of the users' data:

- 30 days after a user account is deactivated, a final home directory
  backup is performed and the home directory is removed.

- The user’s work directory is removed. No backup is performed.

- Finally, additional scratch files are removed as scheduled on the
  timeline described above for the relevant file system.

### Restoring access to collaborators' data

A typical request for data access comes not from the departing user, but
from remaining collaborators. Colleagues occasionally request access to
a departed users' files, sometimes many months after the account is
terminated, often when they realize the original owner set permissions
that limit their access.

While CISL has a limited ability to help in these situations, there are
also legal limits to what we can do. For example, CISL cannot share
files beyond the clear intent of the original owner as inferred from the
UNIX file permissions. If a collaborator would like access to a file
that was previously group- or world-readable, we may be able to help. If
the original file was restricted to user-only read, however, we cannot
override those intentions. The only exceptions to this policy are in
compliance with broader UCAR IT records or investigation policies as
described in UCAR's 1-7 Information Security Policy.
