from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .model.OrdemDeServico import db, ma


app = Flask(__name__)

db.init_app(app)
ma.init_app(app)

