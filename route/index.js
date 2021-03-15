// 路由控制模块
const { ApiPathMap: controllers } = require('../controllers');
const URL = require('url');
const http = require('http');

//  是否为有效的路径
function isValidRoutePath(path) {
  return controllers[path] || false;
}


function route(req, res) {
  const parseUrl = URL.parse(req.url);
  const path = parseUrl.pathname;
  const validPath = isValidRoutePath(path);
  const getParams = (method, cb) => {
    if (method === 'GET') {
      const queryParms = URL.parse(req.url, true).query;
      cb(queryParms, res);
    } else if (method === 'POST') {
      let params = '';
      req.addListener('data', (data) => {
        params += data;
      });
      // 接收数据结束
      req.addListener('end', function reqEnd() {
        cb(params, res);
      });
    }
  };

  if (validPath) {
    const reqMethod = req.method;
    const { fn, method } = validPath;
    if (reqMethod === 'OPTIONS') {
      res.end(JSON.stringify({ status: 400, message: '请求方法应 请求' }));
    } else {
      if (reqMethod !== method) {
        res.statusCode = 405;
        res.end(JSON.stringify({ status: 400, message: `请求方法应为 ${method} 请求` }));
      } else {
        getParams(method, fn);
      }
    }
  } else {
    res.statusCode = 404;
    res.statusMessage = http.STATUS_CODES[res.statusCode];
    res.end(path);
  }
}


module.exports = { route };
