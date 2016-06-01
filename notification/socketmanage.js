'use strict';
/**
 * Created by neo on 16/5/25.
 * arguement named 'data' in message going to be sent by using function 'sendNotification'/'broadcast' must be formated  like :
 * {
 *  eventName: '',
 *  message: {
 *    xxx: xxx
 *  }
 * }
 */

const io = require('socket.io');
const redis = require('redis');
const conf = require('../conf/conf');
const log = require('./log');
const async = require('async');

class SocketManage {

  constructor(httpServer) {
    //缓存socket
    this.socketMap = new Map();

    this.redisClient = redis.createClient();
    this.socketio = io.listen(httpServer);

    //监听connection
    this.socketio.on('connection', (socket) => {
      let socket_id = socket.id;
      log(` ${socket_id} has connected ! `);

      //监听connection : 发射 连接成功,返回socket id
      socket.emit('hello', {
        socketId: socket_id
      });

      //初始化socket事件
      this.initSocketEvent(socket);
    });
  }

  //发射器
  sendNotification(userId, data) {
    const tempsocket = this.socketMap.get(userId) || null;
    if (tempsocket) {
      tempsocket.emit(data.eventName, data.message);
      log(`${userId} is be sent a notification : `, data.message);
    }
    return;
  }

  //广播器
  broadcast(data) {
    const _msg = data.message;
    for (const tempsocket of this.socketMap.values()) {
      tempsocket.emit(data.eventName, _msg);
    }
  }

  //初始化
  initSocketEvent(socket) {
    let id = socket.id;

    //监听socket的disconnect
    socket.on('disconnect', ()=> {
      log(` ${id} has disconnected ! `);
      if (this.socketMap.has(id)) this.socketMap.delete(id);
    });

    //用户信息 初始化
    socket.on('whoami', (userId)=> {
      log(` ${id} with userId ( ${userId} ) emit * whoami * `);
      const temp_key = conf.redis.set_key_pre + userId;
      async.waterfall([
          (cb)=> {
            //清理残渣
            this.redisClient.del(temp_key);
            //保一下存
            this.redisClient.setex(temp_key, conf.redis.timeout, conf.redis.channel, cb);
          }
        ],
        (error, result)=> {
          if (error) {
            log(`存储的时候爆炸了 `, error);
            return;
          } else {
            log(`搞定 ${id} ==> ( ${userId} ) !`, result);
            //监听connection : 丢进Map缓存
            id = userId;
            this.socketMap.set(userId, socket);
            //TODO 回复下?
          }
        });
    });
  }
}

module.exports = SocketManage;