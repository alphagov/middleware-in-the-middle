const https = require('https');
var state = require('./state');

module.exports = (headers, cb) => {
    console.log('Sending HTTPS REQ');
    console.log('HEADERS' + JSON.stringify(headers.body));
    let headerJson = '';
    for (let key of Object.keys(headers.body)) {
        if (headerJson.length > 0) {
            headerJson += '&';
        }
        headerJson += `${encodeURIComponent(key)}=${encodeURIComponent(headers.body[key])}`;
    }
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
    req.on('error', (e) => {
        console.error(e);
      });
    req.write(headerJson);
    req.end();
}
