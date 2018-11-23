// 路由控制模块
const { controllers } = require("../controllers");
const URL = require("url");
const http = require("http");
const pathControllers = path => controllers[path];
exports.route = (req, res) => {
    const parseUrl = URL.parse(req.url);
    const path = parseUrl.pathname;
    const getParams = (method, callback) => {
        // GET methods query
        if (method === "GET") {
            const queryParms = URL.parse(req.url, true).query;
            callback(queryParms, res);
        // POST method query
        } else if (method === "POST") {
            let params = "";
            req.addListener("data", (data) => {
                params += data;
            });
            // 接收数据结束
            req.addListener("end", function () {
                console.log("params", params);
                callback(params, res);
            })
        }
    };
    if (pathControllers(path)) {
        const reqMethod = req.method;
        const { fn, method } = pathControllers(path);
        if (reqMethod === "OPTIONS") {
            res.end(JSON.stringify({ status: 400, message: `请求方法应 请求` }));
        } else {
            if (reqMethod !== method) {
                res.statusCode = 405;
                res.end(JSON.stringify({ status: 400, message: `请求方法应为 ${method} 请求` }));
            } else {
                getParams(method, fn);
            }
        }
    } else {
        res.statusCode = 404;
        res.statusMessage = http.STATUS_CODES[res.statusCode];
        res.end(path);
    }
}