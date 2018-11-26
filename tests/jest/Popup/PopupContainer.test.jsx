import React from 'react';
import { PopupContainer, mapDispatchToProps } from '../../../src/Popup/PopupContainer';
import { A_JOB_INPUT_DATA_CHANGED, A_VALIDATE_REPO_URL } from '../../../src/Popup/actions';

describe('PopupContainer', () => {
  describe('Initialization', () => {
    it('should render a default view', () => {
      const testContainer = (shallow(
        <PopupContainer
          inputValidationFailed={() => {}}
          fieldChanged={() => {}}
          jobInputURL=""
        />,
      ));
      expect(testContainer).toMatchSnapshot();
    });
  });
  describe('Action dispatch', () => {
    it('dispatches a field data changed action', () => {
      const mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_JOB_INPUT_DATA_CHANGED);
        expect(action.data.newValue).toEqual('newValue');
      });
      const dispatchProps = mapDispatchToProps(mockDispatch, {});
      const mockEventObject = { target: { value: 'newValue' } };
      dispatchProps.fieldChanged(mockEventObject);
      expect(mockDispatch).toHaveBeenCalled();
    });
    it('dispatches a validate job URL action', () => {
      const mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_VALIDATE_REPO_URL);
        expect(action.data.jobInputURL).toEqual('someURL');
      });
      const dispatchProps = mapDispatchToProps(mockDispatch, {});
      dispatchProps.validateClickHandler('someURL');
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
