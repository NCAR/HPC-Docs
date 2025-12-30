#
# Takes the provided branch names as a comma delimited string and updates
# the chart values file to deploy those instances
#

#!/usr/bin/env python

import sys
import yaml
import csv

values_file = sys.argv[1]

d = {'branches': []}
with open('/tmp/hash', 'r') as hashfile:
    reader = csv.reader(hashfile)
    for row in reader:
        d['branches'].append({'name':row[0],'imageTag':row[1]})
with open(values_file, 'w') as yfile:
    yaml.dump(d,yfile)
