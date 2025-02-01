#!/bin/bash

echo "\n🚀 Setting up the project manually..."

# Ensure Docker is installed and running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start PostgreSQL inside Docker if not already running
if ! docker ps --format "{{.Names}}" | grep -q "^person-postgres-db$"; then
    echo "🔄 Starting PostgreSQL database in Docker..."
    docker run --name person-postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=persons_db -p 5432:5432 -d postgres
    echo "✅ PostgreSQL container started!"
else
    echo "✅ PostgreSQL container is already running."
fi

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker exec person-postgres-db pg_isready -U admin -d persons_db > /dev/null 2>&1; do
    sleep 2
    echo "🔄 Still waiting for PostgreSQL..."
done
echo "✅ PostgreSQL is ready!"

# Create .env files from .env.example if they don't exist
if [ ! -f "person-details-fe/.env" ]; then
    echo "📄 Creating frontend .env file..."
    cp person-details-fe/.env.example person-details-fe/.env
fi

if [ ! -f "person-details-be/.env" ]; then
    echo "📄 Creating backend .env file..."
    cp person-details-be/.env.example person-details-be/.env
fi

# Run database migration inside the Docker container
echo "🔄 Running database migration inside Docker..."
docker cp person-details-be/database/init.sql person-postgres-db:/init.sql
docker exec -i person-postgres-db psql -U admin -d persons_db -f /init.sql

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd person-details-be || { echo "❌ Backend directory not found!"; exit 1; }
npm install || { echo "❌ Backend installation failed."; exit 1; }
cd ..
echo "✅ Backend installation completed!"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd person-details-fe || { echo "❌ Frontend directory not found!"; exit 1; }
yarn install || { echo "❌ Frontend installation failed."; exit 1; }
cd ..
echo "✅ Frontend installation completed!"

# Start backend in a new persistent terminal
echo "🚀 Starting backend..."
gnome-terminal -- bash -c "cd person-details-be && npm run dev; exec bash" 2>/dev/null || \
x-terminal-emulator -e "cd person-details-be && npm run dev" 2>/dev/null || \
xterm -hold -e "cd person-details-be && npm run dev" 2>/dev/null || \
konsole -e "cd person-details-be && npm run dev" 2>/dev/null || \
echo "⚠️ Unable to start backend in a new terminal. Run 'cd person-details-be && npm run dev' manually."

# Start frontend in a new persistent terminal
echo "🚀 Starting frontend..."
gnome-terminal -- bash -c "cd person-details-fe && yarn dev; exec bash" 2>/dev/null || \
x-terminal-emulator -e "cd person-details-fe && yarn dev" 2>/dev/null || \
xterm -hold -e "cd person-details-fe && yarn dev" 2>/dev/null || \
konsole -e "cd person-details-fe && yarn dev" 2>/dev/null || \
echo "⚠️ Unable to start frontend in a new terminal. Run 'cd person-details-fe && yarn dev' manually."

echo "✅ Project is now running!"
