import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_STATE } from './reducers';
import View from './AppView';
import { refreshRepoAction } from './actions';
import { googleStorageReposGet } from './modules/googleHelpers';

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
    googleStorageReposGet(refreshRepo);
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
  refreshRepo: (url, repoName) => {
    dispatch(refreshRepoAction(url, repoName));
  },
});

AppContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
