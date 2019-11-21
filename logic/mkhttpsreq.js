const https = require('https');
var state = require('./state');

module.exports = (requestBody, cb) => {
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
            checkServerIdentity: function(host, cert){
                return undefined;
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(requestBody)
              }
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
    req.on('error', (e) => {
        console.error(e);
      });
    req.write(requestBody);
    req.end();
}
