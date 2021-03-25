const express = require('express');
// const {
//   rejectUnauthenticated,
// } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// this is to get artworks from others except the user
router.get('/discovergallery/:id', (req, res) => {
  
    let userID = req.params.id;
    console.log('discover server router:', userID);
    //let queryText = `select * from artwork order by user_id asc`;
    //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
    const queryText = `SELECT art.*, cat.theme, usr.username, 
                      (SELECT count(1) FROM like_log ll WHERE ll.user_id = $1 AND ll.artwork_id = art.id) AS favorite
                      FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id AND usr.id <> $2 `;
  
    pool
      .query(queryText, [userID, userID])
      .then((result) => {
          //if (process.env.DEBUG) 
          //    console.log('artwork list is:', result.rows);
          res.send(result.rows);
      })
      .catch((err) => {
              console.log('artwork gallery retrieving failed: ', err);
        res.sendStatus(500);
      });
  });

//this is to get artworks for one user (artisit)
router.get('/:id', (req, res) => {
  
    let userID = req.params.id;
    //let queryText = `select * from artwork order by user_id asc`;
    //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
    const queryText = `SELECT art.*, cat.theme, usr.username, 
                      (SELECT count(1) FROM like_log ll WHERE ll.user_id = usr.id AND ll.artwork_id = art.id) AS favorite
                      FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id AND usr.id = $1 `;
  
    pool
      .query(queryText, [userID])
      .then((result) => {
          //if (process.env.DEBUG) 
          //    console.log('artwork list is:', result.rows);
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('artwork user retrieving failed: ', err);
        res.sendStatus(500);
      });
  });


// //this is to update the Like 
// router.put('/like', (req, res) => {
  
//     let data = req.body;
//     console.log('like server router:', data);
//     const queryText = `insert into like_log (user_id, artwork_id) values ($1, $2)`;
  
//     pool
//       .query(queryText, [data.userid, data.artworkid])
//       .then((result) => {
//           res.send(result.rows);
//       })
//       .catch((err) => {
//           if (process.env.DEBUG) 
//               console.log('like artwork request failed: ', err);
//         res.sendStatus(500);
//       });
//   });

//   //this is to update the unLike 
// router.put('/unlike', (req, res) => {
  
//     let data = req.body;
//     console.log('unlike server router:', data);
//     const queryText = `delete from like_log where user_id = $1 and artwork_id = $2`;
  
//     pool
//       .query(queryText, [data.userid, data.artworkid])
//       .then((result) => {
//           res.send(result.rows);
//       })
//       .catch((err) => {
//           if (process.env.DEBUG) 
//               console.log('unlike artwork request failed: ', err);
//         res.sendStatus(500);
//       });
//   });


  //this is to get artwork detail
router.get('/:userid/:artworkid', (req, res) => {
    const artworkID = req.params.artworkid;
    const userID = req.params.userid;
    //let queryText = `select * from artwork order by user_id asc`;
    //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
    const queryText = `SELECT art.id, art.user_id, art.title, TO_CHAR(art.date, 'MM/DD/YYYY') AS date, art.image, art.description, art.category_id, cat.theme, usr.username, 
                      (SELECT count(1) FROM like_log ll WHERE ll.user_id = $1 AND ll.artwork_id = art.id) AS favorite
                      FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id AND art.id = $2`;
  
    pool
      .query(queryText, [userID, artworkID])
      .then((result) => {
          //if (process.env.DEBUG) 
          //    console.log('artwork list is:', result.rows);
          //expect only one row, so just return 1st row, not the the array of size=1
          res.send(result.rows[0]);
      })
      .catch((err) => {
              console.log('artwork detail retrieving failed: ', err);
        res.sendStatus(500);
      });
  });

//this is to get artwork detail


router.delete('/:id', (req, res) => {
  
    let artworkID = req.params.id;
    console.log('artwork to delete:', artworkID);
    /*
    //need to run the following 3 queries, in the following order
        delete from like_log where artwork_id = aid
        delete from artwork_category where artwork_id = aid
        delete from artwork where id = aid
    */
    //let queryText = `select * from artwork order by user_id asc`;
    //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
    //is there a way to run 3 queries as a whole????

    //the following codes worked fine and it did delete from all 3 tables
    const queryText1 = `delete from like_log where artwork_id = $1 `;
    pool
      .query(queryText1, [artworkID])
      .then((result1) => {
        const sqlText2 = `delete from artwork where id = $1`;
        pool.query(sqlText2, [artworkID])
          .then((result2) => {
            //success, all is ok
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
   
//this is to handle put request
router.put('/', (req, res) => {
  console.log(req.body);
    let newData = req.body;
    //console.log('artwork to update:', newData);
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
  
  
//handle adding artwork request
router.post('/', (req, res) => {
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
