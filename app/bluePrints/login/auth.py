from flask import Blueprint, request, jsonify, render_template
from app.controller import (
    funcionarioController
)
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    JWTManager,
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    unset_jwt_cookies
)

aut = Blueprint('aut', __name__, template_folder='templates',
    static_folder='static')
jwt = JWTManager()


@aut.route('/Auth/Login', methods=['POST'])
def login():
    resp = request.get_json()
    token = funcionario.autentica_funcionario(resp['username'], resp['senha'])
    if token['access_token']:
        resp = jsonify({"msg": "login successful"})
        set_access_cookies(resp, token['access_token'])
        return resp, 200
    else:
        return jsonify({'message': 'Token não gerado', 'Token': {}}), 500


@aut.route('/Auth/Logout', methods=['DELETE'])
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
