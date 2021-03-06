import React from 'react';
import StatusView from '../../../src/Status/StatusView';
import { determineJobStatusImage, determineJobStatusTooltip } from '../../../src/modules/jobStatus';

jest.mock('../../../src/modules/jobStatus');

describe('StatusView', () => {
  // eslint-disable-next-line no-unneeded-ternary
  determineJobStatusTooltip.mockImplementation(color => (color ? color : 'unknown'));
  determineJobStatusImage.mockImplementation(color => (color === 'blue' ? 'successful' : 'unknown_status'));
  it('should render a default view', () => {
    const repoInformation = {};
    const testView = (mount(
      <StatusView
        repos={repoInformation}
        addRepoClickHandler={() => {}}
        removeRepo={() => {}}
        viewJobs={() => {}}
        removeJob={() => {}}
        goBack={() => {}}
        refreshRepo={() => {}}
        isLoading={false}
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
            firstKeya: {
              name: 'firstKeya',
            },
            secondKeya: {
              name: 'secondKeya',
            },
          },
        },
        anotherRepo: {
          url: 'anotherUrl',
          jobs: {
            firstKeyb: {
              name: 'firstKeyb',
            },
            secondKeyb: {
              name: 'secondKeyb',
            },
          },
        },
        andAnotherRepo: {
          url: 'andAnotherUrl',
          jobs: {
            firstKeyc: {
              name: 'firstKeyc',
            },
            secondKeyc: {
              name: 'secondKeyc',
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
          removeJob={() => {}}
          goBack={() => {}}
          refreshRepo={() => {}}
          isLoading={false}
        />,
      ));
      expect(testView).toMatchSnapshot();
      expect(testView.find('Button').length).toEqual(11);
      expect(testView.find('Arrange').length).toEqual(3);
    });
  });

  describe('Jobs', () => {
    it('should render a view', () => {
      const repoInformation = {
        someRepo: {
          url: 'someUrl',
          jobs: {
            firstKeya: {
              name: 'firstKeya',
              color: 'blue',
            },
            secondKeya: {
              name: 'secondKeya',
            },
          },
        },
        anotherRepo: {
          url: 'anotherUrl',
          jobs: {
            firstKeyb: {
              name: 'firstKeyb',
            },
            secondKeyb: {
              name: 'secondKeyb',
            },
          },
        },
      };
      const repoToView = 'someRepo';
      const testView = (mount(
        <StatusView
          repos={repoInformation}
          addRepoClickHandler={() => {}}
          noRepos={() => {}}
          removeRepo={() => {}}
          viewJobs={() => {}}
          repoToView={repoToView}
          removeJob={() => {}}
          goBack={() => {}}
          refreshRepo={() => {}}
          isLoading={false}
        />,
      ));
      expect(testView).toMatchSnapshot();
      expect(testView.find('Button').length).toEqual(7);
      expect(testView.find('Arrange').length).toEqual(2);
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
          removeJob={() => {}}
          goBack={() => {}}
          refreshRepo={() => {}}
          isLoading={false}
        />,
      ));
      expect(testView).toMatchSnapshot();
    });
  });

  describe('Repo Click handlers', () => {
    let repoInformation;
    let testView;
    let viewJobs;
    let removeRepo;
    let refreshRepo;
    beforeEach(() => {
      repoInformation = {
        someRepo: {
          URL: 'someUrl',
          jobs: {
            firstKeya: {
              name: 'firstKeya',
            },
            secondKeya: {
              name: 'secondKeya',
            },
          },
        },
        anotherRepo: {
          URL: 'anotherUrl',
          jobs: {
            firstKeyb: {
              name: 'firstKeyb',
            },
            secondKeyb: {
              name: 'secondKeyb',
            },
          },
        },
        andAnotherRepo: {
          URL: 'andAnotherUrl',
          jobs: {
            firstKeyc: {
              name: 'firstKeyc',
            },
            secondKeyc: {
              name: 'secondKeyc',
            },
          },
        },
      };
      viewJobs = jest.fn();
      removeRepo = jest.fn();
      refreshRepo = jest.fn();
      testView = (mount(
        <StatusView
          repos={repoInformation}
          addRepoClickHandler={() => {}}
          noRepos={() => {}}
          removeRepo={removeRepo}
          viewJobs={viewJobs}
          removeJob={() => {}}
          goBack={() => {}}
          refreshRepo={refreshRepo}
          isLoading={false}
        />,
      ));
    });
    afterAll(() => {
      expect(testView).toMatchSnapshot();
    });
    describe('View Repo Button', () => {
      it('should open jenkins window', () => {
        global.open = jest.fn();
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(11);
        buttons.at(1).simulate('click');
        expect(global.open).toHaveBeenCalledTimes(1);
        expect(global.open.mock.calls[0][0]).toEqual('someUrl');
        buttons.at(4).simulate('click');
        expect(global.open).toHaveBeenCalledTimes(2);
        expect(global.open.mock.calls[1][0]).toEqual('anotherUrl');
        buttons.at(7).simulate('click');
        expect(global.open).toHaveBeenCalledTimes(3);
        expect(global.open.mock.calls[2][0]).toEqual('andAnotherUrl');
      });
    });
    describe('View Jobs Button', () => {
      it('should call view jobs prop function', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(11);
        buttons.at(2).simulate('click');
        expect(viewJobs).toHaveBeenCalledTimes(1);
        expect(viewJobs.mock.calls[0][0]).toEqual('someRepo');
        buttons.at(5).simulate('click');
        expect(viewJobs).toHaveBeenCalledTimes(2);
        expect(viewJobs.mock.calls[1][0]).toEqual('anotherRepo');
        buttons.at(8).simulate('click');
        expect(viewJobs).toHaveBeenCalledTimes(3);
        expect(viewJobs.mock.calls[2][0]).toEqual('andAnotherRepo');
      });
    });
    describe('Remove repo button', () => {
      it('should call remove repo prop function', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(11);
        buttons.at(3).simulate('click');
        expect(removeRepo).toHaveBeenCalledTimes(1);
        expect(removeRepo.mock.calls[0][0]).toEqual('someRepo');
        buttons.at(6).simulate('click');
        expect(removeRepo).toHaveBeenCalledTimes(2);
        expect(removeRepo.mock.calls[1][0]).toEqual('anotherRepo');
        buttons.at(9).simulate('click');
        expect(removeRepo).toHaveBeenCalledTimes(3);
        expect(removeRepo.mock.calls[2][0]).toEqual('andAnotherRepo');
      });
    });
    describe('Refresh button', () => {
      it('should call refresh repo function', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(11);
        buttons.at(0).simulate('click');
        expect(refreshRepo).toHaveBeenCalled();
        expect(refreshRepo).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('Job Click handlers', () => {
    let repoInformation;
    let repoToView;
    let testView;
    let removeJob;
    let removeRepo;
    let goBack;
    beforeEach(() => {
      repoInformation = {
        someRepo: {
          url: 'someUrl',
          jobs: {
            firstKeya: {
              name: 'firstKeya',
              color: 'blue',
              url: 'firstKeyUrla',
            },
            secondKeya: {
              name: 'secondKeya',
              url: 'secondKeyUrla',
            },
          },
        },
        anotherRepo: {
          url: 'anotherUrl',
          jobs: {
            firstKeyb: {
              name: 'firstKeyb',
              url: 'firstKeyUrlb',
            },
            secondKey: {
              name: 'secondKeyb',
              url: 'secondKeyUrlb',
            },
          },
        },
      };
      repoToView = 'someRepo';
      removeJob = jest.fn();
      goBack = jest.fn();
      removeRepo = jest.fn();
      testView = (mount(
        <StatusView
          repos={repoInformation}
          addRepoClickHandler={() => {}}
          noRepos={() => {}}
          removeRepo={removeRepo}
          viewJobs={() => {}}
          repoToView={repoToView}
          removeJob={removeJob}
          goBack={goBack}
          refreshRepo={() => {}}
          isLoading={false}
        />,
      ));
    });
    afterAll(() => {
      expect(testView).toMatchSnapshot();
    });
    describe('View Job Button', () => {
      it('should call open window function', () => {
        global.open = jest.fn();
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(7);
        buttons.at(0).simulate('click');
        expect(global.open).toHaveBeenCalledTimes(1);
        expect(global.open.mock.calls[0][0]).toEqual('firstKeyUrla');
        buttons.at(2).simulate('click');
        expect(global.open).toHaveBeenCalledTimes(2);
        expect(global.open.mock.calls[1][0]).toEqual('secondKeyUrla');
      });
    });
    describe('Remove job button', () => {
      it('should call removeJob prop function', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(7);
        buttons.at(1).simulate('click');
        expect(removeJob).toHaveBeenCalled();
        expect(removeJob).toHaveBeenCalledTimes(1);
        expect(removeJob.mock.calls[0][0]).toEqual('firstKeya');
        expect(removeJob.mock.calls[0][1]).toEqual('someRepo');
        buttons.at(3).simulate('click');
        expect(removeJob).toHaveBeenCalledTimes(2);
        expect(removeJob.mock.calls[1][0]).toEqual('secondKeya');
        expect(removeJob.mock.calls[1][1]).toEqual('someRepo');
      });
    });
    describe('View Repo Button', () => {
      it('should call open window function', () => {
        global.open = jest.fn();
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(7);
        buttons.at(4).simulate('click');
        expect(global.open).toHaveBeenCalled();
        expect(global.open).toHaveBeenCalledTimes(1);
      });
    });
    describe('Back Button', () => {
      it('should call back button handler', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(7);
        buttons.at(5).simulate('click');
        expect(goBack).toHaveBeenCalled();
        expect(goBack).toHaveBeenCalledTimes(1);
      });
    });
    describe('Remove Repo Button', () => {
      it('should remove repo and go back to repo view', () => {
        const buttons = testView.find('Button');
        expect(buttons.length).toEqual(7);
        buttons.at(6).simulate('click');
        expect(goBack).toHaveBeenCalled();
        expect(goBack).toHaveBeenCalledTimes(1);
        expect(removeRepo).toHaveBeenCalled();
        expect(removeRepo).toHaveBeenCalledTimes(1);
      });
    });
  });
});
