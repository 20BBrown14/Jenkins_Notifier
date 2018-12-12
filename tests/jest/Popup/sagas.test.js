import { put } from 'redux-saga/effects';
import { A_VALID_REPO_URL, A_VALIDATE_REPO_URL, A_INVALID_REPO_URL } from '../../../src/Popup/actions';
import { validateRepo } from '../../../src/Popup/sagas';

describe('Repo Validation Sagas', () => {
  describe('When validating repo url', () => {
    describe('When url is valid', () => {
      it('Dispatches A_VALID_REPO_URL action', () => {
        const action = {
          type: A_VALIDATE_REPO_URL,
          data: { URL: 'someUrl' },
        };
        const validate = validateRepo(action);
        validate.next();
        const result = validate.next({ status: 1 });
        expect(result.value).toEqual(put({ type: A_VALID_REPO_URL, data: { status: 1 } }));
      });
    });
    describe('When url is invalid', () => {
      it('Dispatches A_INVALID_REPO_URL action', () => {
        const action = {
          type: A_VALIDATE_REPO_URL,
          data: { URL: 'someUrl' },
        };
        const validate = validateRepo(action);
        validate.next();
        const result = validate.next({ status: 0 });
        expect(result.value).toEqual(put({ type: A_INVALID_REPO_URL }));
      });
    });
    describe('When an error occurs', () => {
      it('Dispatches A_INVALID_REPO_URL action', () => {
        const validate = validateRepo(null);
        const result = validate.next();
        expect(result.value).toEqual(put({ type: A_INVALID_REPO_URL }));
      });
    });
  });
});
