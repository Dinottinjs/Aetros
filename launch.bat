@echo off
setlocal EnableDelayedExpansion

echo Suche nach einem freien Port...
set PORT=3000

:SEARCHPORT
netstat -o -n -a | findstr /R /C:":!PORT! " >nul
if %ERRORLEVEL% equ 0 (
    set /a PORT+=1
    goto SEARCHPORT
)

echo ====================================================
echo Starte Aetros SaaS Boilerplate auf Port !PORT!...
echo Copyright (c) 2026 Maximilian Holzer
echo ====================================================
echo.
echo Öffne Browser...
start http://localhost:!PORT!

echo Starte Server...
node scripts/setup-admin.js
call npm run dev -- -p !PORT!

pause
