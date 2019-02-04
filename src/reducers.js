import { A_VALID_REPO_URL, A_INFORMATION_CONFIRMED, A_CANCEL_CLICKED } from './AddRepo/actions';
import { VK_ADD_NEW_REPO, VK_REPOS } from './Navigation/viewKeys';
import { A_ADD_NEW_REPO_CLICKED, A_REMOVE_REPO, A_REMOVE_JOB_CLICKED, A_GO_BACK_TO_REPO_VIEW } from './Status/actions';
import { A_REPO_IS_REFRESHED } from './actions';
import { googleStorageReposSet } from './modules/googleStorageHelpers';

export const APP_STATE = 'app_state';

const INITIAL_STATE = {
  repos: undefined,
  viewKey: VK_REPOS,
};

const reduceValidRepoURL = (state, action) => (
  {
    ...state,
    jsonData: action.data.jsonData,
  }
);

const reduceInformationConfirmed = (state, action, shouldUpdateStorage) => {
  const repoInformation = state.jsonData;
  const repoName = action.data.repoName || repoInformation.displayName;
  let newState = { ...state };
  /* eslint-disable no-restricted-syntax */
  if (newState.repos) {
    for (const name in newState.repos) {
      if (newState.repos[name].URL === repoInformation.url) {
        delete newState.repos[name];
      }
    }
  }
  /* eslint-enable no-restricted-syntax */
  newState = {
    ...newState,
    repos: {
      ...newState.repos,
      [repoName]: {
        URL: repoInformation.url,
        jobs: repoInformation.jobs,
      },
    },
  };
  if (shouldUpdateStorage) { googleStorageReposSet(newState.repos); }
  return { ...newState };
};

const reduceRemoveRepo = (state, action) => {
  const { repoToRemove } = action.data;
  let newState = { ...state };
  delete newState.repos[repoToRemove];
  newState = { ...newState, repos: { ...newState.repos } };
  googleStorageReposSet(newState.repos);
  return { ...newState };
};

const reduceRemoveJob = (state, action) => {
  const { jobToRemove, repo } = action.data;
  let newState = { ...state };
  delete newState.repos[repo].jobs[jobToRemove];
  if (Object.keys(newState.repos[repo].jobs).length === 0) {
    const reposToReturn = { ...newState.repos };
    reposToReturn[repo].jobs = undefined;
    return { ...newState, repos: reposToReturn };
  }
  newState = { ...newState, repos: { ...newState.repos } };
  // googleStorageReposSet(newState.repos); TODO: Re-evaluate not storing jobs
  return { ...newState };
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
    case A_REPO_IS_REFRESHED:
      return reduceInformationConfirmed({ ...state, jsonData: action.data.data }, action, false);
    case A_INFORMATION_CONFIRMED:
      return reduceInformationConfirmed(state, action, true);
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
    default:
      return state;
  }
};

export default { [APP_STATE]: reduceApp };
