from flask import request, jsonify
from ..model.ItemOrcamento import ItemOrcamento, itemOrcamento_schema, itemOrcamentos_schema
from ..model.ItemOrcamento import db


def cad_itemOrcamento():
    resp = request.get_json()
    nome = resp['nome']
    valor = resp['valor']

    item = ItemOrcamento(nome=nome, valor=valor)

    try:
        db.session.add(item)
        db.session.commit()        
        return jsonify({'msg': 'Cadastrado com sucesso'}), 201 
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Erro ao cadastrar ItemOrcamento', 'error': str(e)}), 500


def altera_itemOrcamento(id):
    item = ItemOrcamento.query.get(id)
    if item:
        resp = request.get_json()
        try:
            item.nome = resp['nome']
            item.valor = resp['valor']
            db.session.commit()
            return jsonify({'msg': 'Alterado com sucesso', 'dados': itemOrcamento_schema.dump(item)}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'msg': 'Não foi possível alterar', 'dados': {}, 'error': str(e)}), 500
    else:
        return jsonify({'msg': 'Item não encontrado', 'dados': {}, 'error': str(e)}), 404        

def excluir_itemOrcamento(id):
    item = ItemOrcamento.query.get(id)
    if item:
        try:
            db.session.delete(item)
            db.session.commit()
            return jsonify({'msg': 'Excluido com sucesso', 'dados': itemOrcamento_schema.dump(item)}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify('msg': 'Não foi possivel excluir', 'dados': {}, 'error': str(e)}), 500
    else:
        return jsonify({'msg': 'Item não encontrado', 'dados': {}, 'error': str(e)}), 404  

def buscar_todos():
    try:
        itens = ItemOrcamento.query.all()
        return jsonify({'msg': 'Busca efetuada com sucesso', 'dados': itemOrcamentos_schema.dump(itens)}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Não foi possivel efetuar a busca', 'dados': {}, 'error': str(e)}), 500



