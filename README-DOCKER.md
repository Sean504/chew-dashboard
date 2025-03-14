# Running the Dashboard Application with Docker

This guide explains how to run the dashboard application using Docker, without needing Node.js installed on your machine.

## Prerequisites

- Docker installed on your machine
  - [Install Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - [Install Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Install Docker for Linux](https://docs.docker.com/engine/install/)
- Docker Compose installed (comes with Docker Desktop for Windows and Mac)
- Your API running on port 8080 (or configure the API_BASE_URL in docker-compose.yml)

## Running the Application

1. Open a terminal/command prompt in the folder containing the docker-compose.yml file

2. Build and start the container:

```bash
docker-compose up

