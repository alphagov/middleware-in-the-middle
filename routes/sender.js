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
    mkhttpsreq(req.body, (data) => {
      res.render('test', { stuff: data });
    });
  } else if (state.MODE == 'idp') {
    mkhttpreq(req.body,(data) => {
      res.render('test', { stuff: data });
    });
  }
   throw Error("State does not equal idp or broker. State is: " + state.mode);
});

module.exports = router;
