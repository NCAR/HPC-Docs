# Contributing to the Documentation

Welcome to the NCAR HPC Resources GitHub repository!

!!! info
    This document is built from [the NCAR MkDocs Template](https://github.com/NCAR/NCAR_mkdocs_template/). If you are interested to creating a similar documentation page for your own project, the framework is available in the [NCAR MkDocs Template repository](https://ncar-mkdocs-template.readthedocs.io/en/latest/getting-started/). 

This guide provides an overview of how to contribute to this documentations and the standards to follow when adding content to this repository. 


## Repository Overview

This repository contains technical documentation for NCAR HPC resources. The documentation is written in Markdown, which is then converted to HTML/CSS/JS using the `mkdocs` static site generator. We have customized the `mkdocs-material` theme to align with NCAR branding and colors.

!!! note
    If you're new to Markdown, you can learn more about it [here](https://www.markdownguide.org/).
    Here is the reference to the [mkdocs-material documentation features](https://squidfunk.github.io/mkdocs-material/reference/).

In general, the repository is organized into the following sections:
```
mkdocs.yml        # The MkDocs configuration file.
themes/           # Customized theme files.
    ...           # (sourced from https://github.com/NCAR/NCAR_mkdocs_material_themes)
docs/
    index.md      # The documentation homepage.
    ...           # Other markdown pages, images and other docs files.
conda.yaml        # A conda environment definition with the Python dependencies to build the project.
.readthedocs.yml  # The configuration file for readthedocs hosting.
```

## Making Contributions

### Major Contributions
For major modifications, such as a comprehensive revision of a section in the documentation or adding a new section, we recommend to fork this repository, and clone the repository to your local machine and working from there.

!!! danger "Please note, for larger changes, it's often a good idea to discuss your plans in an issue before investing a lot of time in implementation."

**Steps to Contribute**

1. **Fork the repository:** Go to the repository page and click the "Fork" button to create a copy of the repository under your GitHub account.

2. **Clone the forked repository to your local machine:** This can be done by running the following command in your terminal:

    ```bash
    git clone https://github.com/<YOUR_USERNAME>/HPC-Docs.git
    ```
        Replace `<YOUR_USERNAME>` with your GitHub username.

    Next, navigate to the cloned repository and pull the submodules by running:
    
    ```bash
    cd HPC-Docs
    git submodule init
    git submodule update
    ```
    This will pull the [`mkdocs-material-theme` submodule](https://github.com/NCAR/NCAR_mkdocs_material_themes.git).

3. **Create a new branch:** It's a good practice to create a new branch before you start making changes. This can be done by running:
    ```bash
    git checkout -b <BRANCH_NAME>
    ```
    Replace `<BRANCH_NAME>` with a name that gives a hint about the changes you're about to make.

4. **Make your changes:** With your new branch checked out, you can start making changes to the documentation. Remember to save your work regularly and commit your changes often.

    !!! tip
        You can live preview your changes locally by running `mkdocs serve` in your terminal. For more on this, see [Building the Documentation Locally](#building-the-documentation-locally) section.

5. **Commit your changes:** Once you have made and tested your changes, stage the files you have modified using `git add <file>` or `git add .` to stage all changes. Then, commit your changes with a descriptive message using `git commit -m "<YOUR_COMMIT_MESSAGE>"`.

6. **Push your changes:** You can push your changes to your forked repository by running `git push origin <BRANCH_NAME>`.

7. **Submit a Pull Request (PR):** After pushing your changes, go to HPC-Docs github repository, and click on "New pull request". Fill in the necessary details and submit the PR. Once your have submitted the PR, a bunch of automatic workflows will be triggered. readthedocs will build a preview of your document and add it to the PR. This allows you to preview your changes before they are merged into the main branch.


#### Building the Documentation Locally

If you want to build the documentation locally to see the changes you've made, you can do so by following these steps:

##### Create a `conda` Environment
To build the documentation locally and preview it, you'll need to install certain dependencies. Although this step is optional, we strongly recommend it.

The example provided here creates a new  `conda` environment named `mkdocs` from the provided `conda.yaml` file.

  ```bash
  conda env create -f conda.yaml
  conda activate mkdocs
  ```

##### Preview Documentation Locally
You can preview your documentation locally to make sure that your changes do not introduce any errors. With MkDocs, you can preview your changes by running `mkdocs serve` in your terminal. This starts a local server where you can preview your work.

  ```
  mkdocs serve --strict
  ```

!!! note
      `--strict` flag will enable strict mode and treat warnings as errors. This is useful to ensure that your changes do not introduce any issues such as new pages that does not exist.  Occasionally you may want to omit the `--strict` flag, for example when adding new pages that have not yet been committed through `git`.

### Simple Contributions

If you're looking to make a minor adjustment to our documentation, such as fixing a typo or adding minor enhancements to a few documents, GitHub's built-in web editor and web IDE make it easy.

As you browse our documentation, you'll notice a pencil icon next to the header on each page. This icon is a shortcut to edit the current page. Here's how you can use this feature:

1. Click on the pencil icon (<img src="https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/templates/.icons/material/pencil.svg" width="20" height="20">) at the top right corner of the page to open the GitHub's built-in editor.
2. Make your desired changes.
3. After you've made your changes, be sure to update the commit message. A clear and concise commit message helps us understand your contribution better.
4. While not mandatory, we recommend renaming the branch for better organization and tracking of changes.
5. Submit your changes.

## Feedback and Support

If you have any questions or need assistance while contributing to this repository, please reach out to the repository maintainers or open an issue on the GitHub repository page.

Thank you for your contributions and helping us create a valuable resource for NCAR's HPC community!
