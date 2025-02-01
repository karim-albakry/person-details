#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Setting up the project manually..."

# Ensure Docker is running
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed or running. Please install and start Docker first."
    exit 1
fi

# Start PostgreSQL inside Docker if not already running
if ! docker ps --format '{{.Names}}' | grep -q '^person-postgres-db$'; then
    echo "🔄 Starting PostgreSQL database in Docker..."
    docker run --name person-postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=persons_db -p 5432:5432 -d postgres
    echo "✅ PostgreSQL container started!"
else
    echo "✅ PostgreSQL container is already running."
fi

# Create .env files from .env.example if they don't exist
if [ ! -f "person-details-fe/.env" ]; then
    echo "Creating frontend .env file..."
    cp person-details-fe/.env.example person-details-fe/.env
fi

if [ ! -f "person-details-be/.env" ]; then
    echo "Creating backend .env file..."
    cp person-details-be/.env.example person-details-be/.env
fi

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5  # Give time for the container to initialize

# Run database migration inside the Docker container
echo "🔄 Running database migration inside Docker..."
docker exec -i person-postgres-db psql -U admin -d persons_db < person-details-be/database/init.sql

# Install dependencies and start backend
echo "📦 Installing backend dependencies..."
cd person-details-be
npm install
npm run dev &

# Install dependencies and start frontend
cd ../person-details-fe
yarn install
yarn dev &

echo "✅ Manual setup complete! Frontend running at http://localhost:5173, Backend running at http://localhost:3000/api"
