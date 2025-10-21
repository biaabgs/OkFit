
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
	const senha = document.getElementById('passwdNewUser').value
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

	//verifica se os campos estão selecionados
	if(!email || !senha || !plano){
		alert('Por favor preencha todos os campos!')
		return
	}

	// Verifica regras de senha
	const senhaForte = const senhaComEspecial = /^(?=.*[\W_]).{8,}$/

	
	if (!senhaForte.test(senha)) {
		alert('[Senha fraca] Sua senha precisa ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
		return;
	}

	fetch('/api/registrar', {
		// Parametros que seriam inseridos no 'curl' já são inseridos aqui
		method: 'POST', // -X POST
		headers: { // -H "Content-type: application/json"
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email, senha, plano }) // -d (Aqui é pego os dados inseridos nos inputs e transformados em um body para requisição)
	})
	.then(res => res.json())
	.then(data => {

		// Constante para pegar valor informado no Modal do Bootstrap
		const modal = bootstrap.Modal.getInstance(
                document.getElementById('exampleModal')
            );

        modal.hide();
            
        document.getElementById('emailNewUser').value = ''
        document.getElementById('passwdNewUser').value = ''

		if (data.success) {
			alert('Usuário registrado com sucesso!');
		} 
		//Tratamento de erro em registrar o usuário
		else {
			alert('Erro ao registrar usuário: ' + (data.error || 'erro desconhecido'))
		}
	})

	// erro
	.catch(err => {
		console.error(err)
		alert('Erro no servidor')
	});

}

function fazerlogin() {

	//input do login
	const email = document.getElementById('email').value
	const senha = document.getElementById('senha').value

	//verificação se os nenhum campo está vazio
	if(!email || !senha){
		alert('Por favor preencha todos os campos!')
		return
	}

	fetch('/api/login', {
		// curl
		headers: { // -H "Content-type: application/json"
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email, senha}) 
	.then(res => res.json())
	.then(data => {

		if (data.success) {
			// recebe o userID do user.json
			const ID = data.usuario.ID;

			// Variaveis são armazenadas localmente, para serem vistos pelo JSON
			localStorage.setItem('ID', ID);
			localStorage.setItem('userEmail', data.usuario.email);
			localStorage.setItem('userTipo', data.usuario.plano);

			// Redireciona o aluno para a página do seu plano
			window.location.href = `/catalogo/${plano}`;
			alert('Usuario logado com sucesso!');
		} 
		//Tratamento de erro em registrar o usuário
		else {
			alert('Erro ao registrar usuário: ' + (data.error || 'erro desconhecido'))
		}
	})

	// erro
	.catch(err => {
		console.error(err)
		alert('Erro no servidor')
	});
})}
