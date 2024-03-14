const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/db');
const bodyParser = require('body-parser');


router.get(['/admin'], async (req, res) => {
    const [resulFilms, resultSeries] = await Promise.all([
        executeQuery('SELECT * FROM filmes_teste ORDER BY id limit 4',),
        executeQuery('SELECT * FROM series_teste ORDER BY id limit 4',),
    ]);
    res.status(200).render('adm', { resulFilms: resulFilms, resultSeries: resultSeries});
});

router.get(['/adm-addserie'], async (req, res) => {
    res.status(200).render('partials/adm-addserie')
})

router.post('/addSerie', async (req, res) => {
    console.log(req.body)
    const { imdb_cod, title, season, ano, diretor, genero, descricao, studio, coverlink } = req.body;

    // Aqui você pode fazer a validação dos dados recebidos, inserir no banco de dados, etc.

    try {
        // Exemplo de inserção no banco de dados
        const result = await executeQuery('INSERT INTO series_teste (imdb_cod, title, season, ano, diretor, genero, descricao, studio, cover) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [imdb_cod, title, season, ano, diretor, genero, descricao, studio, coverlink]);

        res.status(200).send('Série adicionada com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar série.');
    }
});


router.get(['/adm-addepisodio'], async (req, res) => {
    const [resulSeries] = await Promise.all([
        executeQuery('SELECT DISTINCT id, title FROM series_teste',),
    ]);  
    console.log(resulSeries)
    res.status(200).render('partials/adm-addEPserie', { resulSeries: resulSeries})

})

router.post('/addEpSerie', async (req, res) => {
    console.log(req.body)
    const { series_id, nr_episode, season, title, descricao, midia, formato } = req.body;
    const midiaC = midia+formato
    const serie = req.body.serie_id;
    console.log(serie)
    console.log(midiaC)

    // Adicione aqui a lógica para inserir os dados na base de dados MySQL
    try {
        // Exemplo de como inserir dados usando mysql2
        const result = await executeQuery('INSERT INTO series_ep (serie_id, episodio, season, title, descricao, midia) VALUES (?, ?, ?, ?,?,?)', [series_id, nr_episode, season, title, descricao, midiaC]);
        console.log('Episódio adicionado com sucesso!');
        res.status(200).send('Episódio adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar episódio:', error);
        res.status(500).send('Erro ao adicionar episódio. Por favor, tente novamente.');
    }
});


module.exports = router;
