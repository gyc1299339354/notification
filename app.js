'use strict';
/**
 * Created by neo on 16/5/25.
 */
const express = require('express');
let app = express();
const httpServer = require('http').createServer(app);
const conf = require('./conf/conf');
const SocketManage = require('./lib/socket');


// Routing
app.use(express.static(__dirname + '/test/public'));

let socketManage = new SocketManage(httpServer);

httpServer.listen(conf.port);