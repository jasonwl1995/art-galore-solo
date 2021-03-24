const express = require('express');
// const {
//   rejectUnauthenticated,
// } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//this is to get like Artworks
router.get('/:id', (req, res) => {
  
  let userID = req.params.id;
  console.log('querylikes server router:', userID);

  const queryText = `SELECT art.*, cat.theme, usr.username 
                    FROM artwork art, category cat, "user" usr 
                    WHERE art.category_id = cat.id 
                    AND art.user_id = usr.id 
                    AND art.id IN 
                    (SELECT DISTINCT artwork_id FROM like_log WHERE user_id = $1) `;
  
  pool
    .query(queryText, [userID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('querylikes retrieving failed: ', err);
      res.sendStatus(500);
    });
});

//this is to like the artwork
router.put('/like', (req, res) => {
    let data = req.body;
    console.log('like server router:', data);
    const queryText = `INSERT INTO like_log (user_id, artwork_id) VALUES ($1, $2)`;
    pool
      .query(queryText, [data.userId, data.artworkId])
      .then((result) => {
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('like artwork request failed: ', err);
        res.sendStatus(500);
      });
  });

    //this is to update the unLike 
router.put('/unlike', (req, res) => {
  
  let data = req.body;
  console.log('unlike server router:', data);
  const queryText = `DELETE FROM like_log WHERE user_id = $1 AND artwork_id = $2`;

  pool
    .query(queryText, [data.userId, data.artworkId])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((err) => {
            console.log('unlike artwork request failed: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;