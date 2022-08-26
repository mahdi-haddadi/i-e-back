const bcrypt = require("bcrypt");
const User = require("./../models/User");
const { generateToken } = require("../utils/generateToken");
const { handleError } = require("../utils/handleError");

// @desc    Register new user
// @route   POST  /API/v1/user/signup
// @access  public
exports.handleSignup = async (req, res, next) => {
  try {
    const { fullname, username, password } = req.body;

    // user validation
    await User.userValidation(req.body);

    // check user already exist
    const user = await User.findOne({ username });
    if (user) {
      handleError(422, "User Already Exist!", { success: false });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    User.create(
      {
        fullname,
        username,
        password: hashPassword,
      },
      (err, _user) => {
        if (err) {
          handleError(500, "ooops", { success: false, error: err });
        }
        const token = generateToken({ id: _user._id, active: _user.active });
        return res.status(201).json({
          success: true,
          token,
          msg: "User Created",
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

// @desc    active user
// @route   POST  /API/v1/user/active
// @access  protect
exports.handleActive = async (req, res, next) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({ _id: req.userId });

    // check active user
    if (user.active) {
      handleError(400, "user is active", { success: false });
    }
    // check to be right code
    if (code !== "123456") {
      handleError(400, "code is false", { success: false });
    }

    //   active user
    await User.updateOne(
      { _id: user._id.toString() },
      { $set: { active: true } }
    );
    return res.status(200).json({ msg: "User Activated", success: true });
  } catch (error) {
    next(error);
  }
};

// @desc    signin user
// @route   POST  /API/v1/user/login
// @access  public
exports.handleSignin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    await User.userSigninValidation(req.body);

    // get user
    const user = await User.findOne({ username });

    // check exist user
    if (!user) {
      handleError(401, "user is not exist", { success: false, login: false });
    }

    // check activate user
    if (!user.active) {
      handleError(422, "user is not active", { success: false, active: false });
    }

    // sync password user
    const syncPassword = await bcrypt.compare(password, user.password);
    // check sync password user
    if (!syncPassword) {
      handleError(400, "username or password is not true", { success: false });
    }
    // success login
    return res.status(200).json({
      success: true,
      token: generateToken({
        id: user._id,
      }),
      data: {
        fullname: user.fullname,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    forget password user
// @route   POST  /API/v1/user/forget-password
// @access  public
exports.handleForgetPassword = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    // check exsit user
    if (!user) {
      handleError(400, "user not exist", { user: false, success: false });
    }
    // send code to email or phone number
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// @desc    check code for change password user
// @route   POST  /API/v1/user/check-code-set-password
// @access  public
exports.checkCodeSetPassword = async (req, res, next) => {
  try {
    const { code } = req.body;
    if (code !== "123456") {
      handleError(400, "code is false", { success: false });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// @desc    set new password
// @route   POST  /API/v1/user/set-new-password
// @access  public
exports.setNewPassword = async (req, res, next) => {
  try {
    const { username, password, passwordConfirm } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      handleError(400, "user not exist", { success: false });
    }
    if (password !== passwordConfirm) {
      handleError(400, "password and confirm password must to be equal", {
        equal: false,
        success: false,
      });
    }
    if (password.length < 6) {
      handleError(400, "password must be more than 6 chracter", {
        success: false,
        length: false,
      });
    }
    const syncPassword = await bcrypt.compare(password, user.password);
    if (syncPassword) {
      handleError(400, "Enter A New Password", {
        success: false,
        newPassword: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.updateOne(
      { username: user.username },
      { $set: { password: hashPassword } }
    );
    return res.status(200).json({ success: true, message: "password updated" });
  } catch (error) {
    next(error);
  }
};
