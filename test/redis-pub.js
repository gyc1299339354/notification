'use strict';
/**
 * Created by neo on 16/5/25.
 */

const redis = require('redis');
const pub = redis.createClient();
const readline = require('readline');

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
    } else {
      pub.get('io:' + answer, (error, result)=> {
        pub.publish(result, JSON.stringify({userid: answer, data: {eventName: 'test', msg: 'hello !!'}}));
      });
    }
    go();
  });
}

keys();
setTimeout(go, 500);