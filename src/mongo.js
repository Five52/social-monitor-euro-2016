const mongodb = require('mongodb');
const config = require('./config/mongo.json');

let url = 'mongodb://localhost:27017/social-monitor';
let MongoClient = mongodb.MongoClient;

const obj = {
    init: () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    reject(err);
                }
                obj.instance = db;
                resolve(db);
            });
        });
    }
}

module.exports = obj;
