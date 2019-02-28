/* global chrome */
import reducers, { APP_STATE as REDUCER_KEY } from '../../src/reducers';
import { A_VALID_REPO_URL, A_INFORMATION_CONFIRMED, A_CANCEL_CLICKED } from '../../src/AddRepo/actions';
import {
  A_ADD_NEW_REPO_CLICKED,
  A_REMOVE_REPO,
  A_REMOVE_JOB_CLICKED,
  A_GO_BACK_TO_REPO_VIEW,
} from '../../src/Status/actions';
import { VK_ADD_NEW_REPO, VK_REPOS } from '../../src/Navigation/viewKeys';
import { A_REPO_IS_REFRESHED } from '../../src/actions';

const google = require('../../src/modules/googleHelpers');

describe('App Reducers', () => {
  describe('When initialized', () => {
    it('should return a state object', () => {
      const state = reducers[REDUCER_KEY](undefined, {});
      expect(state).not.toBeNull();
      expect(state).toBeTruthy();
    });
  });
  describe('When reducing A_VALID_REPO_URL', () => {
    it('Adds network request response to state', () => {
      const action = {
        type: A_VALID_REPO_URL,
        data: { jsonData: 'someData' },
      };
      const newState = reducers[REDUCER_KEY](undefined, action);
      expect(newState.jsonData).toEqual('someData');
    });
  });

  describe('When reducing A_ADD_NEW_REPO_CLICKED', () => {
    it('Updates the state view key to VK_ADD_NEW_REPO', () => {
      const oldState = { viewKey: 'someViewKey' };
      const newState = reducers[REDUCER_KEY](oldState, { type: A_ADD_NEW_REPO_CLICKED });
      expect(newState.viewKey).toEqual(VK_ADD_NEW_REPO);
    });
  });

  describe('When reducing A_CANCEL_CLICKED', () => {
    it('Updaotes the state view key to VK_REPOS', () => {
      const oldState = { viewKey: 'someViewKey' };
      const newState = reducers[REDUCER_KEY](oldState, { type: A_CANCEL_CLICKED });
      expect(newState.viewKey).toEqual(VK_REPOS);
    });
  });

  describe('When reducing A_INFORMATION_CONFIRMED', () => {
    let spy;
    beforeEach(() => {
      spy = jest.spyOn(google, 'googleStorageReposSet');
    });
    afterEach(() => {
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(chrome.runtime.sendMessage).toHaveBeenCalled();
      expect(chrome.runtime.sendMessage).toHaveBeenCalledTimes(1);
      jest.clearAllMocks();
    });
    describe('Repo name was defined', () => {
      describe('Repo URL not already in state', () => {
        it('should add repo to state', () => {
          const action = {
            type: A_INFORMATION_CONFIRMED,
            data: { repoName: 'someName' },
          };
          const oldState = {
            jsonData: {
              url: 'someUrl',
              jobs: {
                0: {
                  name: 'someJobName',
                },
              },
            },
            repos: {},
          };
          const newState = reducers[REDUCER_KEY](oldState, action);
          expect(newState.repos.someName).toBeDefined();
          expect(newState.repos.someName).toBeTruthy();
          expect(newState.repos.someName.URL).toEqual('someUrl');
          expect(newState.repos.someName.jobs).toEqual({ someJobName: { name: 'someJobName' } });
        });
        it('should add repos object if it is not defined', () => {
          const action = {
            type: A_INFORMATION_CONFIRMED,
            data: { repoName: 'someName' },
          };
          const oldState = {
            jsonData: {
              url: 'someUrl',
              jobs: {
                0: {
                  name: 'someJobName',
                },
              },
            },
          };
          const newState = reducers[REDUCER_KEY](oldState, action);
          expect(newState.repos).toBeDefined();
          expect(newState.repos.someName).toBeDefined();
          expect(newState.repos.someName).toBeTruthy();
          expect(newState.repos.someName.URL).toEqual('someUrl');
          expect(newState.repos.someName.jobs).toEqual({ someJobName: { name: 'someJobName' } });
        });
      });
      describe('Repo URL already in state', () => {
        it('Should delete old repo information and replace with new name', () => {
          const action = {
            type: A_INFORMATION_CONFIRMED,
            data: { repoName: 'someName' },
          };
          const oldState = {
            jsonData: {
              url: 'someUrl',
              jobs: {
                0: {
                  name: 'someJobName',
                },
              },
            },
            repos: {
              anotherName: {
                URL: 'someUrl',
                jobs: {
                  0: {
                    name: 'someJobName',
                  },
                },
              },
            },
          };
          const newState = reducers[REDUCER_KEY](oldState, action);
          expect(newState.repos.anotherName).toBeUndefined();
          expect(newState.repos.someName).toBeDefined();
          expect(newState.repos.someName.URL).toEqual('someUrl');
          expect(newState.repos.someName.jobs).toEqual({ someJobName: { name: 'someJobName' } });
        });
      });
    });
    describe('Repo name was not defined', () => {
      it('should use the repo name from jsonData', () => {
        const action = {
          type: A_INFORMATION_CONFIRMED,
          data: { repoName: '' },
        };
        const oldState = {
          jsonData: {
            url: 'someUrl',
            jobs: {
              0: {
                name: 'someJobName',
              },
            },
            displayName: 'someName',
          },
        };
        const newState = reducers[REDUCER_KEY](oldState, action);
        expect(newState.repos).toBeDefined();
        expect(newState.repos.someName).toBeDefined();
        expect(newState.repos.someName.URL).toEqual('someUrl');
        expect(newState.repos.someName.jobs).toEqual({ someJobName: { name: 'someJobName' } });
      });
    });
  });
  describe('When reducing A_REMOVE_REPO', () => {
    it('should delete the given repo from state', () => {
      const spy = jest.spyOn(google, 'googleStorageReposSet');
      const action = {
        type: A_REMOVE_REPO,
        data: { repoToRemove: 'someRepo' },
      };
      const oldState = {
        repos: {
          aRepo: 'aRepo',
          someRepo: 'someRepo',
          anotherRepo: 'anotherRepo',
        },
      };
      const newState = reducers[REDUCER_KEY](oldState, action);
      expect(newState.repos).toBeDefined();
      expect(newState.repos.aRepo).toBeDefined();
      expect(newState.repos.anotherRepo).toBeDefined();
      expect(newState.repos.someRepo).toBeUndefined();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(chrome.runtime.sendMessage).toHaveBeenCalled();
      expect(chrome.runtime.sendMessage).toHaveBeenCalledTimes(1);
    });
  });
  describe('When reducing A_REMOVE_JOB_CLICKED', () => {
    it('should remove a job from a repo', () => {
      const action = {
        type: A_REMOVE_JOB_CLICKED,
        data: { jobToRemove: 'someJobToRemove', repo: 'someRepo' },
      };
      const oldState = {
        repos: {
          someRepo: {
            jobs: {
              someJob: 'someJob',
              someJobToRemove: 'someJobToRemove',
            },
          },
          anotherRepo: {
            jobs: {
              anotherJob: 'anotherJob',
              andAnotherJob: 'andAnotherJob',
            },
          },
        },
      };
      const newState = reducers[REDUCER_KEY](oldState, action);
      expect(newState.repos.someRepo).toBeDefined();
      expect(newState.repos.someRepo.jobs).toBeDefined();
      expect(newState.repos.someRepo.jobs.someJob).toBeDefined();
      expect(newState.repos.someRepo.jobs.someJobToRemove).toBeUndefined();
      expect(newState.repos.anotherRepo.jobs).toBeDefined();
    });
    describe('When last job is removed', () => {
      it('Should returned undefined for repo.jobs', () => {
        const action = {
          type: A_REMOVE_JOB_CLICKED,
          data: { jobToRemove: 'someJobToRemove', repo: 'someRepo' },
        };
        const oldState = {
          repos: {
            someRepo: {
              jobs: {
                someJobToRemove: 'someJobToRemove',
              },
            },
          },
        };
        const newState = reducers[REDUCER_KEY](oldState, action);
        expect(newState.repos.someRepo).toBeDefined();
        expect(newState.repos.someRepo.jobs).toBeUndefined();
      });
    });
  });
  describe('When reducing A_GO_BACK_TO_REPO_VIEW', () => {
    it('should set view key', () => {
      const action = {
        type: A_GO_BACK_TO_REPO_VIEW,
      };
      const oldState = {
        viewKey: 'someotherkey',
      };
      const newState = reducers[REDUCER_KEY](oldState, action);
      expect(newState).toBeDefined();
      expect(newState.viewKey).toEqual(VK_REPOS);
    });
  });
  describe('When reducing A_REPO_IS_REFRESHED', () => {
    let spy;
    beforeEach(() => {
      spy = jest.spyOn(google, 'googleStorageReposSet');
    });
    afterEach(() => {
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      spy = undefined;
    });
    it('should add jsonData to state', () => {
      const action = {
        type: A_REPO_IS_REFRESHED,
        data: {
          data: {
            url: 'someUrl',
            jobs: {
              job1: 'someJob',
            },
          },
          repoName: 'someName',
        },
      };
      const newState = reducers[REDUCER_KEY](undefined, action);
      expect(newState).toBeDefined();
      expect(newState.jsonData).toBeDefined();
      expect(newState.jsonData).toEqual({
        url: 'someUrl',
        jobs: {
          job1: 'someJob',
        },
      });
    });
    it('should update repo information', () => {
      const action = {
        type: A_REPO_IS_REFRESHED,
        data: {
          data: {
            url: 'someUrl',
            jobs: {
              job1: 'someJob',
            },
          },
          repoName: 'someName',
        },
      };
      const newState = reducers[REDUCER_KEY](undefined, action);
      expect(newState).toBeDefined();
      expect(newState.repos).toBeDefined();
      expect(newState.repos.someName).toBeDefined();
    });
  });
});
