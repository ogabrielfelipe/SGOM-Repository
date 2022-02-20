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



