#!/bin/bash

HOSTNAME=`hostname`

echo "Now backing up home directory in ~/Backups/servers/${HOSTNAME}.tar.gz"
tar czvf ~/Backups/servers/${HOSTNAME}.tar.gz ~

echo "Resolving role in backup process... Consulting configuration files: data_transfer.js"
ENDPOINT=`./data_transfer.js $HOSTNAME $USER`

echo This is the endpoint: $ENDPOINT

echo "This is the end of the bash script"
