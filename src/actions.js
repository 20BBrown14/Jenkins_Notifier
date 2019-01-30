/** @const action to load the app state from storage when it starts */
export const A_LOAD_APP_STATE = 'load_app_state';

export const loadAppStateAction = repos => (
  {
    type: A_LOAD_APP_STATE,
    data: { repos },
  }
);
