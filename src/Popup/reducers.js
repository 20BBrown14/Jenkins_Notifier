import { A_URL_INPUT_DATA_CHANGED, A_VALID_REPO_URL, A_INVALID_REPO_URL, A_NAME_INPUT_DATA_CHANGED } from './actions';

export const POPUP_STATE = 'popupState';

const INITIAL_STATE = {
  repoURL: '',
  repoName: '',
  helpMessage: 'Repo URL should be appended with \'/api/json\'',
  formInvalid: false,
  errorMessage: undefined,
};

const reduceURLInputDataChanged = (state, action) => (
  {
    ...state,
    repoURL: action.data.newValue,
    formInvalid: false,
    helpMessage: INITIAL_STATE.helpMessage,
    errorMessage: undefined,
  }
);

const reduceNameInputDataChanged = (state, action) => (
  {
    ...state,
    repoName: action.data.newValue,
    formInvalid: false,
    helpMessage: INITIAL_STATE.helpMessage,
    errorMessage: undefined,
  }
);

const reduceValidRepoURL = (state, action) => (
  {
    ...state,
    jsonData: action.data.json,
    helpMessage: 'Jenkins URL is valid!',
  }
);

const reduceInvalidRepoURL = (state, action) => (
  {
    ...state,
    formInvalid: true,
    errorMessage: action.data.errorMessage,
  }
);

/**
 * Define Popup reducers
 * @param {object} state - State with default value of INITIAL_STATE
 * @param {string} state.repoURL - Current value of the repoURL field.
 * @param {object} action - The action being performed
 * @param {string} action.type - The type of action being performed
 * @param {object} action.data - The data related to the action
 * @returns {object} updated state. If no action is handled returns original state.
 */
const reducePopup = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case A_URL_INPUT_DATA_CHANGED:
      return reduceURLInputDataChanged(state, action);
    case A_NAME_INPUT_DATA_CHANGED:
      return reduceNameInputDataChanged(state, action);
    case A_VALID_REPO_URL:
      return reduceValidRepoURL(state, action);
    case A_INVALID_REPO_URL:
      return reduceInvalidRepoURL(state, action);
    default:
      return state;
  }
};

export default { [POPUP_STATE]: reducePopup };
