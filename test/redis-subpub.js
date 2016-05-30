'use strict';
/**
 * Created by neo on 16/5/25.
 */
const redis = require('redis');
const sub = redis.createClient(), pub = redis.createClient();
let msg_count = 0;


sub.on('subscribe', function (channel, count) {
  //console.log('here is the sub client : ', sub);
  
  console.log('sub.on subscribe count : ', count);
  console.log('sub.on subscribe channel : ', channel);
  pub.publish('a nice channel', 'I am sending a message.');
  setTimeout(function () {
    pub.publish('a nice channel', 'I am sending a second message.');
  }, 1000);
  setTimeout(function () {
    pub.publish('a nice channel', 'I am sending my last message.');
  }, 2000);
});

sub.on('message', function (channel, message) {
  console.log('sub channel ' + channel + ': ' + message);
  msg_count += 1;
  if (msg_count === 3) {
    sub.unsubscribe();
    sub.quit();
    pub.quit();
  }
});

sub.subscribe('a nice channel');