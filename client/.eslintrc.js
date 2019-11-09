module.exports = {
  extends: ["eslint-config-react-app"],
  plugins: ["babel"],
  rules: {
    "no-unused-expressions": "off",
    "babel/no-unused-expressions": "error",
  },
}
