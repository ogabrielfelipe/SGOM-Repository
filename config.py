import random
import string
from datetime import timedelta


stringKey = string.ascii_letters + string.ascii_lowercase + string.ascii_uppercase
chave = ''.join(random.choice(stringKey) for i in range(12))

DEBUG = True
SQLALCHEMY_DATABASE_URI = f"sqlite:///SGOMDADOS.db"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = chave
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)
JWT_TOKEN_LOCATION = ["cookies"]
JWT_COOKIE_SECURE = False # Em HTTPS deverá mudar para True
JWT_COOKIE_CSRF_PROTECT = True
JWT_ACCESS_CSRF_HEADER_NAME = "X-CSRF-TOKEN"
JWT_REFRESH_CSRF_HEADER_NAME = "X-CSRF-TOKEN"
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=15)
