#!/bin/sh

set -e

npm start > /var/log/${MODE}.log 2>&1
