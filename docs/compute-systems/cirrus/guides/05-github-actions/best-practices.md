# GitHub Actions Best Practices

GitHub Actions lets you automate workflows like builds, tests, and deployments. However, it's essential to follow security and operational best practices to ensure your pipelines are safe, efficient, and maintainable.

For additional guidance, refer to GitHub's official: [Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions).

---

## Branch Protection

In the repository settings tab branch protection rules can be added by selecting the Branches link under Code and automation. Branch protection rules help prevent unauthorized changes to important branches like `main` or `production`.

### To enable:

1. Go to your repo's **Settings → Branches** (under Code and automation).
2. Click **Add branch protection rule**.
3. Configure rules like:
   - Require pull request reviews
   - Require status checks to pass before merging
   - Restrict who can push

**Learn more:**
- [About branch rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [Classic branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

---

## Use CODEOWNERS for Review Automation

A `CODEOWNERS` file defines designated reviewers and approvers for specific code once the file has been added to the `.github` directory. Add a `.github/CODEOWNERS` file to define default reviewers for changes to specific files or directories. This ensures the right team members approve changes to critical areas of the codebase. When a pull request touches these files, the listed owners are automatically requested for review.

**Example:**

```bash
# Require review from the dev team for backend files
/src/ @your-org/backend-team
/docs/ @your-org/docs-team
```

This ensures all code changes are reviewed by the appropriate experts.

---

## Repository Action Settings

There are a number of action and workflow permissions that are controlled in the repository Settings tab. Browse to the Settings page for the repository, select Actions to open a dropdown, and click General to open the Actions permissions settings.

- **Allow only the actions** that are required for your workflows and save them.
- **Ensure that "Require approval for all outside collaborators"** is selected for the Fork pull request workflows from outside collaborators is selected and saved.
- **Workflow permissions** set the default permissions granted to the `GITHUB_TOKEN` used in workflows and should match the minimum requirements for your workflows. The `GITHUB_TOKEN` permissions required should be included in your workflow to provide more granularity.

---

## Limit GitHub Token Permissions

`GITHUB_TOKEN` permissions can be included in your workflow file to provide the specific level of privileges needed for the GitHub Action run. Set this to the least privileged access required for the workflow by including the following in the workflow YAML:

```yaml
permissions:
  contents: read
```

This prevents accidental permission leaks and limits exposure if a job is compromised.

---

## Harden Runners

*(Runner hardening details will vary by repository; consult the CIRRUS team for configuration guidance.)*

Review/Audit each job to ensure it:

- Does not escalate privileges unnecessarily
- Restricts egress traffic to only what's needed  
- Includes alerts if runner behavior deviates from baseline

---

## Pin Action Versions by SHA

Prebuilt third-party GitHub Actions can be compromised as well. New Actions versions are built in to existing tags. Something marked as `v3`, for example, could receive a compromised patch and anything in an Action workflow using that `v3` tag would be now running a compromised Action. Instead of using the simple tag a SHA tag can be used instead to pin workflows to Actions versions that are known to be secure.

**Avoid using floating tags** like `@v3` for third-party Actions. Tags can be silently updated, including with malicious changes. *(Example: `uses: actions/checkout@3f4a7b8ff0e3dfad5ebb…` , pin to a specific commit SHA for immutability.)*

---

## Configure Repository Security Features

Security at the repository level is customizable in the repositories Settings tab under **Code security**.

- **GitHub provides a bot** to check the dependencies in a repository and will provide alerts when it detects known vulnerable packages in the code.
- **Code scanning** can also be configured to look through code and alert on coding errors or common vulnerabilities.
- **A Secret scanner** should also be enabled with push protection. This ensures that supported secret information is blocked from being added to the repository directly.

These features increase visibility and reduce manual auditing.

---

## Embed Security Tools in CI/CD Workflows

Security tools can be included directly in CI/CD workflows to ensure potential issues or vulnerabilities are detected early.

Security checks can run as part of your GitHub Actions workflow. Examples include:

- **Static analysis** (e.g., CodeQL, Bandit, ESLint)
- **Dependency vulnerability scans** (e.g., npm audit, pip-audit)  
- **Container image scans** (e.g., Trivy, Grype)

Run these on pull requests to catch issues before merging.

---

## Secrets Management

Secrets in GitHub Actions should be:

- **Rotated regularly**
- **Never contain structured data** like YAML, JSON, or XML
- **Scanned and protected** with GitHub's secret scanning + push protection

Use environment-level secrets for scoped workflows. Keep them out of plaintext and logs.

---

## Summary of GitHub Actions Best Practices

Following these best practices ensures your GitHub Actions workflows are secure, reliable, and maintainable:

- Implement branch protection rules and CODEOWNERS for automated code review
- Restrict actions access and minimize GITHUB_TOKEN permissions  
- Harden runners and pin action versions by SHA for security
- Enable repository security features and embed security tools in CI/CD
- Maintain proper secrets management through regular rotation and scanning

These practices create a robust, secure CI/CD pipeline that protects your code and infrastructure.