'use strict';
/**
 * Created by neo on 16/5/25.
 */
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
    channel: process.env.CHANNEL || 'notification channel',
    //redis 存放channel的hash表 的key
    // field 为了userid
    //value 默认channel
    hash_key: 'channels'
  },
  /**
   * subscribe message type定义
   */
  message_type: {
    broadcast: 1,
    send_notification: 2
  }
};