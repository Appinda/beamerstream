const DEVELOP = process.env.NODE_ENV == "develop";

function getHost() {
  const port = DEVELOP ? 5173 : 3000;
  return "http://localhost:" + port;
}

module.exports = {
  getHost,
  DEVELOP,
};
