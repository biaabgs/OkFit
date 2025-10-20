const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'infromacao.json');

router.get('/', async (req,res) =>{
    try{
        const data = await fs.readFile(dataPath, 'utf8')
        const info = JSON.parse(data)

        res.status(200).json({ok:true, mensagem: "Tá tudo certo :D", informacoes: info})
    } catch (error) {
		return res.status(500).json({ error: error.message })
	}

})

module.exports = router