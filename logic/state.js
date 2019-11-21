const fs = require('fs');

MODES = {
    broker: 'broker',
    idp: 'idp',
}
MODE = process.env.MODE.toLowerCase() == MODES.broker ? MODES.broker : MODES.idp;

CERT = fs.readFileSync(`${MODE}.crt`);
KEY = fs.readFileSync(`${MODE}.key`);
CA = fs.readFileSync(`ca.crt`);

TARGET_URLS = {
    broker: 'localhost',
    idp: 'localhost',
};
TARGET_PORTS = {
    broker: 443, // targeting the other middleware
    idp: 5510, // targeting the IDP core app
};
TARGET_PATH = {
    broker: '/sender',
    idp: '/token',
};

module.exports.MODE = MODE;
module.exports.CERT = CERT;
module.exports.KEY = KEY;
module.exports.CA = CA;
module.exports.TARGET_PORT = TARGET_PORTS[MODE];
module.exports.TARGET_URL = TARGET_URLS[MODE];
module.exports.TARGET_PATH = TARGET_PATHS[MODE];
module.exports.use_https = function() { return MODE == MODES.broker; };
