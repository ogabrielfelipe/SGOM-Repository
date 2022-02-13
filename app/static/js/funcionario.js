function logout(){
    const entry = {}
    Envia(entry, '/Auth/Logout', 'DELETE')
    .then((response) => {
        if (response['msg'] === 'Logout com sucesso'){
            window.location.href = "/Auth/Login"
        }
    })
    .catch((error) => {
        console.log(error)
    })
}