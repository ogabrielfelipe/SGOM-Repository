var estadoAtualDoVeiculoOs;

$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    var IdOS_Home = urlParams.get('OS');
    console.log(IdOS_Home);

    // função carrega OS da HOME
    entry = {
        "id": IdOS_Home,
        "nomeRequerente": '',
        "status": ''
    }

    if (IdOS_Home != null) {
        Envia(entry, '/OrdemDeServico/BuscaPersonalizada', 'POST')
            .then((data) => {
                response = data['dados']
                console.log(response[0]['status'])
                if (response[0]['status'] == "EMABERTO") {
                    Envia({}, '/OrdemDeServico/Aceita/' + response[0]['id_os'], 'POST');
                }
                console.log(response[0])
                document.getElementById("PlacaOSf").value = response[0]['carro']
                document.querySelector("#PlacaOSf").disabled = true;
                document.getElementById("nomeRequerente").value = response[0]['nomeRequerente']
                document.querySelector("#nomeRequerente").disabled = true;
                document.getElementById("CPFR").value = response[0]['cpfDoRequerente']
                document.querySelector("#CPFR").disabled = true;
                document.getElementById("TELR").value = response[0]['telefoneRequerente']
                document.querySelector("#TELR").disabled = true;
                document.getElementById("floatingSelect").value = response[0]['requisicaoOrcamento']
                document.querySelector("#floatingSelect").disabled = true;
                document.getElementById("exampleFormControlTextarea1").value = response[0]['problema']
                document.querySelector("#exampleFormControlTextarea1").disabled = true;
                document.querySelector("#btn-salvar").disabled = true;

                var statusOs = response[0]['status'];

                console.log(response[0]['status'])
                var auxa = {
                    "id": response[0]['id_os'],
                    "nomeRequerente": '',
                    "status": ''
                }
                Envia(auxa, 'OrdemDeServico/BuscaPersonalizada', 'POST')
                    .then((data_aceita) => {
                        console.log(data_aceita['dados'][0]['status'])
                        if (data_aceita['dados'][0]['status'] == "ACEITA") {
                            document.getElementById("btnFazerOrcamento").style.visibility = "visible";
                            document.getElementById("custoMecanico").style.visibility = "visible";
                            document.querySelector("#exampleFormControlTextarea1").disabled = false;
                            document.querySelector("#btn-salvar").disabled = false;
                        }
                    });
                console.log(statusOs)



                var dadosEstado = response[0]['estadoAtualDoVeiculo'];
                console.log(dadosEstado)
                var dadosEstadoJ = JSON.parse(dadosEstado);
                console.log(dadosEstadoJ)

                document.getElementById("pinturaEstado").value = dadosEstadoJ[0]['estado']
                document.getElementById("pinturaObs").value = dadosEstadoJ[0]['obs']

                document.getElementById("latariaEstado").value = dadosEstadoJ[1]['estado']
                document.getElementById("latariaObs").value = dadosEstadoJ[1]['obs']

                document.getElementById("pneuEstado").value = dadosEstadoJ[2]['estado']
                document.getElementById("pneuObs").value = dadosEstadoJ[2]['obs']

                document.getElementById("vidroEstado").value = dadosEstadoJ[3]['estado']
                document.getElementById("vidroObs").value = dadosEstadoJ[3]['obs']

                document.getElementById("parachoqueEstado").value = dadosEstadoJ[4]['estado']
                document.getElementById("parachoqueObs").value = dadosEstadoJ[4]['obs']

                document.getElementById("lanternaEstado").value = dadosEstadoJ[5]['estado']
                document.getElementById("lanternaObs").value = dadosEstadoJ[5]['obs']

                document.getElementById("interiorEstado").value = dadosEstadoJ[6]['estado']
                document.getElementById("interiorObs").value = dadosEstadoJ[6]['obs']

                document.getElementById("funcionamentoEstado").value = dadosEstadoJ[7]['estado']
                document.getElementById("funcionamentoObs").value = dadosEstadoJ[7]['obs']
                //
                // disabled estado veiculo
                //
                document.getElementById("pinturaEstado").disabled = true;
                document.getElementById("pinturaObs").disabled = true;

                document.getElementById("latariaEstado").disabled = true;
                document.getElementById("latariaObs").disabled = true;

                document.getElementById("pneuEstado").disabled = true;
                document.getElementById("pneuObs").disabled = true;

                document.getElementById("vidroEstado").disabled = true;
                document.getElementById("vidroObs").disabled = true;

                document.getElementById("parachoqueEstado").disabled = true;
                document.getElementById("parachoqueObs").disabled = true;

                document.getElementById("lanternaEstado").disabled = true;
                document.getElementById("lanternaObs").disabled = true;

                document.getElementById("interiorEstado").disabled = true;
                document.getElementById("interiorObs").disabled = true;

                document.getElementById("funcionamentoEstado").disabled = true;
                document.getElementById("funcionamentoObs").disabled = true;
            });


    }

    document.querySelector("#button-addon2").disabled = true;
    document.querySelector("#PlacaOSf").disabled = true;

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
        document.getElementById("btnFazerOrcamento").style.visibility = "hidden";
        document.getElementById("custoMecanico").style.visibility = "hidden";

        IdOS_Home = null;
        console.log('botão acionado');
        $('#formulario input ').val('');
        $('#formulario textarea ').val('');
        $('#formulario select ').val(0);
        document.querySelector("#button-addon2").disabled = false;
        document.querySelector("#nomeRequerente").disabled = false;
        document.querySelector("#CPFR").disabled = false;
        document.querySelector("#TELR").disabled = false;
        document.querySelector("#floatingSelect").disabled = false;
        document.querySelector("#exampleFormControlTextarea1").disabled = false;
        document.querySelector("#btn-salvar").disabled = false;

        // cancelar disabled

        document.getElementById("pinturaEstado").disabled = false;
        document.getElementById("pinturaObs").disabled = false;

        document.getElementById("latariaEstado").disabled = false;
        document.getElementById("latariaObs").disabled = false;

        document.getElementById("pneuEstado").disabled = false;
        document.getElementById("pneuObs").disabled = false;

        document.getElementById("vidroEstado").disabled = false;
        document.getElementById("vidroObs").disabled = false;

        document.getElementById("parachoqueEstado").disabled = false;
        document.getElementById("parachoqueObs").disabled = false;

        document.getElementById("lanternaEstado").disabled = false;
        document.getElementById("lanternaObs").disabled = false;

        document.getElementById("interiorEstado").disabled = false;
        document.getElementById("interiorObs").disabled = false;

        document.getElementById("funcionamentoEstado").disabled = false;
        document.getElementById("funcionamentoObs").disabled = false;

        // limpar estado do veiculo

        document.getElementById("pinturaEstado").value = "EXCELENTE";
        document.getElementById("pinturaObs").value = "";

        document.getElementById("latariaEstado").value = "EXCELENTE";
        document.getElementById("latariaObs").value = "";

        document.getElementById("pneuEstado").value = "EXCELENTE";
        document.getElementById("pneuObs").value = "";

        document.getElementById("vidroEstado").value = "EXCELENTE";
        document.getElementById("vidroObs").value = "";

        document.getElementById("parachoqueEstado").value = "EXCELENTE";
        document.getElementById("parachoqueObs").value = "";

        document.getElementById("lanternaEstado").value = "EXCELENTE";
        document.getElementById("lanternaObs").value = "";

        document.getElementById("interiorEstado").value = "EXCELENTE";
        document.getElementById("interiorObs").value = "";

        document.getElementById("funcionamentoEstado").value = "EXCELENTE";
        document.getElementById("funcionamentoObs").value = "";

    });

    $('#btn-cancelar').click(function () {
        document.getElementById("btnFazerOrcamento").style.visibility = "hidden";
        document.getElementById("custoMecanico").style.visibility = "hidden";
        IdOS_Home = null;
        console.log('botão acionado');
        $('#formulario input ').val('');
        $('#formulario textarea ').val('');
        $('#formulario select ').val(0);
        document.querySelector("#button-addon2").disabled = false;
        document.querySelector("#nomeRequerente").disabled = false;
        document.querySelector("#CPFR").disabled = false;
        document.querySelector("#TELR").disabled = false;
        document.querySelector("#floatingSelect").disabled = false;
        document.querySelector("#exampleFormControlTextarea1").disabled = false;
        document.querySelector("#btn-salvar").disabled = false;
        
        // cancelar disabled

        document.getElementById("pinturaEstado").disabled = false;
        document.getElementById("pinturaObs").disabled = false;

        document.getElementById("latariaEstado").disabled = false;
        document.getElementById("latariaObs").disabled = false;

        document.getElementById("pneuEstado").disabled = false;
        document.getElementById("pneuObs").disabled = false;

        document.getElementById("vidroEstado").disabled = false;
        document.getElementById("vidroObs").disabled = false;

        document.getElementById("parachoqueEstado").disabled = false;
        document.getElementById("parachoqueObs").disabled = false;

        document.getElementById("lanternaEstado").disabled = false;
        document.getElementById("lanternaObs").disabled = false;

        document.getElementById("interiorEstado").disabled = false;
        document.getElementById("interiorObs").disabled = false;

        document.getElementById("funcionamentoEstado").disabled = false;
        document.getElementById("funcionamentoObs").disabled = false;
        
        // limpar estado do veiculo

        document.getElementById("pinturaEstado").value = "EXCELENTE";
        document.getElementById("pinturaObs").value = "";

        document.getElementById("latariaEstado").value = "EXCELENTE";
        document.getElementById("latariaObs").value = "";

        document.getElementById("pneuEstado").value = "EXCELENTE";
        document.getElementById("pneuObs").value = "";

        document.getElementById("vidroEstado").value = "EXCELENTE";
        document.getElementById("vidroObs").value = "";

        document.getElementById("parachoqueEstado").value = "EXCELENTE";
        document.getElementById("parachoqueObs").value = "";

        document.getElementById("lanternaEstado").value = "EXCELENTE";
        document.getElementById("lanternaObs").value = "";

        document.getElementById("interiorEstado").value = "EXCELENTE";
        document.getElementById("interiorObs").value = "";

        document.getElementById("funcionamentoEstado").value = "EXCELENTE";
        document.getElementById("funcionamentoObs").value = "";
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

    $('#btnFazerOrcamento').click(function () {

        Envia({}, '/ItemOrcamento/BuscarTodos', 'POST')
            .then((dados) => {
                $('#selectItemValor option').remove();
                $(dados['dados']).each(function () {
                    $('#selectItemValor').append(
                        ' <option class="bg-dark text-white" value="' + this.id + '">' + this.nome + '</option>'
                    )
                })
            })

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

    if(IdOS_Home == null){  //USAR UM HIDEN NO HTML PARA SALVAR O VALOR DO ID

        dados = {
            "nomeRequerente": nomerequerente,
            "cpfDoRequerente": cpfRequerente,
            "telefoneRequerente": telRequerente,
            "problema": problema,
            "requisicaoOrcamento": reqOrcamento,
            "estadoAtualDoVeiculo": estadoAtualDoVeiculoOs,
            "carro": parseInt(idPlaca)

        }
        console.log(dados)

        EnviaOrdemDeServico(dados, '/OrdemDeServico/Abertura', 'POST')

    } else{
        entry = {
            "id": IdOS_Home,
            "nomeRequerente": '',
            "status": ''
        }

        Envia(entry, '/OrdemDeServico/BuscaPersonalizada', 'POST')
            .then((data) => {
                response = data['dados']
                var statusAtual = response[0]['status']
                switch (statusAtual) {
                    case 'ACEITA':
                        dados = {   //PREENCHER E REALOCAR
                            "problema": '',
                            "quant_item": '',
                            "custoMecanico": ''
                        }
                        EnviaOrdemDeServico(dados, '/OrdemDeServico/Alterar/' + response[0]['id_os'], 'POST');

                        //
                        // Função que muda o status da OS:
                        //
                        
                        //Envia({}, '/OrdemDeServico/RegistraOrcamento/' + response[0]['id_os'], 'POST');
                        break;

                    case 'AGUARDANDOAPROVACAO':
                        dados = {
                            
                        }
                        EnviaOrdemDeServico(dados, '/OrdemDeServico/Alterar/' + response[0]['id_os'], 'POST');
                        
                        //
                        // Função que muda o status da OS:
                        //
                        
                        //Envia({}, '/OrdemDeServico/Avaliar/' + response[0]['id_os'], 'POST');
                        break;

                    case 'APROVADA':
                        dados = {
                            
                        }
                        EnviaOrdemDeServico(dados, '/OrdemDeServico/Alterar/' + response[0]['id_os'], 'POST');
                        
                        //
                        // Função que muda o status da OS:
                        //
                        
                        //Envia({}, '/OrdemDeServico/Atender/' + response[0]['id_os'], 'POST');
                        break;

                    case 'EMATENDIMENTO':
                        dados = {
                            
                        }
                        EnviaOrdemDeServico(dados, '/OrdemDeServico/Alterar/' + response[0]['id_os'], 'POST');
                        
                        //
                        // Função que muda o status da OS:
                        //
                        
                        //Envia({}, '/OrdemDeServico/Concluir/' + response[0]['id_os'], 'POST');
                        break;

                    case 'AGUARDANDOPAGAMENTO':
                        dados = {
                            
                        }
                        EnviaOrdemDeServico(dados, '/OrdemDeServico/Alterar/' + response[0]['id_os'], 'POST');
                        
                        //
                        // Função que muda o status da OS:
                        //
                        
                        //Envia({}, '/OrdemDeServico/Finalizar/' + response[0]['id_os'], 'POST');
                        break;

                    default:
                        console.log('Status da OS no switch case do botão Salvar: ' + statusAtual);
                }
            });
    }
}

$('#btn_pesquisarOs').click(() => {
    console.log("cloquei")
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
            $('#tbodyBuscaOs tr').remove();
            response = data['dados']
            $(response).each(function () {
                $('#tbodyBuscaOs').append(
                    '<tr  onclick=' + "selectTableOs(this);" + '>' +
                    '<td id="identificador" >' + this.id_os +
                    '</td><td>' +
                    this.nomeRequerente +
                    '</td><td>' +
                    this.carro +
                    '</td><td>' +
                    this.status +
                    '</td></tr>'
                );
            });

        });

});

function selectTableOs(event) {

    $('#tableBuscaOs #tbodyBuscaOs tr').removeClass('table-light');
    $(event).addClass('table-light');


    var id = $(event).children('#identificador')[0]['innerText'];
    $('#osAux').val(id);


}

$('#btnSelecionarOs').click(() => {
    var id = $('#osAux').val();
    console.log(id)

    entry = {
        "id": parseInt(id),
        "nomeRequerente": '',
        "status": ''
    }
    Envia(entry, '/OrdemDeServico/BuscaPersonalizada', 'POST')
        .then((data) => {
            response = data['dados']
            console.log(response[0])
            document.getElementById("PlacaOSf").value = response[0]['carro']
            document.querySelector("#PlacaOSf").disabled = true;
            document.getElementById("nomeRequerente").value = response[0]['nomeRequerente']
            document.querySelector("#nomeRequerente").disabled = true;
            document.getElementById("CPFR").value = response[0]['cpfDoRequerente']
            document.querySelector("#CPFR").disabled = true;
            document.getElementById("TELR").value = response[0]['telefoneRequerente']
            document.querySelector("#TELR").disabled = true;
            document.getElementById("floatingSelect").value = response[0]['requisicaoOrcamento']
            document.querySelector("#floatingSelect").disabled = true;
            document.getElementById("exampleFormControlTextarea1").value = response[0]['problema']
            document.querySelector("#exampleFormControlTextarea1").disabled = true;
            document.querySelector("#btn-salvar").disabled = true;

            var dadosEstado = response[0]['estadoAtualDoVeiculo'];
            console.log(dadosEstado)
            var dadosEstadoJ = JSON.parse(dadosEstado);
            console.log(dadosEstadoJ)

            document.getElementById("pinturaEstado").value = dadosEstadoJ[0]['estado']
            document.getElementById("pinturaObs").value = dadosEstadoJ[0]['obs']

            document.getElementById("latariaEstado").value = dadosEstadoJ[1]['estado']
            document.getElementById("latariaObs").value = dadosEstadoJ[1]['obs']

            document.getElementById("pneuEstado").value = dadosEstadoJ[2]['estado']
            document.getElementById("pneuObs").value = dadosEstadoJ[2]['obs']

            document.getElementById("vidroEstado").value = dadosEstadoJ[3]['estado']
            document.getElementById("vidroObs").value = dadosEstadoJ[3]['obs']

            document.getElementById("parachoqueEstado").value = dadosEstadoJ[4]['estado']
            document.getElementById("parachoqueObs").value = dadosEstadoJ[4]['obs']

            document.getElementById("lanternaEstado").value = dadosEstadoJ[5]['estado']
            document.getElementById("lanternaObs").value = dadosEstadoJ[5]['obs']

            document.getElementById("interiorEstado").value = dadosEstadoJ[6]['estado']
            document.getElementById("interiorObs").value = dadosEstadoJ[6]['obs']

            document.getElementById("funcionamentoEstado").value = dadosEstadoJ[7]['estado']
            document.getElementById("funcionamentoObs").value = dadosEstadoJ[7]['obs']
            //
            // disabled estado veiculo
            //
            document.getElementById("pinturaEstado").disabled = true;
            document.getElementById("pinturaObs").disabled = true;

            document.getElementById("latariaEstado").disabled = true;
            document.getElementById("latariaObs").disabled = true;

            document.getElementById("pneuEstado").disabled = true;
            document.getElementById("pneuObs").disabled = true;

            document.getElementById("vidroEstado").disabled = true;
            document.getElementById("vidroObs").disabled = true;

            document.getElementById("parachoqueEstado").disabled = true;
            document.getElementById("parachoqueObs").disabled = true;

            document.getElementById("lanternaEstado").disabled = true;
            document.getElementById("lanternaObs").disabled = true;

            document.getElementById("interiorEstado").disabled = true;
            document.getElementById("interiorObs").disabled = true;

            document.getElementById("funcionamentoEstado").disabled = true;
            document.getElementById("funcionamentoObs").disabled = true;

            var statusOs = response[0]['status'];
            if (statusOs === "ACEITA") {
                document.getElementById("btnFazerOrcamento").style.visibility = "visible";
                document.getElementById("custoMecanico").style.visibility = "visible";
                document.querySelector("#exampleFormControlTextarea1").disabled = false;
                document.querySelector("#btn-salvar").disabled = false;
            }
        });
})


$('#btnSalvarEstado').click(() => {
    var pinturaEstado = document.getElementById("pinturaEstado").value;
    var pinturaObs = document.getElementById("pinturaObs").value;

    var latariaEstado = document.getElementById("latariaEstado").value;
    var latariaObs = document.getElementById("latariaObs").value;

    var pneuEstado = document.getElementById("pneuEstado").value;
    var pneuObs = document.getElementById("pneuObs").value;

    var vidroEstado = document.getElementById("vidroEstado").value;
    var vidroObs = document.getElementById("vidroObs").value;

    var parachoqueEstado = document.getElementById("parachoqueEstado").value;
    var parachoqueObs = document.getElementById("parachoqueObs").value;

    var lanternaEstado = document.getElementById("lanternaEstado").value;
    var lanternaObs = document.getElementById("lanternaObs").value;

    var interiorEstado = document.getElementById("interiorEstado").value;
    var interiorObs = document.getElementById("interiorObs").value;

    var funcionamentoEstado = document.getElementById("funcionamentoEstado").value;
    var funcionamentoObs = document.getElementById("funcionamentoObs").value;

    dados = [{
        "tipo": "pintura",
        "estado": pinturaEstado,
        "obs": pinturaObs
    },
    {
        "tipo": "lataria",
        "estado": latariaEstado,
        "obs": latariaObs
    },
    {
        "tipo": "pneu",
        "estado": pneuEstado,
        "obs": pneuObs
    },
    {
        "tipo": "vidro",
        "estado": vidroEstado,
        "obs": vidroObs
    },
    {
        "tipo": "parachoque",
        "estado": parachoqueEstado,
        "obs": parachoqueObs
    },
    {
        "tipo": "lanterna",
        "estado": lanternaEstado,
        "obs": lanternaObs
    },
    {
        "tipo": "interior",
        "estado": interiorEstado,
        "obs": interiorObs
    },
    {
        "tipo": "funcionamento",
        "estado": funcionamentoEstado,
        "obs": funcionamentoObs
    }
    ]
    estadoAtualDoVeiculoOs = JSON.stringify(dados);
})




function EnviaOrdemDeServico(entry, url, method){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: url,
            type: method,
            data: JSON.stringify(entry),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            statusCode:{
                201: function(){
                    $('#alerta_sucesso').css({"display": "block"});
                    $('#title_alerta').text("Sucesso");              
                    $('#body_alerta').text("Executado com sucesso!");
                    
                    $('.toast').toast('show');
                },
                200: function(){
                    $('#alerta_sucesso').css({"display": "block"});
                    $('#title_alerta').text("Sucesso");              
                    $('#body_alerta').text("Executado com sucesso!");
                    
                    $('.toast').toast('show');
                },
                401: function(){
                    $('#alerta_advertencia').css({"display": "block"});
                    $('#title_alerta').text("Atenção");              
                    $('#body_alerta').text("Não foi possível concluir a requisição");
                    
                    $('.toast').toast('show');
                },
                500: function(){
                    $('#alerta_error').css({"display": "block"});
                    $('#title_alerta').text("Erro ");              
                    $('#body_alerta').text("Não foi possível Salvar o registro");
                    
                    $('.toast').toast('show');
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
