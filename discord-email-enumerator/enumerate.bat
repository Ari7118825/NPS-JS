@echo off
setlocal enabledelayedexpansion

:: Set these values before running
set "AUTH_TOKEN=" ::Put you user token here
set "EMAIL=" :: The email to search for
set "VERBOSE=true"

:: Prepare the JSON payload
set "DATA={\"email\": \"%EMAIL%\", \"email_token\": \"X\"}"

echo Checking email: %EMAIL%
curl -s -X PATCH "https://discord.com/api/v9/users/@me" ^
 -H "Authorization: %AUTH_TOKEN%" ^
 -H "Content-Type: application/json" ^
 --data "%DATA%" > response.txt

:: Read response and search for indicators
findstr /C:"EMAIL_ALREADY_REGISTERED" response.txt >nul
if %errorlevel%==0 (
    echo [INFO] %EMAIL% → E-Mail registered
    goto end
)

findstr /C:"Unauthorized" response.txt >nul
if %errorlevel%==0 (
    echo [CRITICAL] %EMAIL% → Session/Account banned or token invalid
    goto end
)

if "%VERBOSE%"=="true" (
    echo [INFO] %EMAIL% → E-Mail not registered
)

:end
del response.txt
endlocal
pause
