const { ESLINT_MODES } = require("@craco/craco")

module.exports = {
  babel: {
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      "babel-plugin-styled-components",
    ],
  },
  eslint: {
    mode: ESLINT_MODES.file,
  },
}
