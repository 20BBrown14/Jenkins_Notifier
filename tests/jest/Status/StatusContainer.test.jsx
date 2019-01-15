import React from 'react';
import { StatusContainer, mapDispatchToProps } from '../../../src/Status/StatusContainer';
import { A_ADD_NEW_REPO_CLICKED, A_REMOVE_REPO } from '../../../src/Status/actions';

describe('StatusContainer', () => {
  describe('Initialization', () => {
    it('should render a default view', () => {
      const testContainer = (shallow(
        <StatusContainer
          repos={{}}
          addNewRepoClicked={() => {}}
          noRepos={() => {}}
          removeRepo={() => {}}
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
    it('dispatches an add new repo clicked action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_ADD_NEW_REPO_CLICKED);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.noRepos();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    it('dispatches a remove repo action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_REMOVE_REPO);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.removeRepo();
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
          removeRepo={() => {}}
        />,
      );
      expect(wrapper.instance().props.noRepos).toHaveBeenCalled();
      expect(wrapper.instance().props.noRepos).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component did update', () => {
    it('should call noRepos when there are no repos in state', () => {
      const wrapper = shallow(
        <StatusContainer
          repos={null}
          addNewRepoClicked={() => {}}
          noRepos={() => {}}
          removeRepo={() => {}}
        />,
      );
      wrapper.setProps({ repos: undefined, noRepos: jest.fn() });
      expect(wrapper.instance().props.noRepos).toHaveBeenCalled();
      expect(wrapper.instance().props.noRepos).toHaveBeenCalledTimes(1);
    });
  });
});
