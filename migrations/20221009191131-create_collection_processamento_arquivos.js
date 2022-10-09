const collection = "processamento_arquivos";

module.exports = {
    async up(db) {
        return db.createCollection(collection);
    },

    async down(db) {
        return db.collection(collection).drop();
    },
};
