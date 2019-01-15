import React from 'react';
import StatusView from '../../../src/Status/StatusView';
import determineImage from '../../../src/modules/jobStatus';
import successful from '../../../src/assets/successful.png';

jest.mock('../../../src/modules/jobStatus');

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
        viewJobs={() => {}}
      />,
    ));
    expect(testView).toMatchSnapshot();
  });
  describe('Repos', () => {
    it('should render a view', () => {
      const repoInformation = {
        someRepo: {
          url: 'someUrl',
          jobs: {
            firstKey: {
              name: 'firstKey',
            },
            secondKey: {
              name: 'secondKey',
            },
          },
        },
        anotherRepo: {
          url: 'anotherUrl',
          jobs: {
            firstKey: {
              name: 'firstKey',
            },
            secondKey: {
              name: 'secondKey',
            },
          },
        },
      };
      const testView = (mount(
        <StatusView
          repos={repoInformation}
          addRepoClickHandler={() => {}}
          noRepos={() => {}}
          removeRepo={() => {}}
          viewJobs={() => {}}
        />,
      ));
      expect(testView).toMatchSnapshot();
    });
  });
  describe('Jobs', () => {
    it('should render a view', () => {
      determineImage.mockImplementation(color => (color === 'blue' ? 'successful' : 'unknown_status'));
      const repoInformation = {
        someRepo: {
          url: 'someUrl',
          jobs: {
            firstKey: {
              name: 'firstKey',
              color: 'blue',
            },
            secondKey: {
              name: 'secondKey',
            },
          },
        },
        anotherRepo: {
          url: 'anotherUrl',
          jobs: {
            firstKey: {
              name: 'firstKey',
            },
            secondKey: {
              name: 'secondKey',
            },
          },
        },
      };
      const repoToView = repoInformation.someRepo;
      const testView = (mount(
        <StatusView
          repos={repoInformation}
          addRepoClickHandler={() => {}}
          noRepos={() => {}}
          removeRepo={() => {}}
          viewJobs={() => {}}
          repoToView={repoToView}
        />,
      ));
      expect(testView).toMatchSnapshot();
    });
  });
  describe('Error', () => {
    it('should render an error view', () => {
      const testView = (mount(
        <StatusView
          repos={undefined}
          addRepoClickHandler={() => {}}
          noRepos={() => {}}
          removeRepo={() => {}}
          viewJobs={() => {}}
          repoToView={undefined}
        />,
      ));
      expect(testView).toMatchSnapshot();
    });
  });
});
