exports.authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({ msg: "user unAuthenticated", auth: req.isAuthenticated() });
};
exports.unAuthenticat = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({ msg: "user loggedin", auth: req.isAuthenticated() });
};
