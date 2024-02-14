#!/bin/bash

# Exit script on error
set -e

# Move to the application directory
# cd /api

# Update the environment variables
echo "$PRODUCTION_ENV" > .env.production

# Deploy changes without stopping the entire application
# docker-compose pull

# cat .env
 
docker build -t vzy-api:latest . && docker-compose up -d --no-recreate
docker-compose exec nginx service nginx restart