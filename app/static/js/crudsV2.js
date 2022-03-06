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
const FUNCIONARIO_BUSC_PATH = `/Funcionario/Busca/`;
const FUNCIONARIO_INATIVAR_PATH = `/Funcionario/Inativar/`;
const FUNCIONARIO_ATIVAR_PATH = `/Funcionario/Ativar/`;
//================================================================================
const ITEM_CAD_PATH = `/ItemOrcamento/Cadastrar`;
const ITEM_UP_PATH = `/ItemOrcamento/Alterar/`;
const ITEM_DEL_PATH = `/ItemOrcamento/Excluir/`;
const ITEM_LIST_PATH = `/ItemOrcamento/BuscarTodos`;
const ITEM_BUSC_PATH = ``;
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
//================================================================================
function setTableVeiculos(resp) {
    (resp.then((data) => {
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
        // console.log($('#tbodyListFuncionarios'));
        for (dadosAtual of response) {
            // console.log('Status:  '+dadosAtual['status']);
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
            //console.log(typeof dadosAtual['tipoFuncionario']);
        }
    }));
}
function setTableItens(resp) {
    (resp.then((data) => {
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
function selectTblItem(event){
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
    const modalCrudItem = ['#auxIdItem','#auxNome','#auxValor'];
    const modalCadastrarItem = ['#inp_nomeItem','#inp_valorItem'];

    //-------------- DASHBOARDS -------------
    $('#crud-veic').click(() => {
        $('#tbodyListVeiculos').empty();
        zerarCamposModel(modalCrudVeiculo);
        zerarCamposModel(modalCadastrarVeiculo);
        setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
    });
    $('#crud-func').click(() => {
        $('#tbodyListFuncionarios').empty();
        zerarCamposModel(modalCrudFuncionario);
        $('#auxIdFuncionario').val('-1');
        setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
    });
    $('#crud-itemOrca').click(()=>{
        zerarCamposModel(modalCrudItem);
        zerarCamposModel(modalCadastrarItem);
        $('#tbodyListItem').empty();
        setTableItens(Envia({},ITEM_LIST_PATH,`POST`));
    })
    //-------------- BTN CLOSE -------------
    $('#btnCloseVeiculo').click(() => {
        $('#tbodyListVeiculos').empty();
        zerarCamposModel(modalCrudVeiculo);
        zerarCamposModel(modalCadastrarVeiculo);
        setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
    })
    $('#closeFuncionario').click(() => {
        zerarCamposModel(modalCrudFuncionario);
        $('#tbodyListFuncionarios').empty();
        setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
    });
    $('#btnCloseItem').click(()=>{
        zerarCamposModel(modalCrudItem);
        zerarCamposModel(modalCadastrarItem);
        $('#tbodyListItem').empty();
        setTableItens(Envia({},ITEM_LIST_PATH,`POST`));
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
    $('#btnNovoItem').click(()=>{
        zerarCamposModel(modalCrudItem);
        zerarCamposModel(modalCadastrarItem);
    });
    //-------------- BTN EDITAR -------------    
    $('#btnEditarVei').click(() => {
        console.log(' ');
        console.log('clicou EDITAR');
        const placaVeiculo = $('#auxPlaca').val();
        const resp = Envia({}, VEICULO_BUSC_PATH + placaVeiculo, `POST`);
        console.log(resp);

        (resp.then((data) => {
            vei = data['dados'];
            if (Object.keys(vei).length === 0) {
                alert('Selecione algum dos veiculos na tabela');
                return;
            } else {
                $('#inp_placaVeiculo').val($('#auxPlaca').val());
                $('#inp_telefoneVeiculo').val($('#auxTelefone').val());
            }
        }))
    })
    $('#btnEditar').click(() => {
        console.log(' ');
        console.log('clicou EDITAR');
        const idFuncionario = $('#auxIdFuncionario').val();
        console.log(FUNCIONARIO_BUSC_PATH + idFuncionario);
        console.log($('#auxNomeFuncionario').val());
        const resp = Envia({}, FUNCIONARIO_BUSC_PATH + idFuncionario, `POST`);
        console.log(resp);

        (resp.then((data) => {
            func = data['dados'];
            if (Object.keys(func).length === 0) {
                alert('Selecione algum dos funcionarios na tabela');
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
    });
    $('#btnEditarItem').click(()=>{
        console.log(' ');
        console.log('clicou EDITAR');

        const idItem = $('#auxIdItem').val();
        const nomeItem = $('#auxNome').val();
        const valorItem = $('#auxValor').val();
        // const resp = Envia({}, ITEM_BUSC_PATH + idItem, `POST`);
        // console.log(resp);

        if(idItem < 0){
            alert('Selecione algum dos itens na tabela');
            return;
        } else{
            $('#inp_nomeItem').val(nomeItem);
            $('#inp_valorItem').val(valorItem);
            console.log(nomeItem);
        }

        // (resp.then((data) => {
        //     vei = data['dados'];
        //     if (Object.keys(vei).length === 0) {
        //         alert('Selecione algum dos itens na tabela');
        //         return;
        //     } else {
        //         $('#inp_nomeItem').val(nomeItem);
        //         $('#inp_valorItem').val(valorItem);
        //     }
        // }))
    })
    //-------------- BTN EXLCUIR -------------  
    // Veiculo
    $('#btnExcluirVei').click(() => {
        console.log(' ');
        console.log('clicou EXLUIR');
        const idVeiculo = $('#auxIdVeiculo').val();
        const placaVeiculo = $('#auxPlaca').val();
        const resp = Envia({}, VEICULO_BUSC_PATH + placaVeiculo, `POST`);
        console.log(resp);

        (resp.then((data) => {
            vei = data['dados'];
            if (Object.keys(vei).length === 0) {
                alert('Selecione algum dos veiculos na tabela');
                return;
            } else {
                const resp = Envia({}, VEICULO_DEL_PATH + idVeiculo, 'DELETE');
                console.log(resp);
                alert('Veiculo Excluido');
                $('#tbodyListVeiculos').empty();
                setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
            }
        }))
    });  // Ativar ou inativar Funcionario - REVISÃO
    $('#btnAlterarStatus').click(() => {
        console.log(' ');
        console.log('clicou ALTERAR');
        const idFuncionario = $('#auxIdFuncionario').val();
        console.log(FUNCIONARIO_BUSC_PATH + idFuncionario);
        const resp = Envia({}, FUNCIONARIO_BUSC_PATH + idFuncionario, `POST`);
        console.log(resp);

        (resp.then((data) => {
            func = data['dados'];
            if (Object.keys(func).length === 0) {
                alert('Selecione algum dos funcionarios na tabela');
                return;
            } else {
                if (statusToBool($('#auxStatus').val()))
                    Envia({}, FUNCIONARIO_INATIVAR_PATH + idFuncionario, `DELETE`);
                else
                    Envia({}, FUNCIONARIO_ATIVAR_PATH + idFuncionario, `PATCH`);
                zerarCamposModel(modalCrudFuncionario);
                $('#tbodyListFuncionarios').empty();
                setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
                alert('Funcionario status alterado')
            }
        }))
    });
    $('#btnExcluirItem').click(()=>{
        const idItem = $('#auxIdItem').val();
        if(idItem < 0){
            alert('Selecionar um item na tabela')
        } else{
            const resp = Envia({},ITEM_DEL_PATH+idItem,`DELETE`);
            alert('Item excluido');
            zerarCamposModel(modalCrudItem);
            zerarCamposModel(modalCadastrarItem);
            $('#tbodyListItem').empty();
            setTableItens(Envia({},ITEM_LIST_PATH,`POST`));
        }
    })
    //-------------- BTN ADICIONAR -------------  
    $('#btnCadastrarVeiculo').click(() => {
        console.log($('#inp_placaVeiculo').val());
        console.log($('#inp_telefoneVeiculo').val());
        if (!verificarCampo($('#inp_placaVeiculo'), $('#inp_telefoneVeiculo'))) {
            alert("Preencha todos os campos");
        } else {
            const placa = $('#inp_placaVeiculo').val().replace(/\s/g, '');
            const telefone = $('#inp_telefoneVeiculo').val().replace(/\s/g, '');
            const id = $('#auxIdVeiculo').val();
            console.log('VERIFICAÇÕES AKI');
            console.log(id);
            placa.toUpperCase();
            let veiculo = {
                "placa": placa.toUpperCase(),
                "telefone": telefone.toUpperCase()
            };
            if (id < 0) {
                console.log('CADASTRO');
                const resp = Envia(veiculo, VEICULO_CAD_PATH, `POST`);
                console.log(resp);

                zerarCamposModel(modalCrudVeiculo);
                zerarCamposModel(modalCadastrarVeiculo);
                alert('Veiculo Cadastrado')
                $('#tbodyListVeiculos').empty();
                setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
            }
            else {
                console.log('UPDATE')
                console.log(veiculo['placa'].length);
                const resp = Envia(veiculo, VEICULO_UP_PATH + id, `PATCH`);
                console.log(resp);

                zerarCamposModel(modalCrudVeiculo);
                zerarCamposModel(modalCadastrarVeiculo);

                alert('Veiculo Editado');

                $('#tbodyListVeiculos').empty();
                setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
            }
        }
    })
    $('#btnCadastrarFuncionario').click(() => {
        if (!verificarCampo($('#inp_nome'), $('#inp_cpf'), $('#inp_telefoneFuncionario'), $('#inp_dataDeAdimissao'), $('#selectTipoFunc'), $('#inp_usuario'), $('#inp_senha'))) {
            alert('Preencha todos os campos');
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
                console.log('CADASTRO');
                const resp = Envia(funcionario, FUNCIONARIO_CAD_PATH, `POST`);
                console.log(resp);
                $('#tbodyListFuncionarios').empty();
                setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
                alert('Funcionario Cadastro');

            } else {
                console.log('EDIÇÃO')
                if (funcionario['status'] !== (statusToBool($('#auxStatus').val()))) {
                    funcionario['status'] = statusToBool($('#auxStatus').val())
                }
                console.log(funcionario);
                console.log(FUNCIONARIO_UP_PATH + idFuncionario);
                const resp = Envia(funcionario, FUNCIONARIO_UP_PATH + idFuncionario, `POST`);
                //console.log(resp);
                $('#tbodyListFuncionarios').empty();
                setTableFuncionarios(Envia({}, FUNCIONARIO_LIST_PATH, `POST`));
                alert('Funcionario Editado');
            }
            zerarCamposModel(modalCrudFuncionario);
            zerarCamposModel(modalCadastrarFuncinoario);
        }
    });
    $('#btnCadastrarItem').click(()=>{
        if (!verificarCampo($('#inp_nomeItem'), $('#inp_valorItem'))) {
            alert("Preencha todos os campos");
        } else {
            const idItem = $('#auxIdItem').val();
            const nomeItem = $('#inp_nomeItem').val();
            const valorItem = $('#inp_valorItem').val();

            const item = {
                "nome": nomeItem,
                "valor": Number(valorItem)
            }

            if(idItem < 0){
                console.log('CADASTRO');
                console.log(item);
                const resp = Envia(item, ITEM_CAD_PATH, `POST`);
                console.log(resp);
                alert('Item Cadastrado');
                zerarCamposModel(modalCrudItem);
                zerarCamposModel(modalCadastrarItem);
                $('#tbodyListItem').empty();
                setTableItens(Envia({},ITEM_LIST_PATH,`POST`));
            } else{
                console.log('UPDATE')
                const resp = Envia(item, ITEM_UP_PATH + idItem, `PATCH`);
                console.log(resp);
                alert('Item Editado');
                zerarCamposModel(modalCrudItem);
                zerarCamposModel(modalCadastrarItem);
                $('#tbodyListItem').empty();
                setTableItens(Envia({},ITEM_LIST_PATH,`POST`));
            }

        }
    });
    //-------------- BTN PESQUISAR -------------  
    $('#btnPesquisaVeiculoCad').click(() => {
        var placa = $('#inp_pesquisaPlaca')[0]['value'];
        if (placa.length == 0) {
            console.log(placa.length)
            //arrumar dps
            $('#tbodyListVeiculos').empty();
            setTableVeiculos(Envia({}, VEICULO_LIST_PATH, `POST`));
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
});


//================================================================================
function zerarCamposModel(listIdField) {
    // console.log(listIdField);
    for (let idAtual of listIdField) {
        campoAtual = $(idAtual);
        campoAtual.val("");
        if (idAtual === '#auxStatus') {
            campoAtual.val(false);
        }
        if (idAtual === '#auxIdVeiculo' || idAtual === '#auxIdFuncionario' || idAtual === '#up_idFunc' || idAtual === '#auxIdItem') {
            // console.log('id encontrado');
            campoAtual.val('-1');
            // console.log(campoAtual);
        }
        if (idAtual === '#auxTipoFuncionario' || idAtual === '#selectTipoFunc') {
            campoAtual.val('-1');
        }
    }
    // console.log($('auxIdFuncionario').val());
}
function zerarCampos() {

    var elements = [].slice.call(arguments);
    //console.log(elements);
    for (let element of elements) {
        // console.log(element);
        element.val("");
    }
}

function filtrarTipoFuncionario(tipoFunc) {
    //console.log(typeof tipoFunc);
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
    let teste;//= element.replace(/\s/g, '');
    for (let element of elements) {
        teste = element.val().replace(/\s/g, '');
        // console.log(element)
        // console.log(element.val())
        if (teste === "" || teste === "null") {
            // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
            // console.log(teste);
            return false;
        }
    }
    return true;
}
