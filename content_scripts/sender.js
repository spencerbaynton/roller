'use strict';

const regex = /^\s*1?\s*d\s*20/;
const selectors = '[data-packed-dice]';

async function listener(event) {

  const closest = event.target.closest(selectors);
  if (closest === null) { return; }

  const { toRoll, subType } = JSON.parse(closest.dataset.packedDice);
  let message = `/r ${toRoll}`;

  if (event.metaKey) {
    switch (subType) {
      case 'd20': // disadvantage
        message = `/r ${toRoll.replace(regex, '2d20dh1')}`;
        break;
      case 'damage': // half damage
        message = `/r floor((${toRoll})/2)`;
        break;
    }
  } else if (event.shiftKey) {
    switch (subType) {
      case 'd20': // advantage
        message = `/r ${toRoll.replace(regex, '2d20dl1')}`;
        break;
      case 'damage': // critical hit
        // TODO
        break;
    }
  }

  await chrome.runtime.sendMessage(message);
}

document.body.addEventListener('click', listener);
