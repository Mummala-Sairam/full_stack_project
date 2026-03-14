#!/usr/bin/env bash
# exit on error
set -o errexit

cd Backend/project
python manage.py collectstatic --no-input
python manage.py migrate
