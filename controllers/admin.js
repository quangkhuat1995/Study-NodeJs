const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      // console.log(res)
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const { productId } = req.params;
//   // Product.findByPk(productId)
//   req.user
//     .getProducts({ where: { id: productId } })
//     .then((products) => {
//       const product = products[0];
//       if (!product) return res.redirect("/");

//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((err) => console.log(er));
// };

// exports.getProducts = (req, res, next) => {
//   // Product.findAll()
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const { productId, title, price, imageUrl, description } = req.body;

//   Product.findByPk(productId)
//     .then((product) => {
//       product.title = title;
//       product.price = price;
//       product.imageUrl = imageUrl;
//       product.description = description;

//       return product.save();
//     })
//     .then((result) => {
//       console.log("UPDATED PRODUCT");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const { productId } = req.body;
//   Product.findByPk(productId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       console.log("PRODUCT DELETE");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };
