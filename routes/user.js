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
const { accessToken } = require("../middlewares/auth");

router.post("/signup", handleSignup);
router.post("/activate", accessToken, handleActive);
router.post("/signin", handleSignin);
router.post("/forget-password", handleForgetPassword);
router.post("/check-code-set-password", checkCodeSetPassword);
router.post("/set-new-password", setNewPassword);

module.exports = router;
