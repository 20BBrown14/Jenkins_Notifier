import reducers, { STATUS_STATE as REDUCER_KEY } from '../../../src/Status/reducers';
import { A_VIEW_JOBS_CLICKED } from '../../../src/Status/actions';

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
});
