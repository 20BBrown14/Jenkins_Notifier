import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import Arrange from 'terra-arrange/lib/Arrange';
import './StatusView.scss';
import Text from 'terra-text';

const propTypes = {
  /** Repo information stored in app */
  repos: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Button click handler for add new repo button */
  addRepoClickHandler: PropTypes.func.isRequired,
};

const StatusView = (props) => {
  const {
    repos,
    addRepoClickHandler,
  } = props;

  const keys = [];

  if (repos) {
    Object.keys(repos).forEach((key) => {
      keys.push(key);
    });
  }

  /*
  for (let key in repos) {
    if (!repos.hasOwnProperty(key)) continue;
    keys.push(key);
  }
  */

  const content = [];
  for (let i = 0; i < keys.length; i += 1) {
    const arrangeFill = (
      <Text
        fontSize={16}
      >
        {keys[i]}
      </Text>);

    const arrangeStart = (
      <Button
        key={`${keys[i]} start`}
        className="arrangeButton"
        text="View on Jenkins"
        onClick={() => { window.open(repos[keys[i]].URL); }}
      />
    );

    const arrangeEnd = (
      <Button
        key={`${keys[i]} end`}
        className="arrangeButton"
        text="View Jobs"
        onClick={() => {}}
      />
    );
    content.push(
      <Arrange
        key={`${keys[i]} fill`}
        className="statusArrange"
        fitStart={arrangeStart}
        alignFitStart="center"
        fill={arrangeFill}
        alignFill="center"
        fitEnd={arrangeEnd}
        alignFitEnd="center"
      />,
    );
  }
  // content.push(<Button style={{ margin: '0px 5px 0px 5px' }} text="Confirm" />);

  return (
    <div>
      <div className="StatusView-Window">
        {content}
      </div>
      <Button
        style={{ margin: '12.5px 5px 0px 5px' }}
        text="Add New Repo"
        onClick={addRepoClickHandler}
      />
    </div>
  );
};

StatusView.propTypes = propTypes;
export default StatusView;
