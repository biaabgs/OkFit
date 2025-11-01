const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// const index = require('./middleware/back')
const login = require('./middleware/loginUser')
const registrarRoute = require('./middleware/registrarUser')


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// app.use('/api/info', index);
app.use('/api/login', login);
app.use('/api/registrar', registrarRoute);


/* Informações (pegar) */
app.get('/', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/planos', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'planos.html'));
});

app.get('/sobrenos', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'sobrenos.html'));
});

app.get('/login', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/treinos', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'treinos.html'));
});

app.get('/online', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'online.html'))
})

/* app.get('/onlinetreino', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'treino_online.html'))
})

app.get('/treino', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'treino.html'))
}) */

app.get('/hibrido', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'hibrido.html'))
})

app.get('/catalogo', (req, res)=>{
	res.status(200).sendFile(path.join(__dirname, 'public', 'catalogo.html'))
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
