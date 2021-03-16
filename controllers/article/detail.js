const { LIST } = require('../../db/collector');
const bson = require('bson');


function getDetail(params) {
  const { id } = params;
  LIST.setCollection();
  return LIST.collection.findOne({ _id: new bson.ObjectId(id) });
}

module.exports = getDetail;
