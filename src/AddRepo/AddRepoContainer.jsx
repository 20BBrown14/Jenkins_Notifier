import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddRepoView from './AddRepoView';
import {
  URLInputDataChanged,
  validateRepoURL,
  nameInputDataChanged,
  A_CONFIRM_BUTTON_CLICKED,
  A_INFORMATION_CONFIRMED,
  A_CANCEL_CLICKED,
} from './actions';
import { POPUP_STATE } from './reducers';

const propTypes = {
  /** If form input is invalid */
  formInvalid: PropTypes.bool,
  /** Function for when repo url input field changes */
  URLFieldChange: PropTypes.func.isRequired,
  /** Function for when repo name input field changes */
  nameFieldChanged: PropTypes.func.isRequired,
  /** Value of the repo URL input field */
  repoURL: PropTypes.string,
  /** Value of the repo name input field */
  repoName: PropTypes.string,
  /** Handler for when validate is clicked */
  validateClickHandler: PropTypes.func,
  /** handler for when confirm is clicked */
  confirmClickHandler: PropTypes.func,
  /** Help message */
  helpMessage: PropTypes.string.isRequired,
  /** Error message to display on error */
  errorMessage: PropTypes.string,
  /** Whether or not the url has been validated */
  validated: PropTypes.bool.isRequired,
  /** Whether or not the confirmed button has been clicked */
  confirmed: PropTypes.bool.isRequired,
  /** Function for when repo information has been confirmed */
  informationConfirmed: PropTypes.func,
  /** Function for when the cancel button is clicked */
  cancelClickHandler: PropTypes.func.isRequired,
};

/* eslint-disable-next-line react/prefer-stateless-function */
export class AddRepoContainer extends React.Component {
  componentDidUpdate() {
    const {
      validated,
      confirmed,
      informationConfirmed,
      repoName,
    } = this.props;
    if (validated && confirmed) {
      informationConfirmed(repoName);
    }
  }

  render() {
    const {
      formInvalid,
      URLFieldChange,
      nameFieldChanged,
      repoURL,
      validateClickHandler,
      confirmClickHandler,
      helpMessage,
      repoName,
      errorMessage,
      validated,
      confirmed,
      cancelClickHandler,
    } = this.props;

    const validateClick = () => {
      validateClickHandler(repoURL);
    };

    const confirmClick = () => {
      confirmClickHandler(validated, repoURL);
    };

    return (
      <AddRepoView
        errorMessage={errorMessage}
        formInvalid={formInvalid || false}
        URLFieldChange={URLFieldChange}
        nameFieldChanged={nameFieldChanged}
        helpMessage={helpMessage}
        repoURL={repoURL}
        repoName={repoName}
        validateClickHandler={validateClick}
        confirmClickHandler={confirmClick}
        validated={validated}
        confirmed={confirmed && validated}
        cancelClickHandler={cancelClickHandler}
      />
    );
  }
}

const mapStateToProps = state => ({
  repoURL: state[POPUP_STATE].repoURL,
  repoName: state[POPUP_STATE].repoName,
  helpMessage: state[POPUP_STATE].helpMessage,
  formInvalid: state[POPUP_STATE].formInvalid,
  errorMessage: state[POPUP_STATE].errorMessage,
  validated: state[POPUP_STATE].validated,
  confirmed: state[POPUP_STATE].confirmed,
});

export const mapDispatchToProps = dispatch => ({
  URLFieldChange: (newValue) => {
    dispatch(URLInputDataChanged(newValue.target.value));
  },
  nameFieldChanged: (newValue) => {
    dispatch(nameInputDataChanged(newValue.target.value));
  },
  validateClickHandler: (repoURL) => {
    dispatch(validateRepoURL(repoURL));
  },
  confirmClickHandler: (validated, repoURL) => {
    if (!validated) {
      dispatch(validateRepoURL(repoURL));
    }
    dispatch({ type: A_CONFIRM_BUTTON_CLICKED });
  },
  informationConfirmed: (repoName) => {
    dispatch({ type: A_INFORMATION_CONFIRMED, data: { repoName } });
    dispatch({ type: A_CANCEL_CLICKED });
  },
  cancelClickHandler: () => {
    dispatch({ type: A_CANCEL_CLICKED });
  },
});

AddRepoContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AddRepoContainer);
