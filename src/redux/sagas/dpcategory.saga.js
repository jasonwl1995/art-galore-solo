import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Creates categorySAGA Generator function
function* dpCategorySaga() {
  yield takeLatest('FETCH_ACTIVE_CATEGORY', fetchActiveCategory);
  yield takeLatest('FETCH_ACTIVE_CATEGORY_BY_USER', fetchActiveCategoryByUser);

  yield takeLatest('FETCH_ACTIVE_ARTWORK', fetchActiveArtwork);
  yield takeLatest('FETCH_ACTIVE_ARTWORK_BY_USER', fetchActiveArtworkByUser);
}

//input: action.payload.userId  -- this is the logged in user ID
//what it does:  discover all categories from other artists
//output: category list (NOT including categories from currently logged-in user)  
//                  -- this is for the discover feature)

function* fetchActiveCategory(action) {
  console.log("inside fetchActiveCategory all");
    try {
      const response = yield axios.get(`/api/dpcategory/${action.payload.userId}`);

      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      yield put({ type: 'SET_ACTIVE_CATEGORY', payload: response.data });
    } catch (error) {
      console.log('fetchActiveCategory get request failed', error);
    }
}



//input: action.payload.discover_userId  -- this is the user ID select from the drop-down list
//what it does:  discover all categories from for this selected user
//output: category list for this user (discover_userId)

function* fetchActiveCategoryByUser(action) {
  console.log("inside fetchActiveCategoryByUser all");
    try {
      const response = yield axios.get(`/api/dpcategory/user/${action.payload.discover_userId}`);
      console.log('RESPONSE!!!!!!!!', response.data);
      yield put({ type: 'SET_ACTIVE_CATEGORY', payload: response.data });
    } catch (error) {
      console.log('fetchActiveCategoryByUser get request failed', error);
    }
}

//input: action.payload.userId  -- this is the currently logged in user ID
//       action.payload.categoryId  -- this is the categoryId selected by user from category list
//what it does:  get all artowrks from all other artists (not including currently logged in user) 
//               and category_id=action.payload.categoryId
//output: artwork list from others and of the type of categoryId

function* fetchActiveArtwork(action) {
  const data = action.payload
  console.log('start of fetchActiveArtwork', data);

  try {
    const response = yield axios.get(`/api/dpartwork/userId=${data.userId}/categoryId=${data.categoryId}`);

    yield put({ type: 'SET_ARTWORK', payload: response.data });
  } catch (error) {
    console.log('fetchActiveArtwork get request failed', error);
  }
}


//input: action.payload.userId  -- this is the currently logged in user ID
//       action.payload.categoryId  -- this is the categoryId selected by user from category list
//       action.payload.discover_userId  -- this is the user ID select from the user drop-down list
//what it does:  get all artowrks from artist (discover_userId) 
//               and category_id=action.payload.categoryId
//               action.payload.userId is used to calculate favorite count
//output: artwork list from artist discover_userId and of the category_id = action.payload.categoryId

function* fetchActiveArtworkByUser(action) {
  const data = action.payload
  console.log('start of fetchActiveArtworkByUser', data);

  try {
    const response = yield axios.get(`/api/dpartwork/user/userId=${data.userId}/categoryId=${data.categoryId}/discover_userId=${data.discover_userId}`);
    console.log('response is:', response);
    yield put({ type: 'SET_ARTWORK', payload: response.data });
  } 
  catch (error) {
    console.log('fetchActiveArtworkByUser get request failed', error);
  }
}

export default dpCategorySaga;
