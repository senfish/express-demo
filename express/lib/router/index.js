
const Layer = require('./layer');
const Route = require('./route');
const url = require('url');

function Router() {
  this.stack = [];
}

Router.prototype.route = function (path) {
  const route = new Route();
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
}

Router.prototype.handle = function (req, res, done) {
  // Router负责匹配路径，Route负责匹配方法
  let i = 0;
  // 使用箭头函数，避免this问题
  const next = () => {
    if(i === this.stack.length) return done(); // 如果所有的laer都找不到，就执行done
    const layer = this.stack[i++];
    const {pathname, } = url.parse(req.url);
    if(pathname === layer.path) {
      layer.handler(req, res, next); // layer.handler就是route.dispatch方法，将Router和Route联系起来
    } else {
      next();
    }
  }
  next();

}
module.exports = Router;