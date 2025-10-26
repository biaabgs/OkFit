// Exporta express e path
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'treinos.json')

//Exercicios
router.get('/treinos/:id', async (req,res) =>{ // O async serve para deixar o "await" funcionar
    
    const exercicioID = req.params.id

    try{
        const data = await fs.readFile(dataPath, 'utf8') // O await faz o JS esperar o readFile ser completado para poder continuar o código
        const info = JSON.parse(data)

        const dataExercicio = info.filter(i => Number(i.exercicioID) === exercicioID)

        if (!dataExercicio) {
            return res.status(404).json({ ok: false, mensagem: 'Categoria não encontrada' });
        }
        
        res.status(200).json({ok:true, mensagem : 'Tudo certo!', categoriatreino : { } })
    } catch(error){
        return res.status(500).json({ok:false, mensagem: 'Erro interno do servidor', error: error.message })
    }
})

//categorias
router.get('/treinos', async (req,res) =>{ // O async serve para deixar o "await" funcionar
    
    const categoriaID = req.params.id

    try{
        const data = await fs.readFile(dataPath, 'utf8') // O await faz o JS esperar o readFile ser completado para poder continuar o código
        const info = JSON.parse(data)

        const dataTreino = info.filter(i => Number(i.categoriaID) === categoriaID)

        if (!dataTreino) {
            return res.status(404).json({ ok: false, mensagem: 'Categoria não encontrada' });
        }
        
        res.status(200).json({ok:true, mensagem : 'Tudo certo!', categoriatreino : { ID: dataTreino.ID, nome: dataTreino.nome, descricao: dataTreino.descricao , exercicios: dataTreino.Exercicios} })
    } catch(error){
        return res.status(500).json({ok:false, mensagem: 'Erro interno do servidor', error: error.message })
    }
})

module.exports = router;