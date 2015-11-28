'use strict';

var EventEmitter = require('events');

var DoorSensorService = require('lib/door-sensor-service');
var DoorState = require('lib/door-state');
var StreamingService = require('lib/streaming-service');
var log = require('lib/log').child({ service: 'garage-door' });

DoorSensorService.startListening(DoorState.doorEvents, function (err) {
  if (err) {
    throw err;
  }
  StreamingService.startListening(DoorState, function () {
    if (err) {
      throw err;
    }
    log.info('garage-door-service started');
  })
});
