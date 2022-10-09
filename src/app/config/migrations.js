const { up } = require("migrate-mongo");
const DBConnector = require("../lib/db");

const db = DBConnector.get();
const client = DBConnector.client();

const migrateUp = function migrateUp(callback = () => {}) {
    up(db, client)
        .then((result) => callback(null, result))
        .catch((error) => callback(error, null));
};

module.exports = {
    migrateUp,
};
