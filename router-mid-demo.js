const express = require('express');
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

app.get('/' , function(req, res, next) {
  console.log('7');
  next();
  console.log('8');
  res.end('ok')
})
// 1 3 5 7 8 6 4 2

// 还有一种不推荐注册路由的写法
// app.route('/').post(function(req, res) {
//   res.end('post ok')
// }).get(function(req, res) {
//   res.end('get ok');
// });

// 难点： 如何改造router模块，兼容两种写法的注册路由

app.listen(3000);
