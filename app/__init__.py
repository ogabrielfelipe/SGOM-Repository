from flask import Flask
from sqlalchemy.event import listens_for
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection
from .model import (
    Carro,
    Funcionario,
    OrdemDeServico,
    RegistroDaOS,
    ItemOrcamento
)
from .bluePrints import (
    login,
    funcionario,
    carro
)
from .bluePrints.login import auth


app = Flask(__name__)
app.config.from_object('config')
app.register_blueprint(auth.aut)
app.register_blueprint(funcionario.func)
app.register_blueprint(carro.car)


ItemOrcamento.db.init_app(app)
ItemOrcamento.ma.init_app(app)
funcionario.login_manager.init_app(app)


from .bluePrints import initial

@listens_for(Engine, "connect")
def my_on_connect(dbapi_con, connection_record):
    if isinstance(dbapi_con, SQLite3Connection):
        cursor = dbapi_con.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()


with app.app_context():
    ItemOrcamento.db.create_all()
