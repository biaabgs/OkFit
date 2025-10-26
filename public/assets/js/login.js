

function registrarNovoUsuario() {
	
	const nome = document.getElementById('nomeNewUser').value;
	const email = document.getElementById('emailNewUser').value;
	const passwd = document.getElementById('passwdNewUser').value;
	const telefone = document.getElementById('telefoneNewUser').value;
	const datanasc = document.getElementById('datanascNewUser').value;
	const hibrido = document.getElementById('hibrido').checked;
	const online = document.getElementById('online').checked;
	const presencial = document.getElementById('presencial').checked

	
	let plano = false;
    
	



	if (hibrido) {
		plano = 'hibrido'
	}
	if (online) {
		plano = 'online'
	}
	if (presencial) {
		plano = 'presencial'
	}

	
	if (!nome || !email || !telefone || !passwd || !datanasc) {
		alert('Por favor preencha todos os campos!');
		return;
	};

	
	

	
	fetch('/api/registrar', {
		
		method: 'POST', // -X POST
		headers: { // -H "Content-type: application/json"
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ nome, email, telefone, passwd, datanasc, plano }) // -d (Aqui é pego os dados inseridos nos inputs e transformados em um body para requisição)
	})
	.then(res => res.json())
// 	.then(async res => {
//     const text = await res.text();
//     try {
//         return JSON.parse(text);
//     } catch {
//         throw new Error('Resposta inválida do servidor');
//     }
// })

	
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
		

		if (data.success) {
			alert('Usuário registrado com sucesso!');
		} 
		
		else {
			alert('Erro ao registrar usuário: ' + (data.error || 'erro desconhecido'));
		}
	})
	
	.catch(err => {
		console.error(err);
		alert('Erro de comunicação com o servidor');
	});
}

// Fazer login
function fazerLogin() {
	
	const email = document.getElementById('email').value;
	const senha = document.getElementById('senha').value;
	
	
	if (!email || !senha) {
		alert('Preencha todos os campos!');
		return;
	};

	
	fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email, senha})
	})
	.then(res => res.json())
	//CODIGO REMOVIDO
// 	    try {
//         const data = JSON.parse(text);
        
//         if (data.success) {
//             const userID = data.usuario.userID;
//             localStorage.setItem('userID', userID);
//             localStorage.setItem('userEmail', data.usuario.email);
//             localStorage.setItem('userTipo', data.usuario.plano);
//             window.location.href = `/perfil/${userID}`;
//             alert('Usuário logado com sucesso!');
//         } else {
//             alert('Erro ao logar o usuário: ' + (data.error || 'erro desconhecido'));
//         }
//     } catch (err) {
//         console.error('Resposta não é JSON:', text);
//         alert('Erro inesperado na resposta do servidor');
//     }
// })
	// .then(async res => {
    // const text = await res.text();
	.then(data =>{
		if(data.success){
			
			const userID = data.usuario.userID;

			
			localStorage.setItem('userID', userID);
			localStorage.setItem('userEmail', data.usuario.email);
			localStorage.setItem('userTipo', data.usuario.plano);//???

			
			window.location.href = `/perfil/${userID}`;
			alert('Usuario logado com sucesso!');

		} 
		
		
		else {
			alert('Erro ao logar o usuário: ' + (data.error || 'erro desconhecido'));
		}
	})
	
	.catch(error =>{
		console.error(error);
        alert('Erro ao carregar perfil');
	})
};


// function registrarNovoUsuario() {
// 	const nome = document.getElementById('nomeNewUser').value;
// 	const email = document.getElementById('emailNewUser').value;
// 	const passwd = document.getElementById('passwdNewUser').value;
// 	const telefone = document.getElementById('telefoneNewUser').value;
// 	const datanasc = document.getElementById('datanascNewUser').value;
// 	const hibrido = document.getElementById('hibrido').checked;
// 	const online = document.getElementById('online').checked;
// 	const presencial = document.getElementById('presencial').checked;

// 	let plano = false;

// 	if (hibrido) plano = 'hibrido';
// 	if (online) plano = 'online';
// 	if (presencial) plano = 'presencial';

// 	if (!nome || !email || !telefone || !passwd || !datanasc || !plano) {
// 		alert('Por favor preencha todos os campos!');
// 		return;
// 	}

// 	const senhaForte = /^(?=(?:.*\d){8,})(?=.*[\W_]).+$/;

// 	if (!senhaForte.test(passwd)) {
// 		alert('[Senha fraca] Sua senha precisa ter pelo menos 8 caracteres, incluindo números e caracteres especiais.');
// 		return;
// 	}

// 	fetch('/api/registrar', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({ nome, email, telefone, passwd, datanasc, plano })
// 	})
// 	.then(async res => {
// 		if (!res.ok) {
// 			throw new Error(`Erro HTTP: ${res.status}`);
// 		}
// 		return res.json(); // ← Simplificado!
// 	})
// 	.then(data => {
// 		const modal = bootstrap.Modal.getInstance(
// 			document.getElementById('exampleModal')
// 		);
// 		modal.hide();

// 		document.getElementById('nomeNewUser').value = '';
// 		document.getElementById('emailNewUser').value = '';
// 		document.getElementById('passwdNewUser').value = '';
// 		document.getElementById('datanascNewUser').value = '';
// 		document.getElementById('telefoneNewUser').value = '';

// 		if (data.success) {
// 			alert('Usuário registrado com sucesso!');
// 		} else {
// 			alert('Erro ao registrar usuário: ' + (data.error || 'erro desconhecido'));
// 		}
// 	})
// 	.catch(err => {
// 		console.error('Erro detalhado:', err);
// 		alert('Erro de comunicação com o servidor: ' + err.message);
// 	});
// }

// function fazerLogin() {
// 	const email = document.getElementById('email').value;
// 	const passwd = document.getElementById('passwd').value;

// 	if (!email || !passwd) {
// 		alert('Preencha todos os campos!');
// 		return;
// 	}

// 	fetch('/api/login', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({ email, passwd })
// 	})
// 	.then(async res => {
// 		if (!res.ok) {
// 			throw new Error(`Erro HTTP: ${res.status}`);
// 		}
// 		return res.json();
// 	})
// 	.then(data => {
// 		if (data.success) {
// 			const userID = data.usuario.userID;
// 			localStorage.setItem('userID', userID);
// 			localStorage.setItem('userEmail', data.usuario.email);
// 			localStorage.setItem('userTipo', data.usuario.plano);
// 			window.location.href = `/perfil/${userID}`;
// 			alert('Usuário logado com sucesso!');
// 		} else {
// 			alert('Erro ao logar o usuário: ' + (data.error || 'erro desconhecido'));
// 		}
// 	})
// 	.catch(error => {
// 		console.error('Erro detalhado:', error);
// 		alert('Erro ao carregar perfil: ' + error.message);
// 	});
// }