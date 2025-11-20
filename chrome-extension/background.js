chrome.runtime.onInstalled.addListener(() => {
  console.log('phishguard installed 🛡️');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('page loaded:', tab.url);
  }
});
