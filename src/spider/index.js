const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');

const urlServer = ['as'];

module.exports = {
    getRecentBattleByUserId: function (userId, offset) {

        let returnData;
        offset = offset || '';


        async.mapLimit(urlServer, 1, async function (server) {
            const url = `https://pubg.op.gg/api/users/${userId}/matches/recent?server=${server}&queue_size=&mode=&after=${offset}`;
            console.log(url);
            await superagent
                .get(url)
                .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
                .set('cookie', '_ga=GA1.2.1217097403.1518095147; _gid=GA1.2.1025910423.1519391337; _referrer=user,; XSRF-TOKEN=eyJpdiI6ImRBUjhKY1pxYVVzVk9yQm9SeXhIakE9PSIsInZhbHVlIjoibzdNRmx6RlN2YUl4eG5cL3BqMUk0MVVRNXc3WjBVQW1UYzdSR0FPYm9qVGRSbk5LZDJjWEZuNWUyZ0ZsWmFwdm5RNzZ1SEIzXC95b0hcL3JMYmt6VVEweEE9PSIsIm1hYyI6ImYzZmQ5MjQwMjVmYmNjZGUzMDFlN2QxNzMxN2U2ZDRiMzhiYjUyYWRmNDkzMGQ2NDc3YTNlMTA4YTRkOGYxMjkifQ%3D%3D; pubg_session=eyJpdiI6IkNsbzhlRXRibmRqbU1JNTVMNmVud0E9PSIsInZhbHVlIjoiWktzQVwveHY2NTVlakxuZjh6emZ4T0NyTHlxR3dpdFEweTFTdGM0SlNsUjZ0WDQ3NmJOcDVuc0lcL3UwZHpNUlByV3I5T2VjUkhiQXRPenV6VzB5ZzROdz09IiwibWFjIjoiZGVmODc5NGU3MGI0ZWRjOWIzY2IzMWFkNjAxOTZmNDMxOGQzNGY4OTk1NmVkNTdjOTE2OGUzMTIxODZiYTJhYiJ9; _gat_gtag_UA_37377845_10=1;')
                // .set('referer','https://pubg.op.gg/user/frankknnaarf?server=as')
                .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36')
                .set('x-newrelic-id', 'VQcEVlFSDBABVFlWDwMAV1U=')
                .set('x-xsrf-token', 'eyJpdiI6ImRBUjhKY1pxYVVzVk9yQm9SeXhIakE9PSIsInZhbHVlIjoibzdNRmx6RlN2YUl4eG5cL3BqMUk0MVVRNXc3WjBVQW1UYzdSR0FPYm9qVGRSbk5LZDJjWEZuNWUyZ0ZsWmFwdm5RNzZ1SEIzXC95b0hcL3JMYmt6VVEweEE9PSIsIm1hYyI6ImYzZmQ5MjQwMjVmYmNjZGUzMDFlN2QxNzMxN2U2ZDRiMzhiYjUyYWRmNDkzMGQ2NDc3YTNlMTA4YTRkOGYxMjkifQ==')
                .then(function (res) {
                    return res.text.matches.items;
                })
                .catch(function (err) {
                    if (err) {
                        console.log(err.message);
                    }
                });
        },function(err,result){
            if (err) throw err
            returnData = result;
        })
    }
}

var a = module.exports.getRecentBattleByUserId('5a0c61397732d50001497349');
console.log(a);