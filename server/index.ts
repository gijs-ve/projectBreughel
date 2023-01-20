const corsMiddleware = require('cors');

//Server setup
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const PORT = 4000;

server.listen(PORT, () => console.log(`SERVER ONLINE ${PORT}`));
