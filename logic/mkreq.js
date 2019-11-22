const http = require('http');
const https = require('https');
const state = require('./state');

module.exports = (requestBody, responseCallback) => {
    console.log(`Sending HTTP${state.send_https() ? 'S' : ''} Request with body: ${requestBody}`);
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
    if (state.send_https()) {
        options.cert = state.CERT;
        options.key = state.KEY;
        options.ca = state.CA;
        options.checkServerIdentity = function(host, cert) {
            return undefined;
        };
    }

    let http_module = state.send_https() ? https : http;
    let responseHandler = () => {};
    if (responseCallback) {
        responseHandler = (res) => {
            res.on('data', responseCallback);
        }
    }
    let req = http_module.request(options, responseHandler);
    req.on('error', (e) => {
        console.error(e);
      });
    req.write(requestBody);
    req.end();
}
