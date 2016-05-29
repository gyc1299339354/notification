'use strict';
/**
 * Created by neo on 16/5/29.
 */

const redis = require('redis');

class RedisClient {

  constructor() {
    this.client = redis.createClient();
  }
}

module.exports = RedisClient;