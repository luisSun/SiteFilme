const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/db');


router.get(['/','/main','/home'], async (req, res) => {
    const [resulFilms, resultSeries] = await Promise.all([
        executeQuery('SELECT * FROM filmes_teste ORDER BY id limit 4',),
        executeQuery('SELECT * FROM series_teste ORDER BY id limit 4',),
    ]);
    res.status(200).render('index', { resulFilms: resulFilms, resultSeries: resultSeries});
});



module.exports = router;
