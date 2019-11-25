#!/bin/sh

set -e

if [ "-h" = "$1" ] || [ "--help" = "$1" ]
then
    echo ""
    echo "Usage: make_service.sh NAME"
    echo ""
    echo "Install a systemd service definition for this server."
    exit 0
fi

# Sourced from Stack Overflow answer
# https://stackoverflow.com/a/29835459
# author: https://stackoverflow.com/users/1230559/city
# answer author: https://stackoverflow.com/users/45375/mklement0
script_directory=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

service_directory='/etc/systemd/system'

if [ -z "$1" ]
then
    service_name='example'
    mode_env_var=''
else
    service_name="stub-$1"
    mode_env_var="Environment=MODE=$1"
fi

mkdir -p ${service_directory}
# The following service template is sourced from Stack Overflow answer
# https://stackoverflow.com/a/42126391
# author: https://stackoverflow.com/users/292712/jerome-wagner
# answer author: https://stackoverflow.com/users/823282/activedecay
cat <<EOF | sudo tee ${service_directory}/${service_name}.service > /dev/null
[Unit]
Description=npm-express-${service_name}
After=network.target

[Service]
WorkingDirectory=${script_directory}
ExecStart=${script_directory}/run-service.sh
Restart=always
User=${USER}
Group=$(id -gn)
Environment=PATH=${PATH}
Environment=NODE_ENV=production
${mode_env_var}

[Install]
WantedBy=multi-user.target
EOF

# Create a log file
sudo touch "/var/log/$1.log"
sudo chown "${USER}:$(id -gn)" "/var/log/$1.log"

sudo systemctl daemon-reload

echo "Service definition created at ${service_directory}/${service_name}.service"
echo "To enable start-at-boot, run:"
echo "    systemctl enable ${service_name}"
echo "All the standard systemctl commands should be available, including:"
echo "    systemctl start ${service_name} # starts the service"
echo "    systemctl status ${service_name} # prints status information about the service"
echo "    systemctl stop ${service_name} # stops the service if running"
echo "    systemctl restart ${service_name} # restarts a running service"
