#!/bin/bash

if ! systemctl is-active --quiet "nginx"; then
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

    echo "[$TIMESTAMP] Service 'nginx' was down. Attempting restart." | sudo tee -a "/var/log/nginx-monitor.log"


    sudo systemctl restart "nginx"

    if systemctl is-active --quiet "nginx"; then
        echo "[$TIMESTAMP] Service 'nginx' restarted successfully." | sudo tee -a "/var/log/nginx-monitor.log"
    else
        echo "[$TIMESTAMP] CRITICAL: Failed to restart service 'nginx'." | sudo tee -a "/var/log/nginx-monitor.log"
    fi
fi

exit 0


#nginx_service_checkup