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
  repoToView: PropTypes.string, // eslint-disable-line react/forbid-prop-types
  /** Function to remove a job from a repo */
  removeJob: PropTypes.func.isRequired,
  /** Function to go back to repo view from jobs view */
  goBack: PropTypes.func.isRequired,
};

const StatusView = (props) => {
  const {
    repos,
    addRepoClickHandler,
    removeRepo,
    viewJobs,
    repoToView,
    removeJob,
    goBack,
  } = props;

  let view = 'repos';
  const content = [];
  if (repoToView && repos && repos[repoToView] && repos[repoToView].jobs) {
    view = 'jobs';
    const keys = [];
    const repoJobs = repos[repoToView].jobs;
    Object.keys(repoJobs).forEach((key) => {
      keys.push(key);
    });

    for (let i = 0; i < keys.length; i += 1) {
      const arrangeFill = (
        <Text
          className="textCenter"
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
            key={`${keys[i]} remove`}
            className="arrangeButton"
            text="Remove"
            onClick={() => { removeJob(`${keys[i]}`, repoToView); }}
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
  } else {
    view = 'repos';
    const keys = [];
    if (repos) {
      Object.keys(repos).forEach((key) => {
        keys.push(key);
      });
    }
    for (let i = 0; i < keys.length; i += 1) {
      const arrangeFill = (
        <Text
          className="textCenter"
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
            isDisabled={!repos[keys[i]].jobs}
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
  }
  return (
    <div>
      {view === 'repos' &&
        (
          <Text
            className="titleText"
            fontSize={20}
            weight={700}
          >
            Tracked Repos
            (
              {repos ? `${Object.keys(repos).length}` : '0'}
            )
          </Text>
        )
      }
      {view === 'jobs' &&
        (
          <Text
            className="titleText"
            fontSize={20}
            weight={700}
          >
            {repoToView}
          </Text>
        )
      }
      <div className="StatusView-Window">
        {content}
      </div>
      {/* Repos View Button */}
      {view === 'repos' &&
        (
          <Button
            style={{ margin: '6px 5px 0px 5px' }}
            text="Add New Repo"
            onClick={addRepoClickHandler}
          />
        )
      }
      {/* Job View Buttons */}
      {view === 'jobs' &&
        (
          <div>
            <Button
              style={{ margin: '7px 5px 0px 5px' }}
              text="View Repo on Jenkins"
              onClick={() => { window.open(repos[repoToView].URL); }}
            />
            <div style={{ float: 'right' }}>
              <Button
                style={{ margin: '7px 5px 0px 5px' }}
                text="Back"
                onClick={goBack}
              />
              <Button
                style={{ margin: '7px 5px 0px 5px' }}
                text="Remove Repo"
                onClick={() => { removeRepo(repoToView); goBack(); }}
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
