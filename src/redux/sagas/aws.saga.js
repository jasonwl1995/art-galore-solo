import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* awsSaga(){
  yield takeLatest('POST_IMAGE_URL', postImageUrl)
}

function* postImageUrl(action){
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const data = {
      aws: action.payload
    }

    console.log('POSTING IMAGE URL!');
    const response = yield axios.post('/api/aws', data, config);
    console.log(response);
    
    //AFTER POST COMES BACK SUCCESSFUL, DO A GET
    
  } catch (error) {
    console.log('Image URL POST failed: ', error);
  }

}

export default awsSaga;