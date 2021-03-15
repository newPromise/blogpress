
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


function is(value, type) {
  const toString = Object.prototype.toString;
  const stripped = toString.call(value).replace(/^\[object\s|\]$/g, '');
  return stripped === type;
}

class ResBody {
  constructor(code, msg) {
    this.code = code;
    this.message = msg;
  }
}


module.exports = {
  wrapPromise,
  is,
  ResBody
};
