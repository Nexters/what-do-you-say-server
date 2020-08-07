#!/bin/bash

cd /home/ubuntu/deploy/what-do-you-say-server &&
sudo cp ../server-environment/.env ./.env
#./start-docker-container.sh > /dev/null 2> /dev/null < /dev/null &