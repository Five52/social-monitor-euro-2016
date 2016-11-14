const mongodb = require('mongodb');
const config = require('./config/mongo.json');

let url = 'mongodb://localhost:27017/social-monitor';
let MongoClient = mongodb.MongoClient;

const obj = {
    init() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    reject(err);
                }
                this.instance = db;
                resolve(db);
            });
        });
    },
    insertPosts() {
        return new Promise((resolve, reject) => {
            const collection = this.instance.collection('fbposts');
            const posts = require('../script/data/equipedefrance_base.json').posts.data;
            collection.insert(posts, (err, records) => {
                if (err) {
                    return reject(err);
                }
                const postDates = require('../script/data/equipedefrance_dates.json').posts.data;
                let total = 0;
                postDates.forEach((postDate) => {
                    collection.update(
                        {id: postDate.id},
                        {$set: {date: postDate.created_time}},
                        () => {
                            if (--total === 0) {
                                resolve();
                            }
                        }
                    );
                });
            });
        });
    },
    insertReactions() {
        return new Promise((resolve, reject) => {
            const collection = this.instance.collection('fbposts');
            const partialLink = '../script/data/equipedefrance_';
            const reactions = {
                angry: require(partialLink + 'angry.json').posts.data,
                haha: require(partialLink + 'haha.json').posts.data,
                like: require(partialLink + 'like.json').posts.data,
                love: require(partialLink + 'love.json').posts.data,
                sad: require(partialLink + 'sad.json').posts.data,
                wow: require(partialLink + 'wow.json').posts.data,
            };
            let total = 0;
            for (let key in reactions) {
                if (reactions.hasOwnProperty(key)) {
                    reactions[key].forEach((reactionPost) => {
                        total++;
                        const object = {};
                        object[key] = reactionPost.reactions.summary.total_count;
                        collection.update(
                            {id: reactionPost.id},
                            {$set: object},
                            () => {
                                if (--total === 0) {
                                    resolve();
                                }
                            }
                        );
                    });
                }
            }
        })
    },
    insertSentiments() {
        return new Promise((resolve, reject) => {
            const collection = this.instance.collection('fbposts');
            collection.find({}).toArray((err, posts) => {
                let total = 0;
                posts.forEach((post) => {
                    let comments = posts[0].comments.data;
                    comments.forEach((comment) => {
                        console.log("+", total);
                        total++;
                        this.getSentiments(comment.message).then((sentiments) => {
                            collection.update(
                                {"comments.data.id": comment.id},
                                {$set: {"comments.data.$.sentiments": sentiments}},
                                () => {
                                    if (--total === 0) {
                                        resolve();
                                    }
                                    console.log("-", total);
                                }
                            );
                        });
                    });
                });
            });
        });
    },
    getSentiments(message) {
        return new Promise((resolve, reject) => {
            const requestData = require('querystring').stringify({
                text: message
            });
            const requestOptions = {
                hostname: 'text-processing.com',
                path: '/api/sentiment/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(requestData)
                }
            };
            const request = require('http').request(requestOptions, (response) => {
                response.setEncoding('utf8');
                response.on('data', (chunk) => {
                    resolve(JSON.parse(chunk).probability);
                });
            });
            request.on('error', (err) => {
                reject(err);
            });
            request.write(requestData);
            request.end();
        });
    },
    deleteEmptyComments() {
        return new Promise((resolve, reject) => {
            const collection = this.instance.collection('fbposts');
            collection.update({}, {$pull: {"comments.data": {message: "" }}}, () => {
                resolve();
            })
        });
    }
}

module.exports = obj;
