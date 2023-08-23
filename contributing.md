# Contribution Guide

Welcome to the NCAR HPC Resources GitHub repository!

This guide provides an overview of how to contribute to this project and the standards to follow when adding content to this repository. Our goal is to create a comprehensive and user-friendly documentation resource for NCAR's HPC resources.

## Repository Overview

This repository contains technical documentation for NCAR HPC resources. The documentation is written in Markdown, which is then converted to HTML/CSS/JS using the mkdocs static site generator. We have customized the mkdocs-material theme to align with NCAR branding and colors.


## Making Contributions

### Simple Contributions

If you're looking to make a minor adjustment to our documentation, such as fixing a typo or adding minor enhancements to a few documents, GitHub's built-in web editor and web IDE make it easy.

As you browse our documentation, you'll notice a pencil icon next to the header on each page. This icon is a shortcut to edit the current page. Here's how you can use this feature:

1. Click on the pencil icon to open the editor.
2. Make your desired changes.
3. After you've made your changes, be sure to update the commit message. A clear and concise commit message helps us understand your contribution better.
4. While not mandatory, we recommend renaming the branch for better organization and tracking of changes.
5. Submit your changes.

No contribution is too small. We appreciate your help in improving and maintaining the quality of our documentation.

Visit out guidelines for writing better documentations. 

### Complex Contributions

For more substantial modifications, such as a comprehensive revision of a section in the documentation, we recommend cloning the repository to your local machine and working from there.

#### Prerequisites

Before you start, make sure you have the following installed on your local machine:

- Git: This is used for source code management and version control.
- Python: Since MkDocs is a Python project, you'll need Python installed to work with it.
- A text editor or IDE of your choice.


#### Steps to Contribute

1. **Fork the repository:** Go to the repository page and click the "Fork" button to create a copy of the repository in your GitHub account.

2. **Clone the forked repository to your local machine:** This can be done by running the following command in your terminal:
    ```bash
    git clone https://github.com/<YOUR_USERNAME>/hpc-docs-demo.git
    ```
    Replace `<YOUR_USERNAME>` with your GitHub username.

3. **Create a new branch:** It's a good practice to create a new branch before you start making changes. This can be done by running:
    ```bash
    git checkout -b <BRANCH_NAME>
    ```
    Replace `<BRANCH_NAME>` with a name that gives a hint about the changes you're about to make.

4. **Create an Environment:** 
To build the documentation locally, you'll need to install certain dependencies. Although this step is optional, we strongly recommend it. The example provided here utilizes a conda environment, but feel free to use any Python 3 environment of your preference.

```sh
    conda create -n docs pip
    conda activate docs
    pip install -r requirements.txt
```


4. **Make your changes:** With your new branch checked out, you can start making changes to the documentation. Remember to save your work regularly.

5. **Test your changes:** Make sure that your changes do not introduce any errors. With MkDocs, you can preview your changes by running `mkdocs serve` in your terminal. This starts a local server where you can preview your work.

6. **Commit your changes:** Once you have made and tested your changes, stage the files you have modified using `git add <file>` or `git add .` to stage all changes. Then, commit your changes with a descriptive message using `git commit -m "<YOUR_COMMIT_MESSAGE>"`.

7. **Push your changes:** You can push your changes to your forked repository by running `git push origin <BRANCH_NAME>`.

8. **Submit a Pull Request (PR):** After pushing your changes, go to your forked repository on GitHub, and click on "New pull request". Fill in the necessary details and submit the PR.

Please note, for larger changes, it's often a good idea to discuss your plans in an issue before investing a lot of time in implementation. This helps to ensure that your efforts align with the project's direction and your changes have a higher chance of being accepted.


## Feedback and Support

If you have any questions or need assistance while contributing to this repository, please reach out to the repository maintainers or open an issue on the GitHub repository page.

Thank you for your contributions and helping us create a valuable resource for NCAR's HPC community!
