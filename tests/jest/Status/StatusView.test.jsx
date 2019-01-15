import React from 'react';
import StatusView from '../../../src/Status/StatusView';

describe('StatusView', () => {
  it('should render a default view', () => {
    const repoInformation = {
      someKey: 'someValue',
      anotherKey: 'anotherValue',
    };
    const testView = (shallow(
      <StatusView
        repos={repoInformation}
        addRepoClickHandler={() => {}}
        removeRepo={() => {}}
      />,
    ));
    expect(testView).toMatchSnapshot();
  });
});
