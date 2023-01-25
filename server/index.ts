const corsMiddleWare = require('cors');

//Routers
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
//Server setup
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const PORT = 4000;

app.use(corsMiddleWare());
app.use(express.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);

server.listen(PORT, () => console.log(`SERVER ONLINE ${PORT}`));
