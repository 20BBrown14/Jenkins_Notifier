import { refreshRepoAction, A_REFRESH_REPO, repoIsRefreshedAction, A_REPO_IS_REFRESHED } from '../../src/actions';

describe('AppContainer Actions', () => {
  it('should produce a repo refresh action', () => {
    const refreshAction = refreshRepoAction('someRepoURL');
    expect(refreshAction.type).toEqual(A_REFRESH_REPO);
    expect(refreshAction.data.url).toEqual('someRepoURL');
  });
  it('should produce a repo is refresh action', () => {
    const refreshedAction = repoIsRefreshedAction('someData', 'someName');
    expect(refreshedAction.type).toEqual(A_REPO_IS_REFRESHED);
    expect(refreshedAction.data.data).toEqual('someData');
    expect(refreshedAction.data.repoName).toEqual('someName');
  });
});
