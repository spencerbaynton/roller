'use strict';

const button = document.getElementById('chatSendBtn');
const textarea = document.querySelector('#textchat-input > textarea');

function callback(message) {

  textarea.value = message;
  button.click();
  textarea.blur();
}

chrome.runtime.onMessage.addListener(callback);
