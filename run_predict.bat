@echo off
REM Navigate to project folder
cd /d C:\Users\karna\OneDrive\Documents\JarvisC

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Run prediction script
python src\predict_url.py --file

pause
