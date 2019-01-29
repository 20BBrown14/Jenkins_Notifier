import React from 'react';
import { AddRepoContainer, mapDispatchToProps } from '../../../src/AddRepo/AddRepoContainer';
import {
  A_VALIDATE_REPO_URL,
  A_URL_INPUT_DATA_CHANGED,
  A_NAME_INPUT_DATA_CHANGED,
  A_CONFIRM_BUTTON_CLICKED,
  A_INFORMATION_CONFIRMED,
  A_CANCEL_CLICKED,
} from '../../../src/AddRepo/actions';

describe('AddRepoContainer', () => {
  describe('Initialization', () => {
    it('should render a default view', () => {
      const testContainer = (shallow(
        <AddRepoContainer
          inputValidationFailed={() => {}}
          URLFieldChange={() => {}}
          nameFieldChanged={() => {}}
          cancelClickHandler={() => {}}
          repoURL=""
          repoName=""
          helpMessage=""
          errorMessage=""
          validated={false}
          confirmed={false}
          isLoading={false}
        />,
      ));
      expect(testContainer).toMatchSnapshot();
    });
  });
  describe('Action dispatch', () => {
    let mockDispatch;
    afterEach(() => {
      expect(mockDispatch).toHaveBeenCalled();
      mockDispatch = undefined;
    });
    it('dispatches a URL input data changed action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_URL_INPUT_DATA_CHANGED);
        expect(action.data.newValue).toEqual('newValue');
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      const mockEventObject = { target: { value: 'newValue' } };
      dispatchProps.URLFieldChange(mockEventObject);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    it('dispatches a name input data changed action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_NAME_INPUT_DATA_CHANGED);
        expect(action.data.newValue).toEqual('newValue');
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      const mockEventObject = { target: { value: 'newValue' } };
      dispatchProps.nameFieldChanged(mockEventObject);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    it('dispatches a validate job URL action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_VALIDATE_REPO_URL);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch, {});
      dispatchProps.validateClickHandler('someURL');
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    describe('informationConfirmed', () => {
      it('dispatches an information confirmed action', () => {
        mockDispatch = jest.fn();
        const dispatchProps = mapDispatchToProps(mockDispatch, {});
        dispatchProps.informationConfirmed('someName');
        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch.mock.calls[0][0].type).toEqual(A_INFORMATION_CONFIRMED);
        expect(mockDispatch.mock.calls[0][0].data).toEqual({ repoName: 'someName' });
      });
      it('dispatches a cancel clicked action', () => {
        mockDispatch = jest.fn();
        const dispatchProps = mapDispatchToProps(mockDispatch, {});
        dispatchProps.informationConfirmed();
        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch.mock.calls[1][0].type).toEqual(A_CANCEL_CLICKED);
      });
    });
    it('dispatches a cancel clicked action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_CANCEL_CLICKED);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch, {});
      dispatchProps.cancelClickHandler();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    describe('Confirm Button Click Handler', () => {
      beforeEach(() => {
        mockDispatch = jest.fn();
      });
      describe('URL already validated', () => {
        it('dispatches a confirm button clicked action', () => {
          mapDispatchToProps(mockDispatch).confirmClickHandler(true);
          expect(mockDispatch.mock.calls[0][0].type).toEqual(A_CONFIRM_BUTTON_CLICKED);
          expect(mockDispatch).toHaveBeenCalledTimes(1);
        });
      });
      describe('URL not already validated', () => {
        it('dispatches a validate URL action', () => {
          mapDispatchToProps(mockDispatch).confirmClickHandler(false, 'someURL');
          expect(mockDispatch.mock.calls[1][0].type).toEqual(A_VALIDATE_REPO_URL);
          expect(mockDispatch.mock.calls[1][0].data).toEqual({ URL: 'someURL' });
          expect(mockDispatch).toHaveBeenCalledTimes(2);
        });
        it('dispatches a confirm button clicked action', () => {
          mapDispatchToProps(mockDispatch).confirmClickHandler(false);
          expect(mockDispatch.mock.calls[0][0].type).toEqual(A_CONFIRM_BUTTON_CLICKED);
          expect(mockDispatch).toHaveBeenCalledTimes(2);
        });
      });
    });
  });
  describe('componentDidUpdate', () => {
    it('should call informationConfirmed when information has been validated and confirmed', () => {
      const props = {
        inputValidationFailed: () => {},
        URLFieldChange: () => {},
        nameFieldChanged: () => {},
        cancelClickHandler: () => {},
        repoURL: '',
        repoName: '',
        helpMessage: '',
        errorMessage: '',
        informationConfirmed: jest.fn(),
        validated: true,
        confirmed: false,
        isLoading: false,
      };
      const wrapper = shallow(<AddRepoContainer {...props} />);
      wrapper.setProps({ confirmed: true });
      expect(wrapper.instance().props.informationConfirmed).toHaveBeenCalled();
    });
  });
});
