# webpackbin2-POC
Experimenting with Webpack in browser

### What I did
First I created mocks. Mostly FS mocking for Webpack. I have also loaded the `babel-loader`, which also required a couple of mocks.

There seems to be a bug in `lib/webpack.web.js`, because the filesystem options and context option is not applied. I had to change to this:

*lib/webpack.web.js*
```js
function webpack(options, callback) {
	new WebpackOptionsDefaulter().process(options);

	const compiler = new Compiler();
	compiler.options = options;
  // THIS IS NEW
  compiler.inputFileSystem = options.inputFileSystem
  compiler.outputFileSystem = options.outputFileSystem
  compiler.context = options.context
  // THIS IS NEW - END
	compiler.options = new WebpackOptionsApply().process(options, compiler);
  new WebEnvironmentPlugin(options.inputFileSystem, options.outputFileSystem).apply(compiler);
	if(callback) {
		compiler.run(callback);
	}
	return compiler;
}
```
