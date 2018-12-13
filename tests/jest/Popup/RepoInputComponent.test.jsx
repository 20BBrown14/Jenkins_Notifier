import React from 'react';
import RepoInputComponent from '../../../src/Popup/RepoInputComponent';

describe('RepoInputComponent', () => {
  it('should render a default view', () => {
    const testComponent = (shallow(
      <RepoInputComponent
        errorMessage="someMessage"
        handleValidation={() => {}}
        repoURL=""
        repoName=""
        URLFieldChange={() => {}}
        nameFieldChanged={() => {}}
      />,
    ));
    expect(testComponent).toMatchSnapshot();
  });
});
