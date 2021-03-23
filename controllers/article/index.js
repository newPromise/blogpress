// const { DbMethods } = require('../db');
// const articleMethods = new DbMethods('article');
// const tagCollections = new DbMethods('tags');
const getDetail = require('./detail');
const { getList } = require('./list');


const article = {
  add: {
  },
  list: {
    method: 'GET',
    handler: getList,
    rules: {
      pageSize: {
        require: true
      },
      pageNo: {
        require: true
      }
    }
  },
  detail: {
    method: 'GET',
    handler: getDetail,
    rules: {
      id: {
        require: true
      }
    }
  }
};


module.exports = article;
