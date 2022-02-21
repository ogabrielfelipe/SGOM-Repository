SELECT r.data, r.novoStatus, f.nome, r.problema  FROM ordemDeServico AS o
INNER JOIN registroDaOS r ON r.ordemServico = o.id
INNER JOIN funcionario AS f ON f.id = o.mecanico
WHERE
    o.id = 2