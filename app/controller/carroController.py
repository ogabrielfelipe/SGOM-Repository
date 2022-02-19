from ..model.Carro import Carro, carro_schema, carros_schema
from ..model.ItemOrcamento import db
from flask import request, jsonify


def cad_carro():
    resp = request.get_json()
    placa = resp['placa']
    telefone = resp['telefone']

    carro = Carro(placa=placa, telefone=telefone)

    try:
        db.session.add(carro)
        db.session.commit()
        result = carro_schema.dump(carro)
        return jsonify({'msg': 'Cadastrado com sucesso'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Erro ao cadastrar Carro', 'error': str(e)}), 500

def atualiza_carro(id):
    carro = busca_carro(id)
    resp = request.get_json()
    telefone = resp['telefone']
    placa = resp['placa']

    if carro:
        try:
            carro.telefone = telefone
            carro.placa = placa
            db.session.commit()
            return jsonify({'msg': 'Atualizado com sucesso'}), 200
        except:
            return jsonify({'msg': 'Não foi possível atualizar'}), 500


def busca_carro(id):
    try:
        return Carro.query.get(id)
    except:
        return None


def busca_carro_route(id):
    carro = Carro.query.get(id)
    try:
        return jsonify({'msg': 'Busca Efetuada', 'dados': carro_schema.dump(carro)}), 200
    except:
        return jsonify({'msg': 'Sem Resultados', 'dados': {}}), 404


def busca_carros():
    carros = Carro.query.all()
    if carros:
        return jsonify({'msg': 'Busca Efetuada', 'dados': carros_schema.dump(carros)}), 200
    return jsonify({'msg': 'Sem Resultados', 'dados': {}}), 404


def delete_carro(id):
    carro = Carro.query.get(id)

    if carro:
        try:
            db.session.delete(carro)
            db.session.commit()
            return jsonify({'msg': 'Carro excluido com sucesso'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'msg': 'Não é possível excluir', 'dados': e}), 500
    else:
        return jsonify({'msg': 'Carro não encontrado'}), 404
