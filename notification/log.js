'use strict';
/**
 * Created by neo on 16/5/25.
 */

require('date-util');

module.exports = function (arg1, arg2) {
  console.log(`[ ${new Date().format('yyyy-mm-dd HH:MM:ss')} ] ` + arg1, arg2 ? arg2 : '')
}