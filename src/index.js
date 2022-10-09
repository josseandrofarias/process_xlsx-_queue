const Logger = require("./app/config/logger");

const DBConnector = require("./app/config/db");

const callbck = (err) => {
    if (err) {
        Logger.log("app", "Exitting");
        process.exit(1);
    }

    require("./app/config/migrations").migrateUp((error, result) => {
        if (error) {
            Logger.log("app", "Something wrong. No migrations were applied.");
        }

        if (result && result.length > 0) {
            Logger.log("app", `New migrations applied:\n${result.join("\n")}`);
        }
    });

    require("./app/config/server.js")();

    // require("../app/cron").scheduleJobs();

    // require("./app/workers");
};

DBConnector.connect(
    DBConnector.mountConnectionUrl(),
    DBConnector.connectionOptions(),
    callbck,
);
