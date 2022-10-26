const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('Home'))

router.get('/test', (req, res) =>
  res.send('test'));


  module.exports = router;