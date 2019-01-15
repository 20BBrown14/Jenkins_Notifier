import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import Text from 'terra-text';
import IconSuccess from 'terra-icon/lib/icon/IconSuccess';
import RepoInputComponent from './RepoInputComponent';
import './AddRepoView.scss';

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
  } = props;

  return (
    <div className="AddRepoview-Window">
      <Text style={{ margin: '12px 0px 0px 25px' }} fontSize={32}>Track a New Repo</Text>
      <RepoInputComponent
        errorMessage={errorMessage}
        formInvalid={formInvalid}
        URLFieldChange={URLFieldChange}
        nameFieldChanged={nameFieldChanged}
        helpMessage={helpMessage}
        repoURL={repoURL}
        repoName={repoName}
      />
      <Button
        style={{ margin: '0px 5px 0px 25px' }}
        text="Validate"
        onClick={validateClickHandler}
        isDisabled={validated}
      />
      <Button
        style={{ margin: '0px 5px 0px 5px' }}
        text="Confirm"
        onClick={confirmClickHandler}
        isDisabled={confirmed}
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