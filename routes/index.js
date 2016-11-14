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

router.get('/sample/reactions', (req, res) => {
    res.json([
        {
            "_id": ObjectId("5827581bed3a7e1a3f32696f"),
            "message": "Après Samuel Umtiti hier, Lucas Digne vient de signer un contrat de 5 ans avec le FC Barcelona ! 👊 #FiersdetreBleus"
            "id": "112215632152510_1247865825254146",
            "date": "2016-07-13T12:58:06+0000",
            "angry": 35,
            "haha": 234,
            "like": 20088,
            "love": 512,
            "sad": 14,
            "wow": 90
        },{
            "_id" : ObjectId("5827581bed3a7e1a3f326970"),
            "message" : "On se sera bien marré quand même durant cet Euro ! Grâce à votre créativité, on aura pu voir quelques petites pépites comme ce remix pour Moussa Sissoko 🎤😂 #FiersdetreBleus",
            "id" : "112215632152510_1247485368625525",
            "date" : "2016-07-13T07:24:01+0000",
            "angry" : 10,
            "haha" : 1423,
            "like" : 31682,
            "love" : 1637,
            "sad" : 7,
            "wow" : 33
        }
    ]);
});

module.exports = router;
