'use strict';

var log = require('./log').child({ service: 'door-sensor' });
var SerialPort = require('serialport').SerialPort;

var arduinoPort = new SerialPort('/dev/cu.usbserial-A6004oyH', {
  baudrate: 19200
});

exports.startListening = function startListening(eventEmitter, callback) {
  arduinoPort.on('open', function() {
    log.info('Serial Port open');

    arduinoPort.on('close', function() {
      log.info('Serial Port closed');
    });

    arduinoPort.on('data', function(data) {
      var value = data[0];
      if (value === 0) {
        log.info('Garage door is closed');
        eventEmitter.emit('close');
      } else if (value === 1) {
        log.info('Garage door is open');
        eventEmitter.emit('open');
      }
    });

    callback(null);
  });
};
