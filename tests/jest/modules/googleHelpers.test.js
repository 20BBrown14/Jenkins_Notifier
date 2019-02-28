/* global chrome */
import {
  googleMessage,
  googleStorageReposGet,
  googleStorageReposSet,
} from '../../../src/modules/googleHelpers';

describe('googleHelpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Google Storage Repos Get', () => {
    describe('repos are returned from storage', () => {
      it('should call google storage sync', () => {
        googleStorageReposGet();
        expect(chrome.storage.sync.get).toHaveBeenCalled();
        expect(chrome.storage.sync.get).toHaveBeenCalledTimes(1);
      });
      it('should call callback for each key', () => {
        const result = {
          repos: {
            zero: 'someZero',
            one: 'someOne',
          },
        };
        chrome.storage.sync.get = jest.fn((repoName, callback) => {
          callback(result);
        });
        const callback = jest.fn();
        googleStorageReposGet(callback);
        expect(callback).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback.mock.calls[0][0]).toEqual('someZero');
        expect(callback.mock.calls[0][1]).toEqual('zero');
        expect(callback.mock.calls[1][0]).toEqual('someOne');
        expect(callback.mock.calls[1][1]).toEqual('one');
      });
    });
    describe('no repos returned from storage', () => {
      it('should not call callback', () => {
        const result = {
          repos: {},
        };
        chrome.storage.sync.get = jest.fn((repoName, callBack) => {
          callBack(result);
        });
        const callback = jest.fn();
        googleStorageReposGet(callback);
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });
  describe('google storage repos set', () => {
    describe('repos is provided', () => {
      let repos;
      beforeEach(() => {
        repos = {
          someKey: { URL: 'someUrl' },
          anotherKey: { URL: 'anotherUrl' },
        };
      });
      it('should call google set', () => {
        googleStorageReposSet(repos);
        expect(chrome.storage.sync.set).toHaveBeenCalled();
        expect(chrome.storage.sync.set).toHaveBeenCalledTimes(1);
      });
      it('should set the right object', () => {
        googleStorageReposSet(repos);
        expect(chrome.storage.sync.set.mock.calls[0][0]).toEqual({
          repos: {
            someKey: 'someUrl',
            anotherKey: 'anotherUrl',
          },
        });
      });
    });
    describe('repos is not provided', () => {
      it('should call google set', () => {
        googleStorageReposSet();
        expect(chrome.storage.sync.set).toHaveBeenCalled();
        expect(chrome.storage.sync.set).toHaveBeenCalledTimes(1);
      });
      it('should set an empty object', () => {
        googleStorageReposSet();
        expect(chrome.storage.sync.set.mock.calls[0][0]).toEqual({ repos: {} });
      });
    });
  });
  describe('google send message', () => {
    it('should call google sendMessage', () => {
      googleMessage();
      expect(chrome.runtime.sendMessage).toHaveBeenCalled();
      expect(chrome.runtime.sendMessage).toHaveBeenCalledTimes(1);
    });
    it('should call send message with provided object', () => {
      googleMessage({ someObject: {} });
      expect(chrome.runtime.sendMessage.mock.calls[0][0]).toEqual({ someObject: {} });
    });
  });
});
