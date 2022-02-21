const url = require('url');

function Router () {
  this.stack = [];
}

Router.prototype.get = function (path, handler) { // 向路由的stack中添加
  this.stack.push({
    method: 'get',
    path,
    handler
  })
}

Router.prototype.handle = function (req, res, done) { // 请求到来时，会匹配对应的路由
  const requestMethod = req.method.toLowerCase();
  const {pathname, } = url.parse(req.url);
  for(let i = 0; i < this.stack.length; i++) {
    const {method, path, handler} = this.stack[i];
    if(method === requestMethod && pathname === path) {
      return handler(req, res);
    }
  }
  done(); // 如果找不到，调用应用的done方法
}

module.exports = Router;