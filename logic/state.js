const fs = require('fs');

MODES = {
    broker: 'broker',
    idp: 'idp',
}
MODE = process.env.MODE.toLowerCase() == MODES.broker ? MODES.broker : MODES.idp;

CERT = fs.readFileSync(`${MODE}.crt`);
KEY = fs.readFileSync(`${MODE}.key`);
CA = fs.readFileSync(`ca.crt`);

module.exports.MODE = MODE;
module.exports.CERT = CERT;
module.exports.KEY = KEY;
module.exports.CA = CA;
module.exports.TARGET_PORT = 443;
