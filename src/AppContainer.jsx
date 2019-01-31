/* global chrome */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_STATE } from './reducers';
import View from './AppView';
import { refreshRepoAction } from './actions';

const propTypes = {
  /** View key for the current view */
  viewKey: PropTypes.string.isRequired,
  /** Stored repo information in the state */
  repos: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Function to dispatch refresh repo action */
  refreshRepo: PropTypes.func.isRequired,
};

export class AppContainer extends React.Component {
  componentWillMount() {
    const {
      refreshRepo,
    } = this.props;
    chrome.storage.sync.get(['repos'], (result) => {
      if (Object.keys(result.repos).length !== 0) {
        Object.keys(result.repos).forEach((key) => {
          refreshRepo(result.repos[key], key);
        });
      }
    });
  }

  componentDidUpdate() {
    let {
      repos,
    } = this.props;
    if (!repos) {
      repos = {};
    }
    let reposToSet = {};
    Object.keys(repos).forEach((key) => {
      reposToSet = { ...reposToSet, [key]: repos[key].URL };
    });
    chrome.storage.sync.set({ repos: reposToSet }, () => {});
  }

  render() {
    const {
      viewKey,
      repos,
    } = this.props;

    return (
      <div>
        <View
          viewKey={viewKey}
          repos={repos}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  viewKey: state[APP_STATE].viewKey,
  repos: state[APP_STATE].repos,
});

export const mapDispatchToProps = dispatch => ({
  refreshRepo: (url) => {
    dispatch(refreshRepoAction(url));
  },
});

AppContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
