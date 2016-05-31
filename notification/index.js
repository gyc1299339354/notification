'use strict';
/**
 * Created by mac on 16/5/29.
 */
const Subclient = require('./subclient');

class Notification {
  constructor(httpServer) {
    this.subclient = new Subclient(httpServer);
  }
}

module.exports = Notification;
