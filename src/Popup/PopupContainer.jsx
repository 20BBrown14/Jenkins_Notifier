import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopupView from './PopupView';
import { jobInputDataChanged, validateRepoURL } from './actions';
import { POPUP_STATE } from './reducers';

const propTypes = {
  /** If form input is invalid */
  formInvalid: PropTypes.bool,
  /** Function for when the input field data has chagned */
  fieldChanged: PropTypes.func.isRequired,
  /** Value of the job input url input field */
  jobInputURL: PropTypes.string,
  /** Handler for when validate is clicked */
  validateClickHandler: PropTypes.func,
  /** handler for when confirm is clicked */
  confirmClickHandler: PropTypes.func,
  /** Help message */
  helpMessage: PropTypes.string.isRequired,
};

/* eslint-disable-next-line react/prefer-stateless-function */
export class PopupContainer extends React.Component {
  render() {
    const {
      formInvalid,
      fieldChanged,
      jobInputURL,
      validateClickHandler,
      confirmClickHandler,
      helpMessage,
    } = this.props;

    const validateClick = () => {
      validateClickHandler(jobInputURL);
    };

    return (
      <PopupView
        errorMessage="Job url is NOT valid. Recheck and retry."
        formInvalid={formInvalid || false}
        fieldChanged={fieldChanged}
        helpMessage={helpMessage}
        jobInputURL={jobInputURL}
        validateClickHandler={validateClick}
        confirmClickHandler={confirmClickHandler}
      />
    );
  }
}

const mapStateToProps = state => ({
  jobInputURL: state[POPUP_STATE].jobInputURL,
  helpMessage: state[POPUP_STATE].helpMessage,
  formInvalid: state[POPUP_STATE].formInvalid,
});

export const mapDispatchToProps = dispatch => ({
  fieldChanged: (newValue) => {
    dispatch(jobInputDataChanged(newValue.target.value));
  },
  validateClickHandler: (jobInputURL) => {
    dispatch(validateRepoURL(jobInputURL));
  },
  confirmClickHandler: () => {
    console.log('confirm');
    // TODO: Dispatch confirmClick
  },
});

PopupContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
