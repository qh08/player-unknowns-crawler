const superagent = require('superagent');
const cheerio = require('cheerio');
const player = require('../config/player');

const url_prefix = 'https://pubg.op.gg/user/';
const url_server = 'as';

player.forEach(function (value, index) {
    const url = url_prefix + value + '?server=' + url_server;
    superagent
        .get(url)
        .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        .set('cookie','_ga=GA1.2.1217097403.1518095147; _gid=GA1.2.1025910423.1519391337; _referrer=user,; wP_v=10b6dacbebd3sIre7qgh8mrA7ImhhIEarS6hY_EnEguB_SeedSVoTgRnx6vwOMR; XSRF-TOKEN=eyJpdiI6IldvdWNlWjM3MUhIKzBrRHlYeTB5T2c9PSIsInZhbHVlIjoieDJMdXFTSkJsb2w5RUgyZVBYbVNtRHZuK3Ezald2NFk0akg3NXJRUlErVjl2MVFidWpzM0tlZXJMSTBIZ2NsRnhRNGduRzUrd1JBUjBNQnJvZFNIdGc9PSIsIm1hYyI6IjgwODFhZDIwMjZiZWVkNTFmODdlMWIwZWE1NGU3YzkwM2MzNDdiYmFhZTIzODc3ZmE3YmYyMDliNzFmOTlkMzEifQ%3D%3D; pubg_session=eyJpdiI6IitPZjFkb1ZKYThUT2psUURraWYzS0E9PSIsInZhbHVlIjoiTUtrMVM5ZUtZNE1ldWZBaThqeDlrMEM2anBKSDF0TVhIRnlkeGFWQWhQdk5TcE5Uc3grREdXTWlVeTVJdXpXczVDWE00UE1iNkVxaXBKMVZEWFpFZlE9PSIsIm1hYyI6IjFmNmU2NGYyNDZmMmYyYzFkODlhODg4NGFkZTM3NDRlYWQzYzdkNmU0ODE3ZTE0OTE1Y2E3NDk1OTM4NzRkMjcifQ%3D%3D;')
        .end(function (err, res) {

            if (err) {
                console.log('error');
            }

            const $ = cheerio.load(res.text) || {};
            const user_id = $('#userNickname').prop('data-user_id') || 'err';
            console.log(value + ':' + user_id);
        });
});