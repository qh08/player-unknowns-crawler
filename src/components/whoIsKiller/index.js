const superagent = require('superagent');
const cheerio = require('cheerio');
const players = require('../../config/player');
const alg = require('../../utils/alg');

const url_prefix = 'https://pubg.op.gg/user/';
const url_server = 'as';

players.forEach(function (value, index) {
    const url = url_prefix + value + '?server=' + url_server;

    superagent.get(url).end(function (err, res) {

        if (err) {
            console.log('error');
        }

        const $ = cheerio.load(res.text);
        let damage = [];

        $('.matches-item__summary .matches-item__column--damage .matches-item__value').each((i, element) => {
            damage.push(Number($(element).text()));
        });

        

        console.log(value + ':      ' + damage.length + '|||||'+ alg.average(damage) + ',     ' + alg.stanDev(damage).toFixed(2));
    });
});
// const url = 'https://pubg.op.gg/user/{id}?server=as';