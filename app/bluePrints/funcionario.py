from flask import Blueprint, render_template
from ..controller.funcionarioController import cad_funcionario, atualiza_funcionario
from datetime import datetime
from datetime import timezone, timedelta
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    JWTManager,
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    unset_jwt_cookies
)


func = Blueprint('func', __name__)


@func.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        dif = timedelta(hours=-3)
        fuso = timezone(dif)
        hora_sp = datetime.now().astimezone(fuso)
        target_timestamp = datetime.timestamp(hora_sp + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response


@func.route('/Funcionario', methods=['GET'])
def root_funcionario():
    return render_template('funcionario.html')


@func.route('/Funcionario/Cadastrar', methods=['POST'])
def cadastra_funcionario():
    return cad_funcionario()


@func.route('/Funcionario/Atualizar/<int:codigo>', methods=['PATCH'])
def alter_funcionario(codigo):
    return atualiza_funcionario(codigo)
