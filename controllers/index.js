// 业务模块
const article = require('./article');
const tag = require('./tag');

const ApiMap = {
  article,
  tag
};

// 收集 api 进行组合
const ApiPathMap = Object.keys(ApiMap).reduce((map, api) => {
  const childPaths = Object.keys(ApiMap[api]);
  childPaths.forEach(path => {
    const fullApi = `${api}/${path}`;
    map[fullApi] = ApiMap[api][path];
  });
  return map;
}, {});


module.exports = { ApiPathMap, ApiMap };
