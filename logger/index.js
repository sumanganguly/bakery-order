'use strict';

const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');
const loggerConfig = require('../config/logger-config');

class CommonLogger {
  static getLogger(appName) {
    this.options = {};
    this.options['name'] = appName;
    this.options['src'] = loggerConfig.srcFlag;
    this.options['stream'] = bunyanFormat({ outputMode: loggerConfig.outputMode});
    this.options['level'] = loggerConfig.level;
    return bunyan.createLogger(this.options);
  }
}

module.exports = CommonLogger;
