/* global chrome */

const ALARM_NAME = 'Jenkins Notifier';
let reposRequestsIncomplete = 0;

const ADDED = 'added';
const DELETED = 'deleted';
const CHANGED = 'changed';
const FINAL = 'final';
const defaultContextMessage = 'Jenkins Tracked Jobs Updated';

let jobsAdded = 0; // Number of jobs added since last repos refresh
let jobsDeleted = 0; // Number of jobs deleted since last repos refresh
let jobsChanged = 0; // Number of jobs changed since last repos refresh
let notificationMessage = ''; // Notification message for chrome notification
let notificationContextMessage = ''; // Notification context message for chrome notification
let oldRepos = {}; // Holds the old repos reference

const mapJenkinsColor = (color) => {
  switch (color) {
    case 'blue':
      return 'Successful Build';
    case 'red':
      return 'Failed Build';
    case 'notbuilt':
      return 'Never Built';
    case 'yellow':
      return 'Unstable Build';
    case 'aborted':
      return 'Aborted';
    case 'yellow_anime':
    case 'notbuilt_anime':
    case 'red_anime':
    case 'blue_anime':
    case 'aborted_anime':
      return 'Building';
    default:
      return 'Unknown Status';
  }
};

const chromeNotificationOptions = {
  type: 'basic',
  title: 'Jenkins Notifier',
  iconUrl: 'https://jenkins.cerner.com/ion/static/1342209e/images/headshot.png',
  buttons: [
    {
      title: 'button 1',
      iconUrl: 'https://jenkins.cerner.com/ion/static/1342209e/images/headshot.png',
    },
    {
      title: 'button 2',
      iconUrl: 'https://jenkins.cerner.com/ion/static/1342209e/images/headshot.png',
    },
  ],
};

const handleAlarms = () => {
  if (Object.keys(oldRepos).length <= 0) {
    console.log(`Clearing '${ALARM_NAME}' alarm`); // eslint-disable-line no-console
    chrome.alarms.clear(ALARM_NAME);
  } else {
    chrome.alarms.get(ALARM_NAME, (alarm) => {
      const numberOfRepos = Object.keys(oldRepos).length;
      const alarmPeriod = Math.max((numberOfRepos * 5) / 60, 1);

      const setAlarm = () => {
        console.log(`Setting '${ALARM_NAME}' alarm`); // eslint-disable-line no-console
        chrome.alarms.create(
          ALARM_NAME,
          {
            delayInMinutes: alarmPeriod,
            periodInMinutes: alarmPeriod,
          },
        );
      };
      if (alarm) {
        if (alarm.periodInMinutes < alarmPeriod) {
          setAlarm();
        }
      } else {
        setAlarm();
      }
    });
  }
};

const arrayContains = (string, array) => (
  array.indexOf(string) > -1
);

const buildnotificationMessage = (type, jobName, oldColor, newColor) => {
  if (!notificationMessage) {
    if (type === CHANGED) {
      notificationContextMessage = `${jobName} changed status`;
      notificationMessage = `${mapJenkinsColor(oldColor)} to ${mapJenkinsColor(newColor)}`;
    } else if (type === ADDED) {
      notificationContextMessage = `${jobName}`;
      notificationMessage = 'was added';
    } else if (type === DELETED) {
      notificationContextMessage = `${jobName}`;
      notificationMessage = 'was deleted';
    }
  } else if (type === FINAL && (jobsChanged > 1 || jobsAdded > 1 || jobsDeleted > 1)) {
    notificationContextMessage = defaultContextMessage;
    notificationMessage = `${jobsChanged + jobsAdded + jobsDeleted} jobs changed status`;
  }
};

const diffJenkinsRepo = (repoName, oldRepo, newRepo) => {
  const oldRepoKeys = Object.keys(oldRepo.jobs);
  const newRepoKeys = Object.keys(newRepo.jobs);
  newRepoKeys.forEach((key) => {
    const jobName = `${repoName}/${key}`;
    if (arrayContains(key, oldRepoKeys)) {
      if (oldRepo.jobs[key].color !== newRepo.jobs[key].color) {
        jobsChanged += 1;
        buildnotificationMessage(CHANGED, jobName, oldRepo.jobs[key].color, newRepo.jobs[key].color);
        // Job status has changed
      }
      delete oldRepoKeys[oldRepoKeys.indexOf(key)];
    } else {
      jobsAdded += 1;
      buildnotificationMessage(ADDED, jobName);
      // New job was added
    }
  });
  oldRepoKeys.forEach((key) => {
    if (!arrayContains(key, newRepoKeys)) {
      jobsDeleted += 1;
      buildnotificationMessage(DELETED, `${repoName}/${key}`);
      // Job was deleted
    }
  });
  oldRepos[repoName] = newRepo;
};

const sendNotification = () => {
  buildnotificationMessage(FINAL);
  if (jobsAdded || jobsDeleted || jobsChanged) {
    chrome.notifications.create(
      '',
      {
        ...chromeNotificationOptions,
        message: notificationMessage,
        contextMessage: notificationContextMessage || defaultContextMessage,
      },
    );
    jobsAdded = 0;
    jobsDeleted = 0;
    jobsChanged = 0;
    notificationMessage = '';
    notificationContextMessage = '';
  }
};

const onLoad = (repoName, xhttp, url) => {
  if (xhttp.readyState === 4 && xhttp.status === 200) {
    const responseText = JSON.parse(xhttp.response);
    const repoJobs = responseText.jobs;
    let newRepo = {};
    let newJobs = {};
    Object.keys(repoJobs).forEach((key) => {
      newJobs = {
        ...newJobs,
        [repoJobs[key].name]: {
          ...repoJobs[key],
        },
      };
    });
    newRepo = {};
    try {
      newRepo = {
        [repoName]: {
          URL: oldRepos[repoName].URL,
          jobs: newJobs,
        },
      };
    } catch (e) {
      newRepo = {
        [repoName]: {
          URL: url,
          jobs: newJobs,
        },
      };
      oldRepos[repoName] = newRepo;
      console.log(oldRepos);
      handleAlarms();
      return;
    }
    diffJenkinsRepo(repoName, oldRepos[repoName], newRepo[repoName]);
    reposRequestsIncomplete -= 1;
    if (reposRequestsIncomplete === 0) {
      sendNotification();
    }
  }
};

const onTimeout = () => {
  reposRequestsIncomplete -= 1;
  if (reposRequestsIncomplete === 0) {
    sendNotification();
  }
};

const getJenkins = (url, repoName) => {
  const xhttp = new XMLHttpRequest();
  const jsonURL = `${url}api/json`;
  xhttp.open('GET', jsonURL, true);
  xhttp.timeout = 5000;
  xhttp.onload = () => { onLoad(repoName, xhttp, url); };
  xhttp.ontimeout = onTimeout;
  xhttp.send();
};

chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.updateRepos) {
      oldRepos = request.repos;
      handleAlarms();
    } else if (request.alarm === 'off') {
      chrome.alarms.clear(ALARM_NAME);
    }
    return Promise.resolve('Dummy response to keep the console quiet');
  },
);

chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
  console.log('clicked');
});

chrome.notifications.onClosed.addListener(() => {
  console.log('sorry');
});

chrome.alarms.onAlarm.addListener(() => {
  // Check repos
  const repoKeys = Object.keys(oldRepos);
  reposRequestsIncomplete = repoKeys.length;
  repoKeys.forEach((repo) => {
    getJenkins(oldRepos[repo].URL, repo);
  });
});

const onStartup = () => {
  chrome.storage.sync.get(['repos'], (result) => {
    if (Object.keys(result.repos).length !== 0) {
      Object.keys(result.repos).forEach((key) => {
        getJenkins(result.repos[key], key);
      });
    }
  });
};

onStartup();
