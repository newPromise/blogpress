const { LIST } = require('../../db/collector');

function getList(params) {
  let { pageSize, pageNo } = params;
  pageSize = Number(pageSize);
  pageNo = Number(pageNo);
  LIST.setCollection();
  return LIST.collection.find({}, { skip: (pageNo - 1) * pageSize, limit: pageSize }).toArray().then(data => {
    return data.map(item => {
      item.id = item._id;
      return item;
    });
  }
  );
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
