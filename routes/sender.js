var express = require('express');
const mkhttpsreq = require('../logic/mkhttpsreq');
const mkhttpreq = require('../logic/mkhttpreq');
var state = require('../logic/state');

let router = express.Router();
router.post('/', function(req, res, next) {
  // target parameter expects the target domain (and potentially path, though that is untested) as a URL-encoded string
  console.log('handling sender');

  console.log(JSON.stringify(req.body))

  if (state.MODE == 'broker') {
    mkhttpsreq(req, (data) => {
      console.log('Response data' + data)
      res.setHeader('Content-Type', 'application/json')
      res.send(data);
    });
    return;
  } else if (state.MODE == 'idp') {
    mkhttpreq(req,(data) => {
      console.log('Response data' + data)
      res.send(data);
    });
    return;
  }
});

module.exports = router;
