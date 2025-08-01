# Container Registry (Harbor)

CIRRUS uses **[Harbor](https://goharbor.io/)**, an open-source container registry, to store, manage, and distribute container images efficiently within the platform.

---

## Why use Harbor?

- **Faster image operations:** Since Harbor is hosted locally within the CIRRUS infrastructure, pushing and pulling images is significantly faster than using remote registries.

- **Security:** Harbor includes a built-in image vulnerability scanner, which scans uploaded images for known security issues so they can be addressed promptly.

- **Proximity to compute:** Hosting the registry near the compute environment reduces network latency and maximizes bandwidth.

---

## Accessing Harbor

- **Web Interface:** https://hub.k8s.ucar.edu
- **Login Credentials:** Use your CIT SSO username and password
- **Note:** You do not need to specify a domain when logging in.

---

## Who Can Access It?

- **All UCAR staff** in Active Directory have read-only access to public projects.
- **Unauthenticated users** can still pull images from public repositories.
- **Project creation and image pushing** are restricted to administrators.

---

## Need to Push Images?

If you need to:

- Create a private project, or
- Push images to Harbor,

Please submit a **[Jira request](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&issuetype=10903&summary=User%20Request:)**. Be sure to include:

- A descriptive name for the project
- A brief description of your intended use

The CIRRUS team will review your request and grant appropriate permissions.

---