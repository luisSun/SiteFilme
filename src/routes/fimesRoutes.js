const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/db');


router.get('/filmes', async (req, res) => {
    const [result] = await Promise.all([
        executeQuery('SELECT * FROM filmes_teste ORDER BY id',),
    ]);
    const valor= ['Filmes', 'filmes']
    res.status(200).render('filmesMain', { result: result, valor : valor });
});


router.get('/filmes/:index', async (req, res) => {
    try {
        const index = req.params.index;

        const [resulFilms] = await Promise.all([
            executeQuery('SELECT * FROM filmes_teste where imdb_cod = ?', [index]),
        ]);

        if (!resulFilms) {
            console.log('Nenhum item encontrado com o ID fornecido.');
        }

        const valores = ['Filmes', 'filmes'];
        res.status(200).render('watch', { resulFilms: resulFilms[0], valores: valores });
    } catch (err) {
        console.error('Erro ao buscar item:', err);
        res.status(500).send('Erro ao buscar item');
    }
});



module.exports = router;
