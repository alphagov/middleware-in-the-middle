const http = require('http');
var state = require('./state');

module.exports = (headers, cb) => {
    console.log('Sending HTTP REQ');
    
    let req = http.request(
        {
            hostname: decodeURIComponent(state.IDP_URI),
            port: state.IDP_TARGET_PORT,
            path: '/token',
            method: 'POST',
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
