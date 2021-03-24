const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//retrieve user list
router.get('/list', (req, res) => {

const queryText = `SELECT id, username, intro, address, city, state, zip FROM "user" ORDER BY username ASC`;
pool
  .query(queryText)
  .then((result) => {
      res.send(result.rows);
  })
  .catch((err) => {
          console.log('user list retrieving failed: ', err);
    res.sendStatus(500);
  });
});

// retrieve user details
router.get('/detail/:id', (req, res) => {
    let userID = req.params.id;
    //let queryText = `select * from artwork order by user_id asc`;
    //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
    const queryText = `SELECT "user".id, "user".username, "user".pfp, "user".intro FROM "user" WHERE id = $1`;
  
    pool
      .query(queryText, [userID])
      .then((result) => {
          //if (process.env.DEBUG) 
          //    console.log('artwork list is:', result.rows);
          //expect only one row, so just return 1st row, not the the array of size=1
          res.send(result.rows[0]);
      })
      .catch((err) => {
              console.log('user detail retrieving failed: ', err);
        res.sendStatus(500);
      });
  });

//this is to get artwork detail

//this is to handle put request EDIT/UPDATE
router.put('/', (req, res) => {
  console.log(req.body);
    let newData = req.body;
    //console.log('artwork to update:', newData);
    const queryText = `UPDATE "user" SET username = $1, pfp = $2, intro = $3 WHERE id = $4`;
    pool
      .query(queryText, [newData.username, newData.pfp, newData.intro, newData.id])
      .then ((result) => {
          res.sendStatus(200);
      })
      .catch ((err) => {
        console.error('error updating artwork:', err);
        res.sendStatus(500);
      })
  });

module.exports = router;
