const server = require('./server');
const { Db } = require('./db');
const db = new Db();
const route = require('./route');

const startApp = () => {
  // 连接数据库
  db.connect();
  server.start(route.route);
};

startApp();
