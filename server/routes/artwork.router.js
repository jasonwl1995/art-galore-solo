const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// GET all images in DB to display on DiscoverGalleryPage EXCEPT logged in user
router.get('/discovergallery/:id', rejectUnauthenticated, (req, res) => {
  
    let userID = req.params.id;
    console.log('discover server router:', userID);
    const queryText = `SELECT art.*, cat.theme, usr.username, 
                      (SELECT count(1) FROM like_log ll WHERE ll.user_id = $1 AND ll.artwork_id = art.id) AS favorite
                      FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id AND usr.id <> $2 `;
    pool
      .query(queryText, [userID, userID])
      .then((result) => {
          res.send(result.rows);
      })
      .catch((err) => {
              console.log('artwork gallery retrieving failed: ', err);
        res.sendStatus(500);
      });
  });

// GET artwork from one user
router.get('/:id', rejectUnauthenticated, (req, res) => {  
    let userID = req.params.id;

    const queryText = `SELECT art.*, cat.theme, usr.username, usr.intro,
                      (SELECT count(1) FROM like_log ll WHERE ll.user_id = usr.id AND ll.artwork_id = art.id) AS favorite
                      FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id AND usr.id = $1`;

    pool
      .query(queryText, [userID])
      .then((result) => {
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('artwork user retrieving failed: ', err);
        res.sendStatus(500);
      });
  });

// GET artwork detail
router.get('/:userid/:artworkid', rejectUnauthenticated, (req, res) => {
    const artworkID = req.params.artworkid;
    const userID = req.params.userid;
    //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
    const queryText = `SELECT art.id, art.user_id, art.title, TO_CHAR(art.date, 'MM/DD/YYYY') AS date, art.image, art.description, art.category_id, cat.theme, usr.username, 
                      (SELECT count(1) FROM like_log ll WHERE ll.user_id = $1 AND ll.artwork_id = art.id) AS favorite
                      FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id AND art.id = $2`;
    pool
      .query(queryText, [userID, artworkID])
      .then((result) => {
          //expect only one row, so just return 1st row, not the the array of size=1
          res.send(result.rows[0]);
      })
      .catch((err) => {
              console.log('artwork detail retrieving failed: ', err);
        res.sendStatus(500);
      });
  });

// DELETE artwork from database
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  
    let artworkID = req.params.id;
    console.log('artwork to delete:', artworkID);
    /*
    //need to run the following 3 queries, in the following order
        delete from like_log where artwork_id = aid
        delete from artwork where id = aid
    */
    // Deletes artwork from both tables
    const queryText1 = `DELETE FROM like_log WHERE artwork_id = $1 `;
    pool
      .query(queryText1, [artworkID])
      .then((result1) => {
        const sqlText2 = `DELETE FROM artwork WHERE id = $1`;
        pool.query(sqlText2, [artworkID])
          .then((result2) => {
            res.sendStatus(200);
          })
          .catch(err2=> {
                console.error("failed deleting from artwork table: ", err3);
            })
          })
      .catch((err1) => {
              console.log('afailed deleting from like_log table: ', err1);
        res.sendStatus(500);
      });
     
  });
   
// UPDATE DB with new artwork details
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
    let newData = req.body;
    const queryText = `UPDATE artwork SET title = $1, description = $2 WHERE id = $3`;
    pool
      .query(queryText, [newData.title, newData.description, newData.id])
      .then ((result) => {
          res.sendStatus(200);
      })
      .catch ((err) => {
        console.error('error updating artwork:', err);
        res.sendStatus(500);
      })
  });
  
  
// POST a new artwork onto the DB
router.post('/', rejectUnauthenticated, (req, res) => {
    //new artwork
    let newArtwork = req.body;

    const queryText = `INSERT INTO artwork (user_id, title, date, image, description, category_id) VALUES ($1, $2, $3, $4, $5, $6) returning id`;
    pool
        .query(queryText, [newArtwork.id, newArtwork.title, newArtwork.date, newArtwork.image, newArtwork.description, newArtwork.category_id])
        .then((result) => {
          res.sendStatus(200);  //successfully adding
        })  .catch((err) => {
                console.log('artwork adding failed: ', err);
            res.sendStatus(500);
        });
});

module.exports = router;
