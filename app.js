'use strict';
/**
 * Created by neo on 16/5/25.
 */
const express = require('express');
let app = express();
const httpServer = require('http').createServer(app);
const conf = require('./conf/conf');
const Notification = require('./lib');


// test view
app.use(express.static(__dirname + '/test/public'));

let notification = new Notification(httpServer);

httpServer.listen(conf.port);