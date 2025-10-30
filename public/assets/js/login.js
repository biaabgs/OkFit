

function registrarNovoUsuario() {

	//pega as informações
	const nome = document.getElementById('nomeNewUser').value;
	const email = document.getElementById('emailNewUser').value;
	const passwd = document.getElementById('passwdNewUser').value;
	const telefone = document.getElementById('telefoneNewUser').value;
	const datanasc = document.getElementById('datanascNewUser').value;
	const hibrido = document.getElementById('hibrido').checked;
	const online = document.getElementById('online').checked;
	const presencial = document.getElementById('presencial').checked

	//deixa todos as bolinhas não marcadas
	let plano = false;

	//quando houver alguma bolinha marcada
	if (hibrido) {
		plano = 'hibrido'
	}
	if (online) {
		plano = 'online'
	}
	if (presencial) {
		plano = 'presencial'
	}

	//verificar se preencheram todos os campos
	if (!nome || !email || !telefone || !passwd || !datanasc) {
		alert('Por favor preencha todos os campos!');
		return;
	};




	//pega as informações
	fetch('/api/registrar', {

		method: 'POST', // -X POST
		headers: { // -H "Content-type: application/json"
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ nome, email, telefone, passwd, datanasc, plano }) // -d (Aqui é pego os dados inseridos nos inputs e transformados em um body para requisição)
	})
		.then(res => res.json())
		.then(data => {


			const modal = bootstrap.Modal.getInstance(
				document.getElementById('exampleModal')
			);

			modal.hide();

			document.getElementById('nomeNewUser').value = '';
			document.getElementById('emailNewUser').value = '';
			document.getElementById('passwdNewUser').value = '';
			document.getElementById('datanascNewUser').value = '';
			document.getElementById('telefoneNewUser').value = '';

			//se tudo der certo
			if (data.success) {
				alert('Usuário registrado com sucesso!');

			}

			//se tudo der errado
			else {
				alert('Erro ao registrar usuário: ' + (data.error || 'erro desconhecido'));
			}
		})
		// se der mais errado ainda
		.catch(err => {
			console.error(err);
			alert('Erro de comunicação com o servidor');
		});
}

// Fazer login
function fazerLogin() {

	//indica as informações que serão utilizadas
	const email = document.getElementById('email').value;
	const passwd = document.getElementById('senha').value;

	//verifica se preencheu todos os campos
	if (!email || !passwd) {
		alert('Preencha todos os campos!');
		return;
	};


	fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, passwd })
	})
		.then(res => res.json())
		.then(data => {

			if (data.ok) {
				//pega o ID do user e usa de referencia, e dps abre os treinos
				const userID = data.usuarioLogin.userID;

				localStorage.setItem('userID', userID);

				if (plano === "hibrido"){
					window.location.href = '/'
				}
				if (plano === "online"){
					window.location.href = '/'
				}
				if (plano === "presencial"){
					window.location.href = '/'
				}
				
				alert('Usuario logado!');

			}

			//erro ao logar o usuario
			else {
				console.log(data);
				alert('Erro ao logar o usuário: ' + (data.error || 'erro desconhecido'));
			}
		})
		//erro ao logar maior ainda
		.catch(error => {
			console.error(error);
			alert('Erro ao logar');
		})
};

