import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopupView from './PopupView';
import { URLInputDataChanged, validateRepoURL, nameInputDataChanged } from './actions';
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
};

/* eslint-disable-next-line react/prefer-stateless-function */
export class PopupContainer extends React.Component {
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
    } = this.props;

    const validateClick = () => {
      validateClickHandler(repoURL);
    };

    return (
      <PopupView
        errorMessage="Job url is NOT valid. Recheck and retry."
        formInvalid={formInvalid || false}
        URLFieldChange={URLFieldChange}
        nameFieldChanged={nameFieldChanged}
        helpMessage={helpMessage}
        repoURL={repoURL}
        repoName={repoName}
        validateClickHandler={validateClick}
        confirmClickHandler={confirmClickHandler}
      />
    );
  }
}

const mapStateToProps = state => ({
  repoURL: state[POPUP_STATE].repoURL,
  helpMessage: state[POPUP_STATE].helpMessage,
  formInvalid: state[POPUP_STATE].formInvalid,
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
  confirmClickHandler: () => {
    console.log('confirm');
    // TODO: Dispatch confirmClick
  },
});

PopupContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
