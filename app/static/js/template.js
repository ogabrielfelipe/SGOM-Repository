$(document).ready(()=>{
    $('#inp_telefoneVeiculo').mask('(99) 99999-9999');
    
    $('#CPFR').mask('999.999.999-99');
    $('#TELR').mask('(99) 99999-9999');
    $('#dataIdFiltroHome').mask('99/9999');

    $('#downMenuPrincipal').click(()=>{
        $('#downMenu').toggle('complete-nav-down');
    });

    $('[data-toggle="popover"]').popover();


    $('#btnChamaOS').click(() =>{
        $('#codigoOS').val('');
        $('#idVeiculo').val('');
        $('#placaAux').val('');
        $('#idFuncionario').val('');
        $('#FuncionarioAux').val('');
        $('#PlacaOSRelatorio').val('');
        $('#FuncionarioOSRelatorio').val('');    
    });

    $('#btnChamaFinanceiro').click (() => {
        $('#competenciaRelFinanciero').val('');
        $('#totalOS').text('');
        $('#totalCustoMesOS').text('');
        $('#totalMesOS').text('');
        $('#detailOS').text('');
    });
    
    
   //Funcionaliades dos modals Relatórios
    $('#btnSelecionarPlacaRelatorio').click(() =>{
        $('#PlacaOSRelatorio').val($('#placaAux').val());        
    });

    $('#btnSelecionarFuncionarioRelatorio').click(() =>{
        $('#FuncionarioOSRelatorio').val($('#FuncionarioAux').val());        
    });

    //Funcionalidade de busca Veículo
    $('#btnPesquisarPlacaRelOS').click(()=>{
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
        var codigo = $('#codigoOS').val();
        entry = {
            "codigo": codigo,
            "placa": placa,
            "mecanico": funcionario,
            "status": status
        }
        Envia(entry, '/OrdemDeServico/Relatorio/OrdemDeServico', 'POST')
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
                        $('#dataA').text(dadosRegistroDeServico[i]['data_alteracao']);
                    }                    
                }
                $('#custoM').text(dadosOrdemDeServico['custoMecanico']);
                $('#problema').text(dadosOrdemDeServico['problema']);
                for(var i = 0; i < dadosRegistroDeServico.length; i++){      
                    let valAuxStatus = dadosRegistroDeServico[i]['status']         
                    if (valAuxStatus === 'FINALIZADA'){   
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



    //Funcionalidades Relatório Financiero

    $('#competenciaRelFinanciero').mask('99/9999');
    $('#btnImprimirRelatorioFinanceiro').click(() => {
        var competencia = $('#competenciaRelFinanciero').val();
        if (competencia == ''){
            console.log('Competencia em Branco');
        }else {
            entry = {
                'competencia': competencia
            }
            Envia(entry, '/OrdemDeServico/Relatorio/Financeiro', 'POST')
            .then((dados) => {
                $('#totalOS').text(dados['dados']['ResumoOS'].length);

                var custoMec = 0
                var valTotal = 0
                for (var i = 0; i < dados['dados']['ResumoOS'].length; i++){
                    custoMec += dados['dados']['ResumoOS'][i]['custoMecanico'];
                }
                for (var i = 0; i < dados['dados']['ResumoOS'].length; i++){
                    valTotal += dados['dados']['ResumoOS'][i]['valorTodal'];
                }
                $('#totalCustoMesOS').text(custoMec);
                $('#totalMesOS').text(valTotal);
                var i = 0;
                var id_os_aux = 0
                $(dados['dados']['ResumoOS']).each(function(){
                    $('#detailOS').append(
                        `<div id="" style="margin: 15px; border-bottom: 1px solid black; border-style: dashed; border-left: none;border-right: none; border-top: none;">
                            <div>
                                <label for="OSID" style="font-weight: 600;" >OS: </label>
                                <span id="OSID">${this.id_os}</span>
                            </div>
                            <div>
                                <label for="PlacaOSRF" style="font-weight: 600;" >Veículo: </label>
                                
                                <span id="PlacaOSRF">${this.placa}</span>
                            </div>
                            <div>
                                <label for="CustMeca" style="font-weight: 600;" >Custo Mecânico: </label>
                                <span>R$&nbsp;</span>
                                <span id="CustMeca">${this.custoMecanico}</span>
                            </div>                     
                            <div>
                                <label for="ValTRF" style="font-weight: 600;" >Valor Total: </label>
                                <span>R$&nbsp;</span>
                                <span id="ValTRF">${this.valorTodal}</span>
                            </div>
                            <div>
                                <table style="text-align: center;">
                                    <thead>
                                        <th>&nbsp;Serviço&nbsp;</th>
                                        <th>&nbsp;Quantidade&nbsp;</th>
                                        <th>&nbsp;Valor Unitário&nbsp;</th>
                                        <th>&nbsp;Total&nbsp;</th>
                                    </thead>
                                    <tbody id="tableServicosRel${this.id_os}">                                                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>`
                    ); 
                    i+=1;
                });
                
                $(dados['dados']['ResumoServicos']).each(function(){
                    $('#tableServicosRel'+this.id_os_servicos).append(
                        `<tr>
                            <td>${this.nome}</td>
                            <td>${this.quantidade}</td>
                            <td>
                                <span>R$&nbsp;</span>
                                <span>${this.valor}</span>
                            </td><td>
                            <span>R$&nbsp;</span>
                            <span>${this.valor*this.quantidade}</span>
                        </td>
                        </tr>`                            
                    )
                });  
            });
            $('#ModalResultadoRelatorioFinanceiro').modal('show');
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
