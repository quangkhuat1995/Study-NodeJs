const path = require("path");

const express = require("express");

const productControllers = require("../controllers/products");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productControllers.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productControllers.postAddProducts);

module.exports = router;
