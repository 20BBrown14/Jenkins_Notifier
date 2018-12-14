import React from 'react';
import PopupView from '../../../src/Popup/PopupView';

describe('PopupView', () => {
  it('should render a default view', () => {
    const testView = (shallow(
      <PopupView
        errorMessage="someMessage"
        handleValidation={() => {}}
        repoURL=""
        repoName=""
        URLFieldChange={() => {}}
        nameFieldChanged={() => {}}
      />,
    ));
    expect(testView).toMatchSnapshot();
  });
});
