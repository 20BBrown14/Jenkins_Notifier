import { A_VIEW_JOBS_CLICKED, A_GO_BACK_TO_REPO_VIEW } from './actions';
import { A_REFRESH_REPO, A_REPO_IS_REFRESHED } from '../actions';

export const STATUS_STATE = 'status state';

const INITIAL_STATE = {
  repoToView: undefined,
  isLoading: false,
};

const reduceViewJobsClicked = (state, action) => (
  {
    ...state,
    repoToView: action.data.repoToView,
  }
);

/**
 * Define Status reducers
 * @param {object} state - State with default value of INITIAL_STATE
 * @param {object} action - The action being performed
 * @param {string} action.type - The type of action being performed
 * @param {object} action.data - The data related to the action
 * @returns {object} updated state. If no action is handled returns original state.
 */
const reduceStatus = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case A_VIEW_JOBS_CLICKED:
      return reduceViewJobsClicked(state, action);
    case A_GO_BACK_TO_REPO_VIEW:
      return { ...state, repoToView: undefined };
    case A_REFRESH_REPO:
      return { ...state, isLoading: true };
    case A_REPO_IS_REFRESHED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default { [STATUS_STATE]: reduceStatus };
