import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopupView from './PopupView';

const propTypes = {
  /** If form input is invalid */
  formInvalid: PropTypes.bool,
  /** Function if input validation failed */
  inputValidationFailed: PropTypes.func.isRequired,
};

/* eslint-disable-next-line react/prefer-stateless-function */
export class PopupContainer extends React.Component {
  render() {
    const {
      formInvalid,
      fieldValidationFailed,
    } = this.props;

    const validateInput = (event) => {
      // TODO: Validate Field
    };

    return (
      <PopupView
        errorMessage="Job url is not valid. Recheck and retry."
        isInvalid={formInvalid || false}
        handleValidation={validateInput}
      />
    );
  }
}

const mapStateToProps = state => ({
  // formInvalid: TODO: Get state
});

export const mapDispatchToProps = dispatch => ({
  inputValidationFailed: (error) => {
    // TODO: Dispatch error action
  },
});

PopupContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
