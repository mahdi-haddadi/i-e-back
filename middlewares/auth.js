const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/handleError");

exports.accessToken = (req, res, next) => {
  const authHedaer = req.get("Authorization");
  try {
    if (!authHedaer) {
      handleError(401, "don't enough access", { success: false });
    }
    const token = authHedaer.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      handleError(401, "you don't enough access !", { success: false });
    }

    req.userId = decodedToken.id;
    next();
  } catch (error) {
    next(error);
  }
};
