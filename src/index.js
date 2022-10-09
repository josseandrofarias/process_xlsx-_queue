const Logger = require("./lib/logger");

const DBConnector = require("./lib/db");

const callbck = (err) => {
    if (err) {
        Logger.log("app", "Exitting");
        process.exit(1);
    }

    require("./config/migrations").migrateUp((error, result) => {
        if (error) {
            Logger.log("app", "Something wrong. No migrations were applied.");
        }

        if (result && result.length > 0) {
            Logger.log("app", `New migrations applied:\n${result.join("\n")}`);
        }
    });

    require("./config/server.js")();

    require("./workers/queue_sheets")();
};

DBConnector.connect(
    DBConnector.mountConnectionUrl(),
    DBConnector.connectionOptions(),
    callbck,
);
