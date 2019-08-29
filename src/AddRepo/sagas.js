import { put, call, takeLatest, take, race } from 'redux-saga/effects';
import { A_VALIDATE_REPO_URL, invalidRepoURL, A_VALID_REPO_URL, A_CANCEL_CLICKED } from './actions';
import request from '../modules/dataLoadSagas';

/**
 * Saga to validate a repo url
 * @param {object} action
 * @yields {object} invalidRepoURL action if url is not properly formatted or
 * there was a problem while making the network call
 */
export function* validateRepo(action) {
  try {
    let repoURL = action.data.URL;
    // eslint-disable-next-line no-useless-escape
    const URLRegex = RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+\%,;=.]+$/);
    const apiRegex = RegExp(/(\/{1,}api\/{1,}json\/{0,})/);
    if (!URLRegex.test(repoURL)) {
      yield put(invalidRepoURL('Invalid URL format'));
      return;
    }
    if (!apiRegex.test(repoURL)) {
      repoURL += '/api/json';
    }

    const { response } = yield race({
      response: call(request, repoURL),
      cancel: take(A_CANCEL_CLICKED),
    });
    if (response) {
      if (response.data) {
        yield put({ type: A_VALID_REPO_URL, data: { jsonData: response.data } });
      } else {
        yield put(invalidRepoURL(response.err.message));
      }
    }
  } catch (e) {
    yield put(invalidRepoURL('Error making network request'));
  }
}

function* PopupSaga() {
  yield takeLatest(A_VALIDATE_REPO_URL, validateRepo);
}

export default [PopupSaga];
