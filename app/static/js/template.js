$(document).ready(()=>{
    $('#CPFR').mask('999.999.999-99');
    $('#TELR').mask('(99) 99999-9999');
    $('#dataIdFiltroHome').mask('99/9999');

    $('#downMenuPrincipal').click(()=>{
        $('#downMenu').toggle('complete-nav-down');
    });

    $('[data-toggle="popover"]').popover();

    var valSelect = ''
    $('#tableBuscaPlaca #tbodyBuscaPlaca tr').click(function(){
      $('#tableBuscaPlaca #tbodyBuscaPlaca tr').removeClass('table-light');
      $(this).addClass('table-light');    
      
      valSelect = $(this).children('th')  
    });
   

    $('#tableBuscaPlaca #tbodyBuscaPlaca tr').dblclick(function(){
        valSelect = $(this).children('th')
        console.log(valSelect[0]['innerHTML'])
        $('#PlacaOS').val(valSelect[0]['innerHTML']);
        $('#ModalLocalizarPlaca').modal('hide');
    });

    $('#btnSelecionar').click(() =>{           
        console.log("Valor: ", valSelect)
        $('#PlacaOS').val(valSelect[0]['innerHTML']);        
    });

});

    $('#btnChamaOS').click(() =>{
        $('#idVeiculo').val('');
        $('#placaAux').val('');
        $('#idFuncionario').val('');
        $('#FuncionarioAux').val('');
        $('#PlacaOSRelatorio').val('');
        $('#FuncionarioOSRelatorio').val('');    
    })

    
   //Funcionaliades dos modals Relatórios
    $('#btnSelecionarPlacaRelatorio').click(() =>{
        $('#PlacaOSRelatorio').val($('#placaAux').val());        
    });

    $('#btnSelecionarFuncionarioRelatorio').click(() =>{
        $('#FuncionarioOSRelatorio').val($('#FuncionarioAux').val());        
    });

    //Funcionalidade de busca Veículo
    $('#btnPesquisarPlaca').click(()=>{
        var placa = $('#CampoPlacaPesquisa')[0]['value'];
        if (placa.length == 0){
            Envia({},`/Carro/BuscaCarros`, 'POST')
            .then((data)=>{
                $('#tbodyBuscaPlacaRelatorio tr').remove();
                response = data['dados']
                $(response).each( function(){                    
                    $('#tbodyBuscaPlacaRelatorio').append(
                        '<tr onclick='+"selectTablePlaca(this);"+'>' +
                                '<td id="identificador" hidden>'+ this.id +
                        '</td><th id="PlacaTable" scope="row">'+
                                this.placa +
                        '</th><td>'+
                                this.telefone +
                        '</td></tr>'
                    );
                });
            })
        } else if (placa.length < 7){
            console.log('Placa Inválida');
        }else if(placa.length > 7){
            console.log('Placa Inválida');
        }else{
            console.log(placa.toUpperCase())
            Envia({},`/Carro/Busca/${placa.toUpperCase()}`, 'POST')
            .then((data)=>{
                $('#tbodyBuscaPlacaRelatorio tr').remove();
                response = data['dados']
                $(response).each( function(){                    
                    $('#tbodyBuscaPlacaRelatorio').append(
                        '<tr  onclick='+"selectTablePlaca(this);"+'>' +
                                '<td id="identificador" hidden>'+ this.id +
                        '</td><th id="PlacaTable" scope="row">'+
                                this.placa +
                        '</th><td>'+
                                this.telefone +
                        '</td></tr>'
                    );
                });
            });
        }
        
    });

    //Funcionalidade de BuscarFuncionário
    $('#btnPesquisarFuncionario').click(() => {
        var usuario = $('#CampoFuncionarioPesquisa').val();
        if (usuario.length == 0){
            Envia({}, `/Funcionario/BuscaFuncionaios`, 'POST')
            .then((dados)=> {
                $('#tbodyBuscaFuncionarioRelatorio tr').remove();
                
                console.log(dados);
                response = dados['dados'];
                console.log(response);
                $(response).each( function(){                    
                    $('#tbodyBuscaFuncionarioRelatorio').append(
                        '<tr onclick='+"selectTableFuncionario(this);"+'>' +
                                '<td id="identificador">'+ this.id +
                        '</td><th scope="row">'+
                                this.usuario +
                        '</th><td id="FuncionarioTable" >'+
                                this.nome +
                        '</td></tr>'
                    );
                });
            });
        }else {
            Envia({}, `/Funcionario/BuscaUsername/${usuario}`, 'POST')
            .then((dados)=> {
                $('#tbodyBuscaFuncionarioRelatorio tr').remove();
                console.log(dados);
                response = dados['dados'];
                console.log(response);
                $(response).each( function(){                    
                    $('#tbodyBuscaFuncionarioRelatorio').append(
                        '<tr onclick='+"selectTableFuncionario(this);"+'>' +
                                '<td id="identificador">'+ this.id +
                        '</td><th scope="row">'+
                                this.usuario +
                        '</th><td id="FuncionarioTable" >'+
                                this.nome +
                        '</td></tr>'
                    );
                });
            });
        }    
    });


    //Funcionalidade de Imprimir Relatório OS
    $('#btnImprimirOSRelatorio').click(() => {
        var status = $('#SelectStatusOS option:selected').val();
        var placa = $('#idVeiculo').val();
        var funcionario = $('#idFuncionario').val();
        entry = {
            "placa": placa,
            "mecanico": funcionario,
            "status": status
        }
        Envia(entry, '/OrdemDeServico/Relatorio', 'POST')
        .then((dados) => {
            dadosOrdemDeServico = dados['dados']['OrdemDeServico']
            dadosRegistroDeServico = dados['dados']['RegistroOS']
            dadosServicos = dados['dados']['Servicos']
            if (dadosOrdemDeServico === {} || dadosRegistroDeServico === []){
                console.log('Nenhum dado encontrado')
            }else{
                $('#NOS').text('');
                $('#nomeR').text('');
                $('#cpfR').text('');                
                $('#telR').text('');            
                $('#placaCarroRel').text('');        
                $('#telPlacaRel').text('');                           
                $('#dataA').text('');
                $('#custoM').text('');
                $('#problema').text('');
                $('#dataF').text('');
                $('#valT').text('');
                $('#mecanicoRel').text('');

                $('#NOS').text(dadosOrdemDeServico['id']);
                $('#nomeR').text(dadosOrdemDeServico['nomeRequerente']);
                $('#cpfR').text(dadosOrdemDeServico['cpfDoRequerente']);                
                $('#telR').text(dadosOrdemDeServico['telefoneRequerente']);            
                $('#placaCarroRel').text(dadosOrdemDeServico['placa_veiculo']);        
                $('#telPlacaRel').text(dadosOrdemDeServico['telefone_veiculo']);       
                $('#mecanicoRel').text(dadosOrdemDeServico['mecanico']);                
                for(var i = 0; i < dadosRegistroDeServico.length; i++){      
                    let valAuxStatus = dadosRegistroDeServico[i]['status']  
                    if (valAuxStatus === 'EMABERTO'){     
                        console.log(dadosRegistroDeServico[i]['data_alteracao'])                          
                        $('#dataA').text(dadosRegistroDeServico[i]['data_alteracao']);
                    }                    
                }
                $('#custoM').text(dadosOrdemDeServico['custoMecanico']);
                $('#problema').text(dadosOrdemDeServico['problema']);
                for(var i = 0; i < dadosRegistroDeServico.length; i++){      
                    let valAuxStatus = dadosRegistroDeServico[i]['status']         
                    if (valAuxStatus === 'FINALIZADA'){   
                        console.log(dadosRegistroDeServico[i]['data_alteracao'])
                        $('#dataF').text(dadosRegistroDeServico[i]['data_alteracao']);   
                    }                    
                }


                $('#tbodytableRelServicos tr').remove();                
                $(dadosServicos).each( function(){                    
                    $('#tbodytableRelServicos').append(
                        '<tr><td>'+ 
                            this.nome_item+
                        '</td><td>'+
                            this.quant_item+
                        '</td><td>'+
                            this.valor_item +
                        '</td><td>'+
                            this.valor_item*this.quant_item +
                        '</td></tr>'
                    );
                });
                $('#valT').text(dadosOrdemDeServico['valorTodal']);
                $('#ModalResultadoRelatorioOs').modal('show');
            }
        });
    });




function selectTablePlaca(event){
    var id = $(event).children('#identificador')[0]['innerText'];
    var placa = $(event).children('#PlacaTable')[0]['innerText'];

    $('#tableBuscaPlacaRelatorio #tbodyBuscaPlacaRelatorio tr').removeClass('table-light');
    $(event).addClass('table-light');


    $('#idVeiculo').val(id);
    $('#placaAux').val(placa);
}

function selectTableFuncionario(event){
    var id = $(event).children('#identificador')[0]['innerText'];
    var funcionario = $(event).children('#FuncionarioTable')[0]['innerText'];

    $('#tableBuscaFuncionarioRelatorio #tbodyBuscaFuncionarioRelatorio tr').removeClass('table-light');
    $(event).addClass('table-light');


    $('#idFuncionario').val(id);
    $('#FuncionarioAux').val(funcionario);
}
