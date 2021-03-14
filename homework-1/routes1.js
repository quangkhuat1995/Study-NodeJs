const routes = (req, res) => {
  const { url, method } = req;
  console.log(req);
  if (url === "/") {
    // res.write
  }
};

module.exports = routes;
