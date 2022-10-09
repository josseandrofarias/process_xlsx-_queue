const express = require('express');
const https = require('https');
const cors = require('cors');
const config = require('config');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

const { log } = require('../config/logger');
const routes = require('../routes');

const start = function start() {
    const { port } = config.get("api");
    const app = express();

    app.use(cors({
        origin: '*',
    }));
    app.use(helmet());
    app.use(bodyParser.json());

    app.use('/', routes);
    app.get('*', (_, res) => res.status(404).json({
        code: 404,
        message: 'Not found',
    }));

    app.listen(port, () => {
        log('api', 'API app started @ ' + port);
    });

};

module.exports = () => start();
