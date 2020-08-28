module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: __dirname,
    filename: './dist/main.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}