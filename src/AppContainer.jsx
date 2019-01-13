import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_STATE } from './reducers';
import View from './AppView';

const propTypes = {
  /** View key for the current view */
  viewKey: PropTypes.string.isRequired,
  /** Stored repo information in the state */
  repos: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export class AppContainer extends React.Component {
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

AppContainer.propTypes = propTypes;
export default connect(mapStateToProps)(AppContainer);
