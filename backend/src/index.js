const express = require('./express');
const routes = require('./routes');
const server = express(routes);

server.listen(4004);

module.exports = server;
