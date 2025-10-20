window.onload = function () {
    buscarinfo();
};

function buscarinfo() {

fetch('/api/info')
.then(res => res.json)
.then(data => {
    console.log(data)
    if(data.ok){
        alert(data.mensagem)
        alert(data.informacoes)
    }
})
}