from flask import Blueprint, render_template
from ..controller.itemOrcamentoController import (
    cad_itemOrcamento,
    altera_itemOrcamento,
    excluir_itemOrcamento,
    buscar_todos
)
from flask_login import login_required


item = Blueprint('item', __name__)


@item.route('/ItemOrcamento/Cadastrar', methods=['POST'])
@login_required
def cadastra_itemOrcamento():
    return cad_itemOrcamento()


@item.route('/ItemOrcamento/Alterar/<int:codigo>', methods=['PATCH'])
@login_required
def alter_itemOrcamento(codigo):
    return altera_itemOrcamento(codigo)


@item.route('/ItemOrcamento/Excluir/<int:codigo>', methods=['DELETE'])
@login_required
def delete_itemOrcamento(codigo):
    return excluir_itemOrcamento(codigo)


@item.route('/ItemOrcamento/BuscarTodos', methods=['POST'])
#@login_required
def busca_itemOrcamento():
    return buscar_todos()