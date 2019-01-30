/* global chrome */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_STATE } from './reducers';
import View from './AppView';
import { loadAppStateAction } from './actions';

const propTypes = {
  /** View key for the current view */
  viewKey: PropTypes.string.isRequired,
  /** Stored repo information in the state */
  repos: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** function to load app state */
  loadAppState: PropTypes.func.isRequired,
};

export class AppContainer extends React.Component {
  componentWillMount() {
    const {
      loadAppState,
    } = this.props;
    chrome.storage.sync.get(['repos'], (result) => {
      loadAppState(Object.keys(result.repos).length === 0 ? undefined : result.repos);
    });
  }

  componentDidUpdate() {
    let {
      repos,
    } = this.props;
    if (!repos) {
      repos = {};
    }
    chrome.storage.sync.set({ repos }, () => {});
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
  loadAppState: (repos) => {
    dispatch(loadAppStateAction(repos));
  },
});

AppContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
