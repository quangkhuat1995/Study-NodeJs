const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// remember template should have filename like [some-name].hbs

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
const errorControllers = require("./controllers/error");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const { mongoConnect } = require("./util/database");

// midleware
// app.use("/add-product", (req, res, next) => {
//   res.send(
//     "<form action='/product' method='POST'><input type='text' name='title'/><button type='submit'>Add product</button></form>"
//   );
//   // don't call next() here, it will fire the '/' midleware
// });

// // midleware for POST method only
// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

app.use("/admin", adminRoutes);
// app.use(shopRoutes);

// add 404
app.use(errorControllers.get404);

mongoConnect(() => {
  app.listen(3000);
});
