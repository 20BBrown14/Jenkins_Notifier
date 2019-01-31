/** @const action to refresh repo */
export const A_REFRESH_REPO = 'refresh_repo';
/** @const action to indicate a repo has been refreshed */
export const A_REPO_IS_REFRESHED = 'repo_is_refreshed';

export const refreshRepoAction = url => (
  {
    type: A_REFRESH_REPO,
    data: { url },
  }
);

export const repoIsRefreshedAction = (data, repoName) => (
  {
    type: A_REPO_IS_REFRESHED,
    data: { data, repoName },
  }
);
