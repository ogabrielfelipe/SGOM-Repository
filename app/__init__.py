from flask import Flask
from sqlalchemy.event import listens_for
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection


from app.bluePrints import ordemDeServico
from .model import (
    Carro,
    Funcionario,
    OrdemDeServico,
    RegistroDaOS,
    ItemOrcamento,
    Servicos
)
from .bluePrints import (
    login,
    funcionario,
    carro,
    ordemDeServico,
    itemOrcamento
)
from .bluePrints.login import auth
from werkzeug.security import generate_password_hash
from datetime import datetime



app = Flask(__name__, template_folder='templates', static_folder='static')
app.config.from_object('config')
app.register_blueprint(auth.aut)
app.register_blueprint(funcionario.func)
app.register_blueprint(carro.car)
app.register_blueprint(ordemDeServico.ordem)
app.register_blueprint(itemOrcamento.item)


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
    try:
        func = Funcionario.Funcionario(nome='Master', user='master', senha=generate_password_hash('master1'), cpf='0', tel='0', 
                        dataA=datetime.strptime('1900-01-01', '%Y-%m-%d').date(), tFunc=0,status=True)
        ItemOrcamento.db.session.add(func)
        ItemOrcamento.db.session.commit()
    except Exception as e:
        pass
