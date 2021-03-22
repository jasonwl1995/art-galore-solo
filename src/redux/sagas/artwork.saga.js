import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* artworkSaga() {
  yield takeLatest('FETCH_USER_ARTWORK', fetchUserArtwork);
  yield takeLatest('DISCOVER_GALLERY_ARTWORK', discoverGalleryArtwork);   //discover gallery

  yield takeLatest('FETCH_DETAIL', fetchArtworkDetails);

  yield takeLatest('ADD_ARTWORK', addArtwork);
  yield takeLatest('EDIT_ARTWORK', editArtwork);
  yield takeLatest('DELETE_ARTWORK', deleteArtwork);
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

// Get artwork detail from database
function* fetchArtworkDetails(action){
  try{
    const details = yield axios.get(`/api/artwork/${action.payload.id}`);
    console.log('GET ARTWORK details', details.data);
    yield put({
      type: 'SET_DETAILS',
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
    yield put({
      type:'FETCH_DETAIL',
      payload: artwork.id
      })
  } catch (error) {
    console.log(' SAGA ERROR PUT', err);
  }
}

function* deleteArtwork(action) {
  try{
    yield axios.delete(`/api/artwork/${action.payload}`);
    yield put ({
      type: 'FETCH_ARTWORK'
    });
  } catch (error) {
    alert('error deleting item')
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

function* fetchLikes() {
  try {
    let response = yield axios.get('/api/likes');
    yield put({
      type: 'SET_LIKES',
      payload: response.data,
    });
  } catch (err) {
    console.log('fetch error', err);
  }
} // end fetchFavorites


export default artworkSaga;
