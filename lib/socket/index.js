'use strict';
/**
 * Created by neo on 16/5/25.
 */

const io = require('socket.io');
const UUID = require('uuid');

class SocketManage {

  constructor(httpServer, socketServerName) {

    this.socketMap = new Map();
    this.socketServerName = socketServerName ? socketServerName : UUID.v4();

    this.socketio = io.listen(httpServer);
    //TODO 监听connection
    this.socketio.on('connection', (socket) => {
      console.log(`${socket.id} has connected server`);

      this.socketMap.set(socket.id, socket);

      this.broadcast({eventName: 'hello', msg: `hello ${socket.id}`});
    });
  }

  sendNotification(socketId, data) {
    const tempsocket = this.socketMap.get(socketId) || null;
    return (tempsocket) ? tempsocket.emit(data.eventName, data.msg) : false;
  }

  broadcast(data) {
    for (const tempsocket of this.socketMap.values()) {
      tempsocket.emit(data.eventName, data.msg);
    }
  }

}

module.exports = SocketManage;