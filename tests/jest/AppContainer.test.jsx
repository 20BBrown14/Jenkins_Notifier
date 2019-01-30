import React from 'react';
import { AppContainer, mapDispatchToProps } from '../../src/AppContainer';
import { VK_ADD_NEW_REPO, VK_REPOS } from '../../src/Navigation/viewKeys';
import { A_LOAD_APP_STATE } from '../../src/actions';

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
          loadAppState={() => {}}
        />,
      ));
      expect(testContainer).toMatchSnapshot();
    });
    it('should trigger componentwillmount life cycle event', () => {
      const loadAppStateMock = jest.fn();
      global.chrome.storage.sync.get = jest.fn((param1, someFunction) => {
        someFunction({ repos: {} });
      });
      const testContainer = (mount(
        <AppContainer
          viewKey="someViewKey"
          repos={{}}
          loadAppState={loadAppStateMock}
        />,
      ));
      expect(testContainer).toMatchSnapshot();
      expect(loadAppStateMock).toHaveBeenCalled();
      expect(loadAppStateMock).toHaveBeenCalledTimes(1);
      expect(global.chrome.storage.sync.get).toHaveBeenCalled();
    });
  });
  describe('When view key is VK_REPOS', () => {
    it('should render a status view', () => {
      const wrapper = (shallow(
        <AppContainer
          viewKey={VK_REPOS}
          repos={{}}
          loadAppState={() => {}}
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
          loadAppState={() => {}}
        />,
      ));
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('View')).toBeDefined();
      expect(wrapper.find('View').find('AddRepo')).toBeDefined();
    });
  });
  describe('Component did update', () => {
    it('should set repos in storage', () => {
      global.chrome.storage.sync.get = jest.fn((param1, someFunction) => {
        someFunction({ repos: 'someRepo' });
      });
      global.chrome.storage.sync.set = jest.fn((param1, param2) => {
        param2();
        expect(param1).toEqual({ repos: {} });
      });
      const wrapper = shallow(
        <AppContainer
          viewKey="someViewKey"
          repos={null}
          loadAppState={() => {}}
        />,
      );
      wrapper.setProps({ viewKey: 'someOtherViewKey' });
      expect(wrapper).toMatchSnapshot();
      expect(global.chrome.storage.sync.set).toHaveBeenCalled();
      expect(global.chrome.storage.sync.set).toHaveBeenCalledTimes(1);
    });
  });
  describe('action dispatch', () => {
    let mockDispatch;
    afterEach(() => {
      expect(mockDispatch).toHaveBeenCalled();
      mockDispatch = undefined;
    });
    it('should dispatch load app state action', () => {
      mockDispatch = jest.fn((action) => {
        expect(action.type).toEqual(A_LOAD_APP_STATE);
      });
      const dispatchProps = mapDispatchToProps(mockDispatch);
      dispatchProps.loadAppState();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
