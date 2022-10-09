const queue = require("../lib/queue");
const logger = require("../lib/logger");
const config = require("config");
const controller = require("../controllers/processamento_arquivo.controller");

const worker = function worker() {
    logger.log('workers', 'INIT worker sheet queue');

    queue.consume(config.get("queue.keySheets"), message => {
        const data = JSON.parse(message.content.toString());
        logger.log('workers', `PROCESSING queue ID: ${data.id}`);
        controller.processaArquivo(data);
    });

};

module.exports = () => worker();
