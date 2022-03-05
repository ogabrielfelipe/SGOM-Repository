from flask import Blueprint, request, render_template, redirect, url_for, jsonify
from ...controller import (
    funcionarioController
)

from flask_login import login_required, logout_user


aut = Blueprint('aut', __name__, template_folder='templates',
    static_folder='static')


@aut.route('/', methods=['GET'])
def login():
    return render_template('index.html')


@aut.route('/', methods=['POST'])
def login_post():
    return funcionarioController.autentica_funcionario()


@aut.route('/Logout', methods=['DELETE'])
@login_required
def logout():
    logout_user()
    return jsonify({'msg': 'Logout com sucesso'}), 200
    