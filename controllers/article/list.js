const { DbMethods } = require('../../db/index');
const listCollection = new DbMethods('list');

function getList(params) {
  const { pageSize, pageNo } = params;
  listCollection.setCollection();
  return listCollection.collection.find({}, { skip: (pageNo - 1) * pageSize, limit: pageSize }).toArray();
}

module.exports = getList;
