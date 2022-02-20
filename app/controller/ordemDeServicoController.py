import re
from flask import request, jsonify
from ..model.OrdemDeServico import OrdemDeServico, ordemDeServico_schema, ordemDeServicos_schema
from ..model.ItemOrcamento import ItemOrcamento
from ..model.Servicos import Servicos
from ..model.ItemOrcamento import db


def abertura_OrdemDeServico():
    resp = request.get_json()
    nomeRequerente = resp['nomeRequerente']
    cpfDoRequerente = resp['cpfDoRequerente']
    telefoneRequerente = resp['telefoneRequerente']
    problema = resp['problema']
    requisicaoOrcamento = bool(resp['requisicaoOrcamento'])
    estadoAtualDoVeiculo = resp['estadoAtualDoVeiculo']
    #custoMecanico = resp['custoMecanico']
    #valorTodal = resp['valorTodal']
    #respostaCliente = bool(resp['respostaCliente'])
    carro = resp['carro']
    #mecanico = resp['mecanico']
    #registroDasOS = resp['registroDaOS']

    ordem = OrdemDeServico.abrirOrdemDeServico(carro=carro, nomeR=nomeRequerente, cpfR=cpfDoRequerente, telR=telefoneRequerente,
    problema=problema, reqOr=requisicaoOrcamento, estadoA=estadoAtualDoVeiculo)


    try:
        db.session.add(ordem)
        db.session.commit()
        return jsonify({'msg': 'Registri efetuado com sucesso'}), 201
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'msg': 'Erro ao salvar', 'error': str(e)}), 500


def aceita_ordemDeServico(id, mecanico):
    ordem = OrdemDeServico.query.get(id)
    if ordem:
        try:
            ordem.mecanico = mecanico
            db.session.commit()
            return jsonify({'msg': 'Ordem Aceita'}), 200
        except Exception as e:
            print(e)
            return jsonify({'msg': 'error ao aceitar'}), 500


def registra_orcamento(id):
    ordem = OrdemDeServico.query.get(id)
    resp = request.get_json()
    problema = resp['problema']
    custoMecanico = resp['custoMecanico']
    itens = ItemOrcamento.query.all()

    a = []

    for i in itens:
        a.append(i)
    

    try:
        ordem.registraOrcamento(problema, custoMecanico, a)
        db.session.commit()
        return jsonify({'msg': 'Registro de Orçamento Efetuado'}), 200
    except Exception as e:
        db.session.rollback()
        print (e)
        return jsonify({'msg': 'error ao efetuar registro de orçamento'}), 500

