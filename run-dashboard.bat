@echo off
echo Checking if Docker is installed...

where docker >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Docker is not installed. Please install Docker first.
    exit /b 1
)

echo Starting the dashboard application...
docker-compose up -d

echo.
echo Dashboard is now running!
echo Access it at: http://localhost:3000
echo.
echo To view logs: docker-compose logs -f
echo To stop: docker-compose down

