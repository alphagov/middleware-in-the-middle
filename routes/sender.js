var express = require('express');
const mkhttpsreq = require('../logic/mkhttpsreq');
const mkhttpreq = require('../logic/mkhttpreq');
var state = require('../logic/state');

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

  if (state.MODE == 'broker') {
    console.log('Sending HTTPS request with body: ' + postData);
    mkhttpsreq(postData, (data) => {
      console.log('Response data' + data)
      res.setHeader('Content-Type', 'application/json')
      res.send(data);
    });
  } else if (state.MODE == 'idp') {
    console.log('Sending HTTP request with body: ' + postData);
    mkhttpreq(postData, (data) => {
      console.log('Response data' + data)
      res.send(data);
    });
  }
});

module.exports = router;
