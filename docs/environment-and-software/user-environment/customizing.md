# Personalizing start files

You can personalize your NCAR high-performance computing environment by
using the sample content below in your startup files – the files that
create your interactive login shell. The examples provide alternative
color schemes and set some commonly used aliases.

These examples also demonstrate how to define commands to be run
for *interactive sessions only* and commands to be run for *all new
shells*. This distinction can be important if you have some commands in
your initialization files that would be disruptive for non-interactive
connections, such as when using the `scp` command (which is not
interactable and therefore will not benefit from module loads or
aliases) or within a batch script.

If you use bash or ksh, edit your `.profile` file. If you use tcsh,
edit your `.tcshrc` file. PBS jobs on NCAR systems initialize your job
environment with those files, so do not confuse them
with `.bashrc` and `.login` files, which have different purposes and
are not always sourced at login time.)

Personalizing these files is optional; the information is provided in
response to users' requests.

!!! danger "Keep the following in mind when writing/revising your initialization files"

    - Consider making backup copies of your existing startup files before
      creating customized files.

    - If you source other scripts in your initialization files, be sure to
      provide an absolute path to the file (or a consistent reference path
      like `source ~/commands` instead of `source commands`). That way,
      the script will execute correctly whether it is run from a session
      within your home directory or anywhere else on the file systems.

    - It is best to include only those commands and settings in your
      initialization files that are generic to all work you perform.
      Examples of these include environment variables and `module
      load` commands. Any settings specific to a particular workflow, or
      settings others may need to run your jobs, should be included in
      relevant shell and PBS batch scripts rather than in your
      initialization files.

    - Some programs (conda, for example) insert initialization instructions
      into your startup files. These instructions will be executed for most
      new shells, including at the start of your PBS jobs.



=== "`~/.profile` for bash and ksh users"
    ```bash
    ### Settings for interactive shells only
    if [[ $- == *i* ]]; then
        # My Personal Prompt
        #PS1="\u@\h:\w> "
        # Another Colorful Prompt
        PS1="\[\e[1;31;40m\]\u@\[\e[1;34;40m\]\H:\[\e[1;32;40m\]\w>\[\e[0m\] "
        export PS1

        # Generic Aliases
        alias rm='rm -i'
        alias cp='cp -i'
        alias mv='mv -i'
        alias h="history | grep "
        alias ls="ls --color"
        alias vi="vim"
        alias j='qstat'
        alias more='less'
        alias tail='tail ---disable-inotify -f'
        alias diffcolor='git diff --color=always --color-words'
    fi

    ### Settings for all shells
    export PATH=~/bin:$PATH
    # Set default project allocation code on Derecho and Casper
    export PBS_ACCOUNT=DEFAULT_PROJECT_CODE
    # Set default project allocation code on Derecho/Casper, supersedes above
    export PBS_ACCOUNT_DERECHO=DEFAULT_DERECHO_PROJECT_CODE
    export PBS_ACCOUNT_CASPER=DEFAULT_CASPER_PROJECT_CODE

    ### Source .bashrc file to make environment more consistent
    ### (optional - some users prefer this; e.g., conda users)
    if [[ -f ~/.bashrc ]]; then
        . ~/.bashrc
    fi
    ```

=== "`~/.tcshrc` for tcsh users"
    ```tcsh
    ### Settings for interactive shells only
    tty > /dev/null
    if ( $status == 0 ) then
        # My Personal Prompt
        #set prompt = "%n@%m:%~"
        # Another Colorful Prompt
        set prompt = "%{\033[31;40m%}%n@%{\033[0m%}%{\033[1;34m%}%m:%{\033[0m%}%{\033[32;40m%}%~>%{\033[0m%} "

        # Generic Aliases
        alias rm 'rm -i'
        alias cp 'cp -i'
        alias mv 'mv -i'
        alias h "history | grep "
        alias ls "ls --color"
        alias vi "vim"
        alias j 'qstat'
        alias more 'less'
        alias diffcolor 'git diff --color=always --color-words'
    endif

    ### Settings for all shells
    setenv PATH ~/bin:$PATH
    # Set default project allocation code on Derecho and Casper
    setenv PBS_ACCOUNT DEFAULT_PROJECT_CODE
    # Set default project allocation code on Derecho/Casper, supersedes above
    setenv PBS_ACCOUNT_DERECHO DEFAULT_DERECHO_PROJECT_CODE
    setenv PBS_ACCOUNT_CASPER DEFAULT_CASPER_PROJECT_CODE
    ```
