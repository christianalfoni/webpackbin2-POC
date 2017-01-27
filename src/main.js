const path = require('path');
const fs = require('fs');
const webpack = require('webpack/lib/webpack.web');
const babelLoader = require('babel-loader');
fs.mkdirSync(path.join('/', 'app'))
fs.writeFileSync(path.join('/', 'app', 'main.js'), 'const moduleA = require("./moduleA");\nmoduleA();')
fs.writeFileSync(path.join('/', 'app', 'moduleA.js'), 'module.exports = function () { console.log("From modula A"); }')

webpack({
  inputFileSystem: fs,
  outputFileSystem: fs,
  context: '/',
  target: 'web',
  entry: path.join('/', 'app', 'main.js'),
  output: {
    path: path.join('/', 'out'),
    filename: '[name].js',
    publicPath: '/'
  }
}, function () {
  console.log('wuuut?');
  var script = document.createElement('script');
  script.innerHTML = fs.readFileSync(path.join('/', 'out', 'main.js')).toString()
  document.body.appendChild(script);
})
