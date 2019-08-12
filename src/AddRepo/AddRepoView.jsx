import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import Text from 'terra-text';
import IconSuccess from 'terra-icon/lib/icon/IconSuccess';
import Image from 'terra-image';
import RepoInputComponent from './RepoInputComponent';
import './AddRepoView.scss';
import loadingSpinner from '../assets/loading_Spinner.gif';

const propTypes = {
  /** Error message for input */
  errorMessage: PropTypes.string.isRequired,
  /** If input is invalid */
  formInvalid: PropTypes.bool,
  /** Function for when repo url input field changes */
  URLFieldChange: PropTypes.func.isRequired,
  /** Function for when repo name input field changes */
  nameFieldChanged: PropTypes.func.isRequired,
  /** Help message to display under input field */
  helpMessage: PropTypes.string,
  /** Value of the repo URL input field */
  repoURL: PropTypes.string.isRequired,
  /** Value of the repo name input field */
  repoName: PropTypes.string.isRequired,
  /** Handler for when validate is clicked */
  validateClickHandler: PropTypes.func,
  /** Handler for when confirm is clicked */
  confirmClickHandler: PropTypes.func,
  /** Whether or not the URL has been validated */
  validated: PropTypes.bool,
  /** Whether or not the URL has been confirmed */
  confirmed: PropTypes.bool,
  /** Function for when the cancel button is clicked */
  cancelClickHandler: PropTypes.func.isRequired,
  /** Bool to determine if the app is loading or not */
  isLoading: PropTypes.bool.isRequired,
};

const defaultProps = {
  formInvalid: false,
};

const AddRepoView = (props) => {
  const {
    errorMessage,
    formInvalid,
    URLFieldChange,
    nameFieldChanged,
    helpMessage,
    repoURL,
    validateClickHandler,
    confirmClickHandler,
    repoName,
    validated,
    confirmed,
    cancelClickHandler,
    isLoading,
  } = props;

  return (
    <div className="AddRepoview-Window">
      <Text style={{ margin: '12px 0px 0px 25px' }} fontSize={32}>Track a New Repo</Text>
      {(isLoading) && (
        <Image
          src={loadingSpinner}
          height="60"
          width="60"
          style={{ top: '7px', position: 'absolute' }}
        />
      )}
      <RepoInputComponent
        errorMessage={errorMessage}
        formInvalid={formInvalid}
        URLFieldChange={URLFieldChange}
        nameFieldChanged={nameFieldChanged}
        helpMessage={helpMessage}
        repoURL={repoURL}
        repoName={repoName}
        isLoading={isLoading}
      />
      <Button
        style={{ margin: '0px 5px 0px 25px' }}
        text="Validate"
        onClick={validateClickHandler}
        isDisabled={validated || isLoading}
      />
      <Button
        style={{ margin: '0px 5px 0px 5px' }}
        text="Confirm"
        onClick={confirmClickHandler}
        isDisabled={confirmed || isLoading}
      />
      <Button
        style={{ margin: '0px 5px 0px 5px' }}
        text="Cancel"
        onClick={cancelClickHandler}
      />
      {confirmed && validated &&
        <IconSuccess />}
    </div>
  );
};

AddRepoView.propTypes = propTypes;
AddRepoView.defaultProps = defaultProps;

export default AddRepoView;
