# Visual Studio Code

Visual Studio Code, also commonly referred to as VS Code, is a source-code editor developed by Microsoft for Windows, Linux, macOS and web browsers. Features include support for debugging, syntax highlighting, intelligent code completion, snippets, code refactoring, and embedded version control with Git.

The Visual Studio Code Remote - SSH extension allows you to open a remote folder on any remote machine, virtual machine, or container with a running SSH server and take full advantage of VS Code's feature set. Once connected to a server, you can interact with files and folders anywhere on the remote filesystem.

VSCode is available for NCAR issued laptops in the *Self Service* application or can be [downloaded](https://code.visualstudio.com/download) directly from the Microsoft VS Code website.

## Connecting to Derecho or Casper

The Visual Studio Code Remote SSH extension allows you to connect to Derecho, Casper, and the GLADE filesystem. Once connected to a server, you can interact with files and folders anywhere on GLADE.  You can connect to the Derecho or Casper login nodes by following these steps:

!!! example "Connecting to NCAR system login nodes" 
    === "Derecho"

        1. Press F1 and run the *Remote-SSH: Open SSH Host* command.
        2. Enter your NCAR CIT username in the following format in the input box that appears and press enter: user@derecho.hpc.ucar.edu
        3. Enter your NCAR CIT password when prompted.
        4. Accept the DUO Push request.

    === "Casper"

        1. Press F1 and run the *Remote-SSH: Open SSH Host* command.
        2. Enter your NCAR CIT username in the following format in the input box that appears and press enter: user@casper.hpc.ucar.edu.
        3. Enter your NCAR CIT password when prompted.
        4. Accept the DUO Push request.


!!! tip 
    You can connect to recently used remote paths by creating a new window, tab, or the *File > Open Recent* dropdown and selecting it from the *Recent* list.

!!! tip 
    The *Open a Remote Window* button in the bottom left corner is an alternative to opening a remote server and shows the available remote connection options.  *Connect Current Window to Host* is a useful command to reload the session if you have been disconnected.


It may be necessary to first add Derecho or Casper if you have never connected to Derecho or Casper using SSH. You can add a host to connect to using SSH as a new host in the Remote-SSH extension.

1. Press F1 and run the *Remote-SSH: Add a New Host* command.
2. When you are prompted to connect to a host you can enter the full SSH path like you would when connecting via the terminal:

```
ssh -Y <user>@derecho.hpc.ucar.edu
```

!!! danger 
    Connecting to Derecho or Casper using VS Code Remote-SSH will place you on a login node.  Be respectful of users on this shared resource and do not launch computationally or memory intensive tasks while connected to the login nodes.  VS Code uses more memory than most processes running on the login nodes and you can easily be flagged for login node abuse by our automated systems.  If you are interested in using VS Code for more computationally or memory intensive applications then view the [Connecting to Compute Nodes](#connecting-to-compute-nodes) section to run on the compute nodes.


## Connecting to Compute Nodes
The integration of PBS Batch jobs with VS Code requires some additional configuration for Derecho.  Casper requires that you launch your PBS job and then SSH directly into the compute node.  Derecho does not allow external connections to the compute nodes and requires a proxy node to connect to compute nodes from a VS Code Remote-SSH window.

!!! example "Connecting to NCAR compute nodes"
    === "Derecho"
        Create a proxy option for Derecho login nodes to the compute nodes.  Add the following lines to your local SSH configuration file:

        ```
        Host dec????
        HostName derecho.hpc.ucar.edu
        RemoteCommand ssh %n
        RequestTTY yes

        Host deg????
        HostName derecho.hpc.ucar.edu
        RemoteCommand ssh %n
        RequestTTY yes

        ```

        Once the proxy connection can be established with your edited local SSH configuration file, use the following steps to connect to a compute node:

        1. Connect to a Derecho login node using Remote-SSH
        2. From the Terminal, launch an interactive job using `qsub -I`
        3. Identify the assigned compute node name
        4. Launch a new window and connect directly to the compute node using Remote-SSH

    === "Casper"
        Casper does not require any modifications to your local SSH configuration file.

        1. Connect to a Casper login node using Remote-SSH
        2. From the Terminal, launch an interactive job using `qsub -I`
        3. Identify the assigned compute node name
        4. Launch a new window and connect directly to the compute node using Remote-SSH


## Remote System

Once connected to a node, you can interact with the GLADE filesystem using either the built-in Terminal or the File Explorer.

### Terminal

Open a terminal using either of these methods:

1. From the menu, use the *Terminal > New Terminal* or *View > Terminal* menu commands.
2. From the Command Palette (⇧⌘P), use the *View: Toggle Terminal* command.

The terminal has Shell Integration options and the default will be selected based on your SAM shell settings for each system.  You can modify the shell with the terminal shell dropdown.  Clicking the `+` will create a new terminal window with the current shell.

![Shell Dropdown](vscode/media/shell_dropdown.png)

Create multiple terminal windows in a split pane.

![Shell Panes](vscode/media/shell_pane.png)

!!! tip
    To toggle the between the terminal pane and code pane, use the ``` (Ctrl`) ``` *(Control+Backtick)* keyboard shortcut.  To create a new terminal, use the (Ctrl⇧\`) *(Control+Shift+Backtick)* keyboard shortcut.

### File Explorer

After connecting to a Remote SSH NCAR login node, you can bring up the File Explorer view by clicking on the File Explorer icon in the Activity Bar on the side of VS Code or the *View: Explorer* command (⇧⌘E)

![Explorer Icon](vscode/media/explorer-view-icon.png)

The Explorer tab allows a graphical file structure for the path that you provide.  If you are already connected to a Derecho or Casper login node then you will see the GLADE file structure populated.

!!! warning 
    VS Code will be able to view all subdirectories of your path when connecting the Explorer. Be mindful that a higher total number of files in the Explorer space will increase your memory and CPU utilization on the login nodes by default.  We recommend only selecting the path for your current project and the files that you need to directly interact with during that session.  Instead of connecting to `/glade/work/$USER`, connect to your project folder of `/glade/work/$USER/myproject/code`.  Smaller Explorer spaces also help with performance for addons that use code completion like Intellisense.

!!! tip
    Reduce the number of files that VS Code scans periodically to lower CPU utilization, memory, and Intellisense scanning time on the login nodes.  Add these paths to your Settings file found in *Code > Preferences > Settings*, search for the strings below, and add the wildcard items to each file exclude type:

    ```
    "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/node_modules/**": true,
        "**/dist/**": true,
        "**/conda-envs/**": true
        "**/env/**": true,
    },
    "files.exclude": {
        "**/.git/objects/**": true,
        "**/node_modules/**": true,
    },
    "search.exclude": {
        "**/node_modules/**": true,
        "**/dist/**": true,
        "**/tmp/**": true,
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/.DS_Store": true,
        "**/.vscode": true,
        "**/__pycache__": true,
        "**/.pytest_cache": true,
    },
    ```

### Source Control

VS Code has integrated source control management (SCM) and includes Git support natively. Access the Source Control view by clicking on the Source Control icon in the Activity Bar on the side of VS Code or the *View: Source Control* command (⇧⌘G)

![Source Control](vscode/media/sourcecontrol-view-icon.png)

### Extensions

Browse and install extensions from within VS Code. Bring up the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of VS Code or the *View: Extensions* command (⇧⌘X).

![Extension Icon](vscode/media/extensions-view-icon.png)

Search for extensions within the Extensions tab and click the extension to install, disable, or view details about it.  The `...` button will provide additional options to enable or disable all extensions, update current extensions, or view all running extensions.

![Extension Details](vscode/media/extensions-list.png)

!!! danger 
    Extensions are a powerful tool within the VS Code environment but not all extensions are sponsored by reputable sources.  Extension problems can manifest in errors, poor memory management, and excessive CPU utilization.  We are unable to support all possible extensions that exist so we recommend disabling all but the core extensions before reporting a problem to the NCAR HPC support team.

## Conda and Python Environments

### Terminal mode

Terminal mode ignores the VS Code environment and uses the NCAR system module stack.  This is identical to the behavior of running within the Mac Terminal over SSH.  You can perform module loads and activate Conda environments directly from the terminal.

!!! tip 
    Interacting with a file that was opened with the `code` command will require the Interactive method for running the code.

### Interactive mode

VS Code can use the Python Interactive mode to launch Jupyter notebooks, Python scripts, or debug code with the proper extensions.  

The *Python Interpreter* is used to set the environment for interactive mode.  To select an environment, use the *Python: Select Interpreter* command from the Command Palette (⇧⌘P).  A valid environment is required to properly run Jupyter notebooks within VS Code and is a common use case for NCAR users.

If you are connected to Derecho or Casper and have a Jupyter notebook or Python file preview open, you can click *Select Kernel* to view your available Python environments.  The list includes NCAR conda environments like `npl` and your own custom environments.

![Kernel Select](vscode/media/selectkernel.png)

Open a Jupyter notebook or Python file using either the terminal command `code` or with the File Explorer.  This will put you in the default kernel.  Like Jupyterhub, you will need to specify which kernel to use when executing cells in the notebook.  Not specifying a kernel will use your default kernel and could lead to import failures or unexpected behavior.

!!! info 
    Adding your conda-envs folder to the list of *Trusted* kernels will allow you to run notebooks with these kernels without being prompted to trust the kernel each time you run select a new kernel.

## Jupyter Notebooks
You can run cells similarly to Jupyterhub with the 'Run All' or an individual cell by hitting *Shift+Enter*.  Jupyter notebooks will use the VS Code kernel as your Python environment.

![Jupyter Notebook](vscode/media/jnbkernel.png)

Be mindful of the location of launching your notebooks.  If you use the File Explorer tab then you will be running on the login nodes.  
Executing the command *code* from an interactive job will execute on the compute node.

## Additional Resources
Microsoft provides [comprehensive documentation](https://code.visualstudio.com/docs) on how to modify the GUI, add shortcuts, integrate external technologies into VS Code, and more.

