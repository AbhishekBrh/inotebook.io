const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch((e) => console.log(error));
  }

  module.exports = connectToMongo;