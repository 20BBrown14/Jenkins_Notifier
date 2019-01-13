import React from 'react';
import { AppContainer } from '../../src/AppContainer';
import { VK_ADD_NEW_JOB, VK_JOB_STATUS } from '../../src/Navigation/viewKeys';

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
  describe('When view key is {VK_JOB_STATUS}', () => {
    it('should render a status view', () => {
      const wrapper = (shallow(
        <AppContainer
          viewKey={VK_JOB_STATUS}
          repos={{}}
        />,
      ));
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('View')).toBeDefined();
      expect(wrapper.find('View').find('Status')).toBeDefined();
    });
  });
  describe('When view key is VK_ADD_NEW_JOB', () => {
    it('should render an add new repo view', () => {
      const wrapper = (shallow(
        <AppContainer
          viewKey={VK_ADD_NEW_JOB}
          repos={{}}
        />,
      ));
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('View')).toBeDefined();
      expect(wrapper.find('View').find('AddRepo')).toBeDefined();
    });
  });
});
