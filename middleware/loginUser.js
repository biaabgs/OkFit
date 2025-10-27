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
        const { email, passwd } = req.body

        //verifica se não há nada vazio
        if (!email || !passwd) {
            return res.status(400).json({
                ok:false, mensagem: "Preencha todos os campos!"
            })
        }

        //recebe as informações do JSON
        const data = await fs.readFile(dataPath, 'utf8')
        //transforma as informações do arquivo em object
        const users = JSON.parse(data)

        //verifica se algum dos usuarios bate com alhum já cadastrado
        const usuarioLogin = users.find(usuario => usuario.email === email && usuario.passwd === passwd)

        //se as informações não baterem
        if (!usuarioLogin){
            return res.status(401).json({error: "Email ou senhas incorretos!"})
        }

        //se as informações derem certo 
        res.status(200).json({ok:true, mensagem : "Usuario logado!", usuarioLogin})
        
        //erro
    } catch (error) {
        res.status(500).json({ error })
    }
});

//exporta o router
module.exports = router