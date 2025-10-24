// Exporta express e path
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

router.post('/', async (req, res) => {
	try {
		
		const { nome, email, telefone, passwd, datanasc, plano } = req.body;

		
		if (!nome || !email || !telefone || !passwd || !datanasc || !plano) {
			return res.status(400).json({ error: "Campos obrigatórios faltando!" });
		};

		
		const data = await fs.readFile(dataPath, 'utf8');
		const users = JSON.parse(data);

		
		const emailExistente = users.find(user => user.email === email);

		
		if (emailExistente) {
			return res.status(400).json({ error: "Email já cadastrado!" })
		}

		
		let userID = Date.now().toString()

		
		const novoUsuario = {
			userID : userID,
			nome : nome, 
			email : email,
			telefone : telefone,
			passwd : passwd,
			plano : plano,
			datanasc : datanasc
		};

		
		users.push(novoUsuario);

		
		await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
		res.status(201).json({ success: true }) 

		
	} catch (error) {
		res.status(500).json({ error })
	}
});


module.exports = router









// // Exporta express e path
// const express = require('express');
// const router = express.Router();
// const fs = require('fs').promises;
// const path = require('path');

// const dataPath = path.join(__dirname, '..', 'data', 'users.json');

// router.post('/', async (req, res) => {
// 	try {
// 		// Constante que recebe os valores requisitados no body
// 		const { nome, email, telefone, passwd, datanasc, plano } = req.body;

// 		// Verifica se está vazio o parametro enviado
// 		if (!nome || !email || !telefone || !passwd || !datanasc || !plano) {
// 			return res.status(400).json({ error: "Campos obrigatórios faltando!" });
// 		}

// 		// Constante lê arquivo e transforma data em object
// 		const data = await fs.readFile(dataPath, 'utf8');
// 		const users = JSON.parse(data);

// 		// Procura com find email já existente
// 		const emailExistente = users.find(user => user.email === email);

// 		// Verifica se já existe o email
// 		if (emailExistente) {
// 			return res.status(400).json({ error: "Email já cadastrado!" });
// 		}

// 		// Constante que gera um id para o usuário com base no tempo
// 		let userID = Date.now().toString();

// 		// Constante com valores para o novo Usuário
// 		const novoUsuario = {
// 			userID: userID,
// 			nome: nome, 
// 			email: email,
// 			telefone: telefone,
// 			passwd: passwd,
// 			plano: plano,
// 			datanasc: datanasc
// 		};

// 		// Envia os valores do novo Usuário para o object users
// 		users.push(novoUsuario);

// 		// Salva o arquivo com formatação
// 		await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
// 		res.status(201).json({ success: true }); // Envia mensagem de sucesso

// 	// Tratamento de erros
// 	} catch (error) {
// 		console.error('Erro ao registrar usuário:', error);
// 		res.status(500).json({ error: 'Erro interno do servidor' });
// 	}
// });

// // Exporta o router
// module.exports = router;