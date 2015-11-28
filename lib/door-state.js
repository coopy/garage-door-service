'use strict';

const doorEvents = new EventEmitter();
let doorIsOpen;

function handleDoorOpened() {
  doorIsOpen = true;
}

function handleDoorClosed() {
  doorIsOpen = false;
}

doorEvents.on('open', handleDoorOpened);
doorEvents.on('close', handleDoorClosed);

module.exports = {
  doorEvents,
  getState() {
    open: doorIsOpen
  }
};
