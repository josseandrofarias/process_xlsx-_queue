const queue = require("../lib/queue");
const logger = require("../lib/logger");
const config = require("config");

const worker = function worker() {
    logger.log('workers', 'INIT worker sheet queue');

    queue.consume(config.get("queue.keySheets"), message => {
    //process the message
        logger.log('workers', 'PROCESSING queue');
        console.log("processing " + message.content.toString());
    });

};

module.exports = () => worker();
