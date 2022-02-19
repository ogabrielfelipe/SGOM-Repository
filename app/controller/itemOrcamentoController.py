from flask import request, jsonify
from ..model.ItemOrcamento import ItemOrcamento, itemOrcamento_schema, itemOrcamentos_schema


def cad_itemOrcamento():
    resp = request.get_json()
    