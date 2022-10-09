const config = require("config");
const { MongoClient, ObjectID } = require("mongodb");

const Logger = require("./logger");
const mongoConfig = config.get("dbConfig");

const state = {
    client: null,
};

const connect = async function connect(url, options, callback) {
    state.client = await MongoClient.connect(url, options);
    if (!state.client) {
        Logger.log("app:config:connector", "Connection failed");
    }
    Logger.log("app:config:connector", "MongoDB Connected");

    if(callback){
        callback(state.client);
    }
    return state.client;
};

const get = async function get(collection = '') {
    if (!state.client) {
        await connect(mountConnectionUrl(), connectionOptions());
    }
    let db = state.client.db(mongoConfig.db);

    if(collection)
        db = state.client.db(mongoConfig.db).collection(collection);

    return db;
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

const disconnect = async function disconnect() {
    state.client;
    if (state.client) {
        await state.client.close();
    }
    state.client = null;
    return state.client;
};

module.exports = {
    mountConnectionUrl,
    connectionOptions,
    client,
    get,
    connect,
    ObjectId,
    disconnect,
};
