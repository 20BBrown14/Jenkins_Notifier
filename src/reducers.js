import { A_VALID_REPO_URL, A_INFORMATION_CONFIRMED } from './Popup/actions';

export const APP_STATE = 'app_state';

const INITIAL_STATE = {
  repos: {},
};

const reduceValidRepoURL = (state, action) => (
  {
    ...state,
    jsonData: action.data.jsonData,
  }
);

const reduceInformationConfirmed = (state, action) => {
  const repoInformation = state.jsonData;
  const repoName = action.data.repoName || repoInformation.displayName;
  const newState = { ...state };
  /* eslint-disable no-restricted-syntax */
  if (newState.repos) {
    for (const name in newState.repos) {
      if (newState.repos[name].URL === repoInformation.url) {
        delete newState.repos[name];
      }
    }
  }
  /* eslint-enable no-restricted-syntax */
  return {
    ...newState,
    repos: {
      ...newState.repos,
      [repoName]: {
        URL: repoInformation.url,
        jobs: repoInformation.jobs,
      },
    },
  };
};


/**
 * Define App reducers
 * @param {object} state - State with default value of INITIAL_STATE
 * @param {string} state.repoURL - Current value of the repoURL field.
 * @param {object} action - The action being performed
 * @param {string} action.type - The type of action being performed
 * @param {object} action.data - The data related to the action
 * @returns {object} updated state. If no action is handled returns original state.
 */
const reduceApp = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case A_INFORMATION_CONFIRMED:
      return reduceInformationConfirmed(state, action);
    case A_VALID_REPO_URL:
      return reduceValidRepoURL(state, action);
    default:
      return state;
  }
};

export default { [APP_STATE]: reduceApp };
