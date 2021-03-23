const { LIST } = require('../../db/collector');

function getList(params) {
  const { pageSize, pageNo } = params;
  LIST.setCollection();
  return LIST.collection.find({}, { skip: (pageNo - 1) * pageSize, limit: pageSize }).toArray();
}

function setList(list) {
  LIST.setCollection();
  return LIST.collection.insertMany(list);
}

function clearList() {
  LIST.setCollection();
  return LIST.collection.deleteMany();
}


module.exports = { setList, getList, clearList };
