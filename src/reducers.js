import { A_VALID_REPO_URL, A_INFORMATION_CONFIRMED, A_CANCEL_CLICKED } from './AddRepo/actions';
import { VK_ADD_NEW_REPO, VK_REPOS } from './Navigation/viewKeys';
import { A_ADD_NEW_REPO_CLICKED, A_REMOVE_REPO, A_REMOVE_JOB_CLICKED, A_GO_BACK_TO_REPO_VIEW } from './Status/actions';
import { A_LOAD_APP_STATE } from './actions';

export const APP_STATE = 'app_state';

const INITIAL_STATE = {

  /* repos: {
    patientKioskJS: {
      URL: 'https://jenkins.cerner.com/ion/job/Revenue%20Cycle%20Patient%20Kiosk/job/patient-kiosk-js/',
      jobs: {
        0: {
          color: 'blue',
          name: 'dev',
          url: 'https://jenkins.cerner.com/ion/job/Revenue%20Cycle%20Patient%20Kiosk/job/patient-kiosk-js/job/dev/',
        },
        1: {
          color: 'red',
          name: 'cheese',
          url: 'https://jenkins.cerner.com/ion/job/Revenue%20Cycle%20Patient%20Kiosk/job/patient-kiosk-js/job/feature%252FREVCYCSCH-3884/'
        },
      },
    },
    kioskServer: {
      URL: 'https://jenkins.cerner.com/ion/job/Revenue%20Cycle%20Patient%20Kiosk/job/kiosk_server/',
      jobs: {
        0: {
          color: 'blue',
          name: 'dev',
          url: 'https://jenkins.cerner.com/ion/job/Revenue%20Cycle%20Patient%20Kiosk/job/patient-kiosk-js/job/dev/',
        },
        1: {
          color: 'red',
          name: 'cheese',
          url: 'https://jenkins.cerner.com/ion/job/Revenue%20Cycle%20Patient%20Kiosk/job/patient-kiosk-js/job/feature%252FREVCYCSCH-3884/'
        },
      },
    },
  }, */

  repos: undefined,
  viewKey: VK_REPOS,
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

const reduceRemoveRepo = (state, action) => {
  const { repoToRemove } = action.data;
  const newState = { ...state };
  delete newState.repos[repoToRemove];
  return { ...newState, repos: { ...newState.repos } };
};

const reduceRemoveJob = (state, action) => {
  const { jobToRemove, repo } = action.data;
  const newState = { ...state };
  delete newState.repos[repo].jobs[jobToRemove];
  if (Object.keys(newState.repos[repo].jobs).length === 0) {
    const reposToReturn = { ...newState.repos };
    reposToReturn[repo].jobs = undefined;
    return { ...newState, repos: reposToReturn };
  }
  return { ...newState, repos: { ...newState.repos } };
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
    case A_ADD_NEW_REPO_CLICKED:
      return { ...state, viewKey: VK_ADD_NEW_REPO };
    case A_CANCEL_CLICKED:
      return { ...state, viewKey: VK_REPOS };
    case A_REMOVE_REPO:
      return reduceRemoveRepo(state, action);
    case A_REMOVE_JOB_CLICKED:
      return reduceRemoveJob(state, action);
    case A_GO_BACK_TO_REPO_VIEW:
      return { ...state, viewKey: VK_REPOS };
    case A_LOAD_APP_STATE:
      return { ...state, repos: action.data.repos };
    default:
      return state;
  }
};

export default { [APP_STATE]: reduceApp };
