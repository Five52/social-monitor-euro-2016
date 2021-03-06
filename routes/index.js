var express = require('express');
var router = express.Router();
const mongodb = require('../src/mongo.js');

/* GET home page. */
router.get('/', (req, res) => {
    mongodb.getPosts().then((posts) => {
        for (let i = posts.length - 1; i >= 0; i--) {
            if (!posts[i].hasOwnProperty('date')) {
                posts.splice(i, 1);
            }
        }
        res.render('index', {
            posts: posts,
            title: 'Home'
        });
    });
});

// router.get('/insert', (req, res) => {
//     mongodb.insertPosts().then((nbPosts) => {
//         return mongodb.insertReactions();
//     }).then(() => {
//         return mongodb.deleteEmptyComments();
//     }).then(() => {
//         res.end('Données ajoutées !');
//     }).catch((err) => {
//         res.render('error', {
//             error: {
//                 status: 500,
//                 stack: err
//             }
//         });
//     });
// });
// 
// router.get('/add-sentiments', (req, res) => {
//     mongodb.insertSentiments().then(() => {
//         res.end('Sentiments ajoutés');
//     });
// });

// router.get('/sample/reactions', (req, res) => {
//     res.json([
//         {
//             "message": "Après Samuel Umtiti hier, Lucas Digne vient de signer un contrat de 5 ans avec le FC Barcelona ! 👊 #FiersdetreBles",
//             "id": "112215632152510_1247865825254146",
//             "date": "2016-07-13T12:58:06+0000",
//             "angry": 35,
//             "haha": 234,
//             "like": 20088,
//             "love": 512,
//             "sad": 14,
//             "wow": 90
//         },{
//             "message" : "On se sera bien marré quand même durant cet Euro ! Grâce à votre créativité, on aura pu voir quelques petites pépites comme ce remix pour Moussa Sissoko 🎤😂 #FiersdetreBleus",
//             "id" : "112215632152510_1247485368625525",
//             "date" : "2016-07-13T07:24:01+0000",
//             "angry" : 10,
//             "haha" : 1423,
//             "like" : 31682,
//             "love" : 1637,
//             "sad" : 7,
//             "wow" : 33
//         }
//     ]);
// });
// 
// router.get('/sample/sentiments', (req, res) => {
//     res.json([
//         {
//             "message": "Après Samuel Umtiti hier, Lucas Digne vient de signer un contrat de 5 ans avec le FC Barcelona ! 👊 #FiersdetreBleu",
//             "id": "112215632152510_1247865825254146",
//             "date": "2016-07-13T12:58:06+0000",
//             "comments": {
//                 "data": [
//                     {
//                         "message": "BLABLA",
//                         "id": 1,
//                         "sentiments": {
//                             "neg": 0.4561283512,
//                             "neutral": 0.1242132,
//                             "pos": 0.3546132
//                         }
//                     }, {
//                         "message": "BLEBLE",
//                         "id": 2,
//                         "sentiments": {
//                             "neg": 0.45632165,
//                             "neutral": 0.123456,
//                             "pos": 0.785412
//                         }
//                     }, {
//                         "message": "BLIBLI",
//                         "id": 3,
//                         "sentiments": {
//                             "neg": 0.012132,
//                             "neutral": 0.98798,
//                             "pos": 0.123
//                         }
//                     }, {
//                         "message": "BLOBLO",
//                         "id": 4,
//                         "sentiments": {
//                             "neg": 0.7441223,
//                             "neutral": 0.23485,
//                             "pos": 0.4523
//                         }
//                     }, {
//                         "message": "BLUBLU",
//                         "id": 5,
//                         "sentiments": {
//                             "neg": 0.12311,
//                             "neutral": 0.4541212,
//                             "pos": 0.98567845
//                         }
//                     },
//                 ]
//             }
//         },
//     ]);
// });
// 
// router.get('/post', (req, res) => {
//     res.render('data', {title: 'Post reactions'});
// });


router.get('/post/:id', (req, res) => {
    mongodb.getPost(req.params.id).then((post) => {
        res.render('data', {
            title: 'Post Analysis',
            post: post
        });
    });
});

router.get('/api/post/:id', (req, res) => {
    mongodb.getPost(req.params.id).then((post) => {
        res.json(post);
    });
});

module.exports = router;
