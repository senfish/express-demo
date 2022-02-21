const http = require('http');
const url = require('url');


const routers = [
  {
    method: 'all',
    path: '*',
    handle: function (req, res) {
      res.end(`custom Cannot ${req.method} ${req.url}`)
    }
  }
];

function createApplication() {
  return {
    get(path, handle) {
      routers.push({
        method: 'get',
        path,
        handle
      })
    },
    listen(...args) {
      const server = http.createServer((req, res) => {
        for(let i = 1; i < routers.length; i++) {
          const {method, path, handle} = routers[i];
          const requestMethod = req.method.toLowerCase();
          const {pathname, } = url.parse(req.url);
          if(method === requestMethod && pathname === path) {
            return handle(req, res);
          }
        }
        return routers[0].handle(req, res);
      });

      server.listen(...args);
    } 
  }
}


module.exports = createApplication;
