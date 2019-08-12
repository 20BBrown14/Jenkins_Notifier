import React from 'react';
import AddRepoView from '../../../src/AddRepo/AddRepoView';

describe('AddRepoView', () => {
  it('should render a default view', () => {
    const testView = (shallow(
      <AddRepoView
        errorMessage="someMessage"
        repoURL=""
        repoName=""
        URLFieldChange={() => {}}
        nameFieldChanged={() => {}}
        cancelClickHandler={() => {}}
        isLoading={false}
      />,
    ));
    expect(testView).toMatchSnapshot();
  });
  describe('Button clicking', () => {
    let testView;
    let validateClickHandler;
    let cancelClickHandler;
    let confirmClickHandler;
    beforeEach(() => {
      validateClickHandler = jest.fn();
      cancelClickHandler = jest.fn();
      confirmClickHandler = jest.fn();
      testView = (shallow(
        <AddRepoView
          errorMessage="someMessage"
          validateClickHandler={validateClickHandler}
          URLFieldChange={() => {}}
          nameFieldChanged={() => {}}
          confirmClickHandler={confirmClickHandler}
          repoURL=""
          repoName=""
          cancelClickHandler={cancelClickHandler}
          isLoading={false}
        />,
      ));
    });
    describe('Validate button', () => {
      it('Should call validate button handler', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(3);
        buttons.at(0).simulate('click');
        expect(validateClickHandler).toHaveBeenCalled();
        expect(validateClickHandler).toHaveBeenCalledTimes(1);
      });
    });
    describe('Confirm button', () => {
      it('should call confirm click handler', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(3);
        buttons.at(1).simulate('click');
        expect(confirmClickHandler).toHaveBeenCalled();
        expect(confirmClickHandler).toHaveBeenCalledTimes(1);
      });
    });
    describe('Cancel button', () => {
      it('should call cancel click handler', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(3);
        buttons.at(2).simulate('click');
        expect(cancelClickHandler).toHaveBeenCalled();
        expect(cancelClickHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
