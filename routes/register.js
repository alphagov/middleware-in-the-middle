var express = require('express')
const mkreq = require('../logic/mkreq');
const state = require('../logic/state');

let router = express.Router();

router.post('/', function(req, res, next) {
  // target parameter expects the target domain (and potentially path, though that is untested) as a URL-encoded string
  console.log('handling registation request');

  let hostname = state.MODE == 'idp' ? decodeURIComponent(req.body['destination-url']) : decodeURIComponent(state.TARGET_URL);

  mkreq(JSON.stringify(req.body), 'application/json', hostname, '/register', (data) => {
    console.log('Response data' + data)
    res.setHeader('Content-Type', 'application/json')
    res.send(data);
  });
});

module.exports = router;
