const express = require('./express');

const app = express();

// express解决了原生http需要针对不同路由做不同处理
// if(req.url === '/') {
// } else if (req.url === '/hello') {
// }

app.get('/', function (req, res) {
  res.end('home')
});

app.get('/hello', function (req, res) {
  res.end('hello')
})

app.listen(3000, function () {
  console.log('serve start')
});