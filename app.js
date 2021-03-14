const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const app = express();

// remember template should have filename like [some-name].hbs
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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

app.use("/admin", adminData.router);

// app.use("/", (req, res, next) => {
//   res.send("<h1>Hello from express</h1>");
// });
app.use(shopRoutes);

// add 404
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
app.listen(3000);
