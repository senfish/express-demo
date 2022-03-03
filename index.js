// const express = require('express');
const express = require('./express');
const app = express();

// 说说输出结果
app.get('/', function(req, res, next) {
  console.log('1');
  next();
  console.log('2');
}, function(req, res, next) {
  console.log('3');
  next();
  console.log('4');
}, function(req, res, next) {
  console.log('5');
  next();
  console.log('6');

});

app.post('/' , function(req, res, next) {
  console.log('7');
  res.end('ok last')
})
// app.get('/home' , function(req, res, next) {
//   console.log('home')
//   res.end('home ok')
// })

app.listen(3000, function () {
  console.log('serve start')
});