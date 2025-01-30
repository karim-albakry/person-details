@echo off
echo 🚀 Setting up the project...

:: Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker is not installed. Please install it first.
    exit /b 1
)

:: Check if Docker Compose is installed
where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker Compose is not installed. Please install it first.
    exit /b 1
)

:: Create .env files if they don't exist
if not exist "person-details-fe\.env" (
    echo Creating frontend .env file...
    copy person-details-fe\.env.example person-details-fe\.env
)

if not exist "person-details-be\.env" (
    echo Creating backend .env file...
    copy person-details-be\.env.example person-details-be\.env
)

:: Pull Docker images
echo 🔄 Pulling necessary Docker images...
docker-compose pull

:: Start the project
echo 🚀 Running Docker Compose...
docker-compose up --build

echo ✅ Project is now running!
pause
