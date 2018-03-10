const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');

const userAgents = require('./userAgents');
const dao = require('../dao');
const urlServer = ['sea'];

module.exports = {
    do: async function ({
        userName,
        userId
    }) {
        try {
            const self = this;

            async.eachLimit(urlServer, 2, async (server) => {

                const lastBattle = await dao.getLastGameBattle(userName, userId, server);
                const offset = lastBattle.offset || '';
                const lastGameStartTime = lastBattle.started_at || '';

                self.doSpider(userId, offset, lastGameStartTime, server);

            });
        } catch (error) {
            console.log(error.stack);
        }
    },
    doSpider: async function (userId, offset, lastGameStartTime, server) {
        const results = await this.getRecentBattleByUserId(userId, offset, lastGameStartTime, server);
        this.setBattles(userId, lastGameStartTime, server, results);
    },
    getRecentBattleByUserId: async function (userId, offset, lastGameStartTime, server) {
        console.log(`userId : ${userId}`);
        console.log(`offset : ${offset}`);
        console.log(`last game start time : ${lastGameStartTime}`);
        console.log('gets battle data from different servers');

        const self = this;
        const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        const url = `https://pubg.op.gg/api/users/${userId}/matches/recent?server=${server}&queue_size=&mode=&after=${offset}`;

        console.log(`url: ${url}`);
        return await superagent
            .get(url)
            .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
            .set('user-agent', userAgent)
            .set('cookie', '_ga=GA1.2.1217097403.1518095147; __uis=59b7dbb5-189c-11e8-9a0c-000acd2b1aa8; _gid=GA1.2.316500541.1520431758; _referrer=user,; recent-searches=Take-you-fly,flygepi,17_shou,kunbufenzi,faker111,4AMGuCun,wuyu0202,feiker1111,frankknnaarf; XSRF-TOKEN=eyJpdiI6IlU0THZIYWdlQ0ZyYURsQWFJU0tjT3c9PSIsInZhbHVlIjoiSHpmODZBK2xLNWlaaUdQMVQ1N2VYcWpQVmhzV3hFdFphbmFMV2NzZXY5dW00VmpzTkI0cWhibzdIYVJwVllMbjdDTDJJYjhvYUZhYmhoVmhLcmRqamc9PSIsIm1hYyI6IjJhZWY1OTY3ZDg4NTRlZTYwOTNlZGMyNDQ5YzYzZWE2MmZlNTE0OTBlYTkxMDJmMWVjNDllMTk2YzA4OThiYmMifQ%3D%3D; pubg_session=eyJpdiI6IllKb1wvcUQrRDdZQWVkVDZsc3BJYUdnPT0iLCJ2YWx1ZSI6IkZyWXgrdFNLZ09mSTF5KzE5eTBsckJVZktRRlFidlhzZUltc0gzS2E5MkdLZ2duT0NSVWtqaGRldFdvbDZSSk5NWGtWa05IR2U5ZzZTRk5kKzZycGxRPT0iLCJtYWMiOiI1OTA1MGMzMDVkMjY0YzZmZTU0YTY2YmFlOTRiYzE1MWZlNWExYTM2NzQwY2U3OWI4NGY3NTFjNDNmMmQ2ZjM1In0%3D')
            .then((res) => {
                console.log(`receive battle data from server : ${server}`);
                return (JSON.parse(res.text).matches.items);
            })
            .catch((err) => {
                if (err) throw err;
            })
    },
    setBattles: function (userId, lastGameStartTime, server, results) {
        try {
            const self = this;

            for (let i = results.length - 1; i >= 0; i--) {
                const battle = results[i];

                if (lastGameStartTime === '' || battle.started_at > lastGameStartTime) {

                    if (i == results.length - 1) {
                        console.log(`start to get more data by offset`);
                        self.doSpider(userId, battle.offset, lastGameStartTime, server);
                    } else {
                        results.splice(results.length - 1 - i, i + 1);
                    }
                    console.log(`start to insert to mongo`);
                    dao.setBattles(results);
                    break;
                }
            }
        } catch (error) {
            console.log(error.stack);
        }
    }
}

module.exports.do({
    name: 'frankknnaarf',
    userId: '5a0c61397732d50001497349'
});