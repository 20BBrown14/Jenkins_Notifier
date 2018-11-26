import reducers, { POPUP_STATE as REDUCER_KEY } from '../../../src/Popup/reducers';
import { A_JOB_INPUT_DATA_CHANGED } from '../../../src/Popup/actions';

describe('Popup reducers', () => {
  describe('when initialized', () => {
    it('should return a state object', () => {
      const state = reducers[REDUCER_KEY](undefined, {});
      expect(state).not.toBeNull();
      expect(state).toBeTruthy();
    });
  });
  describe('When reducing A_JOB_INPUT_DATA_CHANGED', () => {
    it('should update jobInputURL', () => {
      const action = {
        type: A_JOB_INPUT_DATA_CHANGED,
        data: { newValue: 'someURL' },
      };
      const newState = reducers[REDUCER_KEY](undefined, action);
      expect(newState.jobInputURL).toEqual('someURL');
    });
  });
});
