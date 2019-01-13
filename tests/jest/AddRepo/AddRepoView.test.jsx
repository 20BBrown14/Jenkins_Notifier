import React from 'react';
import AddRepoView from '../../../src/AddRepo/AddRepoView';

describe('AddRepoView', () => {
  it('should render a default view', () => {
    const testView = (shallow(
      <AddRepoView
        errorMessage="someMessage"
        handleValidation={() => {}}
        repoURL=""
        repoName=""
        URLFieldChange={() => {}}
        nameFieldChanged={() => {}}
        cancelClickHandler={() => {}}
      />,
    ));
    expect(testView).toMatchSnapshot();
  });
});
