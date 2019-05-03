import reducers, { STATUS_STATE as REDUCER_KEY } from '../../../src/Status/reducers';
import { A_VIEW_JOBS_CLICKED, A_GO_BACK_TO_REPO_VIEW } from '../../../src/Status/actions';
import { A_REFRESH_REPO, A_REPO_IS_REFRESHED } from '../../../src/actions';

describe('Status Reducers', () => {
  describe('When initialized', () => {
    it('should return a state object', () => {
      const state = reducers[REDUCER_KEY](undefined, {});
      expect(state).not.toBeNull();
      expect(state).toBeTruthy();
    });
  });

  describe('When reducing A_VIEW_JOBS_CLICKED', () => {
    it('should add the repo to view to the state', () => {
      const action = {
        type: A_VIEW_JOBS_CLICKED,
        data: { repoToView: 'someRepoToView' },
      };
      const newState = reducers[REDUCER_KEY](undefined, action);
      expect(newState).toBeDefined();
      expect(newState.repoToView).toBeDefined();
      expect(newState.repoToView).toEqual('someRepoToView');
    });
  });

  describe('When reducing A_GO_BACK_TO_REPO_VIEW', () => {
    it('should set repoToView to undefined', () => {
      const action = {
        type: A_GO_BACK_TO_REPO_VIEW,
      };
      const newState = reducers[REDUCER_KEY](undefined, action);
      expect(newState).toBeDefined();
      expect(newState.repoToView).toBeUndefined();
    });
  });

  describe('When reducing A_REFRESH_REPO', () => {
    it('should set isLoading to true', () => {
      const action = {
        type: A_REFRESH_REPO,
      };
      const oldState = { isLoading: false };
      const newState = reducers[REDUCER_KEY](oldState, action);
      expect(newState).toBeDefined();
      expect(newState.isLoading).toBeTruthy();
    });
  });

  describe('When reducing A_REPO_IS_REFRESHED', () => {
    it('should set isLoading to false', () => {
      const action = {
        type: A_REPO_IS_REFRESHED,
      };
      const oldState = { isLoading: true };
      const newState = reducers[REDUCER_KEY](oldState, action);
      expect(newState).toBeDefined();
      expect(newState.isLoading).toBeFalsy();
    });
  });
});
