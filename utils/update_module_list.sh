#!/bin/bash

case ${1} in
     "casper")
              cat <<EOF
<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "${0} ${@}" -->

## Casper default module environment
\`\`\`pre
$(ssh casper01.ucar.edu "module --width=80 avail 2>&1")
\`\`\`

## Casper complete module listing
\`\`\`pre
$(ssh casper01.ucar.edu "module --width=80 spider 2>&1 | grep '\S'")
\`\`\`
EOF
              ;;


     "derecho")
              cat <<EOF
<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "${0} ${@}" -->

## Derecho default module list
\`\`\`pre
$(ssh derecho.hpc.ucar.edu "module --width=80 avail 2>&1")
\`\`\`

## Derecho complete module listing
\`\`\`pre
$(ssh derecho.hpc.ucar.edu "module --width=80 spider 2>&1 | grep '\S'")
\`\`\`
EOF
              ;;

esac
