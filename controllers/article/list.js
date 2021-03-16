const { LIST } = require('../../db/collector');

function getList(params) {
  const { pageSize, pageNo } = params;
  LIST.setCollection();
  return listCollection.collection.find({}, { skip: (pageNo - 1) * pageSize, limit: pageSize }).toArray();
}

module.exports = getList;
