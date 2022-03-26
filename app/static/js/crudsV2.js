const VEICULO_CAD_PATH = `/Carro/Cadastrar`;
const VEICULO_UP_PATH = `/Carro/Atulizar/`;
const VEICULO_DEL_PATH = `/Carro/Excluir/`;
const VEICULO_LIST_PATH = `/Carro/BuscaCarros`;
const VEICULO_BUSC_PATH = `/Carro/Busca/`;
//================================================================================
const FUNCIONARIO_CAD_PATH = `/Funcionario/Cadastrar`;
const FUNCIONARIO_UP_PATH = `/Funcionario/Atualizar/`;
const FUNCIONARIO_DEL_PATH = `/Carro/Excluir/`;
const FUNCIONARIO_LIST_PATH = `/Funcionario/BuscaFuncionaios`;
const FUNCIONARIO_BUSC_ID_PATH = `/Funcionario/Busca/`;
const FUNCIONARIO_BUSC_NOME_PATH = `/Funcionario/BuscaUsername/`;
const FUNCIONARIO_BUSC_PERSO_PATH = `/Funcionario/BuscarFuncionarioPersonalizado`;
const FUNCIONARIO_INATIVAR_PATH = `/Funcionario/Inativar/`;
const FUNCIONARIO_ATIVAR_PATH = `/Funcionario/Ativar/`;
//================================================================================
const ITEM_CAD_PATH = `/ItemOrcamento/Cadastrar`;
const ITEM_UP_PATH = `/ItemOrcamento/Alterar/`;
const ITEM_DEL_PATH = `/ItemOrcamento/Excluir/`;
const ITEM_LIST_PATH = `/ItemOrcamento/BuscarTodos`;
const ITEM_BUSC_PATH = ``;
//================================================================================
function EnviaCrud(entry, url, method) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: method,
            data: JSON.stringify(entry),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            statusCode: {
                201: function () {
                    $('#alerta_sucesso').css({ "display": "block" });
                    $('#title_alerta').text("Sucesso");
                    $('#body_alerta').text("Cadastrado com sucesso!");

                    $('.toast').toast('show');
                    setTimeout(() => {$('#alerta_sucesso').css({ "display": "none" })}, 5000);
                },
                200: function () {
                    $('#alerta_sucesso').css({ "display": "block" });
                    $('#title_alerta').text("Sucesso");
                    $('#body_alerta').text("Executada com sucesso!");

                    $('.toast').toast('show');
                    setTimeout(() => {$('#alerta_sucesso').css({ "display": "none" })}, 5000);
                },
                401: function () {
                    $('#alerta_advertencia').css({ "display": "block" });
                    $('#title_alerta').text("Atenção");
                    $('#body_alerta').text("Não foi possível achar elemento ");

                    $('.toast').toast('show');
                    setTimeout(() => {$('#alerta_advertencia').css({ "display": "none" })}, 5000);
                },
                500: function () {
                    $('#alerta_error').css({ "display": "block" });
                    $('#title_alerta').text("Erro ");
                    $('#body_alerta').text("Erro na execução");

                    $('.toast').toast('show');
                    setTimeout(() => {$('#alerta_error').css({ "display": "none" })}, 5000);
                },
            },
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        });
    });
}

//================================================================================
function setTableVeiculos(resp) {
    (resp.then((data) => {
        $('#tbodyListVeiculos tr').remove();
        $('#tbodyListVeiculos').empty();
        console.log($('#tbodyListVeiculos'));
        response = data['dados'];
        for (dadosAtual of response) {
            $('#tbodyListVeiculos').append(
                '<tr onclick=' + "selectTblVeiculo(this);" + '>'
                +
                '<td id="tblIdVeiculo" hidden>' + dadosAtual['id'] +
                '</td><th id="tblPlacaVeiculo" scope="row">' +
                dadosAtual['placa'] +
                '</th><td id="tblTelefoneVeiculo" scope="row">' +
                dadosAtual['telefone'] +
                '</td></tr>'
            )
        }
    }));
}
function setTableFuncionarios(resp) {
    (resp.then((data) => {
        response = data['dados'];
        console.log(response);
        $('#tbodyListFuncionarios tr').empty();
        $('#tbodyListFuncionarios tr').remove();
        for (dadosAtual of response) {
            $('#tbodyListFuncionarios').append(
                '<tr onclick=' + "selectTblFuncionarios(this)" + '>'
                +
                '<td id="tblIdFuncionario" hidden>' + dadosAtual['id'] +
                '</td>'
                +
                '<td id="tdTipoFuncionario" hidden>' + dadosAtual['tipoFuncionario'] +
                '</td>'
                +
                '<td id="tdStatus" hidden>' + filtrarStatus(dadosAtual['status']) +
                '</td>'
                +
                '<th id="tdNome" scope="row">' + dadosAtual['nome'] + '</th>' +
                '<th id="tdCpf" scope="row">' + dadosAtual['cpf'] + '</th>' +
                '<th id="tdTelefone" scope="row">' + dadosAtual['telefone'] + '</th>' +
                '<th id="tdDataDeAdimissao" scope="row">' + dadosAtual['dataDeAdmissao'] + '</th>' +
                '<th scope="row">' + filtrarTipoFuncionario(dadosAtual['tipoFuncionario']) + '</th>' +
                '<th id="tdUsuario" scope="row">' + dadosAtual['usuario'] + '</th>' +
                '<th scope="row">' + filtrarStatus(dadosAtual['status']) + '</th>' +
                +
                '</tr>'
            )
        }
    }));
}
function setTableItens(resp) {
    (resp.then((data) => {
        $('#tbodyListItem tr').remove();
        $('#tbodyListItem').empty();
        response = data['dados'];
        for (dadosAtual of response) {
            $('#tbodyListItem').append(
                '<tr onclick=' + "selectTblItem(this);" + '>'
                +
                '<td id="tblIdItem" hidden>' + dadosAtual['id'] +
                '</td><th id="tblNomeItem" scope="row">' +
                dadosAtual['nome'] +
                '</th><td id="tblValorItem" scope="row">' +
                dadosAtual['valor'] +
                '</td></tr>'
            )
        }
    }));
}

function selectTblVeiculo(event) {
    let id = $(event).children('#tblIdVeiculo')[0]['innerText'];
    let placa = $(event).children('#tblPlacaVeiculo')[0]['innerText'];
    let telefone = $(event).children('#tblTelefoneVeiculo')[0]['innerText'];

    $('#tblListVeiculos #tbodyListVeiculos tr').removeClass('table-light');
    $(event).addClass('table-light');

    $('#auxIdVeiculo').val(id);
    $('#auxPlaca').val(placa);
    $('#auxTelefone').val(telefone);
}
function selectTblFuncionarios(event) {
    const idFuncionario = $(event).children('#tblIdFuncionario')[0]['innerText'];
    const nomeFuncionario = $(event).children('#tdNome')[0]['innerText'];
    const cpfFuncionario = $(event).children('#tdCpf')[0]['innerText'];
    const telefoneFuncionario = $(event).children('#tdTelefone')[0]['innerText'];
    const dataDeAdimissao = $(event).children('#tdDataDeAdimissao')[0]['innerText'];
    const tipoFuncionario = $(event).children('#tdTipoFuncionario')[0]['innerText'];
    const usuario = $(event).children('#tdUsuario')[0]['innerText'];
    const status = $(event).children('#tdStatus')[0]['innerText'];

    $('#auxIdFuncionario').val(idFuncionario);
    $('#auxCpf').val(cpfFuncionario);
    $('#auxTelefone').val(telefoneFuncionario);
    $('#auxDataA').val(dataDeAdimissao);
    $('#auxTipoFuncionario').val(tipoFuncionario);
    $('#auxUsuario').val(usuario);
    $('#auxNomeFuncionario').val(nomeFuncionario);

    // console.log(idFuncionario);
    // console.log(status);
    // if(status === 'Ativo'){
    //     console.log(true);
    // } else{
    //     console.log(false);
    // }
    // console.log($(event).children('#tdStatus'));
    // console.log($(event).children('#tblIdFuncionario'));
    $('#auxStatus').val(status);

    $('#tblFuncionario #tbodyListFuncionarios tr').removeClass('table-light');
    $(event).addClass('table-light');

}
function selectTblItem(event) {
    let id = $(event).children('#tblIdItem')[0]['innerText'];
    let nome = $(event).children('#tblNomeItem')[0]['innerText'];
    let valor = $(event).children('#tblValorItem')[0]['innerText'];

    $('#tblListItemOrca #tbodyListItem tr').removeClass('table-light');
    $(event).addClass('table-light');

    $('#auxIdItem').val(id);
    $('#auxNome').val(nome);
    $('#auxValor').val(valor);
}
$(document).ready(() => {
    const modalCrudFuncionario = ['#auxIdFuncionario', '#auxCpf', '#auxTelefone', '#auxDataA', '#auxTipoFuncionario', '#auxUsuario', '#auxNomeFuncionario', '#auxStatus', '#auxIdFuncionario'];
    const modalCadastrarFuncinoario = ['#up_idFunc', '#inp_nome', '#inp_cpf', '#inp_telefoneFuncionario', '#inp_dataDeAdimissao', '#inp_usuario', '#inp_senha', '#selectTipoFunc'];
    //----------
    const modalCrudVeiculo = ['#auxIdVeiculo', '#auxPlaca', '#auxTelefone'];
    const modalCadastrarVeiculo = ['#inp_placaVeiculo', "#inp_telefoneVeiculo"];
    //----------
    const modalCrudItem = ['#auxIdItem', '#auxNome', '#auxValor'];
    const modalCadastrarItem = ['#inp_nomeItem', '#inp_valorItem'];

    //-------------- MASK -------------------
    $('#inp_telefoneFuncionario').mask('(99) 99999-9999');

    //-------------- DASHBOARDS -------------
    $('#crud-veic').click(() => {
        $('#tbodyListVeiculos tr').remove();
        zerarCamposModel(modalCrudVeiculo);
        zerarCamposModel(modalCadastrarVeiculo);
        setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
    });
    $('#crud-func').click(() => {
        $('#tbodyListFuncionarios tr').remove();
        zerarCamposModel(modalCrudFuncionario);
        $('#auxIdFuncionario').val('-1');
        setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
    });
    $('#crud-itemOrca').click(() => {
        zerarCamposModel(modalCrudItem);
        zerarCamposModel(modalCadastrarItem);
        $('#tbodyListItem tr').remove();
        setTableItens(Envia({}, ITEM_LIST_PATH, `POST`));
    })
    //-------------- BTN CLOSE -------------
    $('#btnCloseVeiculo').click(() => {
        $('#tbodyListVeiculos tr').remove();
        zerarCamposModel(modalCrudVeiculo);
        zerarCamposModel(modalCadastrarVeiculo);
        setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
    })
    $('#closeFuncionario').click(() => {
        zerarCamposModel(modalCrudFuncionario);
        $('#tbodyListFuncionarios').empty();
        setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
    });
    $('#btnCloseItem').click(() => {
        zerarCamposModel(modalCrudItem);
        zerarCamposModel(modalCadastrarItem);
        $('#tbodyListItem tr').remove();
        setTableItens(Envia({}, ITEM_LIST_PATH, `POST`));
    });
    //-------------- BTN NOVO -------------
    $('#btnNovoVei').click(() => {
        zerarCamposModel(modalCrudVeiculo);
        zerarCamposModel(modalCadastrarVeiculo);
    })
    $('#btnNovoFuncionario').click(() => {
        console.log(' ');
        console.log('clicou novo');
        zerarCamposModel(modalCrudFuncionario);
        zerarCamposModel(modalCadastrarFuncinoario);
        console.log($('auxIdFuncionario').val());
    });
    $('#btnNovoItem').click(() => {
        zerarCamposModel(modalCrudItem);
        zerarCamposModel(modalCadastrarItem);
    });
    //-------------- BTN EDITAR -------------    
    $('#btnEditarVei').click(() => {
        const idVeiculo = $('#auxIdVeiculo').val();
        const placaVeiculo = $('#auxPlaca').val();
        if(idVeiculo === '-1'){
            alertModal('Escolha alguns dos veiculos listadoss');
            console.log('editar aki');
            return;
        }else{
            const resp = Envia({}, VEICULO_BUSC_PATH + placaVeiculo, `POST`);
            (resp.then((data) => {
                vei = data['dados'];
                if (Object.keys(vei).length === 0) {
                    alertModal('Veiculo não encontrado');
                    return;
                } else {
                    $('#inp_placaVeiculo').val($('#auxPlaca').val());
                    $('#inp_telefoneVeiculo').val($('#auxTelefone').val());
                }
            }))
        }
    })
    $('#btnEditar').click(() => {
        const idFuncionario = $('#auxIdFuncionario').val();
        if(idFuncionario === '-1'){
            alertModal('Selecione algum funcionario na tabela');
        }else{
            const resp = Envia({}, FUNCIONARIO_BUSC_ID_PATH + idFuncionario, `POST`);
            (resp.then((data) => {
                func = data['dados'];
                if (Object.keys(func).length === 0) {
                    alertModal('Funcionario não encontrado');
                    console.log('foi aki');
                    return;
                } else {
                    $('#inp_nome').val($('#auxNomeFuncionario').val());
                    $('#inp_cpf').val($('#auxCpf').val());
                    $("#inp_telefoneFuncionario").val($('#auxTelefone').val());
                    $('#inp_dataDeAdimissao').val($('#auxDataA').val());
                    $('#inp_usuario').val($('#auxUsuario').val());
                    $('#selectTipoFunc').val($('#auxTipoFuncionario').val());
                }
            }))
        }
    });
    $('#btnEditarItem').click(() => {
        const idItem = $('#auxIdItem').val();
        const nomeItem = $('#auxNome').val();
        const valorItem = $('#auxValor').val();
        if (idItem < 0) {
            alertModal('Selecione algum dos itens na tabela');
            return;
        } else {
            $('#inp_nomeItem').val(nomeItem);
            $('#inp_valorItem').val(valorItem);
            console.log(nomeItem);
        }
    })
    //-------------- BTN EXLCUIR -------------  
    // Veiculo
    $('#btnExcluirVei').click(() => {
        const idVeiculo = $('#auxIdVeiculo').val();
        const placaVeiculo = $('#auxPlaca').val();
        
        if(idVeiculo === '-1'){
            alertModal('Selecione algum dos veiculos na tabela');
            return;
        }else{
            const resp = Envia({}, VEICULO_BUSC_PATH + placaVeiculo, `POST`);
            (resp.then((data) => {
                vei = data['dados'];
                if (Object.keys(vei).length === 0) {
                    alertModal('Veiculo não encontrado');
                    return;
                } else {
                    const resp = EnviaCrud({}, VEICULO_DEL_PATH + idVeiculo, 'DELETE');
                    resp.then(()=>{
                        setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
                    })
                }
            }))
        }
    });  // Ativar ou inativar Funcionario - REVISÃO
    $('#btnAlterarStatus').click(() => {
        const idFuncionario = $('#auxIdFuncionario').val();
        if(idFuncionario === '-1'){
            alertModal('Selecione algum dos funcionarios na tabela');
            return;
        } else{
            const resp = Envia({}, FUNCIONARIO_BUSC_ID_PATH + idFuncionario, `POST`);
            (resp.then((data) => {
                func = data['dados'];
                if (Object.keys(func).length === 0) {
                    alertModal('Funcionario não encontrado');
                    return;
                } else {
                    if (statusToBool($('#auxStatus').val())){
                        const resp = EnviaCrud({}, FUNCIONARIO_INATIVAR_PATH + idFuncionario, `DELETE`);
                        resp.then(()=>{
                            setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));        
                        })
                    }else{
                        const resp = EnviaCrud({}, FUNCIONARIO_ATIVAR_PATH + idFuncionario, `PATCH`);
                        resp.then(()=>{
                            setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));        
                        })
                    }
                    zerarCamposModel(modalCrudFuncionario);
                }
            }))
        }
    });
    $('#btnExcluirItem').click(() => {
        const idItem = $('#auxIdItem').val();
        if (idItem < 0) {
            alertModal('Selecionar um item na tabela')
        } else {
            const resp = EnviaCrud({}, ITEM_DEL_PATH + idItem, `DELETE`);
            resp.then(()=>{
                setTableItens(Envia({}, ITEM_LIST_PATH, `POST`));
            })
            zerarCamposModel(modalCrudItem);
            zerarCamposModel(modalCadastrarItem);
        }
    })
    //-------------- BTN ADICIONAR -------------  
    $('#btnCadastrarVeiculo').click(() => {
        if (!verificarCampo($('#inp_placaVeiculo'), $('#inp_telefoneVeiculo'))) {
            alertModal("Preencha todos os campos");
        } else {
            const placa = $('#inp_placaVeiculo').val().replace(/\s/g, '');
            const telefone = $('#inp_telefoneVeiculo').val().replace(/\s/g, '');
            const id = $('#auxIdVeiculo').val();
            placa.toUpperCase();
            let veiculo = {
                "placa": placa.toUpperCase(),
                "telefone": telefone.toUpperCase()
            };
            if (id < 0) {
                const resp = EnviaCrud(veiculo, VEICULO_CAD_PATH, `POST`);
                resp.then(()=>{
                    setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
                });
                zerarCamposModel(modalCrudVeiculo);
                zerarCamposModel(modalCadastrarVeiculo);
            }
            else {
                const resp = EnviaCrud(veiculo, VEICULO_UP_PATH + id, `PATCH`);
                resp.then(()=>{
                    setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
                });
                zerarCamposModel(modalCrudVeiculo);
                zerarCamposModel(modalCadastrarVeiculo);
            }
            
        }
    })
    $('#btnCadastrarFuncionario').click(() => {
        if (!verificarCampo($('#inp_nome'), $('#inp_cpf'), $('#inp_telefoneFuncionario'), $('#inp_dataDeAdimissao'), $('#selectTipoFunc'), $('#inp_usuario'), $('#inp_senha'))) {
            alertModal('Preencha todos os campos');
        } else {
            let funcionario = {
                "dataA": $('#inp_dataDeAdimissao').val(),
                "nome": $('#inp_nome').val(),
                "usuario": $('#inp_usuario').val(),
                "senha": $('#inp_senha').val(),
                "cpf": $('#inp_cpf').val(),
                "telefone": $('#inp_telefoneFuncionario').val(),
                "status": true,
                "tipoFuncionario": Number($('#selectTipoFunc').val())
            };
            const idFuncionario = $('#auxIdFuncionario').val();
            if (idFuncionario < 0) {
                const resp = EnviaCrud(funcionario, FUNCIONARIO_CAD_PATH, `POST`);
                resp.then(()=>{
                    setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
                })
                zerarCamposModel(modalCrudFuncionario);
                zerarCamposModel(modalCadastrarFuncinoario);
            } else {
                if (funcionario['status'] !== (statusToBool($('#auxStatus').val()))) {
                    funcionario['status'] = statusToBool($('#auxStatus').val())
                }
                const resp = EnviaCrud(funcionario, FUNCIONARIO_UP_PATH + idFuncionario, `PATCH`);
                resp.then(()=>{
                    setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
                })
                zerarCamposModel(modalCrudFuncionario);
                zerarCamposModel(modalCadastrarFuncinoario);
            }
        }
    });
    $('#btnCadastrarItem').click(() => {
        if (!verificarCampo($('#inp_nomeItem'), $('#inp_valorItem'))) {
            alertModal('Preencha todos os campos');
        } else {
            const idItem = $('#auxIdItem').val();
            const nomeItem = $('#inp_nomeItem').val();
            const valorItem = $('#inp_valorItem').val();

            const item = {
                "nome": nomeItem,
                "valor": Number(valorItem)
            }

            if (idItem < 0) {
                const resp = EnviaCrud(item, ITEM_CAD_PATH, `POST`);
                resp.then(()=>{
                    setTableItens(Envia({}, ITEM_LIST_PATH, `POST`));
                })
                zerarCamposModel(modalCrudItem);
                zerarCamposModel(modalCadastrarItem);
            } else {
                console.log('UPDATE')
                const resp = EnviaCrud(item, ITEM_UP_PATH + idItem, `PATCH`);
                resp.then(()=>{
                    setTableItens(Envia({}, ITEM_LIST_PATH, `POST`));
                })
                zerarCamposModel(modalCrudItem);
                zerarCamposModel(modalCadastrarItem);
            }
        }
    });
    //-------------- BTN PESQUISAR -------------  
    $('#btnPesquisaVeiculoCad').click(() => {
        var placa = $('#inp_pesquisaPlaca')[0]['value'];
        if (placa.length == 0) {
            setTableVeiculos(EnviaCrud({}, VEICULO_LIST_PATH, `POST`));
        } else if (placa.length < 7) {
            alertModal('Placa Inválida');
        } else if (placa.length > 7) {
            alertModal('Placa Inválida');
        } else {
            EnviaCrud({}, `/Carro/Busca/${placa.toUpperCase()}`, 'POST').then((data) => {
                $('#tbodyListVeiculos tr').remove();
                response = data['dados']
                $(response).each(function () {
                    $('#tbodyListVeiculos').append(
                        '<tr>'
                        +
                        '<tr onclick=' + "selectTblVeiculo(this);" + '>'
                        +
                        '<td id="tblIdVeiculo" hidden>' + this.id +
                        '</td><th id="tblPlacaVeiculo" scope="row">' +
                        this.placa +
                        '</th><td id="tblTelefoneVeiculo" scope="row">' +
                        this.telefone +
                        '</td></tr>'
                    );
                });
            });
        }
    });

    $('#btnPesquisarFunc').click(() => {
        let status = Number($('#selectStatusFuncionario').val());
        const nome = $('#inp_pesquisaFuncNome').val();
        if (status > -1 && nome.length > 0) {
            alertModal('Somente um dos campos de pesquisa podem ser usados');
            zerarCamposModel(modalCrudFuncionario);
            zerarCamposModel(modalCadastrarFuncinoario);
            $('#tbodyListFuncionarios tr').remove();
            setTableFuncionarios(EnviaCrud({}, FUNCIONARIO_LIST_PATH, `POST`));
        } else {
            if (status === -1) {
                status = "";
            }
            const pesqFunc = {
                "nome": nome,
                "status": status
            };
            $('#tbodyListFuncionarios tr').remove();
            setTableFuncionarios(EnviaCrud(pesqFunc, FUNCIONARIO_BUSC_PERSO_PATH, `POST`));
        }
    });
});


//================================================================================
function funcionarioEncontrado(funcionario) {
    $('#tbodyListFuncionarios').append(
        '<tr onclick=' + "selectTblFuncionarios(this)" + '>'
        +
        '<td id="tblIdFuncionario" hidden>' + funcionario['id'] +
        '</td>'
        +
        '<td id="tdTipoFuncionario" hidden>' + funcionario['tipoFuncionario'] +
        '</td>'
        +
        '<td id="tdStatus" hidden>' + filtrarStatus(funcionario['status']) +
        '</td>'
        +
        '<th id="tdNome" scope="row">' + funcionario['nome'] + '</th>' +
        '<th id="tdCpf" scope="row">' + funcionario['cpf'] + '</th>' +
        '<th id="tdTelefone" scope="row">' + funcionario['telefone'] + '</th>' +
        '<th id="tdDataDeAdimissao" scope="row">' + funcionario['dataDeAdmissao'] + '</th>' +
        '<th scope="row">' + filtrarTipoFuncionario(funcionario['tipoFuncionario']) + '</th>' +
        '<th id="tdUsuario" scope="row">' + funcionario['usuario'] + '</th>' +
        '<th scope="row">' + filtrarStatus(funcionario['status']) + '</th>' +
        +
        '</tr>'
    )
}
function zerarCamposModel(listIdField) {
    for (let idAtual of listIdField) {
        campoAtual = $(idAtual);
        campoAtual.val("");
        if (idAtual === '#auxStatus') {
            campoAtual.val(false);
        }
        if (idAtual === '#auxIdVeiculo' || idAtual === '#auxIdFuncionario' || idAtual === '#up_idFunc' || idAtual === '#auxIdItem') {
            campoAtual.val('-1');
        }
        if (idAtual === '#auxTipoFuncionario' || idAtual === '#selectTipoFunc') {
            campoAtual.val('-1');
        }
    }
}
function zerarCampos() {
    var elements = [].slice.call(arguments);
    for (let element of elements) {
        element.val("");
    }
}

function filtrarTipoFuncionario(tipoFunc) {
    const tiposDeFunc = ['Gerente', 'Atendente', 'Mecânico'];
    return tiposDeFunc[tipoFunc];
}
function filtrarStatus(statusFunc) {
    if (statusFunc)
        return 'Ativo';
    else
        return 'Inativo'
}
function statusToBool(status) {
    if (status === 'Ativo')
        return true;
    else
        return false;

}
function setBoxStatus(statusFunc) {
    if (statusFunc) {
        return '<input type="checkbox" id="tdStatus" checked hidden>';
    } else
        return '<input type="checkbox" id="tdStatus" hidden>';
}

function verificarCampo() {
    var elements = [].slice.call(arguments);
    let teste;
    for (let element of elements) {
        teste = element.val().replace(/\s/g, '');
        if (teste === "" || teste === "null") {
            return false;
        }
    }
    return true;
}

function alertModal(msg) {
    $('#alerta_advertencia').css({ "display": "block" })
    $('#title_alerta').text("Atenção");
    $('#body_alerta').text(msg);

    $('.toast').toast('show');
    setTimeout(() => {$('#alerta_advertencia').css({ "display": "none" })}, 5000);
}
