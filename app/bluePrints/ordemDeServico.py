from flask import Blueprint, render_template
from flask_login import current_user
from ..controller.ordemDeServicoController import (
    abertura_OrdemDeServico,
    registra_orcamento,
    aceita_ordemDeServico
)

ordem = Blueprint('ordem', __name__)


@ordem.route('/OrdemDeServico', methods=['GET'])
def root_ordemDeServico():
    return render_template('.html')



@ordem.route('/OrdemDeServico/Abertura', methods=['POST'])
def abre_ordemDeServico():
    return abertura_OrdemDeServico()


@ordem.route('/OrdemDeServico/Aceita/<int:codigo>', methods=['POST'])
def aceit_ordemDeServico(codigo):
    return aceita_ordemDeServico(1, 1)


@ordem.route('/OrdemDeServico/RegistraOrcamento/<int:codigo>', methods=['POST'])
def registra_ordemDeServico(codigo):
    return registra_orcamento(codigo)
