const superagent = require('superagent');
const cheerio = require('cheerio');
const config = require('../config');
const alg = require('./alg');

const url_prefix = 'https://pubg.op.gg/user/';
const url_server = 'as';

// players.forEach(function (value, index) {
    // const url = url_prefix + value + '?server=' + url_server;
    const url = 'https://pubg.op.gg/api/users/5a0c61397732d50001497349/matches/recent?server=sea&queue_size=&mode=';
    superagent
        .get(url)
        .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        .set('cookie', '_ga=GA1.2.1217097403.1518095147; _referrer=user,; _gid=GA1.2.98189766.1518229000; _gat_gtag_UA_37377845_10=1; recent-searches=Take-you-fly,flygepi,frankknnaarf; XSRF-TOKEN=eyJpdiI6IldrV09Ta3VJZFdVXC9kSCtcL20xdXk1UT09IiwidmFsdWUiOiJrQUs1N0dsKzNFcDVuMHJBcG5SMlZ1M0k4UmNkY1FWQnhlVG10RHpDeVZoY3VRazZ4akRzVStiS3I3akZJT2lLeE9uU0dZYURybUxSS2huRU1EcDRVQT09IiwibWFjIjoiYWU5MjhmMzE4ZGUxNGUzZGViY2E3ZjU4MDljMjE0MDI1YmRmMGZkYTI4Y2ExZGZkNWI3MjQwM2Q2MWY0OTQwMSJ9; pubg_session=eyJpdiI6InNIVWU1SFpwQlJFWVIxYkV3U3dIMUE9PSIsInZhbHVlIjoid1BMVFRcL2tsV3p0XC9ITzh3RVRrd1plQjJvdDg0ZGdJK0c0Ulk0MXlCTm1iZXJ0Tkg4bm0wdXRqTHF1WENoSHExR08zakZzVEZ4b2xhMnJncFhJOEtvdz09IiwibWFjIjoiYWQ0YjU2NDczODQwMDhlZjg1NDg0MTQ3YTc3ZDExOTM3Mjc4NDMyOTRkNWU3Y2I3YjFlYzQwNGNhNGUwOGM3NiJ9')
        .end(function (err, res) {

            if (err) {
                console.log('error');
            }

            // const $ = cheerio.load(res.text);
            // let damage = [];
            console.dir(res.text);

            // $('.matches__list .matches-item__summary .matches-item__column.matches-item__column--damage .matches-item__value').each((i, element) => {
            //     damage.push(Number($(element).text()));
            // });

            // console.dir(damage);
            // console.log(value + ':最近' + damage.length + '场，伤害平均数：' + alg.average(damage) + ',伤害标准差：' + alg.stanDev(damage).toFixed(2));
        });
// });
// const url = 'https://pubg.op.gg/user/{id}?server=as';