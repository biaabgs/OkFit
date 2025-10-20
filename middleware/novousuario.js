const express = require('express')
const router = express.Router()
const fs = require('fs').promises
const path = require('path')

//caminho das informações dos usuários
const dataPath = path.join(__dirname, '..', 'data', 'users.json')

router.post('/planos/assinatura', async (req , res) => {
    try{
      
        //pede as informações do novo usuário
        const {nome, email, senha, plano ,telefone ,datanasc}=req.body
        
        //verifica se todos os campos do formulário estão preenchidos
        if(!nome || !email || !senha || !plano || !telefone || !datanasc ){
            return res.status(400).json({error: "Preencha todos os campos!"})
        }

        //lê o arquivo dos users (users.json)
        const data = await fs.readFile(dataPath, 'utf8')
        //transforma a informação em json para que possamos manusear a informação
		const users = JSON.parse(data)
        //procura com um email igual ao que está no formulário
        const emailExistente = users.find(user => user.email === email)

        //Verifica se há um email igual no sistema
        //se a sentença for verdade(haver um email igual a do sistema), o sistema manda uma mensagem
        if (emailExistente) {
			return res.status(400).json({ error: "Email já cadastrado!" })
		}

        //Segue colocando as informações do formulário no formaro de configuração do JSON
        let userID = Date.now()
        
        const novoUsuario = {
			email: email,
			passwd: passwd,
			tipoConta: tipoConta,
			userID: userID,
			dados: {}
		};
        //Coloca o novo usuário no arquivo users.json
        users.push(novoUsuario);
        await fs.writeFile(dataPath, JSON.stringify(users, null, 2));

		res.status(201).json({ success: true }) // Envia mensagem de sucesso
    } //Erro 
    catch (error) {
		res.status(500).json({ error })
	}
})
// Exporta o router
module.exports = router