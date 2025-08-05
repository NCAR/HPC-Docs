# CMIP Analysis Platform

The CMIP Analysis Platform gives researchers convenient access to
climate data from the Coupled Model Inter-comparison Project (CMIP) on
CISL’s GLADE disk storage resource.

!!! note
    The tables below show which data sets are already available on GLADE.
    They are updated each Friday.  These data are be located under
    ```pre
    /glade/campaign/collections/cmip.mirror/
    ```

## CMIP6 data sets on GLADE

<iframe frameborder="1" height="1200" scrolling="yes" src="https://status.cisl.ucar.edu/uss/CMIP_AP/available_cmip6.html" width="640"></iframe></p>

<!-- ### CMIP5 -->

<!-- <p><iframe frameborder="1" height="1200" scrolling="yes" src="https://status.cisl.ucar.edu/uss/CMIP_AP/available_cmip5.html" width="640"></iframe></p> -->

---
## Downloading additional data sets
If what you need is not already on GLADE, the `esgfsearch` and
`esgfdownload` tools may be used to download additional data sets.
These tools are based on the
[intake-esgf](https://intake-esgf.readthedocs.io/en/latest/) project.

This process assumes you are familiar with the typical CMIP *facets* and associated nomenclature, if not please refer to the [intake-esgf beginners guide](https://intake-esgf.readthedocs.io/en/latest/beginner.html) for an introduction or review the [CMIP6 Core Controlled Vocabularies](https://wcrp-cmip.github.io/CMIP6_CVs/) for additional details.

### Searching
The `esgfsearch` tool can be used to identify available data sets and
refine matching criteria prior to initiating the download
process. `esgfsearch` is configured to identify existing data in our
shared `/glade/campaign/collections/cmip.mirror/` repository and only
download additional data when necessary.

!!! example "Using `esgfsearch`"

    **Search Criterion**

    `esgfsearch` takes a number of command-line arguments matching CMIP facet nomenclature.
    In this case we will look for a single variable, `tas`, which represents the near-surface air temperature.
    We restrict the search to the `historical` experiment for two different model sources, at a monthly output frequency.

    ```pre
    esgfsearch \
      --experiment_id historical \
      --source_id CanESM5 CESM2 \
      --frequency mon \
      --variable_id tas
    ```
    For a complete list of search parameters, run `esgfsearch --help`.

    **Search Output**

    The example above produces the following output:
    ```pre
    #-------------------------------------------------------------------------------
    # Calling ESGFCatalog().search() with arguments:
    #        project : ['CMIP6']
    #      source_id : ['CanESM5', 'CESM2']
    #  experiment_id : ['historical']
    #      frequency : ['mon']
    #    variable_id : ['tas']
    #-------------------------------------------------------------------------------

    Summary information for 76 results:
    mip_era                                                     [CMIP6]
    activity_drs                                                 [CMIP]
    institution_id                                        [CCCma, NCAR]
    source_id                                          [CanESM5, CESM2]
    experiment_id                                          [historical]
    member_id         [r10i1p1f1, r10i1p2f1, r11i1p1f1, r11i1p2f1, r...
    table_id                                                     [Amon]
    variable_id                                                   [tas]
    grid_label                                                     [gn]
    dtype: object
        project mip_era activity_drs institution_id source_id experiment_id  member_id table_id variable_id grid_label   version                                                 id
    0     CMIP6   CMIP6         CMIP          CCCma   CanESM5    historical  r10i1p1f1     Amon         tas         gn  20190429  [CMIP6.CMIP.CCCma.CanESM5.historical.r10i1p1f1...
    5     CMIP6   CMIP6         CMIP          CCCma   CanESM5    historical  r10i1p2f1     Amon         tas         gn  20190429  [CMIP6.CMIP.CCCma.CanESM5.historical.r10i1p2f1...
    9     CMIP6   CMIP6         CMIP          CCCma   CanESM5    historical  r11i1p1f1     Amon         tas         gn  20190429  [CMIP6.CMIP.CCCma.CanESM5.historical.r11i1p1f1...
    13    CMIP6   CMIP6         CMIP          CCCma   CanESM5    historical  r11i1p2f1     Amon         tas         gn  20190429  [CMIP6.CMIP.CCCma.CanESM5.historical.r11i1p2f1...
    17    CMIP6   CMIP6         CMIP          CCCma   CanESM5    historical  r12i1p1f1     Amon         tas         gn  20190429  [CMIP6.CMIP.CCCma.CanESM5.historical.r12i1p1f1...
    ..      ...     ...          ...            ...       ...           ...        ...      ...         ...        ...       ...                                                ...
    297   CMIP6   CMIP6         CMIP           NCAR     CESM2    historical   r5i1p1f1     Amon         tas         gn  20190308  [CMIP6.CMIP.NCAR.CESM2.historical.r5i1p1f1.Amo...
    302   CMIP6   CMIP6         CMIP           NCAR     CESM2    historical   r6i1p1f1     Amon         tas         gn  20190308  [CMIP6.CMIP.NCAR.CESM2.historical.r6i1p1f1.Amo...
    307   CMIP6   CMIP6         CMIP           NCAR     CESM2    historical   r7i1p1f1     Amon         tas         gn  20190311  [CMIP6.CMIP.NCAR.CESM2.historical.r7i1p1f1.Amo...
    311   CMIP6   CMIP6         CMIP           NCAR     CESM2    historical   r8i1p1f1     Amon         tas         gn  20190311  [CMIP6.CMIP.NCAR.CESM2.historical.r8i1p1f1.Amo...
    315   CMIP6   CMIP6         CMIP           NCAR     CESM2    historical   r9i1p1f1     Amon         tas         gn  20190311  [CMIP6.CMIP.NCAR.CESM2.historical.r9i1p1f1.Amo...

    [76 rows x 12 columns]
    Determining file sizes...
    --> Search found 91 total files / 5.67 GiB
    --> Existing: 29 files / 2.64 GiB
    --> Download required: 62 files / 3.03 GiB
    ```

    The output repeats the search criteria and previews the matching data in a table format. The final lines show:

    1. The total number and volume of files matching the search criteria,
    2. the subset of these files already existing on GLADE, and
    3. the amount of data that must be downloaded to complete the request.

    ---

    By default `esgfsearch` will match all known `member_id` factes for a
    given search, which may result in much more data than necessary
    depending on your use case. When only a single variant is required,
    commonly `r1i1p1f1`; this can be selected with the
    `--member_id` search argument.

### Downloading
When you are satisfied with your search criteria, simply replace the
`esgfsearch` command shown above with `esgfdownload` to begin the download
process. These files will be placed into a temporary staging directory
and then copied into the shared repository for general user access,
with these temporary copies being removed automatically 7 days later.
We recommend creating a shell script with the final syntax so that it
can be repeated easily if necessary, or restarted if the download
process is interrupted.

!!! warning inline end "Check your scratch space!"
    Downloading additional data requires you have adequate scratch space available.
    Use `gladequota` [as described here](glade/index.md#gladequota-command) to determine your
    available scratch space and make sure it is large enough to
    accommodate the "download required" data volume reported by
    `esgfsearch`.
Large queries may result in thousands of files and a terabyte (or more)
of data, which may take several hours to completely download.  If the
download is interrupted, simply restarting the download should continue the process,
recognizing previously downloaded items. Any new files will be downloaded into a temporary staging path at
`/glade/campaign/collections/cmip.mirror/.tmp/${USER}/`.
**This space is mapped to the Derecho Scratch filesystem, and
therefore these temporary files will count against your scratch
quota.**

A system process runs several times daily and
looks for new user downloads to ingest into the shared
`/glade/campaign/collections/cmip.mirror/` space.
Once these files are available in the shared repository
you may manually delete your downloads to immediately regain scratch
quota, or simply wait for the system to automatically remove your
temporary staged files 7 days after last access time.

`esgfdownload` supports two additional command line arguments that may be useful:

- `--list-paths`: will list the GLADE paths to all the NetCDF files satisfying your query,
- `--download-log`: will output the [download log](https://intake-esgf.readthedocs.io/en/latest/logging.html) when complete.
  This option can be useful in identifying the reason for any download failures.

Run `esgfdownload --help` to see all supported options.

??? example "Searching, downloading, and querying results (click to expand)"

    **Search:**

    Here we search for a particular variant of two models, requesting only the the `pr` and `tas` variables:
    ```pre
    esgfsearch \
      --experiment_id historical \
      --source_id CanESM5, ACCESS-CM2 \
      --variable_id pr,tas \
      --frequency mon \
      --member_id r10i1p1f1

    ```
    As we can see from the results of the 6 matching files; one exists in the shared repository and the remaining 5 will require downloading:
    ```pre
    #-------------------------------------------------------------------------------
    # Calling ESGFCatalog().search() with arguments:
    #          quiet : True
    #        project : ['CMIP6']
    #      source_id : ['CanESM5', 'ACCESS-CM2']
    #  experiment_id : ['historical']
    #      member_id : ['r10i1p1f1']
    #      frequency : ['mon']
    #    variable_id : ['pr', 'tas']
    #-------------------------------------------------------------------------------

    Summary information for 4 results:
    mip_era                         [CMIP6]
    activity_drs                     [CMIP]
    institution_id    [CCCma, CSIRO-ARCCSS]
    source_id         [CanESM5, ACCESS-CM2]
    experiment_id              [historical]
    member_id                   [r10i1p1f1]
    table_id                         [Amon]
    variable_id                   [pr, tas]
    grid_label                         [gn]
    dtype: object
       project mip_era activity_drs institution_id   source_id  ... table_id variable_id grid_label   version                                                 id
    0    CMIP6   CMIP6         CMIP          CCCma     CanESM5  ...     Amon          pr         gn  20190429  [CMIP6.CMIP.CCCma.CanESM5.historical.r10i1p1f1...
    4    CMIP6   CMIP6         CMIP          CCCma     CanESM5  ...     Amon         tas         gn  20190429  [CMIP6.CMIP.CCCma.CanESM5.historical.r10i1p1f1...
    8    CMIP6   CMIP6         CMIP   CSIRO-ARCCSS  ACCESS-CM2  ...     Amon          pr         gn  20220819  [CMIP6.CMIP.CSIRO-ARCCSS.ACCESS-CM2.historical...
    11   CMIP6   CMIP6         CMIP   CSIRO-ARCCSS  ACCESS-CM2  ...     Amon         tas         gn  20220819  [CMIP6.CMIP.CSIRO-ARCCSS.ACCESS-CM2.historical...

    [4 rows x 12 columns]
    Determining file sizes...

    --> Search found 6 total files / 438.9 MiB
    --> Existing: 1 file / 50.02 MiB
    --> Download required: 5 files / 388.88 MiB
    ```

    **Download:**

    We can then run `esgfdownload`, requesting the paths of the resulting ouptut files and querying the download log:
    ```pre
    esgfdownload \
      --experiment_id historical \
      --source_id CanESM5, ACCESS-CM2 \
      --variable_id pr,tas \
      --frequency mon \
      --member_id r10i1p1f1 \
      --download-log \
      --list-paths

    [...]

    --> Search found 6 total files / 438.9 MiB
    --> Existing: 1 file / 50.02 MiB
    --> Download required: 5 files / 388.88 MiB
    Proceed with download? [y/N]: y

    /glade/campaign/collections/cmip.mirror/CMIP6/CMIP/CCCma/CanESM5/historical/r10i1p1f1/Amon/tas/gn/v20190429/tas_Amon_CanESM5_historical_r10i1p1f1_gn_185001-201412.nc
    /glade/campaign/collections/cmip.mirror/.tmp/benkirk/CMIP6/CMIP/CCCma/CanESM5/historical/r10i1p1f1/Amon/pr/gn/v20190429/pr_Amon_CanESM5_historical_r10i1p1f1_gn_185001-201412.nc
    /glade/campaign/collections/cmip.mirror/.tmp/benkirk/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/pr/gn/v20220819/pr_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_185001-194912.nc
    /glade/campaign/collections/cmip.mirror/.tmp/benkirk/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/pr/gn/v20220819/pr_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_195001-201412.nc
    /glade/campaign/collections/cmip.mirror/.tmp/benkirk/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/tas/gn/v20220819/tas_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_185001-194912.nc
    /glade/campaign/collections/cmip.mirror/.tmp/benkirk/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/tas/gn/v20220819/tas_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_195001-201412.nc

    2025-08-05 10:04:34 search begin project=['CMIP6'], source_id=['CanESM5', 'ACCESS-CM2'], experiment_id=['historical'], member_id=['r10i1p1f1'], frequency=['mon'], variable_id=['pr', 'tas'], type=['Dataset'], latest=[True], retracted=[False]
    2025-08-05 10:04:34 └─GlobusESGFIndex('ESGF2-US-1.5-Catalog') results=14 response_time=0.37
    2025-08-05 10:04:34 combine_time=0.01
    2025-08-05 10:04:34 search end total_time=0.39
    2025-08-05 10:04:34 file info begin
    2025-08-05 10:04:34 └─GlobusESGFIndex('ESGF2-US-1.5-Catalog') results=20 response_time=0.22
    2025-08-05 10:04:34 combine_time=0.00
    2025-08-05 10:04:34 file info end total_time=0.22
    2025-08-05 10:04:38 file info begin
    2025-08-05 10:04:38 └─GlobusESGFIndex('ESGF2-US-1.5-Catalog') results=20 response_time=0.00
    2025-08-05 10:04:38 combine_time=0.00
    2025-08-05 10:04:38 file info end total_time=0.00
    2025-08-05 10:04:42 download failed http://esgf-data04.diasjp.net/thredds/fileServer/esg_dataroot/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/tas/gn/v20220819/tas_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_185001-194912.nc
    2025-08-05 10:04:42 download failed http://esgf-data04.diasjp.net/thredds/fileServer/esg_dataroot/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/pr/gn/v20220819/pr_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_195001-201412.nc
    2025-08-05 10:04:42 download failed http://esgf-data04.diasjp.net/thredds/fileServer/esg_dataroot/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/pr/gn/v20220819/pr_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_185001-194912.nc
    2025-08-05 10:04:42 download failed http://esgf-data04.diasjp.net/thredds/fileServer/esg_dataroot/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/tas/gn/v20220819/tas_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_195001-201412.nc
    2025-08-05 10:04:42 download failed http://esgf-data04.diasjp.net/thredds/fileServer/esg_dataroot/CMIP6/CMIP/CCCma/CanESM5/historical/r10i1p1f1/Amon/pr/gn/v20190429/pr_Amon_CanESM5_historical_r10i1p1f1_gn_185001-201412.nc
    2025-08-05 10:04:45 transfer_time=2.24 [s] at 26.06 [Mb s-1] https://g-52ba3.fd635.8443.data.globus.org/css03_data/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/tas/gn/v20220819/tas_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_195001-201412.nc
    2025-08-05 10:04:45 transfer_time=2.32 [s] at 25.85 [Mb s-1] https://g-52ba3.fd635.8443.data.globus.org/css03_data/CMIP6/CMIP/CCCma/CanESM5/historical/r10i1p1f1/Amon/pr/gn/v20190429/pr_Amon_CanESM5_historical_r10i1p1f1_gn_185001-201412.nc
    2025-08-05 10:04:45 transfer_time=2.50 [s] at 31.45 [Mb s-1] https://g-52ba3.fd635.8443.data.globus.org/css03_data/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/pr/gn/v20220819/pr_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_195001-201412.nc
    2025-08-05 10:04:45 transfer_time=2.53 [s] at 35.46 [Mb s-1] https://g-52ba3.fd635.8443.data.globus.org/css03_data/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/tas/gn/v20220819/tas_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_185001-194912.nc
    2025-08-05 10:04:45 transfer_time=2.83 [s] at 42.75 [Mb s-1] https://g-52ba3.fd635.8443.data.globus.org/css03_data/CMIP6/CMIP/CSIRO-ARCCSS/ACCESS-CM2/historical/r10i1p1f1/Amon/pr/gn/v20220819/pr_Amon_ACCESS-CM2_historical_r10i1p1f1_gn_185001-194912.nc
    ```

    As we can see from the `--list-paths` option output, one file is contained in the shared repository, while the remaining 5 are in temporary storage.  All are avaialable for immediate access.  **If we were to rerun the same download query the following day, all files would be sourced from the shared repository because the system ingestion process will have completed.**

    The `--download-log` option is particularly useful for diagnosing download problems.  In this case we can see the first attempt at download failed - presumably due to a down server - but the download ultimately succeeds from an alterative source.
