var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var assert = require('assert');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/mongo', (req, res, next) => {
    let url = 'mongodb://localhost:27017/social-monitor';
    let MongoClient = mongodb.MongoClient;

    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        console.log('Connection established to', url);
        let collection = db.collection('fbposts');
        collection.find().toArray((err, docs) => {
            assert.equal(null, err);
            res.render('mongo', {
                message: 'Données en base',
                docs: JSON.stringify(docs)
            });
        });
    });
})

module.exports = router;
