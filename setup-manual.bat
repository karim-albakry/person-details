@echo off
echo 🚀 Setting up the project manually...

:: Ensure Docker is installed and running
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker is not installed or running. Please install and start Docker first.
    exit /b 1
)

:: Start PostgreSQL inside Docker if not already running
docker ps --format "{{.Names}}" | findstr /R /C:"^person-postgres-db$" >nul
if %ERRORLEVEL% NEQ 0 (
    echo 🔄 Starting PostgreSQL database in Docker...
    docker run --name person-postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=persons_db -p 5432:5432 -d postgres
    echo ✅ PostgreSQL container started!
) else (
    echo ✅ PostgreSQL container is already running.
)

:: Create .env files from .env.example if they don't exist
if not exist "person-details-fe\.env" (
    echo Creating frontend .env file...
    copy person-details-fe\.env.example person-details-fe\.env
)

if not exist "person-details-be\.env" (
    echo Creating backend .env file...
    copy person-details-be\.env.example person-details-be\.env
)

:: Wait for PostgreSQL to be ready
echo ⏳ Waiting for PostgreSQL to be ready...
timeout /t 5 /nobreak >nul

:: Run database migration inside the Docker container (Fixed Path Issue)
echo 🔄 Running database migration inside Docker...
docker cp person-details-be/database/init.sql person-postgres-db:/init.sql
docker exec -i person-postgres-db psql -U admin -d persons_db -f /init.sql

:: Install dependencies and start backend
echo 📦 Installing backend dependencies...
cd person-details-be
npm install
start npm run dev

:: Install dependencies and start frontend
cd ../person-details-fe
yarn install
start yarn dev

echo ✅ Manual setup complete! Frontend running at http://localhost:5173, Backend running at http://localhost:3000/api
pause
