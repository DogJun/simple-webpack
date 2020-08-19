const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

module.exports = {
  // 解析代码生成AST抽象语法树
  getAST: (path) => {
    const source = fs.readFileSync(path, 'utf-8')
    return parser.parse(source, {
      sourceType: 'module'
    })
  },
  // 对AST节点进行递归遍历
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },
  // 将ES6 AST => ES5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}
