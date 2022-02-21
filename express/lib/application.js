const http = require('http');
const Router = require('./router');

function application () {
  this.router = new Router(); // 引用路由系统，为每个app都创建一个路由系统
}

application.prototype.get = function (path, handler) {
  this.router.get(path, handler); // 向路由系统的中添加
}

application.prototype.listen = function (...args) { // app.listen()
  const server = http.createServer((req, res) => {
    function done () {
      res.end(`Cannot find ${req.method} ${req.url}`);
    }
    this.router.handle(req, res, done); // 交给路由系统来处理，如果路径匹配不上，就调用done方法
  });

  server.listen(...args);
}

module.exports = application;