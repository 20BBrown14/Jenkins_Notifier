
/* global chrome */

/**
 * Helper function to use google chrome's storage get api
 * @param {Function} callback - Function to be called with result of get
 */
export const googleStorageReposGet = (callback) => {
  chrome.storage.sync.get(['repos'], (result) => {
    if (Object.keys(result.repos).length !== 0) {
      Object.keys(result.repos).forEach((key) => {
        callback(result.repos[key], key);
      });
    }
  });
};

/**
 * Helper function to use google chrome's storage set api
 * @param {Object} repos - Repos from application
 */
export const googleStorageReposSet = (repos = {}) => {
  let reposToSet = {};
  Object.keys(repos).forEach((key) => {
    reposToSet = { ...reposToSet, [key]: repos[key].URL };
  });
  chrome.storage.sync.set({ repos: reposToSet });
};

export const googleMessage = (object) => {
  chrome.runtime.sendMessage(object, () => {});
};
