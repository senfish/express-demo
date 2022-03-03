const Layer = require('./layer');

function Route () {
  this.stack = [];
}

Route.prototype.get = function (...handlers) {
  handlers.forEach(handler => {
    let layer = new Layer(undefined, handler);
    layer.method = 'get';
    this.stack.push(layer);
  })
}

Route.prototype.dispatch = function (req, res, out) { // 这个out，其实是执行next Router layer
  // Router负责匹配路径，Route负责匹配方法
  let i = 0;
  const next = () => {
    if(i === this.stack.length) return out();
    const layer = this.stack[i++];
    if(req.method.toLowerCase() === layer.method) {
      layer.handler(req, res, next); // 这里的layer.handler其实就是app.get('/', handler, ...)里面的handler
    } else {
      next();
    }
  } 
  next();
}
module.exports = Route;