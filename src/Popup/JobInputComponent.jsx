import React from 'react';
import InputField from 'terra-form-input/lib/InputField';
import PropTypes from 'prop-types';

const propTypes = {
/** Error message */
  errorMessage: PropTypes.string.isRequired,
  /** Whether form input is invalid */
  formInvalid: PropTypes.bool,
  /** Function for validation */
  handleValidation: PropTypes.func.isRequired,
};

const defaultProps = {
  formInvalid: false,
};

const JobInputComponent = (props) => {
  const {
    errorMessage,
    formInvalid,
    handleValidation,
  } = props;

  return (
    <InputField
      inputId="jobNameInput"
      label="Input url of job to track"
      error={errorMessage}
      help="With or without 'api/xml' appended"
      isInvalid={formInvalid}
      onChange={handleValidation}
    />
  );
};

JobInputComponent.propTypes = propTypes;
JobInputComponent.defaultProps = defaultProps;

export default JobInputComponent;
