# Frequent Issues & Troubleshooting

This page lists common problems CIRRUS users run into , and quick pointers to the right fix or reference guide.  Each issue links back to the detailed documentation so we don’t duplicate entire procedures.

---

## Application Deployment

| Symptom | Quick Fix |
|---------|-----------|
| Docker build fails in CI or locally | Check your `Dockerfile` base image and dependencies. See the **container build** tips in [create containers](../03-deploying-applications/containerize.md). |
| Argo CD shows *Sync Failed* | Run `helm lint` locally and verify required values. See **Helm chart deployment** in [adding applications](../03-deploying-applications/additions.md). |
| Template files placed outside `templates/` directory | Move all Kubernetes manifests (Deployment, Service, Ingress, etc.) into the chart’s `templates/` folder - Argo CD and Helm only render files inside this directory. |

## Authentication & Access

| Symptom | Quick Fix |
|---------|-----------|
| Cannot `docker login` to Harbor | Regenerate your CLI secret and retry. Full steps in [image management](../04-container-registry/image-mgmt.md). |
| JupyterHub server won’t spawn | Verify CIT credentials are valid and you’re on VPN. See [jupyterhub](../06-jupyter-on-cirrus/jupyterhub.md). |

## Performance & Resources

| Symptom | Quick Fix |
|---------|-----------|
| Image pulls are very slow | Ensure you’re pulling from `hub.k8s.ucar.edu`, not Docker Hub. |
| Pod OOM-killed | Increase `resources.limits.memory` in your Helm chart (see [adding applications](../03-deploying-applications/additions.md#unique-helm-values)). |

## GitHub Actions

| Symptom | Quick Fix |
|---------|-----------|
| Workflow stuck in `Queued` | Confirm your runner scale set is healthy; see [runner scale sets](../05-github-actions/scale-sets.md). |
| “Access denied” pushing image in workflow | Make sure the PAT stored in OpenBao still has `write:packages` scope. |

## When in Doubt

If a problem persists:

1. Consult the full documentation page linked above.
2. Search Slack/Jira for existing reports.
3. [Create a ticket](../02-interact-with-cirrus-team/create-tickets.md) with logs, steps to reproduce, and screenshots.

For support levels and response times, see our [service level agreements](../09-service-level-agreements/slas.md).