import React from 'react';
import { AppContainer } from '../../src/AppContainer';
import { VK_ADD_NEW_REPO, VK_REPOS } from '../../src/Navigation/viewKeys';

describe('AppContainer', () => {
  describe('Initialization', () => {
    it('should render a default view', () => {
      const testContainer = (mount(
        <AppContainer
          viewKey="someViewKey"
          repos={{}}
        />,
      ));
      expect(testContainer).toMatchSnapshot();
    });
  });
  describe('When view key is VK_REPOS', () => {
    it('should render a status view', () => {
      const wrapper = (shallow(
        <AppContainer
          viewKey={VK_REPOS}
          repos={{}}
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
        />,
      ));
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('View')).toBeDefined();
      expect(wrapper.find('View').find('AddRepo')).toBeDefined();
    });
  });
});
