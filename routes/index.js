var express = require('express');
var router = express.Router();
const mongodb = require('../src/mongo.js');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

router.get('/insert', (req, res) => {
    const basePosts = require('../script/data/equipedefrance_base.json');
    console.log(basePosts.posts.data);
    let collection = mongodb.instance.collection('fbposts');
    collection.insert(basePosts.posts.data, () => {
        res.render('insert', {
            message: basePosts.posts.data.length + ' posts insérés',
        });
    });
});

module.exports = router;
