import React from 'react';
import { AppContainer, mapDispatchToProps } from '../../src/AppContainer';
import { VK_ADD_NEW_REPO, VK_REPOS } from '../../src/Navigation/viewKeys';

describe('AppContainer', () => {
  afterEach(() => {
    global.chrome.storage.sync.get = () => {};
  });
  describe('Initialization', () => {
    it('should render a default view', () => {
      const testContainer = (mount(
        <AppContainer
          viewKey="someViewKey"
          repos={{}}
          refreshRepo={() => {}}

        />,
      ));
      expect(testContainer).toMatchSnapshot();
    });
    it('should trigger componentwillmount life cycle event', () => {
      const refreshRepoMock = jest.fn();
      global.chrome.storage.sync.get = jest.fn((param1, someFunction) => {
        someFunction({ repos: { someKey: 'whatever' } });
      });
      const testContainer = (mount(
        <AppContainer
          viewKey="someViewKey"
          repos={{}}
          refreshRepo={refreshRepoMock}
        />,
      ));
      expect(testContainer).toMatchSnapshot();
      expect(refreshRepoMock).toHaveBeenCalled();
      expect(refreshRepoMock).toHaveBeenCalledTimes(1);
      expect(global.chrome.storage.sync.get).toHaveBeenCalled();
    });
  });
  describe('When view key is VK_REPOS', () => {
    it('should render a status view', () => {
      const wrapper = (shallow(
        <AppContainer
          viewKey={VK_REPOS}
          repos={{}}
          refreshRepo={() => {}}
        />,
      ));
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('View')).toBeDefined();
      expect(wrapper.find('View').find('Status')).toBeDefined();
    });
  });
  describe('When view key is VK_ADD_NEW_REPO', () => {
    it('should render an add new repo view', () => {
      const wrapper = (shallow(
        <AppContainer
          viewKey={VK_ADD_NEW_REPO}
          repos={{}}
          refreshRepo={() => {}}
        />,
      ));
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('View')).toBeDefined();
      expect(wrapper.find('View').find('AddRepo')).toBeDefined();
    });
  });
  describe('action dispatch', () => {
    let mockDispatch;
    afterEach(() => {
      expect(mockDispatch).toHaveBeenCalled();
      mockDispatch = undefined;
    });
    it('should dispatch a refresh repo action', () => {
      mockDispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.refreshRepo();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
