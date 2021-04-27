const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // console.log(req.session);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // Max-Age=10; Expired=...; Domain=...; Secure (only use for https); HttpOnly
  // res.setHeader("Set-Cookie", "loggedIn=true");
  User.findById("608686f82602664d50cafde9")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.session.save((er) => {
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};