const {
  MongoClient,
  ObjectID
} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server', err);
  }
  console.log('Connected to MongoDB server');

  // findOneAndUpdate
  db.collection('Users').findOneAndUpdate({
    name: 'Joris van den Broek'
  }, {
    $set: {
      name: 'Joris van den Broek',
      location: 'Eindhoven'
    },
    $inc: {
      age: 1
    }
  }, {
    returnNewDocument: true
  }).then((result) => {
    console.log(result);
  })


  db.close();
});
