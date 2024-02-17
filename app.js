const express = require('express')
const app = express()
const port = 8081

const homeRouter = require('./src/routes/homeRouter.js');
const filmesRouter = require('./src/routes/fimesRoutes.js');
const seriesRouter = require('./src/routes/seriesRoutes.js');

// Configurando o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));

app.use('/media', express.static('F:\\Documentos\\Cursos\\#2024 - Cursos\\JS\\midia'));

app.use('/', homeRouter);
app.use('/', filmesRouter);
app.use('/', seriesRouter);

// Rota para renderizar o template
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});