const { DbMethods } = require("../db");
const { resStr, justiValid } = require("../lib/util");
const articleMethods = new DbMethods("article");
const tagCollections = new DbMethods("tags");

// 使用 bind 绑定 this 

const article = {
    add: {
        fn: async function (params, res) {
            console.log("params", typeof params);
            console.log("requst params", params.file,  params);
            const errorMsg = justiValid(params, article.validParams);
            if (errorMsg) {
                resStr(res, 400, "", errorMsg);
                return;
            }
            articleMethods.setCollection();
            tagCollections.setCollection();
            await articleMethods.insert({"name": "张宁宁"});
            await tagCollections.insert({ "sex": "male" });
            const queryData = await articleMethods.query();
            resStr(res, 200, queryData);
        },
        method: "POST",
        // 验证规则： 是否必需以及需要的类型
        validParams: {
            name: {
                required: true,
                type: "String"
            }
        }
    }
};

Object.keys(article).forEach(item => {
    const method = article[item];
    const fn = method.fn;
    console.log("fn", method);
    const bindFn = fn.bind(method);
    method.bindFn = bindFn;
});
exports article;