function login(usuario, senha){
    const entry = {
        "username": usuario,
        "senha": senha
    };
    console.log(entry);
    Envia(entry, 'http://127.0.0.1:5000/Auth/Login', 'POST')
        .then((response)=>{
            if (response['msg'] === "login successful"){
                console.log(response)
                window.location.href = "/Funcionario"
            }
        })
        .catch((error) => {
            document.getElementById('msgError').innerText = "Usuário ou senha incorreto"
        });

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