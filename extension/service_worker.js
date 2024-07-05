'use strict';

const queryInfo = { url: 'https://app.roll20.net/editor/' };

async function callback(message) {

  const [ tab ] = await chrome.tabs.query(queryInfo);
  await chrome.tabs.sendMessage(tab.id, message);
}

chrome.runtime.onMessage.addListener(callback);
