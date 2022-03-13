import random
import string
import configparser
from os.path import join, dirname
from dotenv import load_dotenv


config = configparser.ConfigParser()
config.read('CONFIG.ini')

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

stringKey = string.ascii_letters + string.ascii_lowercase + string.ascii_uppercase
chave = ''.join(random.choice(stringKey) for i in range(12))

DEBUG = True
SQLALCHEMY_DATABASE_URI = f"sqlite:///{config.get('DATABASE', 'DB')}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = chave
