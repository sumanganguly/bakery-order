
const loggerConfig = {
  'info': {
    'level': 'info',
    'srcFlag': true,
    'outputMode': 'short'
  },
  'debug': {
    'level': 'debug',
    'srcFlag': true,
    'outputMode': 'long'
  },
  'trace': {
    'level': 'trace',
    'srcFlag': true,
    'outputMode': 'long'
  },
  'warn': {
    'level': 'warn',
    'srcFlag': true,
    'outputMode': 'long'
  },
  'error': {
    'level': 'error',
    'srcFlag': true,
    'outputMode': 'long'
  },
  'fatal': {
    'level': 'fatal',
    'srcFlag': true,
    'outputMode': 'long'
  }
}

module.exports = loggerConfig[process.env.LOGLEVEL || 'debug'];
