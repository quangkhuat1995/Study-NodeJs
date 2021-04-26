const path = require("path");

const express = require("express");

const shopControllers = require("../controllers/shop");
const router = express.Router();

router.get("/", shopControllers.getIndex);

router.get("/products", shopControllers.getProducts);

router.get("/product/:productId", shopControllers.getProduct);

router.get("/cart", shopControllers.getCart);

router.post("/cart", shopControllers.postCart);

router.get("/orders", shopControllers.getOrders);

router.post("/create-order", shopControllers.postOrder);

// router.get("/checkout", shopControllers.getCheckout);

router.post("/cart-delete-item", shopControllers.postCartDeleteProduct);

module.exports = router;
