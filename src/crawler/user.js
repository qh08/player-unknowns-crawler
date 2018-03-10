const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');

const players = require('../config/player');

const url_prefix = 'https://pubg.op.gg/user/';
const url_server = 'as';

async.mapLimit(players, 1, async function (player) {
    const url = url_prefix + player;

    await superagent
        .get(url)
        .query({
            server: 'as'
        })
        .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        .set('cookie', '_ga=GA1.2.1217097403.1518095147; __uis=59b7dbb5-189c-11e8-9a0c-000acd2b1aa8; _gid=GA1.2.2037821572.1520640364; _referrer=user,; recent-searches=Take-you-fly,flygepi,17_shou,kunbufenzi,faker111,4AMGuCun,wuyu0202,feiker1111,frankknnaarf; XSRF-TOKEN=eyJpdiI6InRDTWN5VjZMaDBkQkZJS3RibmorV2c9PSIsInZhbHVlIjoiZWhTOGMwNCsya3ZjYm9BMkhLa0w1MlVKT1wvb1NmNldPcmc2aTBcLzN3UkxLdnlGTWx1bHhraHlMQWxaMWdHRERiZWxFNXRBaDdCSGtSSUZ2VndEdng2Zz09IiwibWFjIjoiZTVjYTc1ZjY2M2ZiOTE1YmM5NDJjNDg0ZWNhMWE2MjA0YTdjMWQwYmMyZWYwMjdhN2YzNGY1YTdkYzBlNDhkNSJ9; pubg_session=eyJpdiI6IklYUDhSbStmK3BjSHFZUVlVTHVFaXc9PSIsInZhbHVlIjoiU2E4VU00ZFA1Zyt6T3VVbXpzeTJhaGtXQnMrTjBFQlJuSmV1bzlLMHZPenRTUDV5b0laM0NuYm5TbFBcL0h5M01jQ3NKcGdTb1VuUnBqYjl2eHVXNEt3PT0iLCJtYWMiOiJiMzgwYjlmMjg0NDk2NmIxZjYwN2Y0MTYxZGVmOGNjYThkYzFhZDcwNTY5YWEzZTI4NWI5MmJkNTc5NTE3M2MxIn0%3D')
        .set('upgrade-insecure-requests', 1)
        .set('accept-encoding', 'gzip, deflate, br')
        .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36')
        .then(function (res) {
            const $ = cheerio.load(res.text) || {};
            const user_id = $('#userNickname').prop('data-user_id') || 'err';
            return player + ':' + user_id;
        })
        .catch(function (err) {
            // console.log('error');
            // console.log(err.message);
            console.dir(err);
        });
}, function (err, result) {
    if (err) throw err;
    console.dir(result);
});