const router = require("express").Router();

const passport = require("passport");
const {
  handleSignup,
  handleSignin,
  handleActive,
  handleForgetPassword,
  checkCodeSetPassword,
  setNewPassword,
} = require("../controllers/userController");

router.post("/signup", handleSignup);
router.post("/active", handleActive);
router.post("/signin", passport.authenticate("local"),handleSignin);
router.post("/forget-password", handleForgetPassword);
router.post("/check-code-set-password", checkCodeSetPassword);
router.post("/set-new-password", setNewPassword);

module.exports = router;
