const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// remember template should have filename like [some-name].hbs

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorControllers = require("./controllers/error");
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

app.use("/admin", adminRoutes);

// app.use("/", (req, res, next) => {
//   res.send("<h1>Hello from express</h1>");
// });
app.use(shopRoutes);

// add 404
app.use(errorControllers.get404);
app.listen(3000);
