const fs = require('fs');

MODES = {
    broker: 'broker',
    idp: 'idp',
}
MODE = process.env.MODE.toLowerCase() == MODES.broker ? MODES.broker : MODES.idp;
TARGET = MODE == MODES.broker ? MODES.idp : MODES.broker;

CERT = fs.readFileSync(`${MODE}.local.crt`);
KEY = fs.readFileSync(`${MODE}.local.key`);
CA = fs.readFileSync(`ca.crt`);

// HOST_NAMES = {
//     idp: 'idp.frog',
//     broker: 'broker.frog',
//     rp: 'rp.frog',
// };
HOST_NAMES = {
    idp: '127.0.0.1',
    broker: '127.0.0.1',
    rp: '127.0.0.1',
};
HOST_NAME = HOST_NAMES[MODE];
TARGET_HOST_NAME = HOST_NAMES[TARGET];

PORTS = {
    idp: 10001,
    broker: 10002,
};
// PORTS = {
//     idp: 443,
//     broker: 443,
// };
PORT = PORTS[MODE];
TARGET_PORT = PORTS[TARGET];

module.exports.MODE = MODE;
module.exports.CERT = CERT;
module.exports.KEY = KEY;
module.exports.CA = CA;
module.exports.PORT = PORT;
module.exports.TARGET_PORT = TARGET_PORT;
module.exports.TARGET_HOST_NAME = TARGET_HOST_NAME;
