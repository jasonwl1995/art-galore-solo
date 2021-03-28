const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

////////////////////////////////////////////////////////////
//input: action.payload.userId  -- this is the currently logged in user ID
//       action.payload.categoryId  -- this is the categoryId selected by user from category list
//what it does:  get all artowrks from all other artists (not including currently logged in user) 
//               and category_id=action.payload.categoryId
//output: artwork list from others and of the type of categoryId (it includes favorite count by me -- the logged in user)
////////////////////////////////////////////////////////////
router.get('/userId=:uid/categoryId=:cid', rejectUnauthenticated, (req, res) => {
  const userId = req.params.uid;
  const categoryId = req.params.cid;
  console.log('retrieve artwork list, logged in user=', userId);    
  console.log('retrieve artwork list by cid', categoryId);    

const queryText = `select art.*, cat.theme, usr.username, (select count(1) from like_log ll where ll.user_id = $1 and ll.artwork_id = art.id) as favorite
                  from artwork art, category cat, "user" usr 
                  where art.category_id = cat.id and art.user_id = usr.id and cat.id = $2 and usr.id <> $1 `;
pool
  .query(queryText, [userId, categoryId])
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
//input: action.payload.userId  -- this is the currently logged in user ID
//       action.payload.categoryId  -- this is the categoryId selected by user from category list
//       action.payload.discover_userId  -- this is the user ID select from the user drop-down list
//what it does:  get all artowrks from artist (discover_userId) 
//               and category_id=action.payload.categoryId
//               action.payload.userId is used to calculate favorite count
//output: artwork list from artist discover_userId and of the category_id = action.payload.categoryId
////////////////////////////////////////////////////////////
router.get('/user/userId=:uid/categoryId=:cid/discover_userId=:did', rejectUnauthenticated, (req, res) => {
  const userId = req.params.uid;
  const categoryId = req.params.cid;
  const discover_userId = req.params.did;
  console.log('retrieve active category list by uid', userId);    
  console.log('retrieve active category list by cid', categoryId);    
  console.log('retrieve active category list by did', discover_userId);    
  let user_id = req.params.id;
  if (process.env.DEBUG) {
    console.log('retrieve active category list for user:', userId);
  }

const queryText = `select art.*, cat.theme, usr.username, (select count(1) from like_log ll where ll.user_id = $1 and ll.artwork_id = art.id) as favorite
                  from artwork art, category cat, "user" usr 
                  where art.category_id = cat.id and art.user_id = usr.id and cat.id = $2 and usr.id = $3 `;
pool
  .query(queryText, [userId, categoryId, discover_userId])
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
