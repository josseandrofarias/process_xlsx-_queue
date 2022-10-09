const queue = require('amqplib');
const config = require('config');
const logger = require('../lib/logger');

const connect = function connect() {
    const opt = { credentials: queue.credentials.plain(config.get("queue.user"), config.get("queue.password")) };
    return queue.connect(config.get("queue.uri"), opt)
        .then(conn => conn.createChannel());
};

const createQueue = function createQueue(channel, queue) {
    return new Promise((resolve, reject) => {
        try{
            channel.assertQueue(queue, { durable: true });
            resolve(channel);
        }
        catch(err){
            reject(err);
        }
    });
};

const sendToQueue = function sendToQueue(queue, message, opts) {
    connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), opts))
        .catch(err => logger.log('lib:queue', err.message));
};

const consume = function consume(queue, callback) {
    connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => channel.consume(queue, callback, { noAck: true }))
        .catch(err => logger.log('lib:queue', err.message));
};

module.exports = {
    sendToQueue,
    consume,
};
