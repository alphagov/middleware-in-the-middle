var express = require('express');
const mkreq = require('../logic/mkreq');
const state = require('../logic/state');

let router = express.Router();
router.post('/', function(req, res, next) {
  // target parameter expects the target domain (and potentially path, though that is untested) as a URL-encoded string
  console.log('handling sender');

  let postData = '';
  for (let key of Object.keys(req.body)) {
      if (postData.length > 0) {
          postData += '&';
      }
      postData += `${encodeURIComponent(key)}=${encodeURIComponent(req.body[key])}`;
  }

  // The postData above will still have the destination-url in, even when we don't need it any more
  let hostname = state.MODE == 'idp' ? decodeURIComponent(req.body['destination-url']) : decodeURIComponent(state.TARGET_URL);
  hostname = hostname.replace(/(^\w+:|^)\/\//, '');

  let portIndex = hostname.indexOf(':');
  let port;
  if (portIndex >= 0) {
    port = hostname.substring(portIndex + 1);
    hostname = hostname.substring(0, portIndex);
  } else {
    port = state.TARGET_PORT;
  }

  mkreq(postData, 'application/x-www-form-urlencoded', hostname, port, state.TARGET_PATH, (data) => {
    console.log('Response data' + data)
    res.setHeader('Content-Type', 'application/json')
    res.send(data);
  });
});

module.exports = router;
