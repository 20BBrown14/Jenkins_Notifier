
/** @const action for validating repo url in state */
export const A_VALIDATE_REPO_URL = 'validate_repo_url';

/** @const action for when repo url input field changes */
export const A_URL_INPUT_DATA_CHANGED = 'url_input_data_changed';

/** @const action for when repo name input field changes */
export const A_NAME_INPUT_DATA_CHANGED = 'name_input_data_changed';

/** @const action for when job input url is valid */
export const A_VALID_REPO_URL = 'valid_repo_url';

/** @const action for when job input url is invalid */
export const A_INVALID_REPO_URL = 'invalid_repo_url';

/** @const action for when confirm button is clicked */
export const A_CONFIRM_BUTTON_CLICKED = 'confirm_button_clicked';

/** @const action for when repo information has been validated and confirmed */
export const A_INFORMATION_CONFIRMED = 'information confirmed';

/** @const action for when cancel button is clicked */
export const A_CANCEL_CLICKED = 'cancel_clicked';

/**
 * Action creator for A_URL_INPUT_DATA_CHANGED
 */
export const URLInputDataChanged = newValue => (
  {
    type: A_URL_INPUT_DATA_CHANGED,
    data: { newValue },
  }
);

/**
 * Action creator for A_NAME_INPUT_DATA_CHANGED
 */
export const nameInputDataChanged = newValue => (
  {
    type: A_NAME_INPUT_DATA_CHANGED,
    data: { newValue },
  }
);

export const validateRepoURL = URL => (
  {
    type: A_VALIDATE_REPO_URL,
    data: { URL },
  }
);

export const invalidRepoURL = error => (
  {
    type: A_INVALID_REPO_URL,
    data: { errorMessage: error },
  }
);
