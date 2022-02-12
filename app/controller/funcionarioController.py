from ..model.Funcionario import Funcionario, funcionario_schema, funcionarios_schema
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from ..model.ItemOrcamento import db
from flask_jwt_extended import create_access_token, create_refresh_token
from validate_docbr import CPF
from sqlalchemy.exc import SQLAlchemyError


def cad_funcionario():
    resp = request.get_json()
    nome = resp['nome']
    usuario = resp['usuario']
    senha = generate_password_hash(resp['senha'])
    telefone = resp['telefone']
    status = bool(resp['status'])
    tipoFuncionario = resp['tipoFuncionario']

    valid_cpf = CPF()
    cpf = valid_cpf.validate(resp['cpf'])

    try:
        dataA = datetime.strptime(resp['dataA'], '%Y-%m-%d').date()
        if cpf:
            func = Funcionario(nome=nome, user=usuario, senha=senha, cpf=cpf, tel=telefone, dataA=dataA, tFunc=tipoFuncionario,
                               status=status)
            try:
                db.session.add(func)
                db.session.commit()
                result = funcionario_schema.dump(func)
                return jsonify({'msg': 'Cadastrado com sucesso'}), 201
            except Exception as e:
                db.session.rollback()
                return jsonify({'msg': 'Erro ao cadastrar funcionário', 'error': str(e)}), 500
        else:
            return jsonify({'msg': 'CPF inválido', 'dados': {}}), 401
    except Exception as e:
        return jsonify({'msg': 'Data inválido', 'dados': {}, 'error': str(e)}), 401


def atualiza_funcionario(id):
    funcionario = Funcionario.query.get(id)
    if funcionario:
        resp = request.get_json()
        nome = resp['nome']
        usuario = resp['usuario']
        senha = generate_password_hash(resp['senha'])
        telefone = resp['telefone']
        status = bool(resp['status'])
        tipoFuncionario = resp['tipoFuncionario']
        valid_cpf = CPF()
        cpf = valid_cpf.validate(resp['cpf'])
        try:
            dataA = datetime.strptime(resp['dataA'], '%Y-%m-%d').date()
            if cpf:
                try:
                    funcionario.usuario = usuario
                    funcionario.nome = nome
                    funcionario.senha = senha
                    funcionario.telefone = telefone
                    funcionario.status = status
                    funcionario.tipoFuncionario = tipoFuncionario
                    funcionario.cpf = resp['cpf']
                    db.session.commit()
                    result = funcionario_schema.dump(funcionario)
                    return jsonify({'msg': 'Atualizado com sucesso'}), 200
                except Exception as e:
                    db.session.rollback()
                    return jsonify({'msg': 'Erro ao atualizar funcionário', 'error': str(e)}), 500
            else:
                return jsonify({'msg': 'CPF inválido', 'dados': {}}), 401
        except Exception as e:
            return jsonify({'msg': 'Data inválido', 'dados': {}, 'error': str(e)}), 401



def funcionario_username(username):
    try:
        return Funcionario.query.filter(Funcionario.usuario == username).one()
    except:
        return None


def autentica_funcionario(username, senha):
    funcionario = funcionario_username(username)
    result = funcionario_schema.dump(funcionario)
    if result and check_password_hash(result['senha'], senha):
        access_token = create_access_token(identity=funcionario.usuario, fresh=False)
        refresh_token = create_refresh_token(identity=funcionario.usuario)
        return {
            "access_token": access_token,
            "refresh_token": refresh_token
        }
    else:
        return None