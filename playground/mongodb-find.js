const {
  MongoClient,
  ObjectID
} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server', err);
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find().count().then((x) => {
  //   console.log('Number of todos: ', x)
  // });
  //
  // db.collection('Todos').find({
  //   completed: false
  //   //  _id: new ObjectID('59802caab90da95e5b54389c')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', errs);
  // });

  db.collection('Users').find({
    name: 'Joris van den Broek'
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 3));
  })


  db.close();
});
