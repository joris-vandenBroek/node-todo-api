const {
  MongoClient,
  ObjectID
} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server', err);
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({
  //   text: 'Eat lunch'
  // }).then((result) => {
  //   console.log(JSON.stringify(result, undefined, 3));
  // })

  // deleteOne
  // db.collection('Todos').deleteOne({
  //   text: 'Eat lunch'
  // }).then((result) => {
  //   console.log(JSON.stringify(result, undefined, 3));
  // })

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({
  //   text: 'Eat lunch'
  // }).then((doc) => {
  //   console.log(JSON.stringify(doc, undefined, 3));
  // })

  db.collection('Todos').findOneAndDelete({
    _id: new ObjectID("5982fbe4b90da95e5b54484a")
  }).then((doc) => {
    console.log(JSON.stringify(doc, undefined, 3));
  })

  db.close();
});
