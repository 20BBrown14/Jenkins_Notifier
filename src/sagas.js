import { put, call, takeEvery, race } from 'redux-saga/effects';
import { A_REFRESH_REPO, repoIsRefreshedAction } from './actions';
import request from './modules/dataLoadSagas';

/**
 * Saga to validate a repo url
 * @param {object} action
 */
export function* refreshRepo(action) {
  let repoURL = action.data.url;
  if (!repoURL.endsWith('/api/json') || !repoURL.endsWith('/api/json/')) {
    repoURL = `${repoURL}api/json`;
  }
  const { response } = yield race({
    response: call(request, repoURL),
  });
  if (response) {
    if (response.data) {
      yield put(repoIsRefreshedAction(response.data, action.data.repoName));
    }
  }
}

function* AppSagas() {
  yield takeEvery(A_REFRESH_REPO, refreshRepo);
}

export default [AppSagas];
