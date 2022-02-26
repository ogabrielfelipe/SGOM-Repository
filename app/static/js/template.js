$(document).ready(()=>{
    $('#CPFR').mask('999.999.999-99')
    $('#TELR').mask('(99) 99999-9999')

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