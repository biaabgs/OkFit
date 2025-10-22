
window.onload = async function () {
	await loginAuto();
};

function loginAuto() {
	const ID = localStorage.getItem('ID');

	if (ID) {
		location.href = "/index"
	}
}

function sim() {
	alert("ta funcionando")
}

function registrarNovoUsuario() {

	//criação das constantes de input e radio(tipo de plano)
	const nome = document.getElementById('nomeNewUser').value
	const email = document.getElementById('emailNewUser').value
	const senha = document.getElementById('senhaNewUser').value
	const telefone = document.getElementById('telefoneNewUser').value
	const datanasc = document.getElementById('datanascNewUser').value
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
	if (!email || !senha || !plano) {
		alert('Por favor preencha todos os campos!')
		return
	}

	// Verifica regras de senha
	const senhaForte = /^(?=.*[\W_]).{8,}$/


	if (!senhaForte.test(senha)) {
		alert('Sua senha precisa ter pelo menos 8 caracteres e um caracter especial.');
		return;
	}

	fetch('/api/registrar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email, senha, telefone, datanasc, plano })
})
.then(res => {
    if (!res.ok) {
        throw new Error(`Erro HTTP! Status: ${res.status}`);
    }
    return res.text(); // Pegamos o texto da resposta para analisar melhor
})
.then(text => {
    // Caso a resposta seja vazia, devolvemos objeto vazio
    const data = text ? JSON.parse(text) : {};
    
    // Fechar modal e limpar inputs
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
    
    document.getElementById('nomeNewUser').value = '';
    document.getElementById('emailNewUser').value = '';
    document.getElementById('senhaNewUser').value = '';
    document.getElementById('telefoneNewUser').value = '';
    document.getElementById('datanascNewUser').value = '';

    if (data.success) {
        alert('Usuário registrado com sucesso!');
    } else {
        alert('Erro ao registrar usuário: ' + (data.error || 'erro desconhecido'));
    }
})
.catch(err => {
    console.error(err);
    alert('Erro no servidor');
});

	// fetch('/api/registrar', {
	// 	// Parametros que seriam inseridos no 'curl' já são inseridos aqui
	// 	method: 'POST', // -X POST
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({ nome, email, senha, telefone, datanasc, plano}) // -d (Aqui é pego os dados inseridos nos inputs e transformados em um body para requisição)
	// })
	// 	.then(res => res.json())
	// 	.then(data => {

	// 		// Constante para pegar valor informado no Modal do Bootstrap
	// 		const modal = bootstrap.Modal.getInstance(
	// 			document.getElementById('exampleModal')
	// 		);

	// 		modal.hide();
	// 		document.getElementById('nomeNewUser').value = ''
	// 		document.getElementById('emailNewUser').value = ''
	// 		document.getElementById('passwdNewUser').value = ''
	// 		document.getElementById('telefoneNewUser').value = ''
	// 		document.getElementById('datanascNewUser').value = ''

	// 		if (data.success) {
	// 			alert('Usuário registrado com sucesso!');
	// 		}
	// 		//Tratamento de erro em registrar o usuário
	// 		else {
	// 			alert('Erro ao registrar usuário: ' + (data.error || 'erro desconhecido'))
	// 		}
	// 	})

	// 	// erro
	// 	.catch(err => {
	// 		console.error(err)
	// 		alert('Erro no servidor')
	// 	})
}

function fazerlogin() {

	//input do login
	const email = document.getElementById('email').value
	const senha = document.getElementById('senha').value

	//verificação se os nenhum campo está vazio
	if (!email || !senha) {
		alert('Por favor preencha todos os campos!')
		return
	}

	fetch('/api/login', {
		// curl
		headers: { // -H "Content-type: application/json"
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, senha })
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
			})
	})
}
