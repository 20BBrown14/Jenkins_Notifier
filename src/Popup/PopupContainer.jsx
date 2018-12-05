import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopupView from './PopupView';
import { jobInputDataChanged, A_VALIDATE_REPO_URL } from './actions';
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
    } = this.props;

    const defaultHelpMessage = 'With or without \'/api/xml\' appended';

    const validateClick = () => {
      validateClickHandler(jobInputURL);
    };

    return (
      <PopupView
        errorMessage="Job url is not valid. Recheck and retry."
        isInvalid={formInvalid || false}
        fieldChanged={fieldChanged}
        helpMessage={false || defaultHelpMessage}
        jobInputURL={jobInputURL}
        validateClickHandler={validateClick}
        confirmClickHandler={confirmClickHandler}
      />
    );
  }
}

const mapStateToProps = state => ({
  // formInvalid: TODO: Get state
  jobInputURL: state[POPUP_STATE].jobInputURL,
});

export const mapDispatchToProps = dispatch => ({
  fieldChanged: (newValue) => {
    dispatch(jobInputDataChanged(newValue.target.value));
  },
  validateClickHandler: (jobInputURL) => {
    dispatch(
      {
        type: A_VALIDATE_REPO_URL,
        data: { jobInputURL },
      },
    );
  },
  confirmClickHandler: () => {
    console.log('confirm');
    // TODO: Dispatch confirmClick
  },
});

PopupContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
