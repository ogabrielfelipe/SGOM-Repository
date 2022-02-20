import datetime
from unittest import result
from flask import request, jsonify, session
from ..model.OrdemDeServico import OrdemDeServico, ordemDeServico_schema, ordemDeServicos_schema
from ..model.ItemOrcamento import ItemOrcamento, itemOrcamento_schema, itemOrcamentos_schema
from ..model.Servicos import Servicos, servico_schema,servicos_schema
from ..model.RegistroDaOS import RegistroDaOS, registroDaOS_schema, registroDaOSs_schema
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
                ordem.aceitarServico(mecanico=mecanico, stas=1)
                regis = RegistroDaOS(data=datetime.datetime.now().astimezone(datetime.timezone(datetime.timedelta(hours=-3))), 
                        statusA=statusAterior, novoS=1, valorTotal=0, problema=ordem.problema, mecanico=mecanico, ordemDeServico=id)      
                db.session.add(regis)      
                db.session.commit()
                return jsonify({'msg': 'Ordem Aceita', 'dados': {"Ordem": ordemDeServico_schema.dump(ordem), "Registro": registroDaOS_schema.dump(regis)}}), 200
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
    quant_item = resp['quant_item']

    '''
    ### Entrada de dados ###
    quant_item = {
        "itens": [1, 2, 3, 4],
        "quantidade": [1, 2, 4, 6]
    }
    '''
    if ordem.status == 1:
        if ordem.requisicaoOrcamento == False:

            auxItem = []
            for i in range(len(quant_item['itens'])):
                auxItem.append(quant_item['itens'][i])

            itens = None
            try:
                itens = ItemOrcamento.query.filter(ItemOrcamento.id.in_(auxItem))
            except Exception as e:
                itens = None
            

            if itens:
                cont = 0
                valorTotal = 0
                auxQuant = []
                servicos = []
                for i in itens:
                    valorTotal += (i.valor * quant_item['quantidade'][cont])
                    auxQuant.append(quant_item['quantidade'][cont])
                    servicos.append(Servicos(ordem.id, i.id, quant_item['quantidade'][cont]))
                    cont+=1

                valorTotal += custoMecanico                

                try:
                    ordem.registraOrcamento(problema=problema, custoMec=custoMecanico, valTodal=valorTotal)
                    db.session.add_all(servicos)
                    db.session.commit()
                    resul1 = servicos_schema.dump(servicos)
                    result2 = ordemDeServico_schema.dump(ordem)
                    return jsonify({'msg': 'Registro Efetuado com sucesso', 'dados': {"Servicos": resul1, "Ordem_de_Servico": result2}}), 200
                except Exception as e:
                    return jsonify({'msg': 'Não foi possível incluir o resgistro', 'dados': str(e)}), 500
            
            else:
                return jsonify({'msg': '3', 'dados': ()}), 500
        else:
                return jsonify({'msg': '2', 'dados': ()}), 500
    else:
                return jsonify({'msg': '1', 'dados': ()}), 500                    
                


