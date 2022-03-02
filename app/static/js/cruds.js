const CAD_VEICULO_PATH = `/Carro/Cadastrar`;
const UP_VEICULO_PATH = `/Carro/Atulizar/`;
const DEL_VEICULO_PATH = `/Carro/Excluir/`;
const LIST_VEICULO_PATH = `/Carro/BuscaCarros`;
const BUSC_VEICULO_PATH = `/Carro/Busca/`;
//================================================================================
const CAD_FUNCIONARIO_PATH = `/Funcionario/Cadastrar`;
const UP_FUNCIONARIO_VEICULO_PATH = `/Funcionario/Atualizar/`;
const DEL_FUNCIONARIO_VEICULO_PATH = `/Carro/Excluir/`;
const LIST_FUNCIONARIO_VEICULO_PATH = `/Funcionario/BuscaFuncionaios`;
const BUSC_FUNCIONARIO_VEICULO_PATH = `Funcionario/Busca/`;
//================================================================================


function Envia(entry, url, method) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: method,
            data: JSON.stringify(entry),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        });
    });

}

// POPULA A TABELA
function escreveTable(resp) {
    let tabela = $('#tbodyListVeiculos');
    tabela.empty();
    (resp.then((data) => {
        response = data['dados'];
        for (dadosAtual of response) {
            tabela.append(
                '<tr>'
                +
                '<td>' + dadosAtual['placa'] + '</td>' +
                '<td>' + dadosAtual['telefone'] + '</td>'
                +
                '<input type="hidden" id="idVeiculo" name="custId" value="' + dadosAtual['id'] + '">'
                +
                '<td><div class="col btnEdit"><button id="edit" onclick="solicitarAlteracao(' + dadosAtual['id'] + ')" type="button" class="btn btn-danger" style="margin-right: 10px;">Editar</button></div></td>'
                +
                '<td><div class="col btnDel"><button id="exclu" onclick="solicitarExclusao(' + dadosAtual['id'] + ')"type="button" class="btn btn-danger" style="margin-right: 10px;">Excluir</button></div></td>'
                +
                +
                '</tr>'
            )
        }
    }));
}
// Exclusão de veiculo
function delVeiculo(id) {

    let resp = Envia({}, DEL_PATH + id, `DELETE`);
    if (resp)
        alert('Excluido com sucesso');
    else
        alert('ERROOOOOOOOOOOOOOOOOOOO');
    return;
}
$(document).ready(() => {
    // ======================== CRUDÃO AKI ==============================
    // Lista todos os veiculos cadastrados
    let cond = false;
    $('#crud-veic').click(() => {
        if (!cond) {
            let resp = Envia({}, LIST_PATH, `POST`);
            escreveTable(resp);
            cond = true;
            console.log($(''));
        }
    });
    //===================================================================
    //              CRUDÃO DE FUNCIONARIO
    let condFuncinario = false;
    $('#crud-func').click(() => {
        if (!condFuncinario) {
            let resp = Envia({}, LIST_FUNCIONARIO_VEICULO_PATH, `POST`);
            console.log(resp);
            escreveTableFuncionario(resp);
            condFuncinario = true;
        }
    });
    //===================================================================

    //filtar por placa
    $('#btnPesquisaVeiculoCad').click(() => {
        var placa = $('#inp_pesquisaPlaca')[0]['value'];
        if (placa.length == 0) {
            //arrumar dps
            Envia({}, `/Carro/BuscaCarros`, 'POST').then((data) => {
                $('#tbodyListVeiculos tr').remove();
                response = data['dados']
                for (dadosAtual of response) {
                    $(response).each(function () {
                        $('#tbodyListVeiculos').append(
                            '<tr>'
                            +
                            '<td>' + dadosAtual['placa'] + '</td>' +
                            '<td>' + dadosAtual['telefone'] + '</td>'
                            +
                            '<input type="hidden" id="idVeiculo" name="custId" value="' + dadosAtual['id'] + '">'
                            +
                            '<td><div class="col btnEdit"><button id="edit" onclick="solicitarAlteracao(' + dadosAtual['id'] + ')" type="button" class="btn btn-danger" style="margin-right: 10px;">Editar</button></div></td>'
                            +
                            '<td><div class="col btnDel"><button id="exclu" onclick="solicitarExclusao(' + dadosAtual['id'] + ')"type="button" class="btn btn-danger" style="margin-right: 10px;">Excluir</button></div></td>'
                            +
                            +
                            '</tr>'
                        );

                    });
                }
            })
        } else if (placa.length < 7) {
            console.log('Placa Inválida');
        } else if (placa.length > 7) {
            console.log('Placa Inválida');
        } else {
            console.log(placa.toUpperCase())
            Envia({}, `/Carro/Busca/${placa.toUpperCase()}`, 'POST').then((data) => {
                $('#tbodyListVeiculos tr').remove();
                response = data['dados']
                $(response).each(function () {
                    $('#tbodyListVeiculos').append(
                        '<tr>'
                        +
                        '<td>' + this.placa + '</td>' +
                        '<td>' + this.telefone + '</td>'
                        +
                        '<input type="hidden" id="idVeiculo" name="custId" value="' + dadosAtual['id'] + '">'
                        +
                        '<td><div class="col btnEdit"><button id="edit" onclick="solicitarAlteracao(' + dadosAtual['id'] + ')" type="button" class="btn btn-danger" style="margin-right: 10px;">Editar</button></div></td>'
                        +
                        '<td><div class="col btnDel"><button id="exclu" onclick="solicitarExclusao(' + dadosAtual['id'] + ')"type="button" class="btn btn-danger" style="margin-right: 10px;">Excluir</button></div></td>'
                        +
                        +
                        '</tr>'
                    );
                });

            });

        }

    });


});

function solicitarAlteracao(id) {

}
function solicitarExclusao(id) {
    delVeiculo(id);
    let resp = Envia({}, LIST_PATH, `POST`);
    escreveTable(resp);
}

//pesquisar

//id="btnPesquisarPlacaRelOS"
//================================================================================
//          CRUDÃO DE FUNCIONARIOS
function escreveTableFuncionario(resp) {
    $('#tbodyListFuncionarios').empty();
    console.log(resp);
    (resp.then((data) => {
        response = data['dados'];
        for (dadosAtual of response) {
            $('#tbodyListFuncionarios').append(
                '<tr>'
                +
                '<td>' + dadosAtual['nome'] + '</td>' +
                '<td>' + dadosAtual['cpf'] + '</td>' +
                '<td>' + dadosAtual['telefone'] + '</td>' +
                '<td>' + dadosAtual['dataDeAdmissao'] + '</td>' +
                '<td>' + dadosAtual['tipoFuncionario'] + '</td>' +
                '<td>' + dadosAtual['usuario'] + '</td>' +
                '<td>' + dadosAtual['status'] + '</td>' +
                +
                '<td><div class="col btnEdit"><button id="edit" type="button" class="btn btn-danger" style="margin-right: 10px;">Editar</button></div></td>'
                +
                '<td><div class="col btnDel"><button id="exclu" type="button" class="btn btn-danger" style="margin-right: 10px;">Mudar status</button></div></td>'
                +
                +
                '</tr>'
            )
        }
    }));
}