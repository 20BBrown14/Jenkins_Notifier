import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import View from './StatusView';
import {
  A_ADD_NEW_REPO_CLICKED,
  removeRepoAction,
  viewJobsClickedAction,
  removeJobAction,
  A_GO_BACK_TO_REPO_VIEW,
} from './actions';
import { APP_STATE } from '../reducers';
import { STATUS_STATE } from './reducers';
import { refreshRepoAction } from '../actions';

const propTypes = {
  /** Repo information stored */
  repos: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Function for when add new repo button is clicked */
  addNewRepoClicked: PropTypes.func.isRequired,
  /** Function to remove repo from app state */
  removeRepo: PropTypes.func.isRequired,
  /** Function to view jobs for a specific repo */
  viewJobs: PropTypes.func.isRequired,
  /** String indicating which repo's jobs to view */
  repoToView: PropTypes.string,
  /** Function to remove job from repo */
  removeJob: PropTypes.func.isRequired,
  /** Function to go back to repo view from jobs view */
  goBackToRepoView: PropTypes.func.isRequired,
  /** Function to refersh repos */
  refreshRepo: PropTypes.func.isRequired,
  /** Bool for if the status view is loading */
  isLoading: PropTypes.bool.isRequired,
};

export class StatusContainer extends React.Component {
  render() {
    const {
      repos,
      addNewRepoClicked,
      removeRepo,
      viewJobs,
      repoToView,
      removeJob,
      goBackToRepoView,
      refreshRepo,
      isLoading,
    } = this.props;
    return (
      <div>
        <View
          repos={repos}
          addRepoClickHandler={addNewRepoClicked}
          removeRepo={removeRepo}
          viewJobs={viewJobs}
          repoToView={repoToView}
          removeJob={removeJob}
          goBack={goBackToRepoView}
          refreshRepo={refreshRepo}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repos: state[APP_STATE].repos,
  repoToView: state[STATUS_STATE].repoToView,
  isLoading: state[STATUS_STATE].isLoading,
});

export const mapDispatchToProps = dispatch => ({
  addNewRepoClicked: () => {
    dispatch({ type: A_ADD_NEW_REPO_CLICKED });
  },
  removeRepo: (repoToRemove) => {
    dispatch(removeRepoAction(repoToRemove));
  },
  viewJobs: (repoToView) => {
    dispatch(viewJobsClickedAction(repoToView));
  },
  removeJob: (jobToRemove, repoToView) => {
    dispatch(removeJobAction(jobToRemove, repoToView));
  },
  goBackToRepoView: () => {
    dispatch({ type: A_GO_BACK_TO_REPO_VIEW });
  },
  refreshRepo: (url) => {
    dispatch(refreshRepoAction(url));
  },
});

StatusContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(StatusContainer);
