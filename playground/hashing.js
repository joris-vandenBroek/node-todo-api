const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(`Pwd: ${password}`);
//     console.log(`Slt: ${salt}`);
//     console.log(`Hsh: ${hash}`);
//   });
// })

var hashedPwd = '$2a$10$b/XjfYtVczrEjV6993iK7.zbcCZjALId8lQqflH9MCz.6ShAIzJQa';

bcrypt.compare(password, hashedPwd, (er, result) => {
  console.log(result);
})


// var data = {
//   id: 10
// }

// var token = jwt.sign(data, '123abc');
// console.log('token', token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);


// var message = 'Hello I am Joris';
// var hash = SHA256(message).toString();
//
// console.log('message', message);
// console.log('hash', hash);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// //token.data.id = 5
// //token.hash = SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
// if (resultHash === token.hash){
//   console.log('TRUST')
// } else {
//   console.log('DO NOT TRUST')
// }
