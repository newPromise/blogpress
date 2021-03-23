const path = require('path');
const fs = require('fs');
const postsPath = path.resolve(__dirname, '../source/posts');
const parseMd = require('./parseMd');
function generatePost() {
  const postFiles = fs.readdirSync(postsPath);
  const parsed = postFiles.map(fileName => {
    const filePath = `${postsPath}/${fileName}`;
    return parseMd(filePath);
  });
  return parsed;
}

module.exports = generatePost;
