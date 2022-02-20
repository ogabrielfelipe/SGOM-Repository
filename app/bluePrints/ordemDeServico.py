from flask import Blueprint, render_template
from flask_login import login_required, current_user
from ..controller.ordemDeServicoController import (
    abertura_OrdemDeServico,
    registra_orcamento,
    aceita_ordemDeServico
)

ordem = Blueprint('ordem', __name__)


@ordem.route('/OrdemDeServico', methods=['GET'])
def root_ordemDeServico():
    return render_template('ordemDeServico.html')


@ordem.route('/OrdemDeServico/Abertura', methods=['POST'])
@login_required
def abre_ordemDeServico():
    return abertura_OrdemDeServico()


@ordem.route('/OrdemDeServico/Aceita/<int:codigo>', methods=['POST'])
def aceit_ordemDeServico(codigo):
    return aceita_ordemDeServico(codigo, current_user.id)


@ordem.route('/OrdemDeServico/RegistraOrcamento/<int:codigo>', methods=['POST'])
def regis_ordemDeServico(codigo):
    return registra_orcamento(codigo)
