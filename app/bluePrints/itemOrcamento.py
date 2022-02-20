from flask import Blueprint, render_template
from ..controller.itemOrcamentoController import (
    cad_itemOrcamento
)


item = Blueprint('item', __name__)


@item.route('/ItemOrcamento/Cadastrar', methods=['POST'])
def cadastra_itemOrcamento():
    return cad_itemOrcamento()
