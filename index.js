const superagent = require('superagent');
const cheerio = require('cheerio');

const url = 'https://pubg.op.gg/user/frankknnaarf?server=as';
const urlbaidu = 'https://www.baidu.com';

superagent.get(url).end(function (err, res) {
    if (err) {
        console.log('error');
    }
    let $ = cheerio.load(res.text);
    $('.matches-item__summary .matches-item__column--damage .matches-item__value').each((i,element) => {
        console.log($(element).text());
        // return false;
    });
});