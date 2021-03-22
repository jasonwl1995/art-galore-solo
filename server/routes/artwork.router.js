const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// //handle adding artwork request  -- all artwork??
// //how to handle request to retrive special lists, like my own artwork, some particualr artist's artwork, etc
// //this is to get all artworks for all users (artists)
// router.get('/', (req, res) => {
  
//   //let queryText = `select * from artwork order by user_id asc`;
//   //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
//   const queryText = `SELECT art.*, cat.theme, usr.username, 
//                     (SELECT count(1) FROM like_log ll WHERE ll.user_id = usr.id AND ll.artwork_id = art.id) AS favorite
//                     FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id`;

//     .query(queryText)
//     .then((result) => {
//         //if (process.env.DEBUG) 
//         //    console.log('artwork list is:', result.rows);
//         res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log('artwork retrieving failed: ', err);
//       res.sendStatus(500);
//     });
// });

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
              console.log('artwork retrieving failed: ', err);
        res.sendStatus(500);
      });
  });

//   //this is to get artworks from others except the user
// router.get('/discovergallery/:id', (req, res) => {
  
//     let uid = req.params.id;
//     console.log('discovergallery server router:', uid);
//     //let queryText = `select * from artwork order by user_id asc`;
//     //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
//     const queryText = `select art.*, cat.theme, usr.username, 
//                       (select count(1) from like_log ll where ll.user_id = $1 and ll.artwork_id = art.id) as favorite
//                       from artwork art, category cat, "user" usr where art.category_id = cat.id and art.user_id = usr.id and usr.id <> $2 `;
  
//     pool
//       .query(queryText, [uid, uid])
//       .then((result) => {
//           //if (process.env.DEBUG) 
//           //    console.log('artwork list is:', result.rows);
//           res.send(result.rows);
//       })
//       .catch((err) => {
//           if (process.env.DEBUG) 
//               console.log('artwork retrieving failed: ', err);
//         res.sendStatus(500);
//       });
//   });


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
        console.log('artwork retrieving failed: ', err);
        res.sendStatus(500);
      });
  });



//this is to update the Like 
router.put('/like', (req, res) => {
  
    let data = req.body;
    console.log('like server router:', data);
    const queryText = `insert into like_log (user_id, artwork_id) values ($1, $2)`;
  
    pool
      .query(queryText, [data.userid, data.artworkid])
      .then((result) => {
          res.send(result.rows);
      })
      .catch((err) => {
          if (process.env.DEBUG) 
              console.log('like artwork request failed: ', err);
        res.sendStatus(500);
      });
  });

  //this is to update the unLike 
router.put('/unlike', (req, res) => {
  
    let data = req.body;
    console.log('unlike server router:', data);
    const queryText = `delete from like_log where user_id = $1 and artwork_id = $2`;
  
    pool
      .query(queryText, [data.userid, data.artworkid])
      .then((result) => {
          res.send(result.rows);
      })
      .catch((err) => {
          if (process.env.DEBUG) 
              console.log('unlike artwork request failed: ', err);
        res.sendStatus(500);
      });
  });


  //this is to get artwork detail
router.get('/detail/:id', (req, res) => {
  
    let artworkID = req.params.id;
    //let queryText = `select * from artwork order by user_id asc`;
    //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
    const queryText = `SELECT art.*, cat.theme, usr.username, 
                      (SELECT count(1) FROM like_log ll WHERE ll.user_id = usr.id AND ll.artwork_id = art.id) AS favorite
                      FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id AND art.id = $1 `;
  
    pool
      .query(queryText, [artworkID])
      .then((result) => {
          //if (process.env.DEBUG) 
          //    console.log('artwork list is:', result.rows);
          //expect only one row, so just return 1st row, not the the array of size=1
          res.send(result.rows[0]);
      })
      .catch((err) => {
              console.log('artwork retrieving failed: ', err);
        res.sendStatus(500);
      });
  });

//this is to get artwork detail
router.delete('/:id', (req, res) => {
  
    let artworkID = req.params.id;
    console.log('artwork to delete:', artworkID);
    /*
    //need to run the following 3 queries, in the following order
        delete from like_log where artwork_id = artworkID
        delete from artwork_category where artwork_id = artworkID
        delete from artwork where id = artworkID
    */
    //let queryText = `select * from artwork order by user_id asc`;
    //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
    //is there a way to run 3 queries as a whole????

    //the following codes worked fine and it did delete from all 3 tables
    const queryText1 = `DELETE FROM like_log FROM artwork_id = $1 `;
    pool
      .query(queryText1, [artworkID])
      .then((result1) => {
          //if success, run 2nd query
          const sqlText2 = `DELETE FROM artwork_category WHERE artwork_id = $1`;
          pool.query(sqlText2, [artworkID])
          .then((result2) => {
            //if success, run 3rd query
            const sqlText3 = `DELETE FROM artwork WHERE id = $1`;
            pool.query(sqlText3, [artworkID])
            .then((result3) => {
                //success, all is ok
                res.sendStatus(200);
            })
            .catch(err3=> {
                console.error("failed deleting from artwork table: ", err3);
            })

          })
          .catch (err2 => {
              if (process.env.DEBUG) 
              console.log('failed deleting from artwork_category table: ', err2);
              res.sendStatus(500);

          })
      })
      .catch((err1) => {
          if (process.env.DEBUG) 
              console.log('failed deleting from like_log table: ', err1);
        res.sendStatus(500);
      });
     
  });

   
//this is to handle put request
router.put('/', (req, res) => {
  
    let newData = req.body;
    //console.log('artwork to update:', newData);
    const queryText = `UPDATE artwork SET title = $1, date = $2, image = $3, description = $4, category_id = $5 WHERE id = $6 `;
    pool
      .query(queryText, [newData.title, newData.date, newData.image, newData.description, newData.category_id, newData.artworkid])
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
