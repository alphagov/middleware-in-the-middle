const https = require('https');
var state = require('./state');

module.exports = (headers, cb) => {
    console.log('Sending HTTPS REQ');
    
    let req = https.request(
        {
            hostname: decodeURIComponent(state.IDP_MIDDLEWARE_URI),
            port: state.TARGET_PORT,
            path: '/sender',
            method: 'POST',
            cert: state.CERT,
            key: state.KEY,
            ca: state.CA,
            checkServerIdentity: false,
            body: headers
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
