// const { DbMethods } = require('../db');
// const articleMethods = new DbMethods('article');
// const tagCollections = new DbMethods('tags');
const getDetail = require('./detail');


const article = {
  add: {
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
