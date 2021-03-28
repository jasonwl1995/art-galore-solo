/* Import Libraries */
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Creates rootSaga Generator function
function* artworkSaga() {
  yield takeLatest('FETCH_USER_ARTWORK', fetchUserArtwork);
  yield takeLatest('DISCOVER_GALLERY_ARTWORK', discoverGalleryArtwork);   // Discover gallery
  yield takeLatest('DISCOVER_USER_ARTWORK', discoverUserArtwork);         // Discover user gallery

  yield takeLatest('FETCH_ARTWORK_DETAIL', fetchArtworkDetails);

  yield takeLatest('ADD_ARTWORK', addArtwork);
  yield takeLatest('EDIT_ARTWORK', editArtwork);
  yield takeLatest('DELETE_ARTWORK', deleteArtwork);

  yield takeLatest('FETCH_LIKE_ARTWORK', fetchLikeArtworks);
  yield takeLatest('UNLIKE_ARTWORK', unlikeArtwork);

  yield takeLatest('LIKE_ARTWORK_DETAIL', likeArtworkDetail);
  yield takeLatest('UNLIKE_ARTWORK_DETAIL', unlikeArtworkDetail);
}

//  GET all logged in user artwork from database
function* fetchUserArtwork(action) {
  try {
    const response = yield axios.get(`/api/artwork/${action.payload.userid}`);
    if (response.status === 200)
    {
      yield put({ type: 'SET_ARTWORK', payload: response.data});
    }
  } catch (error) {
    console.log('fetch artwork request failed', error);
  }
}

// GET all artworks from database
function* discoverGalleryArtwork(action) {

  try {
    const response = yield axios.get(`/api/artwork/discovergallery/${action.payload.userid}`);
    if (response.status === 200)
    {
      yield put({ type: 'SET_ARTWORK', payload: response.data});
    }
  } catch (error) {
    console.log('fetch other artwork request failed', error);
  }
}

// GET artworks by user ID 
function* discoverUserArtwork(action) {

  const data = action.payload;
  let queryURL = `/api/discoveruser?userid=${action.payload.userid}&discover_userid=${data.discover_userid}`;

  try {
    const response = yield axios.get(queryURL);
    if (response.status === 200)
    {
      yield put({ type: 'SET_ARTWORK', payload: response.data});
    }
  } catch (error) {
    console.log('discoverUserArtwork request failed', error);
  }
}

// GET artwork detail from database
function* fetchArtworkDetails(action){
  try{
    const details = yield axios.get(`/api/artwork/${action.payload.userId}/${action.payload.artworkId}`);
    yield put({
      type: 'SET_DETAIL',
      payload: details.data,
    });
  } catch(err) {
    console.log('get detail error', err);
  }
}

// POST new artwork to database
function* addArtwork(action) {
    let data = action.payload;
    try {
      const response = 
        yield axios.post('/api/artwork', data);
    } catch (error) {
      console.log('Category get request failed', error);
    }
}

// PUT updated artwork details in DB
function* editArtwork(action) {
  try {
    yield axios.put('/api/artwork/', action.payload);
    console.log("update success");
    
  } catch (err) {
    console.log(' SAGA ERROR PUT', err);
  }
}

// worker Saga: will be fired on "DETELE_ARTWORK" actions, artwork id should be in action.payload
// DELETE an artwork from database
function* deleteArtwork(action) {
  try {
    const response = yield axios.delete(`/api/artwork/${action.payload.artworkid}`);
    if (response.status === 200)
    {
      yield put({ 
        //FETCHES USER ARTWORKS AGAIN WITHOUT DELETED TO DISPLAY ON DOM
        type: 'FETCH_USER_ARTWORK', 
        payload: {userid: action.payload.userid}
      });
    }

  } catch (error) {
    console.log('delete artwork request failed', error);
  }
}

// GET all artworks liked by the user
function* fetchLikeArtworks(action) {
  let data = action.payload;
  try {
    const response = 
    yield axios.get(`/api/likes/${data.userId}`);
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

// PUT or REMOVE liked image from LIKES PAGE
function* unlikeArtwork(action) {
  let data = action.payload;
  try {
    const response = 
    yield axios.put('/api/likes/unlike', data);

    if (response.status === 200)
    {
      console.log('ready to re-pull liked list', data.userId);
      yield put({ 
        type: 'FETCH_LIKE_ARTWORK', 
        payload: {
          userId: data.userId
          }});
    }
  } catch (error) {
    console.log('unlikeArtwork request failed', error);
  }
}

// PUT artwork to like_log DB table from details page
function* likeArtworkDetail(action) {
  let data = action.payload;
  console.log('data', data);
  try {
    const response = yield axios.put('/api/likes/like', data);

    if (response.status === 200)
    {
      yield put({ 
        type: 'FETCH_ARTWORK_DETAIL', 
        payload: {
          artworkId: data.artworkId, 
          userId: data.userId
        }}); 
    }
  } catch (error) {
    console.log('likeArtworkDetail request failed', error);
  }
}

// PUT or REMOVE liked image from Likes on DETAILS page
function* unlikeArtworkDetail(action) {
  let data = action.payload;
console.log('unlikeArtworkDetail', data);
  try {
    // need for credentials ???
    const response = yield axios.put('/api/likes/unlike', data);

    if (response.status === 200)
    {
      yield put({ 
        type: 'FETCH_ARTWORK_DETAIL', 
        payload: {
          artworkId: data.artworkId, 
          userId: data.userId
          }}); 
    }

  } catch (error) {
    console.log('unlikeArtworkDetail request failed', error);
  }
}

export default artworkSaga;