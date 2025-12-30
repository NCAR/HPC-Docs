# Service Level Agreements (SLAs)

This Service Level Agreement (SLA) outlines the relationship between the CIRRUS team - who provides the on-premise cloud infrastructure - and its recognized users, including UCAR Employees, Visitors, and external collaborators authorized to use the on-premise cloud resources.

NSF NCAR | CISL operates Compute, Storage & Network hardware in robust Data Centers at multiple organizational facilities. The on-premise cloud offers users the ability to utilize those highly available, organizationally supported, compute resources for approved use cases. This includes access to routable network space and UCAR Domain Name Systems (DNS). These resources provide a supplement to computing needs that aren't fulfilled by the HPC offering, public cloud, or what is available locally.

<table markdown="1" style="border:1px solid #666; border-collapse:collapse; margin:0 0 0 0; border-radius:6px; overflow:hidden; font-size:0.9rem;">
  <thead>
    <tr>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;"><strong>Primary Services</strong></th>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;"><strong>Service Dependencies</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Kubernetes Cluster</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Server nodes</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Argo CD</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Networking</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Harbor</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">GLADE mount</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">OpenBao</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"></td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">JupyterHub / Binder</td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"></td>
    </tr>
  </tbody>
</table>

**Audience:** Service Technical Staff, System Administrators, On & Off Site Personnel, and Authorized Affiliates

**Recognized Customers:** On & Off Site Personnel, and Authorized Affiliates

!!! important
    **Availability:** The service is designed to operate 24/7. However, support is currently limited to business hours only.

---

## Response Level and Service Definitions

### Definitions

<table markdown="1" style="border:1px solid #666; border-collapse:collapse; margin:0 0 0 0; border-radius:6px; overflow:hidden; font-size:0.9rem;">
  <thead>
    <tr>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;"><strong>Severity</strong></th>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;"><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Critical</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc;">Complete loss of a core service or major functionality due to failure or incident (e.g., site-wide outage).<br><br>No workaround is available that will restore service reliably within one (1) hour. This may include a site wide security incident.</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Urgent</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc;">Significant degradation of a critical service or full failure of a non-critical service impacting productivity.<br><br>A workaround may exist but may not fully restore service.</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Regular</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc;">Minor or extended functionality issues - basic functionality is present.<br><br>A workaround is available. Includes feature requests, non-urgent upgrades, or inquiries.</td>
    </tr>
  </tbody>
</table>

### Response Times

<table markdown="1" style="border:1px solid #666; border-collapse:collapse; margin:0 0 0 0; border-radius:6px; overflow:hidden; font-size:0.9rem;">
  <thead>
    <tr>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;"><strong>Response Level</strong></th>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;"><strong>Business Hours</strong><br>(M-F 08:00 - 17:00 MST)</th>
      <th style="padding:10px 20px; text-align:center; background-color:var(--md-primary-fg-color); color:#fff; font-size:1.05rem;"><strong>After Hours</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Critical</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Response within 2 hours</td>
      <td style="padding:6px 12px; border:1px solid #ccc;">Addressed at start of next business day</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Urgent</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;">Response within 4 hours</td>
      <td style="padding:6px 12px; border:1px solid #ccc;">Addressed at start of next business day</td>
    </tr>
    <tr>
      <td style="padding:6px 12px; border:1px solid #ccc; white-space:nowrap;"><strong>Regular</strong></td>
      <td style="padding:6px 12px; border:1px solid #ccc;">Reviewed during business hours</td>
      <td style="padding:6px 12px; border:1px solid #ccc;">Reviewed during business hours</td>
    </tr>
  </tbody>
</table>

!!! important
    There is currently no after-hours support. All issues occurring after business hours will be triaged at the start of the next workday.

---

## User Applications Support Policy

CIRRUS provides and maintains the underlying Kubernetes infrastructure, but **application owners are responsible for their applications** deployed on the platform.

### CIRRUS Team Responsibilities:
- Maintain Kubernetes cluster infrastructure and core platform services
- Ensure infrastructure availability and performance
- Provide consultation on best practices for application design and deployment
- Offer guidance on infrastructure features (persistent volume replication, storage options, etc.)

### Application Owner Responsibilities:
- Design, develop, deploy, and maintain their applications
- Ensure applications are built to be resilient and can handle infrastructure maintenance windows
- Implement high availability patterns (database replication, persistent volume mirroring, etc.)
- Monitor and troubleshoot application-specific issues
- Follow Infrastructure as Code (IaC) practices for reproducible deployments

### Support Prioritization:
CIRRUS team support for user applications is provided on a **consultation basis as time allows**. Application support requests are prioritized according to the severity levels defined above, but will always be secondary to infrastructure-level issues affecting core platform services.

**Infrastructure Maintenance:** The CIRRUS team reserves the right to perform maintenance on infrastructure nodes at any time. Applications should be designed to tolerate node restarts, rescheduling, and temporary service disruptions without data loss or extended downtime.

---

## Backup & Disaster Recovery Policy

CIRRUS follows **Infrastructure as Code (IaC)** practices. All applications deployed on the on-prem cloud are defined via code repositories and can be redeployed as needed.

- **Application Backups:** Applications themselves are not backed up individually; they are re-deployed via Argo CD and source-controlled templates.
- **Argo CD:** Argo projects are backed up after changes, enabling project restoration in case of data loss.
- **Container Images (Harbor):** Images stored in Harbor are backed up to object storage and can be restored from there.

### Persistent Volume Backups

[Persistent Volumes (PVs)](../03-deploying-applications/additions.md#persistent-volumes) in CIRRUS can be replicated across sites to improve resiliency.

To request PV replication for your application, please [create a ticket](../02-interact-with-cirrus-team/create-tickets.md).

---

## Change Management

All changes must be submitted via a Jira ticket. For more information on this process, please see [create tickets](../02-interact-with-cirrus-team/create-tickets.md).

Tickets are reviewed and prioritized by the CIRRUS Product Owner.

- **Critical and Urgent** tickets will be addressed based on SLA response times.
- **Regular** requests are reviewed during the team's bi-weekly planning sessions.

---

## Contact Information

**Business Hours:** 08:00 - 17:00 MST, Monday - Friday

**Primary Contact:** [Nick Cote](mailto:ncote@ucar.edu)

**Secondary Contact:** [Submit a Jira Request](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&amp;issuetype=10903&amp;summary=User%20Request:)

**Off Hours Contact:** [Nick Cote](mailto:ncote@ucar.edu) and/or [Jira Request](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&amp;issuetype=10903&amp;summary=User%20Request:)

---

## Monitoring & Reporting

For observability, the CIRRUS infrastructure leverages:

- **Prometheus** for metrics collection
- **Grafana** for visualization and dashboards  
- **Loki** for centralized log aggregation

These tools work together to detect, surface, and alert the CIRRUS team to any operational issues within the platform.