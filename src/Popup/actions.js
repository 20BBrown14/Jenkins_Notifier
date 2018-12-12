
/** @const action for validating repo url in state */
export const A_VALIDATE_REPO_URL = 'validate_repo_url';

/** @const action for when job input field data changed */
export const A_JOB_INPUT_DATA_CHANGED = 'job_input_data_changed';

/** @const action for when job input url is valid */
export const A_VALID_REPO_URL = 'valid_repo_url';

/** @const action for when job input url is invalid */
export const A_INVALID_REPO_URL = 'invalid_repo_url';

/**
 * Action creator for A_JOB_INPUT_DATA_CHANGED
 */
export const jobInputDataChanged = newValue => (
  {
    type: A_JOB_INPUT_DATA_CHANGED,
    data: { newValue },
  }
);

export const validateRepoURL = URL => (
  {
    type: A_VALIDATE_REPO_URL,
    data: { URL },
  }
);
