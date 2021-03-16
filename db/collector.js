const { DbMethods } = require('./index');

const collections = [ 'LIST' ];

module.exports = collections.reduce((total, collect) => {
  total[collect] = new DbMethods(collect.toLowerCase());
  return total;
}, {});
