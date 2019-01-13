import React from 'react';
import View from '../../src/AppView';
import { VK_JOB_STATUS, VK_ADD_NEW_JOB } from '../../src/Navigation/viewKeys';

describe('AppView', () => {
  it('should render a default view', () => {
    const testView = (shallow(
      <View
        viewKey="someKey"
        repos={{}}
      />,
    ));
    expect(testView).toMatchSnapshot();
  });
  describe('When view key is VK_JOB_STATUS', () => {
    it('should render a view with a status component', () => {
      const testView = (shallow(
        <View
          viewKey={VK_JOB_STATUS}
          repos={{}}
        />,
      ));
      expect(testView).toMatchSnapshot();
    });
  });
  describe('When view key is VK_ADD_NEW_REPO', () => {
    it('should render a vie with an AddRepo component', () => {
      const testView = (shallow(
        <View
          viewKey={VK_ADD_NEW_JOB}
          repos={{}}
        />,
      ));
      expect(testView).toMatchSnapshot();
    });
  });
});
