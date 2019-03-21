import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import Arrange from 'terra-arrange/lib/Arrange';
import IconXSymbol from 'terra-icon/lib/icon/IconXSymbol';
import IconReload from 'terra-icon/lib/icon/IconReload';
import IconTrash from 'terra-icon/lib/icon/IconTrash';
import IconForward from 'terra-icon/lib/icon/IconForward';
import IconAdd from 'terra-icon/lib/icon/IconAdd';
import './StatusView.scss';
import Text from 'terra-text';
import Image from 'terra-image/lib/Image';
import { determineJobStatusImage, determineJobStatusTooltip, UNKNOWN_STATUS } from '../modules/jobStatus';
import headshotImage from '../assets/headshot';

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
  /** Function to refresh repos on refresh button click */
  refreshRepo: PropTypes.func.isRequired,
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
    refreshRepo,
  } = props;

  const arrangeStartStyle = {
    left: '65%',
  };

  const arrangeEndStyle = {
    right: '65%',
  };

  const addRepoTooltipStyle = {
    position: 'relative',
    float: 'right',
    bottom: '20px',
    left: '10px',
  };

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
      const image = determineJobStatusImage(repoJobs[keys[i]].color);
      const statusTooltip = determineJobStatusTooltip(repoJobs[keys[i]].color);
      let arrangeStart;
      if (image === UNKNOWN_STATUS) {
        arrangeStart = (
          <div className="tooltip">
            <IconXSymbol style={{ margin: '-5px', padding: '2px' }} />
            <Text className="tooltiptext" style={{ arrangeStartStyle }} color="#fff">{statusTooltip}</Text>
          </div>
        );
      } else {
        arrangeStart = (
          <div className="tooltip">
            {<Image src={image} style={{ margin: '-5px', padding: '2px' }} />}
            <Text className="tooltiptext" style={{ arrangeStartStyle }} color="#fff">{statusTooltip}</Text>
          </div>
        );
      }

      const arrangeFill = (
        <Text
          className="textCenter"
          fontSize={16}
        >
          {repoJobs[keys[i]].name}
        </Text>
      );

      const arrangeEnd = (
        <div>
          <div className="tooltip">
            <Button
              key={`${keys[i]} view`}
              className="arrangeButton"
              text="View on Jenkins"
              variant="utility"
              icon={<Image src={headshotImage} />}
              onClick={() => { window.open(repoJobs[keys[i]].url); }}
            />
            <Text className="tooltiptext" color="#fff" style={arrangeEndStyle}>View Job on Jenkins</Text>
          </div>
          <div className="tooltip">
            <Button
              key={`${keys[i]} remove`}
              className="arrangeButton"
              text="Remove"
              variant="utility"
              icon={<IconTrash />}
              onClick={() => { removeJob(`${keys[i]}`, repoToView); }}
            />
            <Text className="tooltiptext" color="#fff" style={arrangeEndStyle}>Remove Job</Text>
          </div>
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
          style={{ margin: '0px 0px 0px 5px' }}
          fontSize={16}
        >
          {keys[i]}
        </Text>
      );

      const arrangeEnd = (
        <div>
          <div className="tooltip">
            <Button
              key={`${keys[i]} start Jenkins`}
              text="View on Jenkins"
              onClick={() => { window.open(repos[keys[i]].URL); }}
              variant="utility"
              icon={<Image src={headshotImage} />}
            />
            <Text className="tooltiptext" style={arrangeEndStyle} color="#fff">View on Jenkins</Text>
          </div>
          <div className="tooltip">
            <Button
              key={`${keys[i]} start jobs`}
              className="arrangeButton"
              text="View Jobs"
              onClick={() => { viewJobs(`${keys[i]}`); }}
              isDisabled={!repos[keys[i]].jobs}
              variant="utility"
              icon={<IconForward />}
            />
            <Text className="tooltiptext" style={arrangeEndStyle} color="#fff">View Repo Jobs</Text>
          </div>
          <div className="tooltip">
            <Button
              key={`${keys[i]} end`}
              className="arrangeButton"
              text="Remove Repo"
              onClick={() => { removeRepo(`${keys[i]}`); }}
              variant="utility"
              icon={<IconTrash />}
            />
            <Text className="tooltiptext" style={arrangeEndStyle} color="#fff">Remove Repo</Text>
          </div>
        </div>
      );
      content.push(
        <Arrange
          key={`${keys[i]} arrange`}
          className="statusArrange"
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
          <div>
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
            <div className="tooltip">
              <Button
                icon={<IconReload />}
                isIconOnly
                variant="utility"
                className="refreshButton"
                text="Refresh"
                onClick={() => {
                  Object.keys(repos).forEach((key) => {
                    refreshRepo(repos[key].URL, key);
                  });
                }}
              />
              <Text className="tooltiptext" style={arrangeEndStyle} color="#fff">Refresh Repos</Text>
            </div>
          </div>
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
          <div>
            <div className="tooltip" style={{ float: 'right' }}>
              <Button
                className="addRepoButton"
                icon={<IconAdd />}
                isIconOnly
                variant="utility"
                text="Add New Repo"
                onClick={addRepoClickHandler}
              />
              <Text className="tooltiptext" style={addRepoTooltipStyle} color="#fff">Add new repo</Text>
            </div>
          </div>
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
