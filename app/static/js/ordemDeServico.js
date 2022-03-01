$(document).ready(() => {
    $('#CPFR').mask('999.999.999-99')
    $('#TELR').mask('(99) 99999-9999')

    $('#downMenuPrincipal').click(() => {
        $('#downMenu').toggle('complete-nav-down');
    });

    $('[data-toggle="popover"]').popover();

    var valSelect = ''
    $('#tableBuscaPlaca #tbodyBuscaPlaca tr').click(function () {
        $('#tableBuscaPlaca #tbodyBuscaPlaca tr').removeClass('table-light');
        $(this).addClass('table-light');

        valSelect = $(this).children('th')
    });


    $('#tableBuscaPlaca #tbodyBuscaPlaca tr').dblclick(function () {
        valSelect = $(this).children('th')
        console.log(valSelect[0]['innerHTML'])
        $('#PlacaOSf').val(valSelect[0]['innerHTML']);
        $('#ModalLocalizarPlaca').modal('hide');
    });



    $('#btn-novo').click(function () {
        console.log('botão acionado');
        $('#formulario input ').val('');
        $('#formulario textarea ').val('');
        $('#formulario select ').val(0);
    });

    $('#btn-cancelar').click(function () {
        console.log('botão acionado');
        $('#formulario input ').val('');
        $('#formulario textarea ').val('');
        $('#formulario select ').val(0);
    });

    $('#btnSelecionarf').click(() => {
        $('#CampoPlacaPesquisa').val($('#placaAux').val());
        $('#PlacaOSf').val($('#placaAux').val());

    });


    //Funcionalidade de busca Veículo
    $('#btnPesquisarPlaca').click(() => {
        var placa = $('#CampoPlacaPesquisa')[0]['value'];
        if (placa.length == 0) {
            Envia({}, `/Carro/BuscaCarros`, 'POST')
                .then((data) => {
                    $('#tbodyBuscaPlaca tr').remove();
                    response = data['dados']
                    $(response).each(function () {
                        $('#tbodyBuscaPlaca').append(
                            '<tr onclick=' + "selectTablePlaca(this);" + '>' +
                            '<td id="identificador" hidden>' + this.id +
                            '</td><th id="PlacaTable" scope="row">' +
                            this.placa +
                            '</th><td>' +
                            this.telefone +
                            '</td></tr>'
                        );
                    });
                })
        } else if (placa.length < 7) {
            console.log('Placa Inválida');
        } else if (placa.length > 7) {
            console.log('Placa Inválida');
        } else {
            console.log(placa.toUpperCase())
            Envia({}, `/Carro/Busca/${placa.toUpperCase()}`, 'POST')
                .then((data) => {
                    $('#tbodyBuscaPlaca tr').remove();
                    response = data['dados']
                    $(response).each(function () {
                        $('#tbodyBuscaPlaca').append(
                            '<tr  onclick=' + "selectTablePlaca(this);" + '>' +
                            '<td id="identificador" hidden>' + this.id +
                            '</td><th id="PlacaTable" scope="row">' +
                            this.placa +
                            '</th><td>' +
                            this.telefone +
                            '</td></tr>'
                        );
                    });
                });
        }

    });
});

function selectTablePlaca(event) {
    var id = $(event).children('#identificador')[0]['innerText'];
    var placa = $(event).children('#PlacaTable')[0]['innerText'];

    $('#tableBuscaPlaca #tbodyBuscaPlaca tr').removeClass('table-light');
    $(event).addClass('table-light');


    $('#idVeiculo').val(id);
    $('#placaAux').val(placa);
}

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


function salvarOrdemDeServico() {
    var placa = document.getElementById("PlacaOSf").value;
    var nomerequerente = document.getElementById("nomeRequerente").value;
    var cpfRequerente = document.getElementById("CPFR").value;
    var telRequerente = document.getElementById("TELR").value;
    var reqOrcamento = document.getElementById("floatingSelect").value;
    var problema = document.getElementById("exampleFormControlTextarea1").value;

    if (reqOrcamento == 1) {
        reqOrcamento = true;
    } else {
        reqOrcamento = false;
    }

    var idPlaca = $('#idVeiculo').val();

    //console.log(placa)
    dados = {
        "nomeRequerente": nomerequerente,
        "cpfDoRequerente": cpfRequerente,
        "telefoneRequerente": telRequerente,
        "problema": problema,
        "requisicaoOrcamento": reqOrcamento,
        "estadoAtualDoVeiculo": "Muito Bom!",
        "carro": parseInt(idPlaca)

    }
    console.log(dados)
    Envia(dados, '/OrdemDeServico/Abertura', 'POST');

}

$('#btn-pesquisarOs').click(() => {
    var status = $('#SelectStatusOOS option:selected').val();
    var os = $('#os').val();
    var nomeRequerente = $('#nomeRequerenteOs').val();
    entry = {
        "id": os,
        "nomeRequerente": nomeRequerente,
        "status": status
    }
    Envia(entry, '/OrdemDeServico/BuscaPersonalizada', 'POST')
    .then((data) => {
        $('#tbodyBuscaPlaca tr').remove();
        response = data['dados']
        $(response).each(function () {
            $('#tbodyBuscaOs').append(
                '<tr  onclick=' + "selectTableOS(this);" + '>' +
                '<td id="identificador" hidden>' + this.id +
                '</td><th id="OsTable" scope="row">' +
                this.os +
                '</th><td>' +
                this.nomeRequerente +
                '</td></tr>' +
                this.nomePlaca +
                '</td></tr>'+
                this.nomeStatus +
                '</td></tr>'
            );
        });

    });

});

function selectTableOs(event) {
    var id = $(event).children('#identificador')[0]['innerText'];
    var placa = $(event).children('#PlacaTable')[0]['innerText'];
    var os = $(event).children('#OsTable')[0]['innerText'];
    var nomeRequerente = $(event).children('#NomeRequerenteTable')[0]['innerText'];
    var status = $(event).children('#StatusTable')[0]['innerText'];

    $('#tableBuscaPlaca #tbodyBuscaPlaca tr').removeClass('table-light');
    $(event).addClass('table-light');


    $('#osAux').val(id);
    $('#osAux').val(os);
    $('#nomeRequerenteAux').val(nomeRequerente);
    $('#PlacaAux').val(placa);
    $('#statusAux').val(status);
    
    
}