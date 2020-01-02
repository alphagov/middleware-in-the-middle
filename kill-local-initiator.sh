#!/bin/sh

set -e

  if [ -f "./tmp/pids/local-initiator.pid" ]; then
  echo "Killing local-initiator"
  kill "$(< ./tmp/pids/local-initiator.pid)"
  rm ./tmp/pids/local-initiator.pid
  fi