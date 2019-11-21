const http = require('http');
const https = require('https');
const state = require('./state');

module.exports = (requestBody, cb) => {
    console.log(`Sending HTTP${state.use_https() ? 'S' : ''} REQ`);
    let options = {
        hostname: decodeURIComponent(state.TARGET_URL),
        port: state.TARGET_PORT,
        path: state.TARGET_PATH,
        method: 'POST',
        checkServerIdentity: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(requestBody)
        },
    };
    if (state.use_https()) {
        options.cert = state.CERT;
        options.key = state.KEY;
        options.ca = state.CA;
        options.checkServerIdentity = function(host, cert) {
            return undefined;
        };
    }

    let http_module = state.use_https() ? https : http;
    let req = http_module.request(
        options,
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
    req.on('error', (e) => {
        console.error(e);
      });
    req.write(requestBody);
    req.end();
}
