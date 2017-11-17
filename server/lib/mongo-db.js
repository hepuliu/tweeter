"use strict";

// connect to mongodb server
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

let mongodb;
MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }
    mongodb = db;
});

// export callback function to be passed-on to data-helpers
module.exports = callback => {
    callback(mongodb);
}
