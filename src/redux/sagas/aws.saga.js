import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* awsSaga(){
  yield takeLatest('POST_IMAGE_URL', postImageUrl)
}

// POST an image url from AWS to Database
function* postImageUrl(action){
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const data = { aws: action.payload}
    const response = yield axios.post('/api/aws', data, config);
    console.log(response);
  } catch (error) {
    console.log('Image URL POST failed: ', error);
  }

}

export default awsSaga;