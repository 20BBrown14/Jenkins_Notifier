import reducers, { APP_STATE as REDUCER_KEY } from '../../src/reducers';
import { A_VALID_REPO_URL, A_INFORMATION_CONFIRMED } from '../../src/Popup/actions';

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
  describe('When reducer A_INFORMATION_CONFIRMED', () => {
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
              jobs: 'someJobs',
            },
            repos: {
              anotherName: {
                URL: 'anotherURL',
                jobs: 'someOtherJobs',
              },
            },
          };
          const newState = reducers[REDUCER_KEY](oldState, action);
          expect(newState.repos.someName).toBeDefined();
          expect(newState.repos.someName).toBeTruthy();
          expect(newState.repos.anotherName).toBeDefined();
          expect(newState.repos.anotherName.URL).toEqual('anotherURL');
          expect(newState.repos.anotherName.jobs).toEqual('someOtherJobs');
          expect(newState.repos.someName.URL).toEqual('someUrl');
          expect(newState.repos.someName.jobs).toEqual('someJobs');
        });
        it('should add repos object if it is not defined', () => {
          const action = {
            type: A_INFORMATION_CONFIRMED,
            data: { repoName: 'someName' },
          };
          const oldState = {
            jsonData: {
              url: 'someUrl',
              jobs: 'someJobs',
            },
          };
          const newState = reducers[REDUCER_KEY](oldState, action);
          expect(newState.repos).toBeDefined();
          expect(newState.repos.someName).toBeDefined();
          expect(newState.repos.someName).toBeTruthy();
          expect(newState.repos.someName.URL).toEqual('someUrl');
          expect(newState.repos.someName.jobs).toEqual('someJobs');
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
              jobs: 'someJobs',
            },
            repos: {
              anotherName: {
                URL: 'someUrl',
                jobs: 'someOtherJobs',
              },
            },
          };
          const newState = reducers[REDUCER_KEY](oldState, action);
          expect(newState.repos.anotherName).toBeUndefined();
          expect(newState.repos.someName).toBeDefined();
          expect(newState.repos.someName.URL).toEqual('someUrl');
          expect(newState.repos.someName.jobs).toEqual('someJobs');
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
            jobs: 'someJobs',
            displayName: 'someName',
          },
        };
        const newState = reducers[REDUCER_KEY](oldState, action);
        expect(newState.repos).toBeDefined();
        expect(newState.repos.someName).toBeDefined();
        expect(newState.repos.someName.URL).toEqual('someUrl');
        expect(newState.repos.someName.jobs).toEqual('someJobs');
      });
    });
  });
});
