const http = require('http');
var state = require('./state');

module.exports = (headers, cb) => {
    console.log('Sending HTTP REQ');
    console.log('HEADERS' + JSON.stringify(headers.body));

    let headerJson = '';
    for (let key of Object.keys(headers.body)) {
        if (headerJson.length > 0) {
            headerJson += '&';
        }
        headerJson += `${encodeURIComponent(key)}=${encodeURIComponent(headers.body[key])}`;
    }
    let req = http.request(
        {
            hostname: decodeURIComponent(state.IDP_URI),
            port: state.IDP_TARGET_PORT,
            path: '/token',
            method: 'POST',
            checkServerIdentity: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(headerJson)
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
    req.write(headerJson);
    req.end();
}
