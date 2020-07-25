const http = require('http');
const express = require('express');
const access = require('./src/config/access');
const app = express();
const httpServer = http.createServer(app);
const path = require('path');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./src/db/mongodb');
db();
app.use(express.json());

const corsOptions = {
    exposedHeaders: 'x-auth ',
};
app.use(cors(corsOptions));
let accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.resolve(__dirname + '/src/log'),
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/api/auth', require('./src/routes/auth'));

httpServer.listen(access.port, () => {
    if (access.level === 'production') {
        console.log(`server is running on port ${access.port}`);
    }
});
