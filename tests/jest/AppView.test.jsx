import React from 'react';
import View from '../../src/AppView';
import { VK_REPOS, VK_ADD_NEW_REPO } from '../../src/Navigation/viewKeys';

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
  describe('When view key is VK_REPOS', () => {
    it('should render a view with a status component', () => {
      const testView = (shallow(
        <View
          viewKey={VK_REPOS}
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
          viewKey={VK_ADD_NEW_REPO}
          repos={{}}
        />,
      ));
      expect(testView).toMatchSnapshot();
    });
  });
});
