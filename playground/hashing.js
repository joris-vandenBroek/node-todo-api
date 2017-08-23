const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
}

var token = jwt.sign(data, '123abc');
console.log('token', token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);


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
