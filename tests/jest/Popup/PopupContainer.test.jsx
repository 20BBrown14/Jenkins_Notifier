import React from 'react';
import { PopupContainer, mapDispatchToProps } from '../../../src/Popup/PopupContainer';
import {
  A_VALIDATE_REPO_URL,
  A_URL_INPUT_DATA_CHANGED,
  A_NAME_INPUT_DATA_CHANGED,
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
  });
});
