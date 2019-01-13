import { put } from 'redux-saga/effects';
import { A_VALID_REPO_URL, A_VALIDATE_REPO_URL, A_INVALID_REPO_URL } from '../../../src/AddRepo/actions';
import { validateRepo } from '../../../src/AddRepo/sagas';

describe('Repo Validation Sagas', () => {
  describe('When validating repo url', () => {
    describe('When url is valid', () => {
      it('Dispatches A_VALID_REPO_URL action', () => {
        const action = {
          type: A_VALIDATE_REPO_URL,
          data: { URL: 'someUrl/api/json/' },
        };
        const validate = validateRepo(action);
        validate.next();
        const result = validate.next({ data: 1 });
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
            errorMessage: 'someMessage',
          },
        };
        const validate = validateRepo(action);
        validate.next();
        const result = validate.next({ err: { message: 'someMessage' } });
        expect(result.value).toEqual(put(expectedAction));
      });
    });
    describe('When an error occurs', () => {
      it('Dispatches A_INVALID_REPO_URL action', () => {
        const validate = validateRepo(null);
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
    describe('When URL is not formatted correctly', () => {
      const action = {
        type: A_VALID_REPO_URL,
        data: { URL: 'someUrl' },
      };
      const expectedAction = {
        type: A_INVALID_REPO_URL,
        data: {
          errorMessage: 'URL should be appended with \'/api/json\'',
        },
      };
      const validate = validateRepo(action);
      const result = validate.next();
      expect(result.value).toEqual(put(expectedAction));
      validate.next();
    });
  });
});
