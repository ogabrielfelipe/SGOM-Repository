from flask import request, jsonify
from ..model.Servicos import Servicos, servico_schema, servicos_schema
from ..model.ItemOrcamento import db


def cad_servicos():
    resp = request.get_json()
    ordem = resp['ordem']
    item = resp['item']
    quant = resp['quant']



    serv = Servicos(ordem=ordem, item=item, quant=quant)

    try:
        db.session.add(serv)
        db.session.commit()
        return True
    except Exception as e:
        return str(e)
