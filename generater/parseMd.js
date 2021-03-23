const fs = require('fs');
const marked = require('marked');
const yamlParse = require('js-yaml');

function getPostInfo(text) {
  let yaml = yamlParse.load(text);
  return yaml;
}


function parse(mdPath) {
  const pData = fs.readFileSync(mdPath, 'utf-8');
  const lexerData = marked.lexer(pData);
  let infoLexer = lexerData.splice(0, 3);
  const mdInfos = infoLexer[1].tokens[0];
  const postInfo = getPostInfo(mdInfos.raw);
  const postContent = marked.parser(lexerData);
  return Object.assign(postInfo, { content: postContent });
}
module.exports = parse;
