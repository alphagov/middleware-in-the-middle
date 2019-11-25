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
    broker: process.env.BROKER_URL || '52.209.185.207',
    idp: process.env.IDP_URL || 'stub-oidc-op.cloudapps.digital',
};
TARGET_PORTS = {
    broker: 3000, // targeting the other middleware
    idp: process.env.IDP_PORT || 443, // targeting the IDP core app
};
TARGET_PATHS = {
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
module.exports.send_https = function() { return MODE == MODES.broker || !process.env.LOCAL; };
module.exports.receive_https = function() { return MODE == MODES.idp; };
