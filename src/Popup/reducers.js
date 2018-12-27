import {
  A_URL_INPUT_DATA_CHANGED,
  A_VALID_REPO_URL,
  A_INVALID_REPO_URL,
  A_NAME_INPUT_DATA_CHANGED,
  A_CONFIRM_BUTTON_CLICKED,
} from './actions';

export const POPUP_STATE = 'popupState';

const INITIAL_STATE = {
  repoURL: '',
  repoName: '',
  helpMessage: 'Repo URL should be appended with \'/api/json\'',
  formInvalid: false,
  errorMessage: undefined,
  validated: false,
  confirmed: false,
};

const reduceURLInputDataChanged = (state, action) => (
  {
    ...state,
    repoURL: action.data.newValue,
    formInvalid: false,
    helpMessage: INITIAL_STATE.helpMessage,
    errorMessage: undefined,
    validated: false,
    confirmed: false,
  }
);

const reduceNameInputDataChanged = (state, action) => (
  {
    ...state,
    repoName: action.data.newValue,
    confirmed: false,
  }
);

const reduceValidRepoURL = (state, action) => (
  {
    ...state,
    jsonData: action.data.jsonData,
    helpMessage: 'Jenkins URL is valid!',
    validated: true,
  }
);

const reduceInvalidRepoURL = (state, action) => (
  {
    ...state,
    formInvalid: true,
    errorMessage: action.data.errorMessage,
    validated: false,
  }
);

/**
 * Define Popup reducers
 * @param {object} state - State with default value of INITIAL_STATE
 * @param {string} state.repoURL - Current value of the repoURL field.
 * @param {string} state.repoName - Current value of the repoName field.Date
 * @param {string} state.helpMessage - Help message for repoURL field
 * @param {bool} state.formInvalid - Whether or not the form is invalid
 * @param {string} state.errorMessage - Error message for an invalid repo url
 * @param {bool} state.validated - Whether or not the repoURL has been validated
 * @param {bool} state.confirmed - Whether or not the confirm button has been clicked
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
    case A_CONFIRM_BUTTON_CLICKED:
      return { ...state, confirmed: true };
    default:
      return state;
  }
};

export default { [POPUP_STATE]: reducePopup };
