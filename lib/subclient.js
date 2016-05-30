'use strict';
/**
 * Created by neo on 16/5/29.
 */

const RedisClient = require('./client');
const conf = require('../conf/conf');
const SocketManage = require('./socketmanage');

//订阅类
class SubClient extends RedisClient {
  constructor(httpServer) {
    super();

    //save socketManage
    this.socketManage = new SocketManage(httpServer);

    this.client.on('message', function (channel, message) {
      console.log(`sub client with uuid ( ${this.uuid}  ) has got a message from channel ( ${channel} ) : `, message);

      let type = (message.type instanceof Number) ? message.type : parseInt(message.type);
      switch (type) {
        case conf.message_type.broadcast:
          this.socketManage.broadcast(message.data);
          break;

        case conf.message_type.send_notification:
          this.socketManage.sendNotification(message.socketId, message.data);
          break;

        default:
          break;
      }
    });

    //订阅channel
    this.client.subscribe(conf.redis.channel);
  }

}

module.exports = SubClient;

