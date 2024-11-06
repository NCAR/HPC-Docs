# Service Level Agreements (SLAs)

This Service Level Agreement (SLA) defines the relationship between the CIRRUS team who provides the on-premise cloud infrastructure and their customers which include UCAR
Employees, Visitors, and external collaborators authorized to use the on-premise cloud resources. NSF NCAR | CISL runs Compute, Storage & Network hardware in robust Data Centers at multiple organizational facilities. The on-premise cloud offers users the ability to utilize those highly available, organizationally supported, compute resources for approved use cases. This includes access to routable network space and UCAR Domain Name Systems (DNS). These resources provide a supplement to computing needs that aren’t fulfilled by the HPC offering, public cloud, or what is available locally.

**Primary Services:** Kubernetes Cluster, Argo CD, Harbor, & JupyterHub/Binder

**Service Dependencies:** Server nodes, Networking, GLADE mount

**Audience:** Service Technical Staff, System Administrators, On & Off Site Personnel, and Authorized Affiliates

**Recognized Customers:** On & Off Site Personnel, and Authorized Affiliates

The service is designed to be available 24/7, but support will only be given during normal business hours for now. 

## Response Level and Service Levels

### Definitions

Critical:  Complete loss of a critical service or functionality due to failure of a device, network or other issue; or intermittent service disruptions that severely degrade the productivity of the user community. No workaround is available that will restore service reliably within one (1) hour. This may include a site wide security incident.

Urgent: Partial or reduced availability of, or accessibility to, a critical service with a significant impact on productivity of the user community; also complete or intermittent failures of a non-critical service that also has a significant impact on productivity of users. In some cases, service or functionality may be restored reliably by activation of a backup or workaround.

Regular: Basic functionality is present. There is a failure of extended functionality, but a workaround is available. Any requests for new functionality, features, or upgrades.

### Agreements

```{note}
There is currently no After Hours support. All Response types that occur after hours will be addressed at the start of business.
``` 

| Response Level | Business Hours <br> 8:00 - 17:00 M-F | After Hours |
|---|---|---|
| Critical | 2 hours | Start of Business |
| Urgent | 4 hours | Start of Business |
| Regular | Reviewed | Reviewed | 

## Backup & Disaster Recovery Policy

Infrastructure as Code is utilized to maintain all the applications hosted on the On-Premise cloud. Applications will not be backed up and instead will be redeployed from code repositories. Argo CD handles the deployment of all applications and is backed up to allow restoration of all projects. 

Projects in Argo CD will be backed up when changes are made. These backups can be used to restore configured projects in the event of data loss.

Images stored in Harbor will be backed up to object storage and can be restored from those backups. 

## Change Management

Any changes need to be requested via a Jira ticket. There's information describing this process at this [link for ticket creation](../how-to/create-tickets). The teams Product Owner will review all new tickets and prioritize them accordingly. 

Critical and Urgent issues will be addressed within the agreements defined above. Regular requests will typically be addressed during the teams bi-weekly standup meetings.

## Contact Information

**Business Hours:** 8:00 - 17:00 MST Monday - Friday

**Primary Contact:** [Nick Cote](mailto:ncote@ucar.edu)

**Secondary Contact:** [Jira Request](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&amp;issuetype=10903&amp;summary=User%20Request:)

**Off Hours Contact:** [Nick Cote](mailto:ncote@ucar.edu) & [Jira Request](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&amp;issuetype=10903&amp;summary=User%20Request:)

## Monitoring & Reporting

The infrastructure utilizes Prometheus, Grafana, and Loki to monitor, collect logs, and alert the team to any issues that occur to the system. 