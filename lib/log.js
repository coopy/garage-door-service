var log = require('bunyan').createLogger({
  name: 'garage-door-service',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      type: 'rotating-file',
      level: 'info',
      path: '/var/log/garage/garage-door-service-out.log',
      period: '1w',
      count: 52
    },
    {
      type: 'rotating-file',
      level: 'error',
      path: '/var/log/garage/garage-door-service-error.log',
      period: '1w',
      count: 52
    }
  ]
});

module.exports = log;
