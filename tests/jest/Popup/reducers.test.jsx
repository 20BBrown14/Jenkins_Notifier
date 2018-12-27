import reducers, { POPUP_STATE as REDUCER_KEY } from '../../../src/Popup/reducers';
import {
  A_URL_INPUT_DATA_CHANGED,
  A_VALID_REPO_URL,
  A_INVALID_REPO_URL,
  A_NAME_INPUT_DATA_CHANGED,
  A_CONFIRM_BUTTON_CLICKED,
} from '../../../src/Popup/actions';

describe('Popup reducers', () => {
  describe('when initialized', () => {
    it('should return a state object', () => {
      const state = reducers[REDUCER_KEY](undefined, {});
      expect(state).not.toBeNull();
      expect(state).toBeTruthy();
    });
  });
  describe('When reducing A_URL_INPUT_DATA_CHANGED', () => {
    let newState;
    beforeAll(() => {
      const action = {
        type: A_URL_INPUT_DATA_CHANGED,
        data: { newValue: 'someURL' },
      };
      const oldState = {
        repoURL: 'anotherURL',
        formInvalid: true,
        errorMessage: 'oldErrorMessage',
        validated: true,
        confirmed: true,
      };
      newState = reducers[REDUCER_KEY](oldState, action);
    });
    it('should update repoURL', () => {
      expect(newState.repoURL).toEqual('someURL');
    });
    it('should update formInvalid to false', () => {
      expect(newState.formInvalid).toBeFalsy();
    });
    it('should update helpMessage', () => {
      expect(newState.helpMessage).toBeDefined();
    });
    it('should clear error message', () => {
      expect(newState.errorMessage).toBeUndefined();
    });
    it('should update validated to false', () => {
      expect(newState.validated).toBeFalsy();
    });
    it('should update confirmed to false', () => {
      expect(newState.confirmed).toBeFalsy();
    });
  });
  describe('When reducing A_NAME_INPUT_DATA_CHANGED', () => {
    let newState;
    beforeAll(() => {
      const action = {
        type: A_NAME_INPUT_DATA_CHANGED,
        data: { newValue: 'someName' },
      };
      const oldState = {
        repoName: 'anotherName',
        confirmed: true,
      };
      newState = reducers[REDUCER_KEY](oldState, action);
    });
    it('should update repoName', () => {
      expect(newState.repoName).toEqual('someName');
    });
    it('should clear error message', () => {
      expect(newState.errorMessage).toBeUndefined();
    });
    it('should update confirmed to false', () => {
      expect(newState.confirmed).toBeFalsy();
    });
  });
  describe('When reducing A_VALID_REPO_URL', () => {
    let newState;
    beforeAll(() => {
      const action = {
        type: A_VALID_REPO_URL,
        data: { jsonData: 'json' },
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
    let newState;
    beforeAll(() => {
      const action = {
        type: A_INVALID_REPO_URL,
        data: {
          errorMessage: 'someErrorMessage',
        },
      };
      const oldState = {
        validated: true,
      };
      newState = reducers[REDUCER_KEY](oldState, action);
    });
    it('updates formInvalid to true', () => {
      expect(newState.formInvalid).toBeTruthy();
    });
    it('updates error message', () => {
      expect(newState.errorMessage).toEqual('someErrorMessage');
    });
    it('updates validated to false', () => {
      expect(newState.validated).toBeFalsy();
    });
  });
  describe('When reducing A_CONFIRM_BUTTON_CLICKED', () => {
    it('should update confirmed to true', () => {
      const action = {
        type: A_CONFIRM_BUTTON_CLICKED,
      };
      const newState = reducers[REDUCER_KEY](undefined, action);
      expect(newState.confirmed).toBeTruthy();
    });
  });
});
