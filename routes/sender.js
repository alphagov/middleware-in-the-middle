var express = require('express');
const mkreq = require('../logic/mkreq');

let router = express.Router();
router.get('/:target', function(req, res, next) {
  // target parameter expects the target domain (and potentially path, though that is untested) as a URL-encoded string
  console.log('handling sender');
  mkreq(req.params.target, (data) => {
    res.render('test', { stuff: data });
  });
});

module.exports = router;
