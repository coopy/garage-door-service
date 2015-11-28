'use strict';

var config = require('config');
var express = require('express');
var log = require('./log').child({ service: 'streaming' });

var app = express();
var http = require('http').Server(app); // eslint-disable-line new-cap
var io = require('socket.io')(http);

io.on('connection', function (socket) {
  log.info({ socket, connected: true }, 'connected');
  socket.on('disconnect', function () {
    log.info({ socket, connected: false }, 'disconnected');
  });
});

function getResponseObject(DoorState) {
  return {
    garageDoor: {
      isOpen: DoorState.getState().open
    }
  };
}

function registerApi(DoorState) {
  app.get('/status', function (req, res) {
    res.send(getResponseObject(DoorState));
  });
}

exports.startListening = function startListening(DoorState, callback) {
  var port = config.get('server.port');
  var server = http.listen(port, function () {
    var host = server.address().address;

    log.info('Listening at http://%s:%s', host, port);

    DoorState.doorEvents.on('open', function () {
      log.info('Emitting "open" event');
      io.emit('open', getResponseObject(DoorState));
    });

    DoorState.doorEvents.on('close', function () {
      log.info('Emitting "close" event');
      io.emit('close', getResponseObject(DoorState));
    });

    registerApi(DoorState);

    callback(null);
  });
};
