#!/bin/bash

# Stop any running containers
docker-compose down

# Build and run the container
docker-compose up --build
