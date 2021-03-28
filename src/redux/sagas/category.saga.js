import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* categorySaga() {
  yield takeLatest('FETCH_CATEGORY_LIST', fetchCategory);
}

// worker Saga: will be fired on "FETCH_CATEGORY" actions
// GET categories to display in category dropdown on add artwork
function* fetchCategory() {
    try {
      // this retrives category list and save it in store
      const category = yield axios.get('/api/category');
      yield put({ 
        type: 'SET_CATEGORY_LIST', 
        payload: category.data 
        });
    } catch (error) {
      console.log('Category get request failed', error);
    }
}

export default categorySaga;
