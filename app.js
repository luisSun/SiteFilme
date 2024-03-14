const express = require('express')
const app = express()
const port = 8082
const bodyParser = require('body-parser');

const homeRouter = require('./src/routes/homeRouter.js');
const filmesRouter = require('./src/routes/fimesRoutes.js');
const seriesRouter = require('./src/routes/seriesRoutes.js');
const adminRouter = require('./src/routes/adminRoutes.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurando o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));

app.use('/media', express.static('F:\\Documentos\\Cursos\\#2024 - Cursos\\JS\\midia'));

app.use('/', homeRouter);
app.use('/', filmesRouter);
app.use('/', seriesRouter);
app.use('/', adminRouter);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});