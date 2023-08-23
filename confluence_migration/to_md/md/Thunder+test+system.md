# Thunder test system

The **Thunder** cluster is a test system that features Marvell's
ThunderX2 Arm processors. These processors use the aarch64 instruction
set, rather than the x86-64 instruction set used by Intel and AMD
processors.

Thunder consists of:

- one node with 128 GB of memory

- four nodes with 256 GB of memory

- 100GbE Mellanox Ethernet interconnect

Follow the procedures below to begin using the system.

**Additional information and screen captures depicting various steps in
the process are included in this slide presentation:
[ChameleonCloud-WIP-09212022.pdf](file:////download/attachments/77201513/ChameleonCloud-WIP-09212022.pdf%3fversion=1&modificationDate=1669648880000&api=v2)**

**Page contents**

- [Getting started](#Thundertestsystem-Gettingstarted)

- [Accessing Thunder](#Thundertestsystem-AccessingThunder)

  - [Leasing Thunder nodes](#Thundertestsystem-LeasingThundernodes)

  - [Launching an instance](#Thundertestsystem-Launchinganinstance)

  - [Accessing your instance](#Thundertestsystem-Accessingyourinstance)

- [More information and getting
  help](#Thundertestsystem-Moreinformationandget)

## Getting started

Users access the Thunder nodes by establishing a connection to them via
Chameleon Cloud.

To get started:

- Create a Chameleon Cloud account.

- Email <hpcrd@ucar.edu> and request access to the **NCARExplore**
  project.

## Accessing Thunder

Once you have been added to the NCARExplore project, access the Thunder
nodes by going to [CHI@NCAR](https://chi.hpc.ucar.edu/) and logging into
your Chameleon account. From there you'll be able to *lease* nodes and
start up *instances*.

### Leasing Thunder nodes

An individual user can request or lease one or more nodes for up to
seven (7) days and create an IP address for accessing them.

Follow these steps:

1.  From the Project menu, select *Reservations*, then *Leases*.

2.  Select the *Create Lease* button.

3.  Complete the General section by specifying a name (required), start
    time (defaults to now), and the length of your lease (defaults to 1
    day).

4.  Complete the Hosts section by checking the *Reserve Hosts* box and
    selecting the minimum and maximum number of hosts (both default to
    1). There is only one type of node on Thunder, so there is no need
    to select *Resource Properties*.

5.  Complete the Networks section by checking the *Reserve Floating IPs*
    box and specifying the number of Floating IP addresses you want to
    reserve (typically 1). There is only one physical network on Thunder
    controlled by Chameleon, so there is no need to select *Reserve
    Network*.

![](media/image1.png)

Once you have entered all your selections, select the *Create* button.

### Launching an instance

When your lease status is ACTIVE, you can launch an instance on your
leased Thunder nodes.

1.  From the Project menu, select *Compute*, then *Instances*.

2.  Select the *Launch Instance* button.

3.  Complete the Details section by specifying an *Instance Name*,
    selecting your lease in the *Reservation* box, and selecting the
    number of instances you want to start in the *Count* box (defaults
    to 1).

4.  Complete the Source section by choosing an image: Click the **^**
    next to the *CC-Ubuntu20.04-ARM64* RAW image to choose the default
    image.

5.  Complete the Key Pair section by selecting either the *Create Key
    Pair* button or the *Import KeyPair* button. This key will be used
    to log in to your instance using the "cc" user account. If you have
    already uploaded a key pair to CHI@NCAR, that key pair will already
    be selected as the default.

Once you have entered all your selection, select *Launch Instance*.

### Accessing your instance

Once your instance has been provisioned and starts (status is *Active*),
select *Floating IPs* on the Network menu, then the *Associate* button
next to your reserved IP address.

Associate your floating IP address with a port by selecting your
instance under "Port to be associated." (See image).

![](media/image2.png)

Once the status of that association is "Up" you can use your IP address
and your key to **ssh** to your active instance by following this
example (substituting your own IP address):

ssh cc@128.117.250.23

At that point, you can use the reserved Thunder nodes for your work.

## More information and getting help

[Detailed Chameleon Cloud documentation is available
here](https://chameleoncloud.readthedocs.io/en/latest/).

Since Thunder is a test system, send any support inquiries, software and
hardware concerns, or requests for access to <hpcfl@ucar.edu> instead of
the CISL Help Desk.

We also welcome any feedback and performance reports that you can share
as you test your workflows on Thunder.
