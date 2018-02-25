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
        .set('cookie', '_ga=GA1.2.1217097403.1518095147; _gid=GA1.2.1025910423.1519391337; _referrer=user,; XSRF-TOKEN=eyJpdiI6IlVSR05vbkdEZlpNRTBodGZIN05WbWc9PSIsInZhbHVlIjoiRlJHWDA1SVByOEUxODBrMGNJMUZhelpkT2U1YVRwTjdRSTErQUtMeXEwM2gzY0tzZlFTcXFmNHZrdFBLQVwvOGlZNXIyTFpUVm96bGt3d0FIMll5aTdRPT0iLCJtYWMiOiIxOWYxMjczOTdmZGE3NzNkNmY5ODllY2Q5NWM2YWY0NmNjMDhkOGNkZWM5MzNmM2FhZTlmN2U3MGZjZGQ1ZjVjIn0%3D; pubg_session=eyJpdiI6IkRTNUluREZjWkllZkdEaktDUmQ3bmc9PSIsInZhbHVlIjoiQ3J5ODR4UlFWVzgzV25ibXVuN3RxVExRbUpWcmhDQnNZblNGXC8zTWVmazVNMEFvNEVvN2ROcFhIXC9XT1dBWnBJampOWEdkZTF1aUlqY1pHb0J3VURwUT09IiwibWFjIjoiOTNjZGIxYmVkMTQ3ZjE4MjgyNTk4NDUxMTI1MDQzMTVjN2JmZTk3OTllNmRjM2MwMDkzYjc3NWRlZjBiZWIxOSJ9; recent-searches=Take-you-fly,flygepi,17_shou,kunbufenzi,faker111,feiker1111,frankknnaarf')
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