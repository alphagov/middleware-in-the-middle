var express = require('express')
const mkreq = require('../logic/mkreq');

let router = express.Router();

router.post('/', function(req, res, next) {
  // target parameter expects the target domain (and potentially path, though that is untested) as a URL-encoded string
  console.log('handling registation request');

  mkreq(JSON.stringify(req.body), 'application/json', '/register', (data) => {
    console.log('Response data' + data)
    res.setHeader('Content-Type', 'application/json')
    res.send(data);
  });
});

module.exports = router;
