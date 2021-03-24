import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* artworkSaga() {
  yield takeLatest('FETCH_USER_ARTWORK', fetchUserArtwork);
  yield takeLatest('DISCOVER_GALLERY_ARTWORK', discoverGalleryArtwork);   //discover gallery
  yield takeLatest('DISCOVER_USER_ARTWORK', discoverUserArtwork); 

  yield takeLatest('FETCH_ARTWORK_DETAIL', fetchArtworkDetails);

  yield takeLatest('ADD_ARTWORK', addArtwork);
  yield takeLatest('EDIT_ARTWORK', editArtwork);
  yield takeLatest('DELETE_ARTWORK', deleteArtwork);

  yield takeLatest('FETCH_LIKE_ARTWORK', fetchLikeArtworks);
  yield takeLatest('UNLIKE_ARTWORK', unlikeArtwork);

  yield takeLatest('LIKE_ARTWORK_DETAIL', likeArtworkDetail);
  yield takeLatest('UNLIKE_ARTWORK_DETAIL', unlikeArtworkDetail);
}
//how to use a global flag??
const DEBUG=true;

//   Get all artwork from database
function* fetchUserArtwork(action) {
  try {
    // need for credentials ???
    const response = yield axios.get(`/api/artwork/${action.payload.userid}`);
    //if success, set the data to store
    if (response.status === 200)
    {
      yield put({ type: 'SET_ARTWORK', payload: response.data});
    }

  } catch (error) {
    console.log('fetch artwork request failed', error);
  }
}

// DISCOVER HOME PAGE
function* discoverGalleryArtwork(action) {

  try {
    const response = yield axios.get(`/api/artwork/discovergallery/${action.payload.userid}`);
    //if success, set the data to store
    if (response.status === 200)
    {
      yield put({ type: 'SET_ARTWORK', payload: response.data});
    }

  } catch (error) {
    console.log('fetch other artwork request failed', error);
  }
}


// Takes to gallery by user ID
function* discoverUserArtwork(action) {
  const data = action.payload;
  let queryURL = `/api/discoveruser?userid=${action.payload.userid}&discover_userid=${data.discover_userid}`;

  try {
    const response = yield axios.get(queryURL);
    //if success, set the data to store
    if (response.status === 200)
    {
      yield put({ type: 'SET_ARTWORK', payload: response.data});
    }

  } catch (error) {
    console.log('discoverUserArtwork request failed', error);
  }
}

// Get artwork detail from database
function* fetchArtworkDetails(action){
  try{
    const details = yield axios.get(`/api/artwork/${action.payload.userId}/${action.payload.artworkId}`);
    console.log('GET ARTWORK details', details.data);
    yield put({
      type: 'SET_DETAIL',
      payload: details.data,
    });
  } catch(err) {
    console.log('get detail error', err);
  }
}
// worker Saga: will be fired on "ADD_ARTWORK" actions

// Post new artwork to database
function* addArtwork(action) {

    let data = action.payload;

    if (DEBUG) {
        console.log('start of addArtwork, data=', data);
    }

    try {
      // need for credentials ???
      const response = 
      yield axios.post('/api/artwork', data);

      // if (DEBUG)
      // {
      //     console.log('response is:', response);
      //     console.log('response status is:', response.status);
      //     console.log('response data is:', response.data);
      // }


      // //need to set up message to let use know the status of adding artwork
      // //if (response.data === 'OK')
      // if (response.status === 200)
      // {
      //   yield put({ type: 'SET_ACTION_MSG', payload: 'The artwork has been successfully added'});
      // }
      // else
      // {
      //   yield put({ type: 'SET_ACTION_MSG', payload: 'Failed adding the artwork. Please try again.' });
      // }

    } catch (error) {
      console.log('Category get request failed', error);
    }
}

function* editArtwork(action) {
  try {
    yield axios.put('/api/artwork/', action.payload);
    console.log("update success");
    
  } catch (err) {
    console.log(' SAGA ERROR PUT', err);
  }
}

// worker Saga: will be fired on "DETELE_ARTWORK" actions, artowrk id should be in action.payload
function* deleteArtwork(action) {
  try {
    // need for credentials ???
    const response = yield axios.delete(`/api/artwork/${action.payload.artworkid}`);

    //if successfully deteled the artwork, need to refresh store with database data, so kick off a FETCH....
    if (response.status === 200)
    {
      yield put({ 
        type: 'FETCH_USER_ARTWORK', 
        payload: {userid: action.payload.userid}
      });
    }

  } catch (error) {
    console.log('delete artwork request failed', error);
  }
}

function* addLike(action) {
  console.log('in addLike', action.payload);

  // post favorite to database
  try {
    yield axios.post(`/api/likes/`, action.payload); // this is the url from the user clicking the fav button.

    // update favoriteReducer
    yield put({
      // put is dispatching the information to be grabbed by whoever.
      type: 'FETCH_LIKES', // this is being caught by RootSaga which is then being sent to function fetchFavorites()
    });
  } catch (err) {
    console.log('Error in LIKES post', err);
  }
} // end addFavorite

// function* fetchLikes() {
//   try {
//     let response = yield axios.get('/api/likes');
//     yield put({
//       type: 'SET_LIKES',
//       payload: response.data,
//     });
//   } catch (err) {
//     console.log('fetch error', err);
//   }
// } // end fetchFavorites


function* fetchLikeArtworks(action) {
  let data = action.payload;
  try {
    const response = 
    yield axios.get(`/api/artwork/querylikes/${data.userid}`);
    if (response.status === 200)
    {
      yield put({ 
        type: 'SET_LIKE_ARTWORK', 
        payload: response.data
        });
    }
  } catch (error) {
    console.log('fetchLikeArtwork request failed', error);
  }
}

function* unlikeArtwork(action) {
  let data = action.payload;
  try {
    const response = 
    yield axios.put('/api/artwork/unlike', data);

    if (response.status === 200)
    {
      console.log('ready to re-pull liked list', data.userid);
      yield put({ 
        type: 'FETCH_LIKE_ARTWORK', 
        payload: {
          userid: data.userid
          }});
    }

  } catch (error) {
    console.log('unlikeArtwork request failed', error);
  }
}

function* likeArtworkDetail(action) {

  let data = action.payload;

  try {
    const response = yield axios.put('/api/artwork/like', data);

    if (response.status === 200)
    {
      yield put({ 
        type: 'FETCH_ARTWORK_DETAIL', 
        payload: {
          artworkid: data.artworkid, 
          userid: data.userid}}); 
    }
  } catch (error) {
    console.log('likeArtworkDetail request failed', error);
  }
}

function* unlikeArtworkDetail(action) {
  let data = action.payload;

  try {
    // need for credentials ???
    const response = yield axios.put('/api/artwork/unlike', data);

    if (response.status === 200)
    {
      yield put({ 
        type: 'FETCH_ARTWORK_DETAIL', 
        payload: {
          artworkid: data.artworkid, 
          userid: data.userid}}); 
    }

  } catch (error) {
    console.log('unlikeArtworkDetail request failed', error);
  }
}

export default artworkSaga;