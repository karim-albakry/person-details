#!/bin/bash

set -e  # Exit on first error

echo "🚀 Setting up the project..."
echo ""

# Ensure Docker is installed and running
if [ -x "$(command -v docker)" ]; then
    echo "✅ Docker is installed at $(command -v docker)"
else
    echo "❌ Docker is not installed or not in PATH. Please install it first."
    exit 1
fi

# Ensure Docker Compose is installed and running
if [ -x "$(command -v docker-compose)" ]; then
    echo "✅ Docker Compose is installed at $(command -v docker-compose)"
else
    echo "❌ Docker Compose is not installed. Please install it first."
    exit 1
fi

# Create .env files from .env.example if they don't exist
if [ ! -f "person-details-fe/.env" ]; then
    echo "📝 Creating frontend .env file..."
    cp person-details-fe/.env.example person-details-fe/.env
fi

if [ ! -f "person-details-be/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp person-details-be/.env.example person-details-be/.env
fi

echo "✅ Environment variables are set."
echo ""

# Pull latest Docker images (if needed)
echo "🔄 Pulling necessary Docker images..."
docker-compose pull

# Start the project
echo "🚀 Running Docker Compose..."
docker-compose up --build

echo "✅ Project is now running!"
