const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/chooserImage.js",
    "./js/form.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/debounce.js",
    "./js/filters.js",
    "./js/map.js",
    "./js/mainPin.js",
    "./js/message.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
