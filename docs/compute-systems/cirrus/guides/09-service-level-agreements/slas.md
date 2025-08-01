# Service Level Agreements (SLAs)

This Service Level Agreement (SLA) outlines the relationship between the CIRRUS team - who provides the on-premise cloud infrastructure - and its recognized users, including UCAR Employees, Visitors, and external collaborators authorized to use the on-premise cloud resources.

NSF NCAR | CISL operates Compute, Storage & Network hardware in robust Data Centers at multiple organizational facilities. The on-premise cloud offers users the ability to utilize those highly available, organizationally supported, compute resources for approved use cases. This includes access to routable network space and UCAR Domain Name Systems (DNS). These resources provide a supplement to computing needs that aren't fulfilled by the HPC offering, public cloud, or what is available locally.

| **Primary Services** | **Service Dependencies** |
|----------------------|--------------------------|
| Kubernetes Cluster  | Server nodes             |
| Argo CD             | Networking               |
| Harbor              | GLADE mount              |
| OpenBao             |                          |
| JupyterHub / Binder |                          |

**Audience:** Service Technical Staff, System Administrators, On & Off Site Personnel, and Authorized Affiliates

**Recognized Customers:** On & Off Site Personnel, and Authorized Affiliates

!!! important
    **Availability:** The service is designed to operate 24/7. However, support is currently limited to business hours only.

---

## Response Level and Service Definitions

### Definitions

| **Severity** | **Description** |
|--------------|-----------------|
| **Critical** | Complete loss of a core service or major functionality due to failure or incident (e.g., site-wide outage).<br><br>No workaround is available that will restore service reliably within one (1) hour. This may include a site wide security incident. |
| **Urgent**   | Significant degradation of a critical service or full failure of a non-critical service impacting productivity.<br><br>A workaround may exist but may not fully restore service. |
| **Regular**  | Minor or extended functionality issues - basic functionality is present.<br><br>A workaround is available. Includes feature requests, non-urgent upgrades, or inquiries. |

### Response Times

| **Response Level** | **Business Hours**<br>(M-F 08:00 - 17:00 MST) | **After Hours** |
|--------------------|------------------------------------------------|-----------------|
| **Critical**       | Response within 2 hours                       | Addressed at start of next business day |
| **Urgent**         | Response within 4 hours                       | Addressed at start of next business day |
| **Regular**        | Reviewed during business hours                 | Reviewed during business hours |

!!! important
    There is currently no after-hours support. All issues occurring after business hours will be triaged at the start of the next workday.

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