import React from 'react';
import { PopupContainer, mapDispatchToProps } from '../../../src/Popup/PopupContainer';
import {
  A_VALIDATE_REPO_URL,
  A_URL_INPUT_DATA_CHANGED,
  A_NAME_INPUT_DATA_CHANGED,
  A_CONFIRM_BUTTON_CLICKED,
  A_INFORMATION_CONFIRMED,
} from '../../../src/Popup/actions';

describe('PopupContainer', () => {
  describe('Initialization', () => {
    it('should render a default view', () => {
      const testContainer = (shallow(
        <PopupContainer
          inputValidationFailed={() => {}}
          URLFieldChange={() => {}}
          nameFieldChanged={() => {}}
          repoURL=""
          repoName=""
          helpMessage=""
          errorMessage=""
          validated={false}
          confirmed={false}
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
    describe('Confirm Button Click Handler', () => {
      beforeEach(() => {
        mockDispatch = jest.fn();
      });
      afterEach(() => {
        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch.mock.calls.length).toBe(2);
      });
      describe('URL already validated', () => {
        it('dispatches a confirm button clicked action', () => {
          mapDispatchToProps(mockDispatch).confirmClickHandler(true, 'someName');
          expect(mockDispatch.mock.calls[0][0].type).toEqual(A_CONFIRM_BUTTON_CLICKED);
        });
        it('dispatches a information confirmed action', () => {
          mockDispatch = jest.fn();
          mapDispatchToProps(mockDispatch).confirmClickHandler(true, 'someName');
          expect(mockDispatch.mock.calls[1][0].type).toEqual(A_INFORMATION_CONFIRMED);
          expect(mockDispatch.mock.calls[1][0].data).toEqual({ repoName: 'someName' });
        });
      });
      describe('URL not already validated', () => {
        it('dispatches a valide URL action', () => {
          mapDispatchToProps(mockDispatch).confirmClickHandler(false, 'someName', 'someURL');
          expect(mockDispatch.mock.calls[0][0].type).toEqual(A_VALIDATE_REPO_URL);
          expect(mockDispatch.mock.calls[0][0].data).toEqual({ URL: 'someURL' });
        });
        it('dispatches a confirm button clicked action', () => {
          mapDispatchToProps(mockDispatch).confirmClickHandler(false);
          expect(mockDispatch.mock.calls[1][0].type).toEqual(A_CONFIRM_BUTTON_CLICKED);
        });
      });
    });
  });
  describe('componentDidUpdate', () => {
    it('should call confirmClickHandler when information has been validated and confirmed', () => {
      const props = {
        inputValidationFailed: () => {},
        URLFieldChange: () => {},
        nameFieldChanged: () => {},
        repoURL: '',
        repoName: '',
        helpMessage: '',
        errorMessage: '',
        confirmClickHandler: jest.fn(),
        validated: true,
        confirmed: false,
      };
      const wrapper = shallow(<PopupContainer {...props} />);
      wrapper.setProps({ confirmed: true });
      expect(wrapper.instance().props.confirmClickHandler).toHaveBeenCalled();
    });
  });
});
