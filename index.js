const express = require('express');
const { createServer } = require("http");
const createSocketConnection = require('./socket');


const PORT = 3000 || process.env.PORT;




const app = express();
app.use(express.json());

// app.use('/v1', api);



const httpServer = createServer(app);

createSocketConnection(httpServer);

httpServer.listen(PORT, () => {
    console.log("Listening on port 3000");
})



