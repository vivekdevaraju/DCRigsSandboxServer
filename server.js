const http = require('http');
const expressApp = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(expressApp);

server.listen(port);


