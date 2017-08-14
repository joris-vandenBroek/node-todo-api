const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = '598add1d01e4ba15544dbb8b';
var email = 'jobbertje@gmail.com'
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   if (todos.length === 0){
//     return console.log('Id not found', 'awsome')
//   }
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo){
//     return console.log('Id not found', 'awsome')
//   }
//   console.log('Todo', todo);
// });

// if (!ObjectID.isValid(id)){
//   console.log('Invalid id');
// }
//
// Todo.findById(id).then((todo) => {
//   if (!todo){
//     return console.log('Id not found', 'awsome')
//   }
//   console.log('Todo', todo);
// }).catch((e) => console.log(e));


// User.find({email}).then((users) => {
//   if (users.length === 0){
//     return console.log('Users not found', 'awsome')
//   }
//   console.log('Users', users);
// });
//
// User.findOne({email}).then((user) => {
//   console.log('User', user);
// });

User.findById(id).then((user) => {
  if(!user){
    return console.log('Unable to find user');
  }
  console.log('User', user);
}, (e) => {
  console.log(e);
});
