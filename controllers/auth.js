const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // console.log(req.session);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: false,
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

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
