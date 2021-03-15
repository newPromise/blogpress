// 数据库操作模块
const mongodb = require('mongodb');
const { wrapPromise } = require('../lib/util.js');

const dbConfig = {
  dbHost: 'mongodb://127.0.0.1:27017',
  dbName: 'test',
  collectionName: 'col'
};

let DB = '';
// 数据库
class Db {
  constructor() {
  }
  connect() {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(dbConfig.dbHost, function(err, db) {
        if (err) {
          console.log('数据库连接失败');
          reject();
        } else {
          resolve();
          DB = db.db(dbConfig.dbName);
          console.log('数据库连接成功');
        }
      });
    });
  }
}
// 数据库基本操作
class DbMethods extends Db {
  constructor(collectionName) {
    super();
    this.collectionName = collectionName;
  }
  // 连接特定表
  setCollection() {
    this.collection = DB.collection(this.collectionName);
  }
  insert(data) {
    return wrapPromise(cb => {
      this.collection.insert(data, cb);
    });
  }
  query(query) {
    return wrapPromise(cb => {
      this.collection.find(query).toArray(cb);
    });
  }
  delete(filter) {
    return wrapPromise(cb => {
      this.collection.deleteMany(filter, {}, cb);
    });
  }
  update(filter, update, options) {
    return wrapPromise(cb => {
      this.collection.updateMany(filter, update, options, cb);
    });
  }
}

exports.DbMethods = DbMethods;
exports.Db = Db;
