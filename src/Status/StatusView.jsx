import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import Arrange from 'terra-arrange/lib/Arrange';
import IconXSymbol from 'terra-icon/lib/icon/IconXSymbol';
import './StatusView.scss';
import Text from 'terra-text';
import Image from 'terra-image/lib/Image';
import determineStatusImage, { UNKNOWN_STATUS } from '../modules/jobStatus';

const propTypes = {
  /** Repo information stored in app */
  repos: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Button click handler for add new repo button */
  addRepoClickHandler: PropTypes.func.isRequired,
  /** Function to remove repo from list */
  removeRepo: PropTypes.func.isRequired,
  /** Function to view jobs */
  viewJobs: PropTypes.func.isRequired,
  /** string indicating which repo's jobs to view */
  repoToView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const StatusView = (props) => {
  const {
    repos,
    addRepoClickHandler,
    removeRepo,
    viewJobs,
    repoToView,
  } = props;

  const content = [];
  if (repoToView) {
    const keys = [];
    const repoJobs = repoToView.jobs;
    Object.keys(repoJobs).forEach((key) => {
      keys.push(key);
    });

    for (let i = 0; i < keys.length; i += 1) {
      const arrangeFill = (
        <Text
          fontSize={16}
        >
          {repoJobs[keys[i]].name}
        </Text>
      );
      const image = determineStatusImage(repoJobs[keys[i]].color);
      let arrangeStart;
      if (image === UNKNOWN_STATUS) {
        arrangeStart = (
          <IconXSymbol />
        );
      } else {
        arrangeStart = (
          <Image src={image} />
        );
      }

      const arrangeEnd = (
        <div>
          <Button
            key={`${keys[i]} view`}
            className="arrangeButton"
            text="View on Jenkins"
            onClick={() => { window.open(repoJobs[keys[i]].url); }}
          />
          <Button
            key={`${keys[i]} delete`}
            className="arrangeButton"
            text="Remove"
            onClick={() => { /* TODO: Add handler to delete job from repo */ }}
          />
        </div>
      );

      content.push(
        <Arrange
          key={`${keys[i]} arrange`}
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
  } else if (repos) {
    const keys = [];
    if (repos) {
      Object.keys(repos).forEach((key) => {
        keys.push(key);
      });
    }
    for (let i = 0; i < keys.length; i += 1) {
      const arrangeFill = (
        <Text
          fontSize={16}
        >
          {keys[i]}
        </Text>);

      const arrangeStart = (
        <div>
          <Button
            key={`${keys[i]} start Jenkins`}
            className="arrangeButton"
            text="View on Jenkins"
            onClick={() => { window.open(repos[keys[i]].URL); }}
          />
          <Button
            key={`${keys[i]} start jobs`}
            className="arrangeButton"
            text="View Jobs"
            onClick={() => { viewJobs(`${keys[i]}`); }}
          />
        </div>
      );

      const arrangeEnd = (
        <Button
          key={`${keys[i]} end`}
          className="arrangeButton"
          text="Remove Repo"
          onClick={() => { removeRepo(`${keys[i]}`); }}
        />
      );
      content.push(
        <Arrange
          key={`${keys[i]} arrange`}
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
  } else {
    console.log('error');
    return (
      <Text>error</Text>
    );
  }
  return (
    <div>
      <div className="StatusView-Window">
        {content}
      </div>
      {/* Repos View Button */}
      {!repoToView && repos &&
        (
          <Button
            style={{ margin: '12.5px 5px 0px 5px' }}
            text="Add New Repo"
            onClick={addRepoClickHandler}
          />
        )
      }
      {/* Job View Buttons */}
      {repos && repoToView &&
        (
          <div>
            <Button
              style={{ margin: '12.5px 5px 0px 5px' }}
              text="View Repo on Jenkins"
              onClick={() => { /* TODO: add function to open repo url in window */ }}
            />
            <div style={{ float: 'right' }}>
              <Button
                style={{ margin: '12.5px 5px 0px 5px' }}
                text="Back"
                onClick={() => { /* TODO: Add handler to go back to repo view */ }}
              />
              <Button
                style={{ margin: '12.5px 5px 0px 5px' }}
                text="Remove Repo"
                onClick={() => { /* TODO: Add handler to delete repo and go back to repo view */ }}
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

StatusView.propTypes = propTypes;
export default StatusView;
