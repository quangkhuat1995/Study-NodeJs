exports.getLogin = (req, res, next) => {
  console.log(req.get("Cookie"));
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // Max-Age=10; Expired=...; Domain=...; Secure (only use for https); HttpOnly
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
