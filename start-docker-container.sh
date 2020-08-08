#!/bin/bash

DOCKER_APP_NAME=what-do-you-say-server

EXIST_BLUE_SERVER=$(docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml ps | grep Up)

if [ -z "$EXIST_BLUE_SERVER" ]; then
  echo "Docker Image Build - Blue"

  docker build -t ${DOCKER_APP_NAME}-blue .

  echo "Docker Conatiner Up - Blue"

  docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml up -d

  sleep 10

  echo "Docker Conatiner Down - Green"

	docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yml down

	echo "Docker Image Remove - Green"

	docker rmi ${DOCKER_APP_NAME}-green
else
  echo "Docker Image Build - Green"

  docker build -t ${DOCKER_APP_NAME}-green .

  echo "Docker Conatiner Up - Green"

  docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yml up -d

	sleep 10

	echo "Docker Conatiner Down - Blue"

	docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yml down

	echo "Docker Image Remove - Blue"

  docker rmi ${DOCKER_APP_NAME}-blue
fi