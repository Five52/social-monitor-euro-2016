var express = require('express');
var router = express.Router();
const mongodb = require('../src/mongo.js');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

router.get('/insert', (req, res) => {
    mongodb.insertPosts().then((nbPosts) => {
        return mongodb.insertReactions();
    }).then(() => {
        res.end('Données ajoutées !');
    }).catch((err) => {
        res.render('error', {
            error: {
                status: 500,
                stack: err
            }
        });
    });
});

module.exports = router;
