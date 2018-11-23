// 业务模块
const article = require("./article");
const tag = require("./tag");

const allControllers = [article, { tag }];
console.log("article", article);
// 路由与控制函数映射
let controllerMap = allControllers.reduce((pev, cur) => {
    console.log("cur", cur);
    const temp = {};
    const mainKey = Object.keys(cur)[0];
    for (const key in cur[mainKey]) {
        temp[`/${mainKey}/${key}`] = cur[mainKey][key];
    }
    pev = Object.assign(pev, temp);
    return pev;
}, {});

exports.controllers = controllerMap;