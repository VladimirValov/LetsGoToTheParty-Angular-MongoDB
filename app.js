'use strict';


const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      urlDB = 'mongodb://goparty:goparty@ds161487.mlab.com:61487/go-party';

//function insert;
const insertDocument = function(db, callback) {
  const collection = db.collection('party-people');

  collection.insertOne({ name: 'ivan', youGo : 'yes' , drink : 'water'},
    function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      assert.equal(1, result.ops.length);
      console.log("insert 1 documents");
      callback(result);
    }
  )
};

const findDocument = function(db, callback) {
  const collection = db.collection('party-people');

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}

const updateDocument = function(db, callback) {
  const collection = db.collection('party-people');

  collection.updateOne({a : 100}, {$set: {a: 200}},
    function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Update the document a ");
      callback(result);
  });
}



MongoClient.connect(urlDB, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mLab");

  insertDocument(db, function() {
      db.close();
  });
});
