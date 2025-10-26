const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const index = require('./middleware/back')
const registrarRoute = require('./middleware/registrarUser')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/info', index);
app.use('/api/treinos', treinos);
app.use('/api/registrar', registrarRoute);

/* Informações (pegar) */
app.get('/', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/novousuario', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/treinos', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'treinos.html'));
});
/* Mandar informação */



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
