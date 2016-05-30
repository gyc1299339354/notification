'use strict';
/**
 * Created by neo on 16/5/29.
 */

const redis = require('redis');
const conf = require('../conf/conf');
const uuid = require('uuid');

class RedisClient {

  constructor() {
    //create RedisManage client
    this.client = redis.createClient({
      host: conf.redis.host,
      port: conf.redis.port
    });

    //create an uuid for RedisManage client
    this.uuid = uuid.v4();

    //error dealing
    this.client.on('error', (error)=> {
      console.log(`redis client with uuid ( ${this.uuid} ) on server ( ${conf.redis.host} ) has caught an error : ${error}`);
    });
  }
}

module.exports = RedisClient;