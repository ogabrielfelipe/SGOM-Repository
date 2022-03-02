const CAD_PATH = `/Carro/Cadastrar`;
const UP_PATH = `/Carro/Atulizar/`;
const DEL_PATH = `/Carro/Excluir/`;
const LIST_PATH = `/Carro/BuscaCarros`;
const BUSC_PATH = `/Carro/Busca/`;


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

    //filtar por placa
    $('#btnPesquisaVeiculoCad').click(() => {
        var placa = $('#inp_pesquisaPlaca')[0]['value'];
        if (placa.length == 0) {
            Envia({}, `/Carro/BuscaCarros`, 'POST').then((data) => {
                $('#tbodyListVeiculos tr').remove();
                response = data['dados']
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
    // Cadastro de veiculo

    // Edição de veiculo



    //===================================================================

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
