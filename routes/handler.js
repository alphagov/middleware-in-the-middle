var express = require('express');

let router = express.Router();
router.get('/', function(req, res, next) {
  let rando = Math.floor(Math.random() * 250 + 1);
  console.log(`I chose a random number: ${rando}`)
  res.send(`Here is my random number: ${rando}`);
});
module.exports = router;
