import reducers, { POPUP_STATE as REDUCER_KEY } from '../../../src/AddRepo/reducers';
import {
  A_URL_INPUT_DATA_CHANGED,
  A_VALID_REPO_URL,
  A_INVALID_REPO_URL,
  A_NAME_INPUT_DATA_CHANGED,
  A_CONFIRM_BUTTON_CLICKED,
  A_CANCEL_CLICKED,
  A_VALIDATE_REPO_URL,
} from '../../../src/AddRepo/actions';

describe('Popup reducers', () => {
  describe('when initialized', () => {
    it('should return a state object', () => {
      const state = reducers[REDUCER_KEY](undefined, {});
      expect(state).not.toBeNull();
      expect(state).toBeTruthy();
      const {
        repoURL,
        repoName,
        helpMessage,
        formInvalid,
        errorMessage,
        validated,
        confirmed,
        isLoading,
      } = state;
      expect(repoURL).toEqual('');
      expect(repoName).toEqual('');
      expect(helpMessage).toEqual('Repo URL should be appended with \'/api/json\'');
      expect(formInvalid).toEqual(false);
      expect(errorMessage).toBeUndefined();
      expect(validated).toEqual(false);
      expect(confirmed).toEqual(false);
      expect(isLoading).toEqual(false);
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
      const oldState = {
        isLoading: true,
      };

      const action = {
        type: A_VALID_REPO_URL,
        data: { jsonData: 'json' },
      };
      newState = reducers[REDUCER_KEY](oldState, action);
    });
    beforeEach(() => {
      expect(newState).toBeDefined();
    });
    it('should add network response to state', () => {
      expect(newState.jsonData).not.toBeUndefined();
      expect(newState.jsonData).toEqual('json');
    });
    it('should update helpMessage', () => {
      expect(newState.helpMessage).not.toBeUndefined();
    });
    it('should update isLoading to false', () => {
      expect(newState.isLoading).toBeFalsy();
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
        isLoading: true,
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
    it('updates isLoading to false', () => {
      expect(newState.isLoading).toBeFalsy();
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
  describe('When reducing A_CANCEL_CLICKED', () => {
    it('should update state to initial state', () => {
      const action = {
        type: A_CANCEL_CLICKED,
      };
      const oldState = {
        formInvalid: true,
        errorMessage: '',
        validated: true,
        confirmed: true,
      };
      const newState = reducers[REDUCER_KEY](oldState, action);
      expect(newState.repoURL).toEqual('');
      expect(newState.repoName).toEqual('');
      expect(newState.helpMessage).toEqual('Repo URL should be appended with \'/api/json\'');
      expect(newState.formInvalid).toBeFalsy();
      expect(newState.errorMessage).toBeUndefined();
      expect(newState.validated).toBeFalsy();
      expect(newState.confirmed).toBeFalsy();
    });
  });
  describe('When reducing A_VALIDATE_REPO_URL', () => {
    let newState;
    beforeAll(() => {
      const action = {
        type: A_VALIDATE_REPO_URL,
      };
      newState = reducers[REDUCER_KEY](undefined, action);
    });
    afterEach(() => {
      expect(newState).toBeDefined();
    });
    it('should set isLoading to true', () => {
      expect(newState.isLoading).toBeDefined();
      expect(newState.isLoading).toBeTruthy();
    });
  });
});
