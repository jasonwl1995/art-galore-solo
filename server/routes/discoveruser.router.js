const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


//can we pass 2 params in req
router.get('/', rejectUnauthenticated, (req, res) => {

    console.log("processing discover user get request");
    //make sure both logged in user id and selected user id are passed in from query pamater list
    
    const uid = req.query['userid'];
    const discover_userid = req.query['discover_userid'];

    console.log('uid=', uid)
    console.log('discover_userid=', discover_userid)

    if (typeof uid === 'undefined' || typeof discover_userid === 'undefined')
        res.sendStatus(500);
    else
    {
        //let queryText = `select * from artwork order by user_id asc`;

        //this query returns list of artworks from selected user(artist =discovver_userid), together with a favorite count whether the logged in user (uid) like or not
        //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
        const queryText = `select art.*, cat.theme, usr.username, (select count(1) from like_log ll where ll.user_id = $1 and ll.artwork_id = art.id) as favorite
                        from artwork art, category cat, "user" usr where art.category_id = cat.id and art.user_id = usr.id and usr.id = $2 `;
    
        pool
        .query(queryText, [uid, discover_userid])
        .then((result) => {
            //if (process.env.DEBUG) 
            //    console.log('artwork list is:', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
                console.log('artwork retrieving failed: ', err);
            res.sendStatus(500);
        });
    }
  });


//can we pass multiple params in req??
//this requires artwork id, logged-in userid and discovered userid
router.get('/detail', rejectUnauthenticated, (req, res) => {

    console.log("processing discover user get request");
    //make sure both logged in user id and selected user id are passed in from query pamater list
    
    const artworkid = req.query['artworkid'];
    const uid = req.query['userid'];
    const discover_userid = req.query['discover_userid'];

    console.log('uid=', uid)
    console.log('discover_userid=', discover_userid)

    if (typeof artworkid === 'undefined' || typeof uid === 'undefined' || typeof discover_userid === 'undefined')
        res.sendStatus(500);
    else
    {
        //let queryText = `select * from artwork order by user_id asc`;

        //this query returns list of artworks from selected user(artist =discovver_userid), together with a favorite count whether the logged in user (uid) like or not
        //retrieve user name, category theme and whether or not an artwork is my like or not (favorite =0 unlike,  >0 like)
        const queryText = `SELECT art.*, cat.theme, usr.username, 
                        (SELECT count(1) FROM like_log ll WHERE ll.user_id = $1 AND ll.artwork_id = art.id) AS favorite
                        FROM artwork art, category cat, "user" usr WHERE art.category_id = cat.id AND art.user_id = usr.id AND usr.id = $2 `;
    
        pool
        .query(queryText, [uid, discover_userid])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
                console.log('artwork retrieving failed: ', err);
            res.sendStatus(500);
        });
    }
  });

  module.exports = router;