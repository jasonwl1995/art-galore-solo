const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//input: action.payload.userId  -- this is the logged in user ID
//what it does:  discover all categories from other artists
//output: category list (NOT including categories from currently logged-in user)  
//                  -- this is for the discover feature)
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

router.get('/:id', rejectUnauthenticated, (req, res) => {

    const userId = req.params.id;
  console.log('retrieve active category list: userId=', userId);
  
  const queryText = `select category.id, theme, count(1) as category_count 
                    from "artwork", "category" 
                    where "artwork".category_id = "category".id and "artwork".user_id <> $1 
                    group by (category.id, theme) order by theme asc`;
  pool
    .query(queryText, [userId])
    .then((result) => {
        if (process.env.DEBUG) 
            console.log('retrieve active category list is:', result.rows);
        res.send(result.rows);
    })
    .catch((err) => {
        if (process.env.DEBUG) 
            console.log('retrieve active category list failed: ', err);
      res.sendStatus(500);
    });
});


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//input: action.payload.discover_userId  -- this is the user ID selected from the drop-down list
//what it does:  discover all categories from for this selected user
//output: category list for this user (discover_userId)
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
router.get('/user/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  console.log('retrieve active category list: userId=', userId);
  
  const queryText = `select category.id, theme, count(1) as category_count 
                     from "artwork", "category" 
                     where "artwork".category_id = "category".id and "artwork".user_id = $1
                     group by (category.id, theme) order by theme asc`;
  pool
    .query(queryText, [userId])
    .then((result) => {
        if (process.env.DEBUG) 
            console.log('retrieve active category list is:', result.rows);
        res.send(result.rows);
    })
    .catch((err) => {
        if (process.env.DEBUG) 
            console.log('retrieve active category list failed: ', err);
      res.sendStatus(500);
    });
});


module.exports = router;
