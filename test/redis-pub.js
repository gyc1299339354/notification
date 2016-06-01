'use strict';
/**
 * Created by neo on 16/5/25.
 */

const redis = require('redis');
const pub = redis.createClient();
const readline = require('readline');
const conf = require('../conf/conf');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function keys() {
  pub.keys('*', (error, result)=> {
    console.log(result);
  });
}

function go() {
  rl.question('\n type the userid you want to notifty: \n', (answer) => {
    if (answer === 'keys') {
      keys();
    }else if(answer === 'exit'){
      process.exit(0);
    } else {
      pub.get(conf.redis.set_key_pre + answer, (error, result)=> {
        pub.publish(result, JSON.stringify({userId: answer, data: {eventName: 'test', message: 'hello !!'}}));
      });
    }
    go();
  });
}

keys();
setTimeout(go, 500);