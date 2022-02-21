from sqlalchemy import false
from ..model.Funcionario import Funcionario, funcionario_schema, funcionarios_schema
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from ..model.ItemOrcamento import db
from flask_jwt_extended import create_access_token, create_refresh_token
from validate_docbr import CPF
from sqlalchemy.exc import SQLAlchemyError
from flask_login import current_user, login_user, logout_user


def cad_funcionario():
    resp = request.get_json()
    nome = resp['nome']
    usuario = resp['usuario']
    senha = generate_password_hash(resp['senha'])
    telefone = resp['telefone']
    status = bool(resp['status'])
    tipoFuncionario = int(resp['tipoFuncionario'])

    valid_cpf = CPF()
    cpf = valid_cpf.validate(resp['cpf'])

    try:
        dataA = datetime.strptime(resp['dataA'], '%Y-%m-%d').date()
        if cpf:
            func = Funcionario(nome=nome, user=usuario, senha=senha, cpf=resp['cpf'], tel=telefone, dataA=dataA, tFunc=tipoFuncionario,
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
    funcionario = busca_funcionario(id)
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


def busca_funcionarios():
    func = Funcionario.query.all()
    if func:
        return jsonify({'msg': 'Busca Efetuada', 'dados': funcionarios_schema.dump(func)}), 200
    return jsonify({'msg': 'Sem Resultados', 'dados': {}}), 404


def funcionario_username(username):
    try:
        return Funcionario.query.filter(Funcionario.usuario == username).one()        
    except Exception as e:
        print(e)
        return None


def autentica_funcionario():
    resp = request.get_json()
    username = resp['username']
    senha =  resp['senha']

    if not username or not senha: #Verifica se o usuário digitou a senha ou o username
        return jsonify({'msg': 'Usuario ou senha em branco'}), 401
        
    funcionario = funcionario_username(username=username)
    if not funcionario:
            return jsonify({'msg': 'Usuário não encontrado'}), 404

    if funcionario.status == false: #Verifica se o status do profissional está desativado
        return jsonify({'msg': 'Usuário Inativado'}), 403
  

    if not funcionario or not check_password_hash(funcionario.senha, senha): #Verficia se a senha digitada é a mesma da que consta bo banco
        return jsonify({'msg': 'Usuário Invalido ou Senha Incorreta'}), 401            
    login_user(funcionario) #Cria o login
    return jsonify({'msg': 'Login realizado'}), 200


def busca_funcionario(id):
    func = Funcionario.query.get(id)
    if func:
        return func
    return None


def busca_funcionario_route(id):
    func = Funcionario.query.get(id)
    if func:
        return jsonify({'msg': 'Busca Efetuada', 'dados': funcionario_schema.dump(func)}), 200
    return jsonify({'msg': 'Sem Resultados', 'dados': {}}), 404
