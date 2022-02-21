import datetime
from unittest import result
from flask import request, jsonify, session
from itsdangerous import json
from sqlalchemy import text
from app.model.Status import Status
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


def registra_orcamento(id, mecanico):
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
            statusAterior = ordem.status
            if ordem.requisicaoOrcamento == False:
                try:
                    ordem.registraOrcamento(problema=problema, custoMec=custoMecanico, valTodal=valorTotal, status=4)
                    db.session.add_all(servicos)
                    regis = RegistroDaOS(data=datetime.datetime.now().astimezone(datetime.timezone(datetime.timedelta(hours=-3))), 
                                statusA=statusAterior, novoS=4, valorTotal=0, problema=problema, mecanico=mecanico, ordemDeServico=id)      
                    db.session.add(regis)
                    db.session.commit()
                    resul1 = servicos_schema.dump(servicos)
                    result2 = ordemDeServico_schema.dump(ordem)
                    return jsonify({'msg': 'Registro Efetuado com sucesso', 'dados': {"Servicos": resul1, "Ordem_de_Servico": result2}}), 200
                except Exception as e:
                    return jsonify({'msg': 'Não foi possível incluir o resgistro', 'dados': str(e)}), 500
            else:
                try:
                    ordem.registraOrcamento(problema=problema, custoMec=custoMecanico, valTodal=valorTotal, status=2)
                    db.session.add_all(servicos)
                    regis = RegistroDaOS(data=datetime.datetime.now().astimezone(datetime.timezone(datetime.timedelta(hours=-3))), 
                                statusA=statusAterior, novoS=2, valorTotal=0, problema=problema, mecanico=mecanico, ordemDeServico=id)      
                    db.session.add(regis)
                    db.session.commit()
                    resul1 = servicos_schema.dump(servicos)
                    result2 = ordemDeServico_schema.dump(ordem)
                    result3 = registroDaOS_schema.dump(regis)
                    return jsonify({'msg': 'Registro Efetuado com sucesso', 'dados': {"Servicos": resul1, "Ordem_de_Servico": result2}, "Registro": result3 }), 200
                except Exception as e:
                    return jsonify({'msg': 'Não foi possível incluir o resgistro', 'dados': str(e)}), 500
        
        else:
            return jsonify({'msg': '3', 'dados': ()}), 500
        
       
    return jsonify({'msg': 'Ordem de Serviço não encontrada'}), 404                 
                

def avaliar_ordemServico(id, funcionario):
    ordem = OrdemDeServico.query.get(id)
    resp = request.get_json()
    respostaClient = bool(resp['respC'])
    statusAterior = ordem.status
    if ordem:
        if respostaClient == True:
            if ordem.status == 2:
                try:
                    ordem.avaliarOrdemServico(respC=respostaClient, status=3)
                    regis = RegistroDaOS(data=datetime.datetime.now().astimezone(datetime.timezone(datetime.timedelta(hours=-3))), 
                            statusA=statusAterior, novoS=3, valorTotal=ordem.valorTodal, problema=ordem.problema, mecanico=funcionario, ordemDeServico=id)      
                    db.session.add(regis)
                    db.session.commit()
                    result1 = ordemDeServico_schema.dump(ordem)
                    result2 = registroDaOS_schema.dump(regis)
                    return jsonify({'msg': 'Cadastro efetuado com sucesso', 'dados': {"Ordem": result1, "Registro": result2}}), 200
                except Exception as e:
                    return jsonify({'msg': 'Registro não efetuado', 'dados': str(e)}), 500
            else:
                return jsonify({'msg': 'Não foi feito orçamento', 'dados': {}}), 401
        else:
            return jsonify({'msg': 'Flag Requer aprovação desmarcada', 'dados': {}}), 401
    return jsonify({'msg': 'Ordem de Serviço não encontrada'}), 404


def atender_ordemDeServico(id, mecanico):
    ordem = OrdemDeServico.query.get(id)
    statusAterior = ordem.status
    if ordem:
        if ordem.status == 3:
            try:
                ordem.atenderServico(mecanico=mecanico, status=4)
                regis = RegistroDaOS(data=datetime.datetime.now().astimezone(datetime.timezone(datetime.timedelta(hours=-3))), 
                        statusA=statusAterior, novoS=4, valorTotal=ordem.valorTodal, problema=ordem.problema, mecanico=mecanico, ordemDeServico=id)      
                db.session.add(regis)
                db.session.commit()
                result1 = ordemDeServico_schema.dump(ordem)
                result2 = registroDaOS_schema.dump(regis)
                return jsonify({'msg': 'Ordem de Serviço em Atendimento', 'dados': {"Ordem": result1, "Registro": result2}}), 200
            except Exception as e:
                return jsonify({'msg': 'Não foi possível completar a requisição', 'error': str(e)}), 500
        else:
            return jsonify({'msg': 'Não foi aprovado o orçamento', 'dados': {}}), 401
    return jsonify({'msg': 'Ordem de Serviço não encontrada'}), 404


def concluir_ordemDeServico(id, funcionario):
    ordem = OrdemDeServico.query.get(id)
    statusAterior = ordem.status

    if ordem:
        if ordem.status == 4:
            try:
                ordem.concluirServico(status=5)
                regis = RegistroDaOS(data=datetime.datetime.now().astimezone(datetime.timezone(datetime.timedelta(hours=-3))), 
                        statusA=statusAterior, novoS=5, valorTotal=ordem.valorTodal, problema=ordem.problema, mecanico=funcionario, ordemDeServico=id)      
                db.session.add(regis)
                db.session.commit()
                result1 = ordemDeServico_schema.dump(ordem)
                result2 = registroDaOS_schema.dump(ordem)
                return jsonify({'msg': 'Ordem de Serviço Aguardando Pagamento', 'dados': {"Ordem": result1, "Registro": result2}}), 200
            except Exception as e:
                return jsonify({'msg': 'Não foi possível fazer a alteração', 'dados': {}}), 500
        else:
            return jsonify({'msg': 'Não foi efetuado o atendimento', 'dados': {}}), 401
    return jsonify({'msg': 'Ordem de Serviço não encontrada'}), 404


def finalizar_ordemDeServico(id, funcionario):
    ordem = OrdemDeServico.query.get(id)
    statusAterior = ordem.status

    if ordem:
        if ordem.status == 5:
            try:
                ordem.finalizarServico(status=6)
                regis = RegistroDaOS(data=datetime.datetime.now().astimezone(datetime.timezone(datetime.timedelta(hours=-3))), 
                        statusA=statusAterior, novoS=6, valorTotal=ordem.valorTodal, problema=ordem.problema, mecanico=funcionario, ordemDeServico=id)      
                db.session.add(regis)
                db.session.commit()

                sql_ordemDeServico = text(f'SELECT d.nomeRequerente, d.cpfDoRequerente, d.telefoneRequerente, d.problema,\
                                                d.requisicaoOrcamento, d.estadoAtualDoVeiculo, d.custoMecanico, d.valorTodal,\
                                                d.respostaCliente, c.placa as placa_veiculo, f.nome as mecanico\
                                            FROM ordemDeServico AS d\
                                            INNER JOIN carro c on c.id = d.id\
                                            INNER JOIN funcionario f on f.id = d.mecanico\
                                            WHERE\
                                                D.id = {id} \
                                            ')

                sql_registroDaOS = text(f'SELECT strftime("%d/%m/%Y %H:%M",r.data) as data_alteracao, r.novoStatus as status, f.nome as funcionario, r.problema  FROM ordemDeServico AS o\
                                            INNER JOIN registroDaOS r ON r.ordemServico = o.id\
                                            INNER JOIN funcionario AS f ON f.id = o.mecanico\
                                        WHERE\
                                            o.id = {id}\
                                        ')

                consultaOrdemDeServico = db.session.execute(sql_ordemDeServico)
                consultaRegistrosDaOS = db.session.execute(sql_registroDaOS).fetchall()

                consultaOrdemDeServico_dict = {}
                for it in consultaOrdemDeServico:
                    consultaOrdemDeServico_dict = dict(it)

                consultaRegistrosDaOS_dict = [dict(u) for u in consultaRegistrosDaOS]
                
                return jsonify({'msg': 'Ordem de Serviço Finalizada', 'dados': {"Ordem": consultaOrdemDeServico_dict, "Registro": consultaRegistrosDaOS_dict}}), 200
            except Exception as e:
                return jsonify({'msg': 'Não foi possível finalizar', 'dados': str(e)}), 500
        else:
            return jsonify({'msg': 'A Ordem de Serviço não está aguardando pagamento', 'dados': {}}), 401
    return jsonify({'msg': 'Ordem de Serviço não encontrada'}), 404
    


def populate_dict(cursor, schema):
    for i in schema.keys():
        cursor.execute("select * from {table};".format(table=i))

        for row in cursor.fetchall():
            colindex = 0

            for col in schema[i]['scheme']:
                if not 'data' in schema[i]:
                    schema[i]['data']=[]

                schema[i]['data'].append(row[colindex])
                colindex += 1

    return schema