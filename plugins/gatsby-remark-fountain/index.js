const select = require("unist-util-select");
const fountain = require("fountain-js");

module.exports = ({ markdownAST }) => {
  const screenplays = findScreenplays(markdownAST);

  if (!screenplays.length) return;

  screenplays.forEach(screenplay => convertFountainToScreenplay(screenplay));
}

function findScreenplays(markdownAST) {
  return select.selectAll("[lang='fountain']", markdownAST);
}

function convertFountainToScreenplay(node) {
  const content = stripTags(node.value);
  const screenplay = fountain.parse(content);

  node.type = "html";
  node.value = `<div class="fountain">` + screenplay.script_html + `</div>`;
  delete node.children;
}

function stripTags(htmlString) {
  return htmlString.replace(/<[^>]+>/g, '');
}
