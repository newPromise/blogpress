// 路由控制模块
const { ApiPathMap: controllers } = require('../controllers');
const { ResBody } = require('../lib/util');
const URL = require('url');
const http = require('http');

const SUCCESS_RES = new ResBody(200, 'success');
const CLIENT_ERR = new ResBody(400, 'not allowed request method');


function setResBody(resType, data) {
  return JSON.stringify(Object.assign({}, resType, data ? { data } : {}));
}


function isValidRoutePath(path) {
  return controllers[path] || false;
}


function route(req, res) {
  const parseUrl = URL.parse(req.url);
  const path = parseUrl.pathname;
  const validPath = isValidRoutePath(path);
  const getParams = async(method, cb) => {
    if (method === 'GET') {
      const queryParms = URL.parse(req.url, true).query;
      res.end(setResBody(SUCCESS_RES, await cb(queryParms)));
    } else if (method === 'POST') {
      let params = '';
      req.addListener('data', (data) => {
        params += data;
      });
      // 接收数据结束
      req.addListener('end', async function reqEnd() {
        await cb(params, res);
      });
    }
  };
  if (validPath) {
    const reqMethod = req.method;
    const { handler: fn, method } = validPath;
    if (reqMethod === 'OPTIONS') {
      res.end(JSON.stringify({ status: 400, message: '请求方法应 请求' }));
    } else {
      if (reqMethod !== method) {
        res.statusCode = 405;
        res.end(setResBody(CLIENT_ERR));
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
