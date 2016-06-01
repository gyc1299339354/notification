'use strict';
/**
 * Created by neo on 16/5/25.
 */
const uuid = require('uuid');

module.exports = {
  /**
   * 是否是生产环境
   */
  IS_PRODUCT: process.env.PRODUCT || false,
  /**
   * 服务端口号
   */
  port: 8000,
  /**
   * redis配置
   */
  redis: {
    //RedisManage 服务地址
    host: (this.IS_PRODUCT) ? '10.19.189.136' : '127.0.0.1',
    //RedisManage 服务端口号
    port: 6379,
    //
    password: null,
    //redis需要订阅的channel
    channel: 'io:notification:' + (process.env.CHANNEL || uuid.v4()),
    //公共订阅号
    public_channel: 'io:notification:public',
    //用户订阅channel表 存入set集合中 value 默认channel
    set_key_pre: 'io:',
    //redis 用户订阅channel表 失效时间
    timeout: 604800
  },
  /**
   * subscribe message type定义
   */
  //message_type: {
  //  broadcast: 1,
  //  send_notification: 2
  //}
  formate: {
    userid: 'testuserid',
    data: {
      eventname: 'hello',
      msg: 'hello !'
    }
  }
};