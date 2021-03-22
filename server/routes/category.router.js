const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.get('/', (req, res) => {
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
