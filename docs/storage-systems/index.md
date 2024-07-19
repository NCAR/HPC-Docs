# Storage Resources, Data Transfer, and Data Access Resources

CISL provides several broad classes of storage resources and data access mechanisms.
Follow the links below for additional information.

## Storage Resources
- [GLADE](./glade/index.md) for typical POSIX file system use, including resources such as
    - [Home](./glade/index.md#home-space) and [Work](./glade/index.md#work-space) spaces for individual user data,
    - [Scratch Storage](./glade/index.md#scratch-file-space) for *temporary* storage of large-scale modeling and analysis runs.
    - [Campaign Storage](./glade/campaign.md) longer-term online disk storage needs that are not easily accommodated by the scratch or work spaces.
    - The [CMIP Analysis Platform](./cmip-analysis-platform.md), providing researchers convenient access to climate data from the Coupled Model Inter-comparison Project.
- [Quasar](./quasar/index.md) is a cold, tape-based archive for storing curated data collections that have an indefinite lifetime.
- [Stratus](./stratus/index.md) is an object storage disk system for long-term data storage.

## Data Access and Data Transfer

- Dedicated [data-access](./data-access-nodes.md) for facilitating data transfers.
- Tools such as [Globus](./data-transfer/globus/index.md), and [`scp`, `sftp`, `bbcp`](./data-transfer/scp-and-sftp.md) for performing large data set transfers.
