import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import View from './StatusView';
import { A_ADD_NEW_REPO_CLICKED, removeRepoAction, viewJobsClickedAction } from './actions';
import { APP_STATE } from '../reducers';
import { STATUS_STATE } from './reducers';

const propTypes = {
  /** Repo information stored */
  repos: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Function for when add new repo button is clicked */
  addNewRepoClicked: PropTypes.func.isRequired,
  /** Function for when no repos are in the state when the app first loads */
  noRepos: PropTypes.func.isRequired,
  /** Function to remove repo from app state */
  removeRepo: PropTypes.func.isRequired,
  /** Function to view jobs for a specific repo */
  viewJobs: PropTypes.func.isRequired,
  /** String indicating which repo's jobs to view */
  repoToView: PropTypes.string,
};

export class StatusContainer extends React.Component {
  componentDidMount() {
    const {
      repos,
      noRepos,
    } = this.props;
    if (!repos) {
      noRepos();
    }
  }

  componentDidUpdate() {
    const {
      repos,
      noRepos,
    } = this.props;
    if (!repos) {
      noRepos();
    }
  }

  render() {
    const {
      repos,
      addNewRepoClicked,
      removeRepo,
      viewJobs,
      repoToView,
    } = this.props;
    return (
      <div>
        <View
          repos={repos}
          addRepoClickHandler={addNewRepoClicked}
          removeRepo={removeRepo}
          viewJobs={viewJobs}
          repoToView={repoToView}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repos: state[APP_STATE].repos,
  repoToView: state[STATUS_STATE].repoToView,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  addNewRepoClicked: () => {
    dispatch({ type: A_ADD_NEW_REPO_CLICKED });
  },
  noRepos: () => {
    dispatch({ type: A_ADD_NEW_REPO_CLICKED });
  },
  removeRepo: (repoToRemove) => {
    dispatch(removeRepoAction(repoToRemove));
  },
  viewJobs: (repoToView) => {
    dispatch(viewJobsClickedAction(ownProps.repos[repoToView]));
  },
});

StatusContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(StatusContainer);
