/** @const action for when Add New Repo button is clicked */
export const A_ADD_NEW_REPO_CLICKED = 'add_new_repo_clicked';
/** @const action to remove repo from list */
export const A_REMOVE_REPO = 'remove_repo';


export const removeRepoAction = repoToRemove => (
  {
    type: A_REMOVE_REPO,
    data: { repoToRemove },
  }
);
