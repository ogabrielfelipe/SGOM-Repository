$(document).ready(function (){
    competenciaHome = $('#dataIdFiltroHome').val()
    atualizaHome(competenciaHome);

    $('#btn_filtro_home').click(() =>{
        competenciaHome = $('#dataIdFiltroHome').val()
        atualizaHome(competenciaHome);
    });

});

function chamaModal(event){
    competenciaHome = $('#dataIdFiltroHome').val()

    if (event.id == 'aguardando_aprovacao_dashboard') {
        atualizaTableHome(competenciaHome, 'AGUARDANDOAPROVACAO')
        $('#title_Model_Home').text('Ordens de Serviço Aguardando Aprovação')

    }else if (event.id == 'finalizadas_dashboard'){
        $('#title_Model_Home').text('Ordens de Serviço Finalizadas')
        atualizaTableHome(competenciaHome, 'FINALIZADA')

    }else if (event.id == 'aguardando_atendimento_dashboard'){
        $('#title_Model_Home').text('Ordens de Serviço Aguardando Atendimento')
        atualizaTableHome(competenciaHome, 'EMABERTO')

    }else if (event.id == 'aguardando_pagamento_dashboard'){
        $('#title_Model_Home').text('Ordens de Serviço Aguardando pagamento')
        atualizaTableHome(competenciaHome, 'AGUARDANDOPAGAMENTO')

    }else if (event.id == 'aceita_dashboard'){
        $('#title_Model_Home').text('Ordens de Serviço Aceitas')
        atualizaTableHome(competenciaHome, 'ACEITA')

    }else if (event.id == 'aprovadas_dashboard'){
        $('#title_Model_Home').text('Ordens de Serviço Aprovadas')
        atualizaTableHome(competenciaHome, 'APROVADA')

    }else if (event.id == 'ematendimento_dashboard'){
        $('#title_Model_Home').text('Ordens de Serviço Em Atendimento')
        atualizaTableHome(competenciaHome, 'EMATENDIMENTO')

    }else if (event.id == 'canceladas_dashboard'){
        $('#title_Model_Home').text('Ordens de Serviço Canceladas')
        atualizaTableHome(competenciaHome, 'CANCELADO')

    }



    $('#modal_dashboard').modal('show');

    


}

function atualizaTableHome(competencia, status){
    entry = {
        "competencia": competencia,
        "status": status
    }
    Envia(entry, '/OrdemDeServico/Home/BuscaOS', 'POST')
    .then((dados) => {
        
        $('#tbodyBuscaDadosHome tr').remove();  
        $(dados).each(function (){
            $('#tbodyBuscaDadosHome').append(
                '<tr><td>'+ 
                    this.id+
                '</td><td>'+
                    this.placa+
                '</td><td>'+
                    this.nomeRequerente +
                '</td><td>'+
                    this.telefoneRequerente +
                '</td><td>'+
                    '<button class="btn btn-secondary" onclick="abreOS('+this.id+');">'+
                    'Abrir'+
                    '</button>'+
                '</td></tr>'
            );
        });
    });
}

function abreOS(id){
    window.location.href = '/OrdemDeServico?OS='+id
}


function atualizaHome(competencia){
    entry = {
        "competencia": competencia 
    }
    Envia(entry, '/OrdemDeServico/Home/Totais', 'POST')
    .then((dados) => {
        if (dados.length == 0){
            $('#cont_finalizadas').text('0');
            $('#cont_aguardando_atendimento').text('0');
            $('#cont_aguardando_aprovacao').text('0');
            $('#cont_aguardando_pagamento').text('0');
            $('#cont_aceita').text('0');
            $('#cont_aprovadas').text('0');
            $('#cont_ematendimento').text('0');
            $('#cont_canceladas').text('0');
        }else{
            $(dados).each(function(){
                if (this.status_os == 'FINALIZADA'){
                    $('#cont_finalizadas').text(this.total_os);
                }
                if (this.status_os == 'EMABERTO'){
                    $('#cont_aguardando_atendimento').text(this.total_os);
                }
                if (this.status_os == 'AGUARDANDOAPROVACAO'){
                    $('#cont_aguardando_aprovacao').text(this.total_os);
                }
                if (this.status_os == 'AGUARDANDOPAGAMENTO'){
                    $('#cont_aguardando_pagamento').text(this.total_os);
                }
                if (this.status_os == 'ACEITA'){
                    $('#cont_aceita').text(this.total_os);
                }
                if (this.status_os == 'APROVADA'){
                    $('#cont_aprovadas').text(this.total_os);
                }
                if (this.status_os == 'EMATENDIMENTO'){
                    $('#cont_ematendimento').text(this.total_os);
                }
                if (this.status_os == 'CANCELADO'){
                    $('#cont_canceladas').text(this.total_os);
                }
            });

        }        
    });
}