import reducers, { POPUP_STATE as REDUCER_KEY } from '../../../src/Popup/reducers';
import { A_JOB_INPUT_DATA_CHANGED, A_VALID_REPO_URL, A_INVALID_REPO_URL } from '../../../src/Popup/actions';

describe('Popup reducers', () => {
  describe('when initialized', () => {
    it('should return a state object', () => {
      const state = reducers[REDUCER_KEY](undefined, {});
      expect(state).not.toBeNull();
      expect(state).toBeTruthy();
    });
  });
  describe('When reducing A_JOB_INPUT_DATA_CHANGED', () => {
    let newState;
    beforeAll(() => {
      const action = {
        type: A_JOB_INPUT_DATA_CHANGED,
        data: { newValue: 'someURL' },
      };
      const oldState = {
        formInvalid: true,
      };
      newState = reducers[REDUCER_KEY](oldState, action);
    });
    it('should update jobInputURL', () => {
      expect(newState.jobInputURL).toEqual('someURL');
    });
    it('should update formInvalid to false', () => {
      expect(newState.formInvalid).toBeFalsy();
    });
    it('should update helpMessage', () => {
      expect(newState.helpMessage).not.toBeUndefined();
    });
  });
  describe('When reducing A_VALID_REPO_URL', () => {
    let newState;
    beforeAll(() => {
      const action = {
        type: A_VALID_REPO_URL,
        data: { json: 'json' },
      };
      newState = reducers[REDUCER_KEY](undefined, action);
    });
    it('should add network response to state', () => {
      expect(newState.jsonData).not.toBeUndefined();
      expect(newState.jsonData).toEqual('json');
    });
    it('should update helpMessage', () => {
      expect(newState.helpMessage).not.toBeUndefined();
    });
  });
  describe('When reducing A_INVALID_REPO_URL', () => {
    it('updates formInvalid to true', () => {
      const newState = reducers[REDUCER_KEY](undefined, { type: A_INVALID_REPO_URL });
      expect(newState.formInvalid).toBeTruthy();
    });
  });
});
