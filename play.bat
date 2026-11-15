@echo off
title Junior Astronaut Mission Trainer - NASA Mission Control
echo ==========================================================
echo   Junior Astronaut Mission Trainer - Local Server Launcher
echo   NASA Space Apps Challenge
echo ==========================================================
echo Detecting available port and starting local server...

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port 8082
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Server could not start. Opening game directly in browser...
    start "" "%~dp0index.html"
)
pause
