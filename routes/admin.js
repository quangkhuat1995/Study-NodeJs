const path = require("path");
const express = require("express");

const rootDir = require("../util/path");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
  // don't call next() here, it will fire the '/' midleware
});

// midleware for POST method only
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
