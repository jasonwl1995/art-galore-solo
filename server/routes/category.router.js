const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// GET categories from DB to display onto dropdown list
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "category" ORDER BY "theme" ASC`;
  pool
    .query(queryText)
    .then((result) => {
            console.log('category list is:', result.rows);
        res.send(result.rows);
    })
    .catch((err) => {
            console.log('category retrieving failed: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
