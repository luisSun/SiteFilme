const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/db');

router.get('/series', async (req, res) => {
    const [result] = await Promise.all([
        executeQuery('SELECT * FROM series_teste ORDER BY id',),
    ]);
    const valor= ['Filmes', 'serie']
    res.status(200).render('filmesMain', { result: result, valor : valor });
});

router.get('/series/:index', async (req, res) => {
    try {
        const index = req.params.imdb_cod;

        const [resulFilms] = await Promise.all([
            executeQuery('SELECT * FROM filmes_teste where id = ?', [index]),
        ]);

        if (!resulFilms) {
            console.log('Nenhum item encontrado com o ID fornecido.');
        }

        const valores = ['Filmes', 'filmes'];
        console.log(resulFilms);
        res.status(200).render('watch', { resulFilms: resulFilms[0], valores: valores });
    } catch (err) {
        console.error('Erro ao buscar item:', err);
        res.status(500).send('Erro ao buscar item');
    }
});


module.exports = router;
