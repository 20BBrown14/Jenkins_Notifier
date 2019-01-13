import React from 'react';
import { StatusContainer, mapDispatchToProps } from '../../../src/Status/StatusContainer';
import { A_ADD_NEW_REPO_CLICKED } from '../../../src/Status/actions';

describe('StatusContainer', () => {
  describe('Initialization', () => {
    it('should render a default view', () => {
      const testContainer = (shallow(
        <StatusContainer
          repos={{}}
          addNewRepoClicked={() => {}}
          noRepos={() => {}}
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
    it('dispatches an add new repo clicked action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_ADD_NEW_REPO_CLICKED);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.addNewRepoClicked();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    it('dispatches an add new repo clicke daction', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_ADD_NEW_REPO_CLICKED);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.noRepos();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
  describe('Component Did Mount', () => {
    it('should call noRepos when there are no repos in state', () => {
      const wrapper = shallow(
        <StatusContainer
          repos={null}
          addNewRepoClicked={() => {}}
          noRepos={jest.fn()}
        />,
      );
      // wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.noRepos).toHaveBeenCalled();
      expect(wrapper.instance().props.noRepos).toHaveBeenCalledTimes(1);
    });
  });
});
