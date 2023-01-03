const mongo = require("mongodb");
let db = null;

module.exports = {
    async connect(address, dbname) {
        try {
            const client = new mongo.MongoClient(address);
            await client.connect();
            db = client.db(dbname);
            return true;
        } catch (err) {
            return false;
        }
    },
    getDB() {
        console.log("DB >>", db)
        return db;
    },
};