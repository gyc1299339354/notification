'use strict';
/**
 * Created by neo on 16/5/29.
 */

const RedisClient = require('./client');
const conf = require('../conf/conf');
const SocketManage = require('./socketmanage');
const log = require('./log');

//订阅类
class SubClient extends RedisClient {
  constructor(httpServer) {
    super();

    //save socketManage
    this.socketManage = new SocketManage(httpServer);

    //来订阅消息了~
    this.client.on('message', (channel, message)=> {
      const _message = (typeof message === 'string') ? JSON.parse(message) : message;
      log(`sub client with uuid ( ${this.uuid}  ) has got a message from channel ( ${channel} ) : `, _message);

      (_message.userId) ? this.socketManage.sendNotification(_message.userId, _message.data) : this.socketManage.broadcast(_message.data);
    });

    //订阅channel
    this.client.subscribe(conf.redis.channel);
    this.client.subscribe(conf.redis.public_channel);
  }
}

module.exports = SubClient;

