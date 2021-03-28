import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* categorySaga() {
  yield takeLatest('FETCH_CATEGORY_LIST', fetchCategory);
}
//how to use a global flag??
const DEBUG=true;

// worker Saga: will be fired on "FETCH_CATEGORY" actions
function* fetchCategory() {
    if (DEBUG) {
        console.log('start of fetchCategory');
    }

    try {
      // no need for credentials
      // this retrives category list and save it in store
      const category = yield axios.get('/api/category');

      if (DEBUG)
          console.log('category is:', category);


      yield put({ 
        type: 'SET_CATEGORY_LIST', 
        payload: category.data 
        });
    } catch (error) {
      console.log('Category get request failed', error);
    }
}





export default categorySaga;
