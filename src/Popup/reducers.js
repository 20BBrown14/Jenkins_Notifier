import { A_JOB_INPUT_DATA_CHANGED, A_VALID_REPO_URL, A_INVALID_REPO_URL } from './actions';

export const POPUP_STATE = 'popupState';

const INITIAL_STATE = {
  jobInputURL: '',
  helpMessage: 'With or without \'/api/json\' appended',
  formInvalid: false,
};

const reduceJobInputDataChanged = (state, action) => (
  {
    ...state,
    jobInputURL: action.data.newValue,
    formInvalid: false,
    helpMessage: INITIAL_STATE.helpMessage,
  }
);

const reduceValidRepoURL = (state, action) => (
  {
    ...state,
    jsonData: action.data.json,
    helpMessage: 'Jenkins URL is valid!',
  }
);

const reduceInvalidRepoURL = state => (
  {
    ...state,
    formInvalid: true,
  }
);

/**
 * Define Popup reducers
 * @param {object} state - State with default value of INITIAL_STATE
 * @param {string} state.jobInputUrl - Current value of job input url field input.
 * @param {object} action - The action being performed
 * @param {string} action.type - The type of action being performed
 * @param {object} action.data - The data related to the action
 * @returns {object} updated state. If no action is handled returns original state.
 */
const reducePopup = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case A_JOB_INPUT_DATA_CHANGED:
      return reduceJobInputDataChanged(state, action);
    case A_VALID_REPO_URL:
      return reduceValidRepoURL(state, action);
    case A_INVALID_REPO_URL:
      return reduceInvalidRepoURL(state);
    default:
      return state;
  }
};

export default { [POPUP_STATE]: reducePopup };
