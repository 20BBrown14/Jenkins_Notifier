import { put, call, takeLatest } from 'redux-saga/effects';
import { A_VALIDATE_REPO_URL, invalidRepoURL, A_VALID_REPO_URL } from './actions';
import request from '../modules/dataLoadSagas';

/**
 * Saga to validate a repo url
 * @param {object} action
 */
export function* validateRepo(action) {
  try {
    const repoURL = action.data.URL;
    if (!repoURL.endsWith('/api/json') && !repoURL.endsWith('/api/json/')) {
      yield put(invalidRepoURL('URL should be appended with \'/api/json\''));
      return;
    }
    const json = yield call(request, action.data.URL);
    if (json.data) {
      yield put({ type: A_VALID_REPO_URL, data: json.data });
    } else {
      yield put(invalidRepoURL(json.err.message));
    }
  } catch (e) {
    yield put(invalidRepoURL('Error making network request'));
  }
}

function* PopupSaga() {
  yield takeLatest(A_VALIDATE_REPO_URL, validateRepo);
}

export default [PopupSaga];
