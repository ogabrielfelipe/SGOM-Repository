function salvaFuncionario(){
    let nome = document.getElementById("nome").value;
    let username =document.getElementById("username").value;
    let senha = document.getElementById("senha").value;
    let data = document.getElementById("dataA").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let st = document.getElementById("status").value;
    let status;
    if (st.checked){
        status = true;
    }else{
        status = false;
    }

    let funcionario = document.getElementById("tFuncionario");
    const entry = {
        "nome": nome,
        "usuario": username,
        "senha": senha,
        "dataA": data,
        "cpf": cpf,
        "telefone": telefone,
        "status": status,
        "tipoFuncionario": funcionario.options[funcionario.selectedIndex].value
    };
    Envia(entry, '/Funcionario/Cadastrar', 'POST')
    .then((resposta) => {
        console.log(resposta);
        carregaTable();
    })
    .catch((error) => {
        console.log(error)
    });

}



function carregaTable(){
    Envia('', '/Funcionario/BuscaFuncionaios', 'POST')
    .then((resposta) => {
        $('#tableFuncTbody tr').remove();
        $(resposta['dados']).each( function(){

            let situacao = ''
            if (this.status == true){
                situacao = "Ativo";
            }else{
                situacao = "Inativo";
            }

            let dataAtual = new Date(this.dataDeAdmissao);
            let dataAtualFormatada = (adicionaZero(dataAtual.getDate().toString()) + "/" + (adicionaZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear());

            $('#tableFuncTbody').append(
                '<tr><td>'+
                        this.id +
                '</td><td>' +
                        this.nome +
                '</td><td>'+
                        this.cpf +
                '</td><td>' +
                        dataAtualFormatada +
                '</td><td>' +
                        situacao +
                '</td></tr>'
            );            
        });        
    })
    .catch((error) => {
        console.log(error)
    });    
}

function adicionaZero(numero){
    if (numero <= 9) 
        return "0" + numero;
    else
        return numero; 
}