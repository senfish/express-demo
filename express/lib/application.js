const Router = require("./router");
const http = require('http');
function Application () {
  this.router = new Router()
}

Application.prototype.get = function (path, ...handlers) {
  const route = this.router.route(path);
  route.get(...handlers);
}

Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    function done() {
      res.end(`cannot find ${req.method} ${req.url}`)
    }
    this.router.handle(req, res, done);
  });
  server.listen(...args)
}

module.exports = Application;