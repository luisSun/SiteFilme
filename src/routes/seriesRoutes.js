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

/*
router.get('/serie/:index', async (req, res) => {
    try {
        const index = req.params.index;

        const [resulFilms] = await Promise.all([
            executeQuery('SELECT * FROM teste.series_ep where serie_id = ?', [index]),
        ]);

        if (!resulFilms) {
            console.log('Nenhum item encontrado com o ID fornecido.');
        }

        const valores = ['Filmes', 'filmes'];
        console.log(JSON.stringify(resulFilms));
        res.status(200).render('serieslist', { resulFilms: resulFilms, valores: valores });
    } catch (err) {
        console.error('Erro ao buscar item:', err);
        res.status(500).send('Erro ao buscar item');
    }
});
*/

router.get('/serie/:imdb_cod', async (req, res) => {
    try {
        const imdb_cod = req.params.imdb_cod;

        // Busca o ID correspondente ao imdb_cod na tabela series_teste
        const [serie] = await executeQuery('SELECT id FROM series_teste WHERE imdb_cod = ?', [imdb_cod]);

        if (!serie) {
            console.log('Nenhum item encontrado com o ID fornecido.');
            res.status(404).send('Nenhum item encontrado com o ID fornecido.');
            return;
        }

        // Busca os episódios relacionados na tabela series_ep

        const [resulFilms] = await Promise.all([
            executeQuery('SELECT * FROM teste.series_ep where serie_id = ?', [serie.id]),
        ]);

        if (!resulFilms) {
            console.log('Nenhum item encontrado com o ID fornecido.');
        }

        const valores = ['Filmes', 'filmes'];
        console.log(JSON.stringify(resulFilms));
        res.status(200).render('serieslist', { resulFilms: resulFilms, valores: valores });
    } catch (err) {
        console.error('Erro ao buscar item:', err);
        res.status(500).send('Erro ao buscar item');
    }
});


module.exports = router;
