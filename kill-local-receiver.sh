#!/bin/sh

set -e

  if [ -f "./tmp/pids/local-receiver.pid" ]; then
  echo "Killing local-receiver"
  kill "$(< ./tmp/pids/local-receiver.pid)"
  rm ./tmp/pids/local-receiver.pid
  fi