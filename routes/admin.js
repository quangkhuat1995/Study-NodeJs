const express = require("express");

const router = express.Router();

router.use("/add-product", (req, res, next) => {
  res.send(
    "<form action='/admin/product' method='POST'><input type='text' name='title'/><button type='submit'>Add product</button></form>"
  );
  // don't call next() here, it will fire the '/' midleware
});

// midleware for POST method only
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
