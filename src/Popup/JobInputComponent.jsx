import React from 'react';
import InputField from 'terra-form-input/lib/InputField';
import PropTypes from 'prop-types';


const propTypes = {
/** Error message */
  errorMessage: PropTypes.string.isRequired,
  /** Whether form input is invalid */
  formInvalid: PropTypes.bool,
  /** Function for validation */
  fieldChanged: PropTypes.func.isRequired,
  /** Help message to display under input field */
  helpMessage: PropTypes.string,
  /** Value of the job input url field */
  jobInputURL: PropTypes.string.isRequired,
};

const defaultProps = {
  formInvalid: false,
};

const JobInputComponent = (props) => {
  const {
    errorMessage,
    formInvalid,
    fieldChanged,
    helpMessage,
    jobInputURL,
  } = props;

  return (
    <InputField
      style={{ margin: '25px' }}
      inputId="jobNameInput"
      label="Input URL of repo to track"
      error={errorMessage}
      help={helpMessage}
      isInvalid={formInvalid}
      onChange={fieldChanged}
      value={jobInputURL}
    />
  );
};

JobInputComponent.propTypes = propTypes;
JobInputComponent.defaultProps = defaultProps;

export default JobInputComponent;
