const path = require("path");

const express = require("express");

const shopControllers = require("../controllers/shop");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

router.get("/", shopControllers.getIndex);

router.get("/products", shopControllers.getProducts);

router.get("/product/:productId", shopControllers.getProduct);

router.get("/cart", isAuth, shopControllers.getCart);

router.post("/cart", isAuth, shopControllers.postCart);

router.get("/orders", isAuth, shopControllers.getOrders);

router.post("/create-order", isAuth, shopControllers.postOrder);

// router.get("/checkout", shopControllers.getCheckout);

router.post("/cart-delete-item", isAuth, shopControllers.postCartDeleteProduct);

module.exports = router;
