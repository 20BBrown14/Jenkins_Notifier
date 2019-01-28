import React from 'react';
import InputField from 'terra-form-input/lib/InputField';
import PropTypes from 'prop-types';


const propTypes = {
/** Error message */
  errorMessage: PropTypes.string.isRequired,
  /** Whether form input is invalid */
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
  /** Whether or not the view is loading */
  isLoading: PropTypes.bool,
};

const defaultProps = {
  formInvalid: false,
};

const RepoInputComponent = (props) => {
  const {
    errorMessage,
    formInvalid,
    URLFieldChange,
    helpMessage,
    repoURL,
    repoName,
    nameFieldChanged,
    isLoading,
  } = props;
  return (
    <div>
      <InputField
        style={{ margin: '15px 25px 12.5px 25px' }}
        inputId="repoNameInput"
        label="Name"
        value={repoName}
        onChange={nameFieldChanged}
        help="Input no name to use name on Jenkins"
        inputAttrs={{ disabled: isLoading }}
      />
      <InputField
        style={{ margin: '12.5px 25px 12.5px 25px' }}
        inputId="repoURLInput"
        label="URL"
        error={errorMessage}
        help={helpMessage}
        isInvalid={formInvalid}
        onChange={URLFieldChange}
        value={repoURL}
        inputAttrs={{ disabled: isLoading }}
      />
    </div>
  );
};

RepoInputComponent.propTypes = propTypes;
RepoInputComponent.defaultProps = defaultProps;

export default RepoInputComponent;
