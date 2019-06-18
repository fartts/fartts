/**
 * NOTE: this *must* be in a `.babelrc` or `.babelrc.js` file
 * @see: https://github.com/parcel-bundler/parcel/blob/master/packages/core/parcel-bundler/src/transforms/babel/babelrc.js#L73
 */
module.exports = {
  presets: ['@babel/typescript'],
  plugins: ['@babel/syntax-import-meta'],
};
