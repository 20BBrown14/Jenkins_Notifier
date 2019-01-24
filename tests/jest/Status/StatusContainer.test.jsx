import React from 'react';
import { StatusContainer, mapDispatchToProps } from '../../../src/Status/StatusContainer';
import {
  A_ADD_NEW_REPO_CLICKED,
  A_REMOVE_REPO, A_VIEW_JOBS_CLICKED,
  A_REMOVE_JOB_CLICKED,
  A_GO_BACK_TO_REPO_VIEW,
} from '../../../src/Status/actions';

describe('StatusContainer', () => {
  describe('Initialization', () => {
    it('should render a default view', () => {
      const testContainer = (shallow(
        <StatusContainer
          repos={{}}
          addNewRepoClicked={() => {}}
          noRepos={() => {}}
          removeRepo={() => {}}
          viewJobs={() => {}}
          removeJob={() => {}}
          goBackToRepoView={() => {}}
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
    it('dispatches a view jobs action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_VIEW_JOBS_CLICKED);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.viewJobs('someRepo');
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    it('dispatches a remove jobs action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_REMOVE_JOB_CLICKED);
        expect(action.data.repo).toEqual('someRepoView');
        expect(action.data.jobToRemove).toEqual('someJobToRemove');
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.removeJob('someJobToRemove', 'someRepoView');
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    it('dispatches a go back action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_GO_BACK_TO_REPO_VIEW);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.goBackToRepoView();
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
          viewJobs={() => {}}
          removeJob={() => {}}
          goBackToRepoView={() => {}}
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
          viewJobs={() => {}}
          removeJob={() => {}}
          goBackToRepoView={() => {}}
        />,
      );
      wrapper.setProps({ repos: undefined, noRepos: jest.fn() });
      expect(wrapper.instance().props.noRepos).toHaveBeenCalled();
      expect(wrapper.instance().props.noRepos).toHaveBeenCalledTimes(1);
    });
  });
});
