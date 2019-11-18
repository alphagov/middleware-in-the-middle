var express = require('express');
const mkreq = require('../logic/mkreq');

let router = express.Router();
router.get('/', function(req, res, next) {
  console.log('handling sender');
  mkreq((data) => {
    res.render('test', { stuff: data });
  });
});

module.exports = router;
