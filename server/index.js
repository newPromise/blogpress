// 请求模块
const http = require('http');

const hostname = '127.0.0.1';
const port = '8002';

exports.start = (cb) => {
  http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', 'GET,POST,DELETE, OPTIONS'); // 设置允许响应的内容
    res.setHeader('Content-type', 'application/json; charset=utf-8'); // 设置响应的请求内容格式
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, User-Agent, Origin'); // 允许头部请求头部添加的信息
    // res.setHeader("Access-Control-Max-Age", 1728000); // 最长预检时间周期
    cb(req, res);
  }).listen(port, hostname);
};
