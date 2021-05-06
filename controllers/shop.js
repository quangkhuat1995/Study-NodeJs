const Product = require("../models/product");
const Order = require("../models/order");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const ITEMS_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  const { page } = req.query;

  Product.find()
    .skip((Number(page || 1) - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .then((products) => {
      res.render("shop/index", {
        // <= path to folder views
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate() // to create a promise
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then((product) => {
      req.user.addToCart(product);
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate() // to create a promise
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, productData: { ...i.productId._doc } }; // ._doc to get full data instead of _id only
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });

      return order.save(); // save to db
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      return res.redirect("/orders");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .removeFromCart(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const { orderId } = req.params;
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("No order found"));
      }

      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized"));
      }

      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);

      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "inline; filename=" + invoiceName + '"'
      );

      pdfDoc.pipe(fs.createWriteStream(invoicePath)); // save to server
      pdfDoc.pipe(res); // send to client

      pdfDoc.fontSize(26).text("Invoice", { underline: true });
      pdfDoc.text("----------------");
      let totalPrice = 0;
      order.products.forEach((p) => {
        totalPrice += p.quantity * p.productData.price;
        pdfDoc
          .fontSize(16)
          .text(
            `${p.productData.title}: ${p.quantity} x $${p.productData.price}`
          );
      });
      pdfDoc.text("----------------");
      pdfDoc.fontSize(20).text(`Total Price: $ ${totalPrice}`);

      pdfDoc.end();
      /**
       * read file into memory then send the response, this is not good for large file
       */
      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.setHeader("Content-Type", "application/pdf");
      //   res.setHeader(
      //     "Content-Disposition",
      //     "inline; filename=" + invoiceName + '"'
      //   );
      //   res.send(data);
      // });

      /**
       * Send file as streaming data
       */
      // const file = fs.createReadStream(invoicePath);
      // res.setHeader("Content-Type", "application/pdf");
      // res.setHeader(
      //   "Content-Disposition",
      //   "inline; filename=" + invoiceName + '"'
      // );
      // file.pipe(res);
    })
    .catch((err) => {
      return next(err);
    });
};
