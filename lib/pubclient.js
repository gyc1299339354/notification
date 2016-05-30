'use strict';
/**
 * Created by neo on 16/5/29.
 */

const RedisClient = require('./client');

//发布类
class PubClient extends RedisClient {
  constructor() {
    super();
  }

  publish(channel, data) {
    this.client.publish(channel, data);
  }
}

module.exports = PubClient;