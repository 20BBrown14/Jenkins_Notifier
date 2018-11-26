import { put, call, takeLatest } from 'redux-saga/effects';
import { A_VALIDATE_REPO_URL } from './actions';

/**
 * Saga to validate a repo url
 * @param {object} action
 */
export function* validateRepo(action) {
  console.log(action.data.jobInputURL);
}

function* PopupSaga() {
  yield takeLatest(A_VALIDATE_REPO_URL, validateRepo);
}

export default [PopupSaga];
