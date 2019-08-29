import { put } from 'redux-saga/effects';
import { A_VALID_REPO_URL, A_VALIDATE_REPO_URL, A_INVALID_REPO_URL } from '../../../src/AddRepo/actions';
import { validateRepo } from '../../../src/AddRepo/sagas';

describe('Repo Validation Sagas', () => {
  describe('When validating repo url', () => {
    describe('When url is valid', () => {
      it('Dispatches A_VALID_REPO_URL action', () => {
        const action = {
          type: A_VALIDATE_REPO_URL,
          data: { URL: 'https://jenkins.io/api/json/' },
        };
        const validate = validateRepo(action);
        validate.next();
        const result = validate.next({ response: { data: 1 } });
        expect(result.value).toEqual(put({ type: A_VALID_REPO_URL, data: { jsonData: 1 } }));
      });
    });
    describe('When url is invalid', () => {
      it('Dispatches A_INVALID_REPO_URL action', () => {
        const action = {
          type: A_VALIDATE_REPO_URL,
          data: { URL: 'someUrl/api/json' },
        };
        const expectedAction = {
          type: A_INVALID_REPO_URL,
          data: {
            errorMessage: 'Invalid URL format',
          },
        };
        const validate = validateRepo(action);
        const result = validate.next({ response: { err: { message: 'Invalid URL Format' } } });
        validate.next();
        expect(result.value).toEqual(put(expectedAction));
      });
    });
    describe('When an error occurs', () => {
      it('Dispatches A_INVALID_REPO_URL action', () => {
        const action = {
          type: A_VALIDATE_REPO_URL,
          data: { URL: 'https://jenkins.io' },
        };
        const validate = validateRepo(action);
        validate.next();
        const result = validate.next();
        const expectedAction = {
          type: A_INVALID_REPO_URL,
          data: {
            errorMessage: 'Error making network request',
          },
        };
        expect(result.value).toEqual(put(expectedAction));
      });
    });
    describe('When there is no data on response', () => {
      it('Dispatches A_INVALID_REPO_URL action', () => {
        const action = {
          type: A_VALIDATE_REPO_URL,
          data: { URL: 'https://jenkins.io' },
        };
        const expectedAction = {
          type: A_INVALID_REPO_URL,
          data: { errorMessage: 'This is an error message' },
        };
        const validate = validateRepo(action);
        validate.next();
        const result = validate.next({ response: { err: { message: 'This is an error message' } } });
        expect(result.value).toEqual(put(expectedAction));
      });
    });
  });
});
