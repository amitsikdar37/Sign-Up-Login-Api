const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://sikdara477:omikun@cluster0.qyjcazl.mongodb.net/";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(url)
  .then(client => {
    callback();
    _db = client.db('voters');
    
  }).catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
}

const getDb = () => {
  if (!_db) {
    throw new Error('No database found!');
  }
  return _db;
}

module.exports = {
  mongoConnect,
  getDb
};

