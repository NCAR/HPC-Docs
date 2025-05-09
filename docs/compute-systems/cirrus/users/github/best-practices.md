# GitHub Actions Best Practices

These are all covered in more detail on the GitHub documentation. For more information, see [Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions).

## Branch protection

In the repository settings tab branch protection rules can be added by selecting the Branches link under Code and automation. These rules can be set to prevent the code in the repository from being manipulated by anyone who does not have approved access. 

For more information on creating rulesets, see [About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)

For more information on creating classic protected branches, see [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)


## CODEOWNERS

A `CODEOWNERS` file defines designated reviewers and approvers for specific code once the file has been added to the `.github` directory.

## Repository Action Settings

There are a number of action and workflow permissions that are controlled in the repository Settings tab. Browse to the Settings page for the repository, select Actions to open a dropdown, and click General to open the Actions permissions settings.

Allow only the actions that are required for your workflows and save them.

Ensure that Require approval for all outside collaborators is selected for the Fork pull request workflows from outside collaborators is selected and saved. 

Workflow permissions set the default permissions granted to the GITHUB_TOKEN used in workflows and should match the minimum requirements for your workflows. The GITHUB_TOKEN permissions required should be included in your workflow to provide more granularity. Details on how to implement that can be found below.  

## Limit GitHub Token Permissions

`GITHUB_TOKEN` permissions can be included in your workflow file to provide the specific level of privileges needed for the GitHub Action run. Set this to the least privileged access required for the workflow by including the following in the workflow YAML

```yaml
permissions:
  contents: read
```

## Harden Runners

Jobs should be audited to determine egress traffic, ensuring source code isn't tampered with, run without privilege escalation, and setup to alert when the baselines are not adhered to. 

## Use SHA for Actions versions

Prebuilt third-party GitHub Actions can be compromised as well. New Actions versions are built in to existing tags. Something marked as v3, for example, could receive a compromised patch and anything in an Action workflow using that v3 tag would be now running a compromised Action. Instead of using the simple tag a SHA tag can be used instead to pin workflows to Actions versions that are known to be secure. 

## Configure Repository Security

Security at the repository level is customizable in the repositories settings tab under Code security. 

GitHub provides a bot to check the dependencies in a repository and will provide alerts when it detects known vulnerable packages in the code. 

Code scanning can also be configured to look through code and alert on coding errors or common vulnerabilities. 

A Secret scanner should also be enabled with push protection. This ensures that supported secret information is blocked from being added to the repository directly.  

## Use security tools in CI/CD workflows

Security tools can be included directly in CI/CD workflows to ensure potential issues or vulnerabilities are detected early. 

## Secrets

GitHub Actions secrets should be rotated regularly. 

Don't use structured data, such as yaml, xml, or JSON for secrets.

As mentioned the Secret scanner should also be enabled with push protection. This ensures that supported secret information is blocked from being added to the repository directly.  
