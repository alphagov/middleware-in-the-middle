const https = require('https');
var state = require('./state');

module.exports = (target, cb) => {
    console.log('Sending');
    let req = https.request(
        {
            hostname: decodeURIComponent(target),
            port: state.TARGET_PORT,
            path: '/handle',
            method: 'GET',
            cert: state.CERT,
            key: state.KEY,
            ca: state.CA
        },
        res => {
            res.on('data', function(data) {
                // do something with response
                console.log('Received data:\n' + data);
                if (cb) {
                    cb(data);
                }
            });
        }
    );

    req.end();
}
