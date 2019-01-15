import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StatusView from './StatusView';
import { A_ADD_NEW_REPO_CLICKED, removeRepoAction } from './actions';
import { APP_STATE } from '../reducers';

const propTypes = {
  /** Repo information stored */
  repos: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Function for when add new repo button is clicked */
  addNewRepoClicked: PropTypes.func.isRequired,
  /** Function for when no repos are in the state when the app first loads */
  noRepos: PropTypes.func.isRequired,
  /** Function to remove repo from app state */
  removeRepo: PropTypes.func.isRequired,
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
    } = this.props;
    return (
      <div>
        <StatusView
          repos={repos}
          addRepoClickHandler={addNewRepoClicked}
          removeRepo={removeRepo}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repos: state[APP_STATE].repos,
});

export const mapDispatchToProps = dispatch => ({
  addNewRepoClicked: () => {
    dispatch({ type: A_ADD_NEW_REPO_CLICKED });
  },
  noRepos: () => {
    dispatch({ type: A_ADD_NEW_REPO_CLICKED });
  },
  removeRepo: (repoToRemove) => {
    dispatch(removeRepoAction(repoToRemove));
  },
});

StatusContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(StatusContainer);
