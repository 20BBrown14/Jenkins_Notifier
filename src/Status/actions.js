/** @const action for when Add New Repo button is clicked */
export const A_ADD_NEW_REPO_CLICKED = 'add_new_repo_clicked';
/** @const action to remove repo from list */
export const A_REMOVE_REPO = 'remove_repo';
/** @const action to view a repo's jobs */
export const A_VIEW_JOBS_CLICKED = 'view_jobs_clicked';
/** @const action to remove job from repo */
export const A_REMOVE_JOB_CLICKED = 'remove_job_clicked';
/** @const action to go back to repo view from jobs view */
export const A_GO_BACK_TO_REPO_VIEW = 'go_back_to_repo_view';


export const removeRepoAction = repoToRemove => (
  {
    type: A_REMOVE_REPO,
    data: { repoToRemove },
  }
);


export const viewJobsClickedAction = repoToView => (
  {
    type: A_VIEW_JOBS_CLICKED,
    data: { repoToView },
  }
);

export const removeJobAction = (jobToRemove, repo) => (
  {
    type: A_REMOVE_JOB_CLICKED,
    data: { jobToRemove, repo },
  }
);
