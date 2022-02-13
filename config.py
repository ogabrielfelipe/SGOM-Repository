import random
import string


stringKey = string.ascii_letters + string.ascii_lowercase + string.ascii_uppercase
chave = ''.join(random.choice(stringKey) for i in range(12))

DEBUG = True
SQLALCHEMY_DATABASE_URI = f"sqlite:///SGOMDADOS.db"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = chave
