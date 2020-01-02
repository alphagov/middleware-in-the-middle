#!/bin/sh

set -e

PID_DIR=./tmp/pids
if [ ! -d $PID_DIR ]; then
    echo -e 'Creating PIDs directory\n'
    mkdir -p $PID_DIR
fi 

npm install
npm run-script local-initiator 

