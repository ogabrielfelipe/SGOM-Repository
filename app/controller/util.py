from datetime import datetime
import calendar


def calcula_intervalo_mes(competencia):
    yy = int(competencia.split('/')[1])
    mm = int(competencia.split('/')[0])
    dias = calendar.monthrange(yy, mm)

    inicio = str(yy)+'-'+str(mm)+'-'+str(dias[0])
    fim = str(yy)+'-'+str(mm)+'-'+str(dias[1])
    dataInicio = datetime.strptime(inicio, '%Y-%m-%d').date()
    dataFim = datetime.strptime(fim, '%Y-%m-%d').date()

    return dataInicio, dataFim


def convertPesquisa(operadores, dict):
    cont = 0
    quant = 0
    consulta = ''
    auxResult = 'WHERE'
    controleBe = []
    indice = 0
    z = ''
    aux = ''
    aux2 = ''

    for chave, nome in dict.items():
        if nome != '':
            if cont >= len(operadores):
                cont = 0

            if chave[len(chave) - 5:len(chave)] == '_WEEN':
                consulta += " {} {} '{}' AND || AND".format(chave[:len(chave) - 5], 'BETWEEN', nome)
            else:
                if chave[len(chave) - 1] != '_':
                    if isinstance(nome, str) and operadores[cont] != 'LIKE':
                        consulta += " {} {} '{}' AND ".format(chave, operadores[cont], nome)
                    elif isinstance(nome, int):
                        consulta += " {} {} {} AND ".format(chave, operadores[cont], nome)

                    if operadores[cont] == 'LIKE':
                        consulta += " {} {} '%{}%' AND ".format(chave, operadores[cont], nome)

            if chave[len(chave) - 1] == '_':
                controleBe.append(nome)

        cont += 1
        quant += 1

    while indice < len(consulta):
        letra = consulta[indice]
        aux += letra
        if letra == '|' and consulta[indice + 1] == '|':
            for w in range(len(controleBe)):
                aux2 = controleBe[w]
            x = 0
            while x < len(aux2):
                aux += aux2[x]
                x += 1
                # w+=1
        indice += 1

    if aux != '':
        auxResult += aux[0:len(aux) - 4]
        resultFinal = auxResult.replace('|', "'")
    else:
        resultFinal = ''

    return resultFinal
