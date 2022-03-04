const CAD_VEICULO_PATH = `/Carro/Cadastrar`;
const UP_VEICULO_PATH = `/Carro/Atulizar/`;
const DEL_VEICULO_PATH = `/Carro/Excluir/`;
const LIST_VEICULO_PATH = `/Carro/BuscaCarros`;
const BUSC_VEICULO_PATH = `/Carro/Busca/`;
//================================================================================
const CAD_FUNCIONARIO_PATH = `/Funcionario/Cadastrar`;
const UP_FUNCIONARIO_PATH = `/Funcionario/Atualizar/`;
const DEL_FUNCIONARIO_PATH = `/Carro/Excluir/`;
const LIST_FUNCIONARIO_PATH = `/Funcionario/BuscaFuncionaios`;
const BUSC_FUNCIONARIO_PATH = `Funcionario/Busca/`;
//================================================================================
const SELECTOR_VEICULO = 1;
const SELECTOR_FUNCIONARIO = 2;
//================================================================================
var idVeiculo = -1;
let idFuncionario = -1;
let atualizarOuCadastrar = false;
//================================================================================

//          Função que consome a API
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

// POPULA A TABELA DE VEICULOS
function escreveTableVeiculo(resp) {
    let cont = 0, tdBtnEditar = 'tdBtnEditar';
    (resp.then((data) => {
        response = data['dados'];
        for (dadosAtual of response) {
            tdBtnEditar += cont
            $('#tbodyListVeiculos').append(
                '<tr onclick=' + "selectTblPlaca(this);" + '>'
                +
                '<td id="tblIdVeiculo" hidden>' + dadosAtual['id'] +
                '</td><th id="tblPlacaVeiculo" scope="row">' +
                dadosAtual['placa'] +
                '</th><td id="tblTelefoneVeiculo" scope="row">' +
                dadosAtual['telefone'] +
                '</td></tr>'
            )
            cont += 1;
        }
    }));
}
function selectTblPlaca(event) {
    let id = $(event).children('#tblIdVeiculo')[0]['innerText'];
    let placa = $(event).children('#tblPlacaVeiculo')[0]['innerText'];
    let telefone = $(event).children('#tblTelefoneVeiculo')[0]['innerText'];

    $('#tblListVeiculos #tbodyListVeiculos tr').removeClass('table-light');
    $(event).addClass('table-light');

    //console.log(id);

    $('#inpIdVei').val(id);
    //console.log($('#inpIdVei').val());
    $('#inp_placaVeiculo').val(placa);
    $('#inp_telefoneVeiculo').val(telefone);
}

// POPULA A TABELA DE FUNCIONARIOS
function escreveTableFuncionario(resp) {
    (resp.then((data) => {
        response = data['dados'];
        for (dadosAtual of response) {
            $('#tbodyListFuncionarios').append(
                '<tr>'
                +
                '<td id="tdNome">' + dadosAtual['nome'] + '</td>' +
                '<td id="tdCpf">' + dadosAtual['cpf'] + '</td>' +
                '<td id="tdTelefone">' + dadosAtual['telefone'] + '</td>' +
                '<td id="tdDataDeAdimissao">' + dadosAtual['dataDeAdmissao'] + '</td>' +
                '<td id="tdTipoFuncionario">' + dadosAtual['tipoFuncionario'] + '</td>' +
                '<td id="tdUsuario">' + dadosAtual['usuario'] + '</td>' +
                '<td id="tdStatus">' + dadosAtual['status'] + '</td>' +
                +
                '<input type="hidden" id="idFuncionario" name="custId" value="' + dadosAtual['id'] + '">'
                +
                '<td><div class="col btnEdit"><button id="btnEditFunc" type="button" onclick="solicitarAlteracaoFuncionario(this)"class="btn btn-danger" style="margin-right: 10px;">Editar</button></div></td>'
                +
                '<td><div class="col btnDel"><button id="btnExcluFunc" type="button" onclick="solicitarAlteracaoStatusFuncionario(this)"class="btn btn-danger" style="margin-right: 10px;">Mudar status</button></div></td>'
                +
                +
                '</tr>'
            )
        }
    }));
}
//==========================================================================================
//          CRUDÃO GENÉRICO
function cadastrarElemento(element, path) {
    let resp = Envia(element, path, `POST`);
    alert(resp);
    if (resp)
        alert('Cadastrado com sucesso');
    else
        alert('ERROOOOOOOOOOOOOOOOOOOO');
}
function deletarElemento(id, path) {
    let resp = Envia({}, path + id, `DELETE`);
    if (resp)
        alert('Excluido com sucesso');
    else
        alert('ERROOOOOOOOOOOOOOOOOOOO');
    return;
}
function buscarElemento(id, path) {
    return Envia({}, path + id, `POST`);
}
function atualizarElemento(entry, id, path) {
    return Envia(entry, path + id, `PATCH`);
}
function listarElementos(path) {
    return Envia({}, path, `POST`);
}
//==========================================================================================
$(document).ready(() => {
    let condicao = false;
    let idVeiculo = -1;
    limparTabela(SELECTOR_VEICULO);

    $('#btnCloseVeiculo').click(() => {
        zerarCampos($('#inp_placaVeiculo'), $('#inp_telefoneVeiculo'));
    })
    // ======================== CRUDÃO DE VEICULOS AKI ==============================
    // Lista todos os veiculos cadastrados
    $('#crud-veic').click(() => {
        limparTabela(SELECTOR_VEICULO);
        listaDeElementos(SELECTOR_VEICULO, LIST_VEICULO_PATH);
        zerarCampos($('#inp_placaVeiculo'), $('#inp_telefoneVeiculo'));
    });
    // CADASTRO E EDIÇÃO
    $('#btnCadastrarVeiculo').click(() => {
        if (!verificarCampo($('#inp_placaVeiculo'), $('#inp_telefoneVeiculo'))) {
            alert("Preencha todos os campos");
        } else {
            let placa = $('#inp_placaVeiculo').val().replace(/\s/g, '');
            let telefone = $('#inp_telefoneVeiculo').val().replace(/\s/g, '');
            let id = $('#inpIdVei').val();
            console.log('VERIFICAÇÕES AKI');
            console.log(id);
            placa.toUpperCase();
            let veiculo = {
                "placa": placa.toUpperCase(),
                "telefone": telefone.toUpperCase()
            };
            if (!(id > -1)) {
                console.log('CADASTRADO');
                cadastrarElemento(veiculo, CAD_VEICULO_PATH);
            }
            else {
                console.log('UPDATE')
                atualizarElemento(veiculo, id, UP_VEICULO_PATH);
            }
            zerarCampos($('#inp_placaVeiculo'), $('#inp_telefoneVeiculo'));
            $('#inpIdVei').val('-1');
            limparTabela(SELECTOR_VEICULO);
            listaDeElementos(SELECTOR_VEICULO, LIST_VEICULO_PATH);
        }
    });
    //filtar por placa
    $('#btnPesquisaVeiculoCad').click(() => {
        var placa = $('#inp_pesquisaPlaca')[0]['value'];
        if (placa.length == 0) {
            console.log(placa.length)
            //arrumar dps
            escreveTableVeiculo(Envia({}, `/Carro/BuscaCarros`, 'POST'))
            limparTabela(SELECTOR_VEICULO);
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
                        '<td><div class="col btnEdit"><button id="edit" onclick="solicitarAlteracao(this)" type="button" class="btn btn-danger" style="margin-right: 10px;">Editar</button></div></td>'
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
    //===================================================================
    // ======================== CRUDÃO DE FUNCIONARIOS AKI ==============================
    $('#crud-func').click(() => {
        limparTabela(SELECTOR_FUNCIONARIO);
        listaDeElementos(SELECTOR_FUNCIONARIO, LIST_FUNCIONARIO_PATH);
        zerarCampos($('#inp_nome'), $('#inp_cpf'), $('#inp_telefoneFuncionario'), $('#inp_dataDeAdimissao'), $('#inp_tipoFuncionario'), $('#inp_usuario'), $('#inp_senha'));
    });
    $('#btnCadastrarFuncionario').click(() => {
        if (!verificarCampo($('#inp_nome'), $('#inp_cpf'), $('#inp_telefoneFuncionario'), $('#inp_dataDeAdimissao'), $('#inp_tipoFuncionario'), $('#inp_usuario'), $('#inp_senha'))) {
            alert("Preencha todos os campos");
        } else {
            if (!atualizarOuCadastrar) {
                let funcionario = {
                    "cpf": $('#inp_cpf'),
                    "dataDeAdmissao": $('#inp_dataDeAdimissao'),
                    "nome": $('#inp_nome'),
                    "senha": $('#inp_senha'),
                    "status": true,
                    "telefone": $('#inp_telefoneFuncionario'),
                    "tipoFuncionario": 1,
                    "usuario": $('#inp_usuario')
                };
                cadastrarElemento(funcionario, CAD_FUNCIONARIO_PATH);
                atualizarOuCadastrar = false;
            }
            else {
                let resp_func = buscarElemento(idFuncionario, BUSC_FUNCIONARIO_PATH);
                let passFunc;
                resp_func.then((data) => {
                    passFunc = data['dados']['senha']
                });
                let funcionario = {
                    "cpf": $('#inp_cpf'),
                    "dataDeAdmissao": $('#inp_dataDeAdimissao'),
                    "nome": $('#inp_nome'),
                    "senha": passFunc,
                    "status": true,
                    "telefone": $('#inp_telefoneFuncionario'),
                    "tipoFuncionario": 1,
                    "usuario": $('#inp_usuario')
                };
                atualizarElemento(funcionario, idFuncionario, UP_FUNCIONARIO_PATH);
            }
            zerarCampos($('#inp_placaVeiculo'), $('#inp_telefoneVeiculo'));
            limparTabela(SELECTOR_VEICULO);
            listaDeElementos(SELECTOR_VEICULO, LIST_VEICULO_PATH);
        }
    });

    //===================================================================
});

//==========================================================================================
//          FUNÇÕES QUE SERÃO CHAMADAS
function listaDeElementos(seletor, path) {
    let resp = listarElementos(path);
    if (resp) {
        if (seletor === 1) {
            escreveTableVeiculo(resp);
        } else {
            escreveTableFuncionario(resp);
        }
    } else {
        alert('Erro ao carregar listas');
    }
}
//                  FUNCIONARIO
// Edição de Funcionario
function solicitarAlteracaoFuncionario(elementHTML) {
    let [id, nome, cpf, telefone, dataDeAdmissao, tipoFuncionario, usuario] = [$(elementHTML).siblings('#idFuncionario').val(), $(elementHTML).siblings('#tdNome').val(), $(elementHTML).siblings('#tdCpf').val(), $(elementHTML).siblings('#tdTelefone').val(), $(elementHTML).siblings('#tdDataDeAdimissao').val(), $(elementHTML).siblings('#tdTipoFuncionario').val(), $(elementHTML).siblings('#tdUsuario').val()];
    $('#inp_nome').val(nome);
    $('#inp_cpf').val(cpf);
    $('#inp_telefoneFuncionario').val(telefone);
    $('#inp_dataDeAdimissao').val(dataDeAdmissao);
    $('#inp_tipoFuncionario').val(tipoFuncionario);
    $('#inp_usuario').val(usuario);

    idFuncionario = id;
    atualizarOuCadastrar = true;
}
// Exclusão de Funcionario
function solicitarAlteracaoStatusFuncionario(elementHTML) {
    let id = $(elementHTML).siblings('#idVeiculo').val();
    deletarElemento(id, DEL_VEICULO_PATH);
    limparTabela(SELECTOR_VEICULO);
    listaDeElementos(SELECTOR_VEICULO, LIST_VEICULO_PATH);
}
//================================================================================
//===============================================================================
//          FUNÇÕES BÁSICAS

function limparTabela(selector) {
    if (selector === 1) {
        $('#tbodyListVeiculos').empty();
    } else {
        $('#tbodyListFuncionarios').empty();
    }
}
function zerarCampos() {
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    var elements = [].slice.call(arguments);
    //console.log(elements);
    for (let element of elements) {
        // console.log(element);
        element.val("");
    }
}
function verificarCampo(){
    console.log(arguments);
    var elements = [].slice.call(arguments);
    let teste;//= element.replace(/\s/g, '');
    for (let element of elements) {
        teste = element.val().replace(/\s/g, '');
        if (teste === "" || teste === "null")
            return false;
        
    }
}
