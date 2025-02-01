#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Setting up the project..."

# Ensure Docker is installed and accessible
if ! command -v docker &>/dev/null && ! which docker &>/dev/null && ! wslpath "$(command -v docker)" &>/dev/null; then
    echo "❌ Docker is not installed or not in PATH. Please install it first."
    exit 1
fi

# Ensure Docker daemon is running
if ! docker info &>/dev/null; then
    echo "❌ Docker is installed but the daemon is not running. Start Docker and try again."
    exit 1
fi

# Ensure Docker Compose is installed and accessible
if ! command -v docker compose &>/dev/null && ! which docker-compose &>/dev/null; then
    echo "❌ Docker Compose is not installed or not in PATH. Please install it first."
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
