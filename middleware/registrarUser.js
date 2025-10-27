// Exporta express e path
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

//Users.json
const dataPath = path.join(__dirname, '..', 'data', 'users.json');

router.post('/', async (req, res) => {
	try {
		
		//rececebe so valores do body
		const { nome, email, telefone, passwd, datanasc, plano } = req.body;

		//ve se n falta nenhum valor
		if (!nome || !email || !telefone || !passwd || !datanasc || !plano) {
			return res.status(400).json({ error: "Campos obrigatórios faltando!" });
		};

		//transforma em object oq está escritono arquivo
		const data = await fs.readFile(dataPath, 'utf8');
		const users = JSON.parse(data);

		//procura se algum email já existe
		const emailExistente = users.find(user => user.email === email);

		//se exite esse email já exite ele faz isso
		if (emailExistente) {
			return res.status(400).json({ error: "Email já cadastrado!" })
		}

		//cria ID do user
		let userID = Date.now().toString()

		//estrutura que o novo usuário vai ter
		const novoUsuario = {
			userID : userID,
			nome : nome, 
			email : email,
			telefone : telefone,
			passwd : passwd,
			plano : plano,
			datanasc : datanasc
		};

		//manda os valore para o JSON
		users.push(novoUsuario);

		//salva o arquivo User.json
		await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
		res.status(201).json({ success: true }) 

		//erro
	} catch (error) {
		res.status(500).json({ error })
	}
});

//exporta o router
module.exports = router
