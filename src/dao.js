const MongoClient = require('mongodb').MongoClient;
const dataBase = require('./config/database');
const CONSTANT = require('./config/constant');
const URL = `mongodb://${dataBase.username}:${dataBase.password}@${dataBase.ip}:${dataBase.port}/admin`;

async function getMongo() {
    return await MongoClient.connect(URL);
}

module.exports = {
    setBattles: async function (battles) {
        try {
            const client = await getMongo();
            const pubgee = client.db(CONSTANT.PUBGEE);
            const results = await pubgee.collection(CONSTANT.BATTLE).insertMany(battles);
            client.close();
        } catch (error) {
            console.log(error.stack);
        }
    },
    getLastGameStartTime: async function (userId) {
        try {
            const client = await getMongo();
            const pubgee = client.db(CONSTANT.PUBGEE);
            const findDetail = {
                '_id': userId
            };
            const sortWay = {
                started_at: 1
            };
            const results = await pubgee.collection(CONSTANT.BATTLE).find(findDetail).sort(sortWay).limit(1).toArray();
            client.close();

            return results.started_at || '';

        } catch (error) {
            console.log(error.stack);
        }
    },
    test: async function () {
        try {
            const client = await getMongo();
            const pubgee = client.db(CONSTANT.PUBGEE);
            const results = await pubgee.collection('test').find().sort({
                name: 1
            }).toArray();
            client.close();
        } catch (error) {
            console.log(error.stack);
        }
    }
}