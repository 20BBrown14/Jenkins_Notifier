import React from 'react';
import JobInputComponent from '../../../src/Popup/JobInputComponent';

describe('JobInputComponent', () => {
  it('should render a default view', () => {
    const testComponent = (shallow(<JobInputComponent errorMessage="someMessage" handleValidation={() => {}} />));
    expect(testComponent).toMatchSnapshot();
  });
});
