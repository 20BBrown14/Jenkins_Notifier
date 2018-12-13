import {
  A_URL_INPUT_DATA_CHANGED,
  A_NAME_INPUT_DATA_CHANGED,
  A_VALIDATE_REPO_URL,
  nameInputDataChanged,
  validateRepoURL,
  URLInputDataChanged,
} from '../../../src/Popup/actions';

describe('Popup Actions', () => {
  it('should produce a url input data changed action', () => {
    const URLChangedAction = URLInputDataChanged('URLValue');
    expect(URLChangedAction.type).toEqual(A_URL_INPUT_DATA_CHANGED);
    expect(URLChangedAction.data.newValue).toEqual('URLValue');
  });
  it('should produce a name input data changed action', () => {
    const nameChangedAction = nameInputDataChanged('nameValue');
    expect(nameChangedAction.type).toEqual(A_NAME_INPUT_DATA_CHANGED);
    expect(nameChangedAction.data.newValue).toEqual('nameValue');
  });
  it('should produce a validate repo action', () => {
    const validateAction = validateRepoURL('someURL');
    expect(validateAction.type).toEqual(A_VALIDATE_REPO_URL);
    expect(validateAction.data.URL).toEqual('someURL');
  });
});
