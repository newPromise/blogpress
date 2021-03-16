const { DbMethods } = require('../../db/index');
const bson = require('bson');
const listCollection = new DbMethods('list');


function getDetail(params) {
  const { id } = params;
  listCollection.setCollection();
  return listCollection.collection.findOne({ _id: new bson.ObjectId(id) });
}

module.exports = getDetail;
