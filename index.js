const server = require('./server');
const { Db } = require('./db');
const db = new Db();
const route = require('./route');
const generate = require('./generater');
const { clearList, setList } = require('./controllers/article/list');

const startApp = () => {
  // 连接数据库
  db.connect().then(async() => {
    const parsedMd = generate();
    await clearList();
    await setList(parsedMd);
  });
  server.start(route.route);
};

startApp();
