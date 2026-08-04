# Managing FaaS with GitOps

The [FaaS overview](faas.md) uses the `fission` CLI to create environments,
functions, and routes.

Every Fission object can be described as YAML in a git repository and reconciled
continuously by [Argo CD](../03-deploying-applications/index.md). 

By leveraging GitHub Actions, we can automate changes to the repository which update corresponding 
functions. Deployments then happen on their own when your code changes and the 
cluster always matches what is in the repository, with all the traditional benefits of git.

1. Build the runtime image and the functions to archive.
2. Automate the build and archive with GitHub Actions.
3. Write the Fission objects as manifests.
4. Submit a ticket to the CIRRUS team to onboard the git repository as an Argo CD source.

!!! note "Prerequisites"
    You have already completed, or understand, the [FaaS overview](faas.md) setup: FaaS access,
    a namespace, `kubectl`, and the `fission` CLI. 
    
    You will also need a git repository Argo CD can read with secrets setup for push access to a 
    container registry, such as the [CIRRUS registry](../04-container-registry/index.md).

## From CLI commands to manifests

Each CLI command in the overview has a one-to-one manifest equivalent. GitOps
just replaces the imperative command with the declarative object it would have
created:

| CLI command | Manifest (`kind`) | Role |
|---|---|---|
| `fission env create` | `Environment` | The shared language runtime (one per language/image). |
| `fission fn create --src` | `Package` | The deployment archive (the zip) plus its build status. |
| `fission fn create` | `Function` | Binds a package to an entrypoint. |
| `fission route create` | `HTTPTrigger` | Exposes the function on the shared gateway. |

## Repository layout

A self-contained FaaS repo looks like this. Nothing here is required to have
these exact names, but the CI workflow below assumes this shape:

```
.
├── image/
│   ├── Dockerfile          # extends the Fission python runtime
│   └── requirements.txt    # deps baked into the image
├── functions/
│   └── myfunc.py           # your function module(s)
├── manifests/              # what Argo CD syncs
│   ├── environment.yaml
│   ├── package-myfunc.yaml
│   ├── function-myfunc.yaml
│   └── httptrigger-myfunc.yaml
└── .github/workflows/
    └── release.yaml        # builds image + zip, pins manifests
```

## Building the runtime image

The image extends the Fission Python runtime — which provides the function
server — and bakes in your dependencies. A plain `python` base image will not
work.

```dockerfile title="image/Dockerfile"
FROM ghcr.io/fission/python-env

COPY image/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt
```

```text title="image/requirements.txt"
numpy
```

Baking dependencies into the image (rather than using Fission's builder) is the
recommended approach whenever you have anything beyond trivial pip packages —
scientific stacks, conda, or a shared internal library. It keeps the deployment
zip tiny and makes each deploy reproducible.

## Packaging the function

The archive is just your function module(s) zipped up. Because the deps are in
the image, this stays tiny:

```python title="functions/myfunc.py"
import numpy as np

def main():
    return f"{np.random.default_rng().random():.4f}\n"
```

```bash
(cd functions && zip -q ../myfunc.zip myfunc.py)
sha256sum myfunc.zip
```

That checksum and the archive's public URL are what you pin into the `Package`
(`spec.deployment.checksum.sum` / `spec.deployment.url`) and the `Function`
annotation. Doing this by hand is fine for a first deploy; the workflow below
automates it.

## Automating with GitHub Actions

Pinning three values by hand on every code change is error-prone, so a release
workflow does it: the image tag, the archive URL, and the archive checksum. All
three live in the manifests, which are defined in the next section.

Every push to `main` produces a build. The image is tagged `:dev-<sha>`, the zips
are uploaded under a rolling `dev` prerelease, and the manifests are pinned and
committed back so Argo CD deploys the latest.

The commit-back is itself a push to `main`, so its message carries `[skip ci]`
to avoid re-triggering the workflow, and `concurrency` serializes runs so
overlapping pushes cannot race on the commit.

!!! note "Harbor credentials"
    Add a Harbor robot account's `HARBOR_USERNAME` and `HARBOR_PASSWORD` as
    repository secrets so the workflow can push the image.

{% raw %}
```yaml title=".github/workflows/release.yaml"
name: Release FaaS service

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write   # release asset upload + manifest commit-back

concurrency:
  group: release
  cancel-in-progress: false

env:
  IMAGE: hub.k8s.ucar.edu/<your-namespace>/python-app-env

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Determine version
        # Rolling dev build, one per commit.
        run: echo "VERSION=dev-${GITHUB_SHA::7}" >> "$GITHUB_ENV"

      - name: Build per-function archives
        # One zip per module in functions/. Module name (my_func) maps to the
        # CR/manifest name (my-func).
        run: |
          for src in functions/*.py; do
            mod="$(basename "$src" .py)"
            name="${mod//_/-}"
            zip="${name}-${VERSION}.zip"
            (cd functions && zip -q "../${zip}" "${mod}.py")
            echo "built ${zip} ($(sha256sum "${zip}" | cut -d' ' -f1))"
          done

      - name: Log in to Harbor
        uses: docker/login-action@v3
        with:
          registry: hub.k8s.ucar.edu
          username: ${{ secrets.HARBOR_USERNAME }}
          password: ${{ secrets.HARBOR_PASSWORD }}

      - name: Build and push environment image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: image/Dockerfile
          push: true
          tags: ${{ env.IMAGE }}:${{ env.VERSION }}

      - name: Upload zips as release assets
        uses: softprops/action-gh-release@v2
        with:
          tag_name: dev
          prerelease: true
          files: "*-${{ env.VERSION }}.zip"

      # ---- Pin the manifests (the GitOps source of truth) ----
      - name: Checkout main
        run: |
          git fetch origin main
          git checkout -f main

      - name: Pin manifests to this build
        # Zip url + checksum -> its Package; the same checksum -> its Function
        # annotation (cache-invalidation). The zips built above are untracked,
        # so they survive the checkout.
        run: |
          yq -i ".spec.runtime.image = \"${IMAGE}:${VERSION}\"" manifests/environment.yaml
          for src in functions/*.py; do
            mod="$(basename "$src" .py)"
            name="${mod//_/-}"
            zip="${name}-${VERSION}.zip"
            sum="$(sha256sum "${zip}" | cut -d' ' -f1)"
            url="https://github.com/${GITHUB_REPOSITORY}/releases/download/dev/${zip}"
            yq -i ".spec.deployment.url = \"${url}\"" "manifests/package-${name}.yaml"
            yq -i ".spec.deployment.checksum.sum = \"${sum}\"" "manifests/package-${name}.yaml"
            yq -i ".metadata.annotations.\"cirrus.ucar.edu/code-checksum\" = \"${sum}\"" "manifests/function-${name}.yaml"
          done

      - name: Commit and push
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add manifests/
          if git diff --cached --quiet; then
            echo "No manifest changes to commit."
            exit 0
          fi
          git commit -m "build ${VERSION}: pin image, archive url, checksum [skip ci]"
          git push origin main
```
{% endraw %}

!!! note "The `dev` prerelease grows over time"
    Each zip name embeds the commit SHA, so every build adds a new asset rather
    than replacing one. Prune old assets from the `dev` prerelease periodically.

!!! tip "Going to production"
    Redeploying on every push to `main` is handy before you have gone live. For
    a production service, trigger on `v*` tags instead of `branches: [main]` and
    use the tag as `VERSION` and as the release `tag_name`, so each release is an
    immutable image and an immutable GitHub release.

## The manifests

Replace `<your-namespace>` and `<username>` throughout with your own values.

The example is a single Python function, `myfunc`, that depends on `numpy` — a
dependency is what makes a custom image (rather than Fission's builder) worth
the effort.

### Environment

The runtime for every function that uses this image. Because the dependencies
are baked into the image (next section), no builder is configured — this is the
declarative equivalent of `fission env create --image ... ` *without*
`--builder`.

```yaml title="manifests/environment.yaml"
apiVersion: fission.io/v1
kind: Environment
metadata:
  name: python-app
  namespace: <your-namespace>
spec:
  version: 3
  poolsize: 1
  runtime:
    # Pinned by CI on each release (see below). During hand-editing you can
    # point at any tag you have pushed to Harbor.
    image: hub.k8s.ucar.edu/<your-namespace>/python-app-env:dev-0000000
```

### Package

One `Package` per function archive. `deployment.type: url` points at an
**immutable** zip (a GitHub release asset) plus its checksum. Because the
dependencies live in the image, the zip is the deployment archive as-is — there
is no in-cluster build, so `buildstatus` is `none`.

```yaml title="manifests/package-myfunc.yaml"
apiVersion: fission.io/v1
kind: Package
metadata:
  name: myfunc
  namespace: <your-namespace>
spec:
  environment:
    name: python-app
    namespace: <your-namespace>
  deployment:
    type: url
    # Both pinned by CI. Use a release *asset* URL, not a
    # github.com/<org>/<repo>/archive/... auto-generated zip — those are not
    # byte-stable and will break the checksum.
    url: https://github.com/<org>/<repo>/releases/download/dev/myfunc-dev-0000000.zip
    checksum:
      type: sha256
      sum: "0000000000000000000000000000000000000000000000000000000000000000"
status:
  buildstatus: none
```

### Function

Binds the package to an entrypoint (`<module>.<function>`), the equivalent of
`fission fn create --entrypoint myfunc.main`. The `code-checksum` annotation is
the important GitOps-specific detail.

```yaml title="manifests/function-myfunc.yaml"
apiVersion: fission.io/v1
kind: Function
metadata:
  name: myfunc
  namespace: <your-namespace>
  annotations:
    # Bumped by CI to the archive checksum on every release, so the Function
    # spec changes whenever the code does.
    cirrus.ucar.edu/code-checksum: "0000000000000000000000000000000000000000000000000000000000000000"
spec:
  environment:
    name: python-app
    namespace: <your-namespace>
  package:
    packageref:
      name: myfunc
      namespace: <your-namespace>
    functionName: myfunc.main
  InvokeStrategy:
    ExecutionStrategy:
      ExecutorType: poolmgr
```

!!! warning "Why the `code-checksum` annotation matters"
    Warm pool pods cache their specialization. If you ship new code but the
    `Function` spec is byte-for-byte identical to before, the executor has no
    reason to re-specialize and **warm pods keep serving the old code**.
    Changing an annotation on every release forces the spec to change, which
    invalidates the cache. Any always-changing value works; the archive
    checksum is a convenient one.

### HTTPTrigger

Exposes the function on the shared FaaS gateway — the equivalent of
`fission route create --route-provider gateway`. The same URL-path rules from
the overview apply: paths on `fn.k8s.ucar.edu` are global and
first-come-first-served, so keep your namespace/username prefix.

```yaml title="manifests/httptrigger-myfunc.yaml"
apiVersion: fission.io/v1
kind: HTTPTrigger
metadata:
  name: myfunc
  namespace: <your-namespace>
spec:
  functionref:
    type: name
    name: myfunc
  methods:
    - GET
  relativeurl: /<username>/myfunc
  routeConfig:
    provider: gateway
    gateway:
      parentRefs:
        - name: traefik-gateway
          namespace: traefik
    hostnames:
      - fn.k8s.ucar.edu
    path: /<username>/myfunc
```

!!! note "Object names vs. module names"
    Kubernetes object names must be RFC 1123 (lowercase letters, digits, `-`) —
    no underscores. Python module names use underscores. If your module is
    `my_func.py`, name the CRs `my-func` and keep `functionName: my_func.main`.

!!! tip "Optional: apply the manifests once by hand"
    If you have `kubectl` access to your namespace, running
    `kubectl apply -f manifests/` and verifying the objects before onboarding
    with Argo CD separates a problem in your manifests from a problem in the
    Argo CD plumbing. See [Verify and troubleshoot](#verify-and-troubleshoot).

## Syncing with Argo CD

CIRRUS admins add applications and workloads to Argo CD. Once your Fission 
manifests are committed to a repository, submit a request and a CIRRUS admin 
will create the Application pointed at your repository, branch, and manifest 
path.

For the request process and the information to include, see
[Adding Applications](../03-deploying-applications/index.md).

Read-only access to your project in the Argo CD UI can be requested at the same
time. That lets you watch sync status, resource health, and events for your
functions without being able to change the configuration.

Once the Application exists, Argo CD applies every YAML file it finds under the
configured path and reconciles the cluster to match, including pruning objects
you remove from git and reverting manual changes made in the cluster.

!!! warning "Git becomes the only way to change these objects"
    After onboarding, `fission` and `kubectl` commands that *modify* these
    objects only hold until the next sync, which reverts them to whatever is in
    git. Change the manifests and push instead. Read-only commands
    (`fission fn list`, `kubectl get`) are unaffected.

!!! note "Adding to an existing application"
    A separate request is not always needed. If you already have an application
    synced by Argo CD from a Helm chart, you can drop these Fission manifests
    into that chart's `templates/` directory and they will sync alongside the
    rest of the app.

## Verify and troubleshoot

Once Argo CD reports the application `Synced` and `Healthy`, the objects exist
exactly as if you had created them with the CLI, so the overview's tools still
apply:

```bash
fission env list -n <your-namespace>
fission fn list  -n <your-namespace>
fission pkg list -n <your-namespace>   # BUILD_STATUS should be "none"
fission route list -n <your-namespace> # READY should be True
```

Then call the function. `curl -i` shows the status code, which is what you need
when something is wrong:

```bash
curl -i https://fn.k8s.ucar.edu/<username>/myfunc
```

Opening the same URL in a browser works too.

Common GitOps-specific failure modes:

- **Function never becomes ready / package stuck** — check
  `status.buildstatus: none` is present on the `Package`.
- **Old code keeps serving after a deploy** — the `Function`'s `code-checksum`
  annotation did not change. Confirm CI pinned a new checksum.
- **Checksum mismatch on the package** — the `url` points at a mutable archive
  (e.g. a github `archive/` zip). Use an immutable release asset.
- **Route shows `READY False`** — usually the URL path is already claimed
  globally; pick a different prefixed path (see the overview's URL-paths
  warning).

If everything looks right and it still does not work, open a
[New Issue](https://jira.ucar.edu/secure/CreateIssueDetails!init.jspa?pid=18470&issuetype=10903&customfield_10281=CCPP-108)
in Jira and a CIRRUS team member will reach out. If you do not have `kubectl`
access to run the checks above, include your namespace, the function name, the
repository and commit, and the output of the `curl -i` call.