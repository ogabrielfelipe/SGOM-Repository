from flask import Blueprint, render_template
from ..controller.funcionarioController import (
    cad_funcionario,
    atualiza_funcionario,
    busca_funcionario_route,
    busca_funcionarios,
    busca_funcionario,
    funcionario_username_like,
    inativa_funcionario,
    atualiza_status_funcionario,
    busca_funcionario_personalizado
)
from datetime import datetime
from datetime import timezone, timedelta
from flask_login import LoginManager, login_required, current_user


login_manager = LoginManager()
login_manager.login_view = 'aut.login'


func = Blueprint('func', __name__)


@login_manager.user_loader
def load_user(func_id):
    return busca_funcionario(func_id)



@func.route('/Funcionario', methods=['GET'])
#@login_required
def root_funcionario():
    return render_template('funcionario.html')


@func.route('/Funcionario/Cadastrar', methods=['POST'])
@login_required
def cadastra_funcionario():
    return cad_funcionario()


@func.route('/Funcionario/BuscaFuncionaios', methods=['POST'])
@login_required
def busc_funcionaios():
    return busca_funcionarios()


@func.route('/Funcionario/Busca/<int:codigo>', methods=['POST'])
@login_required
def busc_funcionaio(codigo):
    return busca_funcionario_route(codigo)


@func.route('/Funcionario/BuscaUsername/<string:nome>', methods=['POST'])
@login_required
def busc_username_funcionaio(nome):
    return funcionario_username_like(nome)


@func.route('/Funcionario/BuscarFuncionarioPersonalizado', methods=['POST'])
#@login_required
def busc_porsonalizada_funcionaio():
    return busca_funcionario_personalizado()


@func.route('/Funcionario/Atualizar/<int:codigo>', methods=['PATCH'])
@login_required
def alter_funcionario(codigo):
    return atualiza_funcionario(codigo)


@func.route('/Funcionario/Inativar/<int:codigo>', methods=['DELETE'])
@login_required
def inativa_route_funcionario(codigo):
    return inativa_funcionario(codigo, current_user.id)


@func.route('/Funcionario/Ativar/<int:codigo>', methods=['PATCH'])
@login_required
def ativa_route_funcionario(codigo):
    return atualiza_status_funcionario(codigo)