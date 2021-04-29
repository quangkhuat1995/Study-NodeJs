const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  // console.log(req.session);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  // Max-Age=10; Expired=...; Domain=...; Secure (only use for https); HttpOnly
  // res.setHeader("Set-Cookie", "loggedIn=true");
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      // validate password
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.user.save((er) => {
              res.redirect("/");
            });
          }
          return res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          return res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  // validate input later
  // still should check for duplicate email
  User.findOne({ email })
    .then((userDoc) => {
      // user exist
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
