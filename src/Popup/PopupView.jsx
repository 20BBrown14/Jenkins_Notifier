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
  handleValidation: PropTypes.func.isRequired,
};

const defaultProps = {
  formInvalid: false,
};

const PopupView = (props) => {
  const {
    errorMessage,
    formInvalid,
    handleValidation,
  } = props;

  return (
    <div className="popupview-Window">
      <JobInputComponent
        errorMessage={errorMessage}
        isInvalid={formInvalid}
        handleValidation={handleValidation}
      />
      <Button
        style={{ margin: '0px 5px 0px 25px' }}
        text="Validate"
      />
      <Button
        style={{ margin: '0px 0px 0px 5px' }}
        text="Confirm"
      />
    </div>
  );
};

PopupView.propTypes = propTypes;
PopupView.defaultProps = defaultProps;

export default PopupView;
