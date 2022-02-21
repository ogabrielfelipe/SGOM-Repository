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
    Envia(entry, '/Auth/Logout', 'DELETE')
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