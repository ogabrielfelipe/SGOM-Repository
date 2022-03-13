from base64 import encode
import os.path
from flask import Blueprint, jsonify, render_template, url_for, send_file
from flask_login import login_required, current_user
from ..controller.ordemDeServicoController import (
    abertura_OrdemDeServico,
    registra_orcamento,
    aceita_ordemDeServico,
    avaliar_ordemServico,
    atender_ordemDeServico,
    concluir_ordemDeServico,
    finalizar_ordemDeServico,
    relatorio_ordemDeServico,
    busca_personalizada_ordemDeServico,
    relatorio_financeiro,
    altera_orcamento_ordemDeServico, 
    total_ordemDeServico_status, 
    busca_os_status_home
)

ordem = Blueprint('ordem', __name__)


@ordem.route('/OrdemDeServico/Abertura', methods=['POST'])
@login_required
def abre_ordemDeServico():
    return abertura_OrdemDeServico(current_user.id)


@ordem.route('/OrdemDeServico/Alterar/<int:codigo>', methods=['POST'])
@login_required
def altera_route_financeiro(codigo):
    return altera_orcamento_ordemDeServico(codigo, current_user.id)


@ordem.route('/OrdemDeServico/Aceita/<int:codigo>', methods=['POST'])
@login_required
def aceit_ordemDeServico(codigo):    
    tipo_usuario_logado = current_user.tipoFuncionario.name
    if tipo_usuario_logado == 'GERENTE' or tipo_usuario_logado == 'MECANICO':
        return aceita_ordemDeServico(codigo, current_user.id)
    else:
        return jsonify({'msg': "Usuário sem permissão"}), 401


@ordem.route('/OrdemDeServico/RegistraOrcamento/<int:codigo>', methods=['POST'])
@login_required
def regis_ordemDeServico(codigo):
    tipo_usuario_logado = current_user.tipoFuncionario.name
    if tipo_usuario_logado == 'GERENTE' or tipo_usuario_logado == 'MECANICO':
        return registra_orcamento(codigo, current_user.id)
    else:
        return jsonify({'msg': "Usuário sem permissão"}), 401


@ordem.route('/OrdemDeServico/Avaliar/<int:codigo>', methods=['POST'])
@login_required
def avalia_ordemDeServico(codigo):
    return avaliar_ordemServico(codigo, current_user.id)


@ordem.route('/OrdemDeServico/Atender/<int:codigo>', methods=['POST'])
@login_required
def atende_ordemDeServico(codigo):
    tipo_usuario_logado = current_user.tipoFuncionario.name
    if tipo_usuario_logado == 'GERENTE' or tipo_usuario_logado == 'MECANICO':
        return atender_ordemDeServico(codigo, current_user.id)
    else:
        return jsonify({'msg': "Usuário sem permissão"}), 401


@ordem.route('/OrdemDeServico/Concluir/<int:codigo>', methods=['POST'])
@login_required
def conclui_ordemDeServico(codigo):
    tipo_usuario_logado = current_user.tipoFuncionario.name
    if tipo_usuario_logado == 'GERENTE' or tipo_usuario_logado == 'MECANICO':
        return concluir_ordemDeServico(codigo, current_user.id)
    else:
        return jsonify({'msg': "Usuário sem permissão"}), 401


@ordem.route('/OrdemDeServico/Finalizar/<int:codigo>', methods=['POST'])
@login_required
def finaliza_ordemDeServico(codigo):
    return finalizar_ordemDeServico(codigo, current_user.id) 
    

@ordem.route('/OrdemDeServico/Relatorio/OrdemDeServico', methods=['POST'])
@login_required
def relatorio_route_ordemDeServico():
    return relatorio_ordemDeServico()


@ordem.route('/OrdemDeServico/BuscaPersonalizada', methods=['POST'])
@login_required
def busca_route_ordemDeServico():
    return busca_personalizada_ordemDeServico()
    

@ordem.route('/OrdemDeServico/Relatorio/Financeiro', methods=['POST'])
@login_required
def relatorio_route_financeiro():
    tipo_usuario_logado = current_user.tipoFuncionario.name
    if tipo_usuario_logado == 'GERENTE':
        return relatorio_financeiro()
    else:
        return jsonify({'msg': "Usuário sem permissão"}), 401
    

@ordem.route('/OrdemDeServico/Home/Totais', methods=['POST'])
@login_required
def total_os_route():
    return total_ordemDeServico_status(current_user)


@ordem.route('/OrdemDeServico/Home/BuscaOS', methods=['POST'])
@login_required
def busca_os_home():
    return busca_os_status_home(current_user)