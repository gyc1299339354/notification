'use strict';
/**
 * Created by mac on 16/5/29.
 */
const Subclient = require('./subclient');
const Pubclient = require('./pubclient');

class Notification {
  constructor(httpServer) {
    this.pubclient = new Pubclient();
    this.subclient = new Subclient(httpServer);
  }
}

module.exports = Notification;
