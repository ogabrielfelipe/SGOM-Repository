import datetime
from flask import request, jsonify
from ..model.OrdemDeServico import OrdemDeServico, ordemDeServico_schema, ordemDeServicos_schema
from ..model.ItemOrcamento import ItemOrcamento
from ..model.Servicos import Servicos
from ..model.RegistroDaOS import RegistroDaOS
from ..model.ItemOrcamento import db


def abertura_OrdemDeServico():
    resp = request.get_json()
    nomeRequerente = resp['nomeRequerente']
    cpfDoRequerente = resp['cpfDoRequerente']
    telefoneRequerente = resp['telefoneRequerente']
    problema = resp['problema']
    requisicaoOrcamento = bool(resp['requisicaoOrcamento'])
    estadoAtualDoVeiculo = resp['estadoAtualDoVeiculo']
    carro = resp['carro']

    ordem = OrdemDeServico.abrirOrdemDeServico(carro=carro, nomeR=nomeRequerente, cpfR=cpfDoRequerente, telR=telefoneRequerente,
    problema=problema, reqOr=requisicaoOrcamento, estadoA=estadoAtualDoVeiculo, status=0)

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
    statusAterior = ordem.status
    if ordem:
        if ordem.status == 0:
            try:
                ordem.aceitarServico(mecanico=mecanico, status=1)
                #ordem.mecanico = mecanico
                #ordem.status = 1
                fusoSaoPaulo = datetime.datetime.now().astimezone(datetime.timezone(datetime.timedelta(hours=-3)))
                regis = RegistroDaOS(data=fusoSaoPaulo, statusA=statusAterior, novoS=1, 
                            valorTotal=0, problema=ordem.problema, mecanico=mecanico, ordemDeServico=id)      
                db.session.add(regis)      
                db.session.commit()
                return jsonify({'msg': 'Ordem Aceita'}), 200
            except Exception as e:
                print(e)
                return jsonify({'msg': 'error ao aceitar'}), 500
        else:
            return jsonify({'msg': 'Ordem de Serviço ja foi aceita'}), 401
    else:
        return jsonify({'msg': 'Ordem de Serviço não encontrada'}), 404


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

