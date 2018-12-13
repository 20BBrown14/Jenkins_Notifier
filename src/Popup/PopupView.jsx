import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import JobInputComponent from './JobInputComponent';
import './PopupView.scss';

const propTypes = {
  /** Error message for input */
  errorMessage: PropTypes.string.isRequired,
  /** If input is invalid */
  formInvalid: PropTypes.bool,
  /** Function to validate input */
  fieldChanged: PropTypes.func.isRequired,
  /** Help message to display under input field */
  helpMessage: PropTypes.string,
  /** Value of the job input url input field */
  jobInputURL: PropTypes.string.isRequired,
  /** Handler for when validate is clicked */
  validateClickHandler: PropTypes.func,
  /** Handler for when confirm is clicked */
  confirmClickHandler: PropTypes.func,
};

const defaultProps = {
  formInvalid: false,
};

const PopupView = (props) => {
  const {
    errorMessage,
    formInvalid,
    fieldChanged,
    helpMessage,
    jobInputURL,
    validateClickHandler,
    confirmClickHandler,
  } = props;

  return (
    <div className="popupview-Window">
      <JobInputComponent
        errorMessage={errorMessage}
        formInvalid={formInvalid}
        fieldChanged={fieldChanged}
        helpMessage={helpMessage}
        jobInputURL={jobInputURL}
      />
      <Button
        style={{ margin: '0px 5px 0px 25px' }}
        text="Validate"
        onClick={validateClickHandler}
      />
      <Button
        style={{ margin: '0px 0px 0px 5px' }}
        text="Confirm"
        onClick={confirmClickHandler}
      />
    </div>
  );
};

PopupView.propTypes = propTypes;
PopupView.defaultProps = defaultProps;

export default PopupView;
