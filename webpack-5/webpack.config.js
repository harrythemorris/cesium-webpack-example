"use strict";

const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const cesiumSource = "node_modules/cesium/Build/Cesium";
// this is the base url for static files that CesiumJS needs to load
// Not required but if it's set remember to update CESIUM_BASE_URL as shown below
const cesiumAssetPath = "cesiumStatic";
const cesiumBaseUrl = `http://localhost:8080/${cesiumAssetPath}`;

module.exports = {
  context: __dirname,
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    sourcePrefix: "",
    library: "CorsTest",
  },
  resolve: {
    mainFiles: ["index", "Cesium"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        type: "asset/inline",
      },
    ],
  },
  // Add CORS headers
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(cesiumSource, "Workers"),
          to: `${cesiumAssetPath}/Workers`,
        },
        {
          from: path.join(cesiumSource, "ThirdParty"),
          to: `${cesiumAssetPath}/ThirdParty`,
        },
        {
          from: path.join(cesiumSource, "Assets"),
          to: `${cesiumAssetPath}/Assets`,
        },
        {
          from: path.join(cesiumSource, "Widgets"),
          to: `${cesiumAssetPath}/Widgets`,
        },
      ],
    }),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
    }),
  ],
  mode: "development",
  devtool: "eval",
};
