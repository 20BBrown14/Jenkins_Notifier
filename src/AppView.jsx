import React from 'react';
import PropTypes from 'prop-types';
import AddRepo from './AddRepo/AddRepoContainer';
import { VK_ADD_NEW_REPO, VK_REPOS } from './Navigation/viewKeys';
import Status from './Status/StatusContainer';

const propTypes = {
  /** View key for the current view */
  viewKey: PropTypes.string.isRequired,
  /** Repo information stored */
  repos: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const AppView = (props) => {
  const {
    viewKey,
    repos,
  } = props;

  let content;
  switch (viewKey) {
    case VK_REPOS:
      content = (
        <Status
          repos={repos}
        />
      );
      break;
    case VK_ADD_NEW_REPO:
      content = (<AddRepo />);
      break;
    default:
      content = undefined;
      break;
  }

  return (
    <div>
      {content}
    </div>
  );
};

AppView.propTypes = propTypes;
export default AppView;
