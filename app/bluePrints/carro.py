from crypt import methods
from flask import Blueprint, render_template
from ..controller.carroController import (
    cad_carro,
    atualiza_carro,
    busca_carro_route,
    busca_carros,
    delete_carro
)


car = Blueprint('car', __name__)


@car.route('/Carro', methods=['GET'])
#@login_required
def root_carro():
    return render_template('')


@car.route('/Carro/Cadastrar', methods=['POST'])
#@login_required
def cadastra_carro():
    return cad_carro()


@car.route('/Carro/Atulizar/<int:codigo>', methods=['PATCH'])
#@login_required
def alter_carro(codigo):
    return atualiza_carro(codigo) 


@car.route('/Carro/Busca/<int:codigo>', methods=['POST'])
#@login_required
def busc_carro(codigo):
    return busca_carro_route(codigo) 


@car.route('/Carro/BuscaCarros', methods=['POST'])
#@login_required
def busc_carros():
    return busca_carros()     


@car.route('/Carro/Excluir/<int:codigo>', methods=['DELETE'])
#@login_required
def exclui_carro(codigo):
    return delete_carro(codigo) 
