const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

// AWS ADD IMAGE
router.post('/', (req, res) => {
  console.log('AWS POST req.body', req.body.aws);
  const aws = req.body.aws;

  const queryString = `INSERT INTO artwork ("image") VALUES ($1) WHERE "id" = $2`;

  pool.query(queryString, [aws, req.body.id])
  .then((result) => {
    res.sendStatus(200);
  }) .catch((err) => {
    console.log('AWS POSTING TO DB FAILED: ', err);
    res.sendStatus(500);
  });
});

module.exports = router;
