const express = require('express');
const { createServer } = require("http");
const createSocketConnection = require('./socket');

const app = express();

const PORT = 3000 || process.env.PORT;

const httpServer = createServer(app);

createSocketConnection(httpServer);

httpServer.listen(PORT, () => {
    console.log("Listening on port 3000");
})


