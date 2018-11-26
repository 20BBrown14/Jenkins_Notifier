import { A_JOB_INPUT_DATA_CHANGED } from './actions';

export const POPUP_STATE = 'popupState';

const INITIAL_STATE = {
  jobInputURL: '',
};

const reduceJobInputDataChanged = (state, action) => (
  {
    ...state,
    jobInputURL: action.data.newValue,
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
    default:
      return state;
  }
};

export default { [POPUP_STATE]: reducePopup };
