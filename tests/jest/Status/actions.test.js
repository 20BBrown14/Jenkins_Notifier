import { A_REMOVE_REPO, removeRepoAction } from '../../../src/Status/actions';


describe('Status Actions', () => {
  it('should produce a remove repo action', () => {
    const removeAction = removeRepoAction('someRepoToRemove');
    expect(removeAction.type).toEqual(A_REMOVE_REPO);
    expect(removeAction.data.repoToRemove).toEqual('someRepoToRemove');
  });
});
