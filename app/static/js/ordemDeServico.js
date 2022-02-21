var div = document.getElementById('buscar-veiculo');
var btn = document.createElement('button');
btn.setAttribute('style', 'background: white');
btn.innerText = 'teste';
console.log(div);
console.log(btn);
div.appendChild(btn);

function buscarVeiculo() {
    var opc = 0;
    if (opc == 0) {
        btn.setAttribute('style', 'display:none');
    }
    if (opc == 1) {
        btn.setAttribute('style', 'display:block');
    }
}

buscarVeiculo();
