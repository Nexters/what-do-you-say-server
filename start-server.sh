#!/bin/bash

DOCKER_APP_NAME=what-do-you-say-server

EXIST_SERVER=$(docker-compose -p ${DOCKER_APP_NAME} -f docker-compose.server.yml ps | grep Up)

if [ -z "$EXIST_SERVER" ]; then
  echo "Server start in docker"

  docker-compose -f docker-compose.server.yml up -d
else
  echo "Server reload in docker"

  docker exec what-do-you-say-server pm2 reload ecosystem.config.js
fi