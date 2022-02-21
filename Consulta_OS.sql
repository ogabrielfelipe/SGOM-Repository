SELECT d.nomeRequerente, d.cpfDoRequerente, d.telefoneRequerente, d.problema,
       d.requisicaoOrcamento, d.estadoAtualDoVeiculo, d.custoMecanico, d.valorTodal,
       d.respostaCliente, c.placa, f.nome
FROM ordemDeServico AS d
INNER JOIN carro c on c.id = d.id
INNER JOIN funcionario f on f.id = d.mecanico
WHERE
    D.id = 2