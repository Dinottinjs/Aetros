@echo off
setlocal EnableDelayedExpansion

:: Enable ANSI Colors in Windows CMD
for /f "delims=" %%a in ('powershell -noprofile -command "[char]27"') do set ESC=%%a

:: Rainbow Colors
set C1=%ESC%[31m
set C2=%ESC%[33m
set C3=%ESC%[32m
set C4=%ESC%[36m
set C5=%ESC%[34m
set C6=%ESC%[35m
set RESET=%ESC%[0m

echo %C1%====================================================%RESET%
echo %C2%      Aetros SaaS Boilerplate Setup%RESET%
echo %C3%      Copyright (c) 2026 Maximilian Holzer%RESET%
echo %C4%====================================================%RESET%
echo.
echo %C5%[*] Starte Installation...%RESET%

:: Run npm install
echo %C6%[+] Installiere Abhaengigkeiten (npm install)...%RESET%
call npm install

:: Create .env.local if not exists
if not exist ".env.local" (
    echo %C1%[+] Erstelle .env.local Datei...%RESET%
    copy .env.example .env.local > nul
)

:: Generate uninstall.bat
echo %C2%[+] Generiere uninstall.bat...%RESET%
(
echo @echo off
echo setlocal EnableDelayedExpansion
echo for /f "delims=" %%%%a in ^('powershell -noprofile -command "[char]27"'^) do set ESC=%%%%a
echo set C1=%%ESC%%[31m
echo set RESET=%%ESC%%[0m
echo echo %%C1%%====================================================%%RESET%%
echo echo %%C1%%      Aetros Uninstaller%%RESET%%
echo echo %%C1%%      Copyright ^(c^) 2026 Maximilian Holzer%%RESET%%
echo echo %%C1%%====================================================%%RESET%%
echo echo.
echo echo %%C1%%[*] Entferne node_modules...%%RESET%%
echo rmdir /s /q node_modules
echo echo %%C1%%[*] Entferne .next Build-Ordner...%%RESET%%
echo rmdir /s /q .next
echo echo %%C1%%[*] Deinstallation abgeschlossen! Du kannst diesen Ordner nun loeschen.%%RESET%%
echo pause
) > uninstall.bat

echo.
echo %C3%====================================================%RESET%
echo %C4%      Installation erfolgreich abgeschlossen!%RESET%
echo %C5%      Nutze 'launch.bat' um das Programm zu starten.%RESET%
echo %C6%====================================================%RESET%
pause
