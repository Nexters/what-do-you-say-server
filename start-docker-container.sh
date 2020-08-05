#!/bin/bash

DOCKER_APP_NAME=what-do-you-say-server

EXIST_BLUE_SERVER=$(docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml ps | grep Up)

if [ -z "$EXIST_BLUE_SERVER" ]; then
  echo "Docker conatiner blue up"

	docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml up -d

	sleep 10

	docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yml down
else
  echo "Docker conatiner green up"

  docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yml up -d

	sleep 10

	docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml down
fi