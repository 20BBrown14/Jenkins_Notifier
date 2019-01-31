import { put } from 'redux-saga/effects';
import { A_REFRESH_REPO, A_REPO_IS_REFRESHED } from '../../src/actions';
import { refreshRepo } from '../../src/sagas';

describe('App Sagas', () => {
  describe('When refreshing repo information', () => {
    describe('When url is valid', () => {
      it('Dispatches A_VALID_REPO_URL action', () => {
        const action = {
          type: A_REFRESH_REPO,
          data: { url: 'someUrl/api/json', repoName: 'someName' },
        };
        const refresh = refreshRepo(action);
        refresh.next();
        const result = refresh.next({ response: { data: 1 } });
        expect(result.value).toEqual(put({ type: A_REPO_IS_REFRESHED, data: { data: 1, repoName: 'someName' } }));
      });
    });
  });
});
