function wrapPromise(fn) {
    return new Promise((resolve, reject) => {
        fn((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }).then(result => {
        return result;
    }, err => {
        console.error(new Error(err));
        return err;
    });
}

const toString = Object.prototype.toString;
function is(value, type) {
    const stripped = toString.call(value).replace(/^\[object\s|\]$/g, '');
    return stripped === type;
}

function resStr(res, status, data, message = "success") {
    res.statusCode = status;
    res.end(JSON.stringify({ status, message, data }));
}

function justiValid(params, validParams) {
    const allVaidParams = Object.keys(validParams);
    let msg = "";
    // 使用 map 或者 foreach 不能使用循环
    for (let param of allVaidParams) {
        if (validParams[param].required) {
            if (!params[param]) {
                return msg = `${param} is required`
            }
        }
        if (params[param]) {
            if (!is(params[param], validParams[param].type)) {
                return msg = `${param} is type ${validParams[param].type}`;
            }
        }
    }
};

exports.wrapPromise = wrapPromise;
exports.is = is;
exports.resStr = resStr;
exports.justiValid = justiValid;