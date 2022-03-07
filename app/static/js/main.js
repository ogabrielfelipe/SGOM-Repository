var data = new Date();
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();


$(document).ready(function () {
    $('#dataIdFiltroHome').mask('99/9999');
    $('#dataIdFiltroHome').val(mes+'/'+ano);

    $('#perfilMenu').click(() => {
        $('#menuRetratil').toggle( 'controle-menu-perfil');        
    });   

    return false;
});



function login(usuario, senha){
    const entry = {
        "username": usuario,
        "senha": senha
    };
    Envia(entry, '/', 'POST')
        .then((response)=>{
            if (response['msg']  === 'Login realizado'){
                window.location.href = "/Home"
            }
        })
        .catch((error) => {
            document.getElementById('msgError').innerText = "Usuário ou senha incorreto"
        });

}


function logout(){
    const entry = {}
    Envia(entry, '/Logout', 'DELETE')
    .then((response) => {
        if (response['msg'] === 'Logout com sucesso'){
            window.location.href = "/"
        }
    })
    .catch((error) => {
        console.log(error)
    })
}


function Envia(entry, url, method){
    return new Promise((resolve, reject)=>{
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



function Envia2(entry, url, method){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: url,
            type: method,
            data: JSON.stringify(entry),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (jqXHR, textStatus, msg) {
                resolve(jqXHR)
            },
            error: function (error) {
                reject(error)
            }
        });
    });
}

