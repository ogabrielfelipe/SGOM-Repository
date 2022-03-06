from datetime import datetime, timezone, timedelta
from itsdangerous import json
from sqlalchemy import and_, false, or_, text

from app.controller.util import convertPesquisa
from ..model.Funcionario import Funcionario, funcionario_schema, funcionarios_schema
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from ..model.ItemOrcamento import db
from validate_docbr import CPF
from sqlalchemy.exc import SQLAlchemyError
from flask_login import current_user, login_user, logout_user
from ..model.OrdemDeServico import OrdemDeServico, ordemDeServicos_schema, ordemDeServico_schema
from ..model.RegistroDaOS import RegistroDaOS, registroDaOS_schema, registroDaOSs_schema



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
        tipoFuncionario = resp['tipoFuncionario']
        valid_cpf = CPF()
        cpf = valid_cpf.validate(resp['cpf'])
        try:
            if cpf:
                try:
                    funcionario.usuario = usuario
                    funcionario.nome = nome
                    funcionario.senha = senha
                    funcionario.telefone = telefone
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


def atualiza_status_funcionario(id):
    funcionario = busca_funcionario(id)
    if funcionario:
        if funcionario.status == False:
            try:
                funcionario.status = True
                db.session.commit()
                return jsonify({'msg': 'Usuário ativado com sucesso'}), 200
            except Exception as e:
                db.session.rollback()
                return jsonify({'msg': 'Não foi possível ativar'}), 500
    

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

def funcionario_username_like(nome):
    try:
        funcionario  = Funcionario.query.filter(Funcionario.nome.like(nome)).all()
        return jsonify({'msg': 'Busca Efetuada com sucesso', 'dados': funcionarios_schema.dump(funcionario)}), 200
    except:
        return jsonify({'msg': 'Sem Resultados', 'dados': {}}), 404


def busca_funcionario_personalizado():
    resp = request.get_json()
    entry = {
        "nome": resp['nome'],
        "status": resp['status']
    }

    whereSQL = convertPesquisa(['LIKE', '='],entry)
    
    sql_funcionario = text('SELECT * FROM funcionario '+ whereSQL)

    try:
        consultaFuncionario = db.session.execute(sql_funcionario).fetchall()        
        consultaFuncionario_dict = [dict(u) for u in consultaFuncionario]
        return jsonify({'msg': 'Busca efetuada com sucesso', 'dados': consultaFuncionario_dict}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Busca não efetuada', 'dados': {}, 'error': str(e)}), 500


def autentica_funcionario():
    resp = request.get_json()
    username = resp['username']
    senha =  resp['senha']

    if not username or not senha: #Verifica se o usuário digitou a senha ou o username
        return jsonify({'msg': 'Usuario ou senha em branco'}), 401
        
    funcionario = funcionario_username(username=username)
    if not funcionario:
            return jsonify({'msg': 'Usuário não encontrado'}), 404

    if funcionario.status == False: #Verifica se o status do profissional está desativado
        return jsonify({'msg': 'Usuário Inativado'}), 403
  

    if not funcionario or not check_password_hash(funcionario.senha, senha): #Verficia se a senha digitada é a mesma da que consta bo banco
        return jsonify({'msg': 'Usuário Invalido ou Senha Incorreta'}), 401            
    login_user(funcionario) #Cria o login
    return jsonify({'msg': 'Login realizado'}), 200


def inativa_funcionario(id, funcionario):
    func = Funcionario.query.get(id)
    if not func:
        return jsonify({'msg': 'Funcionário não encontrado', 'dados': {}}), 404
    try:
        os_sql = text(f"SELECT id FROM ordemDeServico\
                        WHERE\
                            mecanico = {id} AND status != 'FINALIZADA' AND status != 'AGUARDANDOPAGAMENTO' AND status != 'CANCELADA'")
        os = db.session.execute(os_sql).fetchall()
        os_dict = [dict(u) for u in os]
        for i in os_dict:
            ordem = OrdemDeServico.query.get(i['id'])
            regis = RegistroDaOS(data=datetime.now().astimezone(timezone(timedelta(hours=-3))), 
                    statusA=ordem.status, novoS=0, valorTotal=ordem.valorTodal, problema=ordem.problema, mecanico=funcionario, ordemDeServico=ordem.id)
            ordem.status = 0
            ordem.mecanico = None
            db.session.add(regis)
            db.session.commit()
        func.status = False
        db.session.commit()
        return jsonify({'msg': 'Inativado com sucesso'}), 200
    except Exception as e:
        print(e)
        return jsonify({'msg':'Não foi possível fazer a alteração','error': str(e)}), 500


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
