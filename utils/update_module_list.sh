#!/bin/bash

case ${1} in
     "casper")
              cat <<EOF
<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "${0} ${@}" -->
\`\`\`pre
$(ssh casper01.ucar.edu "module --width=80 avail 2>&1")
\`\`\`
EOF
              ;;


     "derecho")
              cat <<EOF
<!-- DO NOT EDIT!! -->
<!-- This file is automatically created from "${0} ${@}" -->
\`\`\`pre
$(ssh derecho.hpc.ucar.edu "module --width=80 avail 2>&1")
\`\`\`
EOF
              ;;

esac
