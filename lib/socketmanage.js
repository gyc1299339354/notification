'use strict';
/**
 * Created by neo on 16/5/25.
 * arguement named 'data' in message going to be sent by using function 'sendNotification'/'broadcast' must be formated  like :
 * {
 *  eventName: '',
 *  msg: {
 *    xxx: xxx
 *  }
 * }
 */

const io = require('socket.io');
const redis = require('redis');
const conf = require('../conf/conf');

class SocketManage {

  constructor(httpServer, redisClient) {
    //缓存socket
    this.socketMap = new Map();

    this.redisClient = redis.createClient();
    this.socketio = io.listen(httpServer);

    //监听connection
    this.socketio.on('connection', (socket) => {
      let socket_id = socket.id;
      console.log(`${socket_id} has connected ! `);

      //监听connection : 丢进Map缓存
      this.socketMap.set(socket_id, socket);

      //监听connection : 发射 连接成功,返回socket id
      this.sendNotification(socket_id, {
        eventName: 'hello',
        msg: {
          socketId: socket_id
        }
      });

      //初始化socket事件
      this.initSocketEvent(socket);
    });
  }

  //发射器
  sendNotification(socketId, data) {
    const tempsocket = this.socketMap.get(socketId) || null;
    return (tempsocket) ? tempsocket.emit(data.eventName, data.msg) : false;
  }

  //广播器
  broadcast(data) {
    for (const tempsocket of this.socketMap.values()) {
      tempsocket.emit(data.eventName, data.msg);
    }
  }

  //初始化
  initSocketEvent(socket) {
    let socket_id = socket.id;

    //监听socket的disconnect
    socket.on('disconnect', ()=> {
      console.log(`${socket_id} has disconnected ! `);

      //TODO do something after socket disconnected
      if (this.socketMap.has(socket_id)) this.socketMap.delete(socket_id);
    });

    //用户信息 初始化
    socket.on('whoami', (userid)=> {
      console.log(`${socket_id} with userid ( ${userid} ) emit whoami `);
      this.redisClient.hset(conf.redis.hash_key, userid, conf.redis.channel);
    });
  }
}

module.exports = SocketManage;