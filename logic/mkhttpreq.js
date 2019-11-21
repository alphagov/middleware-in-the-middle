const http = require('http');
var state = require('./state');

module.exports = (requestBody, cb) => {
    console.log('Sending HTTP REQ');
    let req = http.request(
        {
            hostname: decodeURIComponent(state.IDP_URI),
            port: state.IDP_TARGET_PORT,
            path: '/token',
            method: 'POST',
            checkServerIdentity: false,
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
    req.write(requestBody);
    req.end();
}
