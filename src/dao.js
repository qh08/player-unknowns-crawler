const MongoClient = require('mongodb').MongoClient;
const dataBase = require('./config/database');
const CONSTANT =  require('./config/constant');
const URL = `mongodb://${dataBase.username}:${dataBase.password}@${dataBase.ip}:${dataBase.port}/admin`;

function connectMongo(callback) {
    MongoClient.connect(URL, function (err, db) {
        if (err) throw err;
        callback(db);
    });
}

module.exports = {
    setBattles: function (battles) {
        connectMongo(function (db) {
            const pubgee = db.db(CONSTANT.PUBGEE);
            pubgee.collection(CONSTANT.BATTLE).insert(battles).toArray(function (err, result) {
                if (err) throw err;
                db.close();
            });
        });
    },
    getNewsBattle: function (userId, userName) {
        connectMongo(function (db) {
            const pubgee = db.db('pubgee');
            const sortWay = {
                started_at: 1
            };
            pubgee.collection(userName).find({}).limit(1).sort(sortWay).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                console.dir(result);
            });
        });
    }
}