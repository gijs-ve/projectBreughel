const corsMiddleWare = require('cors');

//Server setup
const express = require('express');
const app = express();

// HTTP Server setup
const http = require('http');
const server = http.createServer(app);

const PORT = 4000;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
