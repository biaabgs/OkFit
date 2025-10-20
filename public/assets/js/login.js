
window.onload =  async function () {
    await loginAuto();
};

function loginAuto(){
	const userID = localStorage.getItem('ID');

	if (userID){
		location.href = "/index"
	}
}

function registrarUsuario() {

    //criação das constantes de input e radio(tipo de plano)
    const email = document.getElementById('emailNewUser').value
	const passwd = document.getElementById('passwdNewUser').value
	const presencial = document.getElementById('presencial').checked
	const hibrido = document.getElementById('hibrido').checked
    const online = document.getElementById('online').checked

    // mantem radio inativo, esperando ser selecionado
	let plano = false

    //verifica qual radio está selecionado e consequentemente o tipo de plano
    if (presencial) {
		plano = 'presencial'
	}
    if (hibrido) {
		plano = 'hibrido'
	}
    if (online) {
		plano = 'online'
	}
}
