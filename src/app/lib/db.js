const config = require("config");
const { MongoClient, ObjectID } = require("mongodb");

const Logger = require("./logger");
const mongoConfig = config.get("dbConfig");

const state = {
    client: null,
};

const connect = function connect(url, options, callback) {
    console.log(url, options);
    if (state.client) {
        return callback();
    }

    MongoClient.connect(url, options, (err, client) => {
        if (err) {
            Logger.log("app:config:connector", "Connection failed");

            return callback(err);
        }
        Logger.log("app:config:connector", "MongoDB Connected");
        state.client = client;

        return callback();
    });
};

const get = function get() {
    if (!state.client) {
        connect(mountConnectionUrl(), connectionOptions());
    }

    return state.client.db(mongoConfig.db);
};

const client = function client() {
    return state.client;
};

const ObjectId = function ObjectId() {
    return ObjectID;
};

const mountConnectionUrl = function mountConnectionUrl() {
    const {
        host = "",
        auth = "",
        port = "",
        db = "",
    } = mongoConfig;

    const server = `${host}:${port}`;

    // check if auth is present and if it ends
    // with the @ operator. Appends when necessary.
    const authentication = auth ? (auth.endsWith("@") ? auth : `${auth}@`) : "";

    return `mongodb://${authentication}${server}/${db}`;
};

const connectionOptions = function connectionOptions() {
    return { useNewUrlParser: true, useUnifiedTopology: true };
};

module.exports = {
    mountConnectionUrl,
    connectionOptions,
    client,
    get,
    connect,
    ObjectId,
};
