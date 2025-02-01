#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Setting up the project..."

# Check for Docker and Docker Compose
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null
then
    echo "❌ Docker or Docker Compose is not installed. Please install them first."
    exit 1
fi

# Create .env files if not exist
if [ ! -f "person-details-fe/.env" ]; then
    echo "Creating frontend .env file..."
    cp person-details-fe/.env.example person-details-fe/.env
fi

if [ ! -f "person-details-be/.env" ]; then
    echo "Creating backend .env file..."
    cp person-details-be/.env.example person-details-be/.env
fi

# Pull Docker images (if needed)
echo "🔄 Pulling necessary Docker images..."
docker-compose pull

# Start the project
echo "🚀 Running Docker Compose..."
docker-compose up --build

echo "✅ Project is now running!"
