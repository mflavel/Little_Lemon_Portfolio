# Django Backend:
cd backend
create virtual environment: python –m venv (environment name)
start virtual environment:  (environemnt name)\Scripts\activate

install Django: pip install django djangorestframework django-cors-headers

Create Django Project: django-admin startproject (project name)
Create Django App: python manage.py startapp (app name)  
add app to insatll_app in settings



add to (backend name)/setting.py
    INSTALLED_APPS = [
        ...
        'rest_framework',
        'corsheaders',
        'api',
    ]

    MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
    ]

    CORS_ALLOW_ALL_ORIGINS = True

# MySQL:

pip install mysqlclient

change database:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'yourdbname',
            'USER': 'root',
            'PASSWORD': 'yourpassword',
            'HOST': 'localhost',
            'PORT': '3306',
        }
    }

python manage.py migrate
python manage.py runserver
http://localhost:8000
