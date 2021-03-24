const fs = require('fs');
const marked = require('marked');
const yamlParse = require('js-yaml');
const excludeDesc = [ 'space', 'code' ];
const descLen = 77;

function getPostInfo(text) {
  let yaml = yamlParse.load(text);
  return yaml;
}

// 获取发布文章的描述
function getPostDesc(tokens) {
  let desc = '';
  Array.isArray(tokens) && tokens.filter(token => !excludeDesc.includes(token.type)).forEach(token => {
    desc += token.text;
    desc += getPostDesc(token.tokens);
  });
  return desc.slice(0, 77);
}


function parse(mdPath) {
  const pData = fs.readFileSync(mdPath, 'utf-8');
  const lexerData = marked.lexer(pData);
  let infoLexer = lexerData.splice(0, 3);
  const mdInfos = infoLexer[1].tokens[0];
  const postInfo = getPostInfo(mdInfos.raw);
  const postContent = marked.parser(lexerData);
  return Object.assign(postInfo, { content: postContent, description: getPostDesc(lexerData) + '....' });
}
module.exports = parse;
