const path = require("path");

const express = require("express");

const adminControllers = require("../controllers/admin");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

// /admin/add-product => GET
router.get("/add-product", isAuth, adminControllers.getAddProduct);

// /admin/product => GET
router.get("/products", isAuth, adminControllers.getProducts);

// /admin/add-product => POST
router.post("/add-product", isAuth, adminControllers.postAddProducts);

router.get("/edit-product/:productId", isAuth, adminControllers.getEditProduct);

router.post("/edit-product", isAuth, adminControllers.postEditProduct);

router.post("/delete-product", isAuth, adminControllers.postDeleteProduct);

module.exports = router;
