import { put, call, takeLatest } from 'redux-saga/effects';
import { A_VALIDATE_REPO_URL, A_INVALID_REPO_URL, A_VALID_REPO_URL } from './actions';
import request from '../modules/dataLoadSagas';

/**
 * Saga to validate a repo url
 * @param {object} action
 */
export function* validateRepo(action) {
  try {
    const json = yield call(request, action.data.URL);
    if (json.status === 1) {
      yield put({ type: A_VALID_REPO_URL, data: json });
    } else {
      yield put({ type: A_INVALID_REPO_URL });
    }
  } catch (e) {
    yield put({ type: A_INVALID_REPO_URL });
  }
}

function* PopupSaga() {
  yield takeLatest(A_VALIDATE_REPO_URL, validateRepo);
}

export default [PopupSaga];
