import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
// GET logged in user
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_USER" actions
// GET list of users with artworks to display in dropdown list
function* fetchUserList() {
  try {
    const response = yield axios.get('/api/user/list');

    yield put({ type: 'SET_USER_LIST', payload: response.data });
  } catch (error) {
    console.log('UserList get request failed', error);
  }
}

// GET user details from DB
function* fetchUserDetails(action){
  console.log('fetching user detail', action.payload);
  try{
    const details = yield axios.get(`/api/user/detail/${action.payload.userId}`);
    console.log('GET USER details', details.data);
    yield put({
      type: 'SET_USER_DETAIL',
      payload: details.data,
    });
  } catch(err) {
    console.log('get detail error', err);
  }
}

// PUT updated user info into DB
function* editUser(action) {
  try {
    yield axios.put('/api/user/', action.payload);
    yield put({
      type: 'FETCH_USER_DETAIL',
      payload: {
        userId: action.payload.id
        }
    })
  } catch (err) {
    console.log(' SAGA ERROR EDITUSER PUT', err);
  }
}

// Creates userSaga Generator function
function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_LIST', fetchUserList);
  yield takeLatest('FETCH_USER_DETAIL', fetchUserDetails);
  yield takeLatest('EDIT_USER', editUser);
}

export default userSaga;
