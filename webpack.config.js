const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const Paths = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./docs"),
  assets: "assets/",
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  externals: {
    paths: Paths,
  },
  entry: "./index.js",
  output: {
    filename: `${Paths.assets}js/[name].[contenthash].js`,
    path: Paths.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/img/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        loader: "file-loader",
        options: {
          name: "./assets/icon/[name].[ext]",
        },
      },
    ],
  },
  devServer: {
    port: 8000,
    hot: isDev,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@img": path.resolve(__dirname, "./src/img"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
