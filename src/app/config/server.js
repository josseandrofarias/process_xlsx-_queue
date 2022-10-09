const express = require('express');
const https = require('https');
const cors = require('cors');
const config = require('config');
const { json, urlencoded } = require('body-parser');

const { log } = require('../config/logger');
const router = require('../routes');

const start = function start() {
    const { port } = config.get("api");
    const app = express();

    app.use(cors({
        origin: '*',
    }));


    app.use(json({ limit: '1gb' }));
    app.use(urlencoded({
        extended: false,
        limit: '1gb',
    }));

    app.get('/', (_, res) => res.status(404).json({
        code: 404,
        message: 'Not found',
    }));

    app.use(router);

    const server = https.createServer( app);

    server.listen(port, () => {
        log('api', 'API app started @ ' + port);
    });

};

module.exports = () => start();
