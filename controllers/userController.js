const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc    Register new user
// @route   POST  /API/v1/user/signup
// @access  public
exports.handleSignup = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;

    // user validation
    await User.userValidation(req.body);

    // check user already exist
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res
        .status(400)
        .json({ msg: "این کاربر در سیستم قبلا ثبت شده است" });
      // throw new Error("این کاربر در سیستم قبلا ثبت شده است");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      fullname,
      username,
      password: hashPassword,
    });
    if (user) {
      return res.status(201).json({
        success: true,
        active: user.active,
        token: generateToken(user.username),
      });
    } else {
      return res.status(400).json({ msg: "invalid user data" });
      // throw new Error("invalid user data");
    }
  } catch (error) {
    const errors = [];
    error.inner.forEach((e) => {
      errors.push({
        name: e.path,
        errors: e.errors,
      });
    });
    return res.status(400).json({ msg: errors });
  }
};

// @desc    active user
// @route   POST  /API/v1/user/active
// @access  public
exports.handleActive = async (req, res) => {
  try {
    const { code, token } = req.body;
    const { key: username } = jwt.decode(token);
    const user = await User.findOne({ username });
    // check exist user
    if (!user) {
      return res.status(400).json({ msg: "user not exist", success: false });
    }
    // check active user
    if (user.active) {
      return res.status(400).json({ msg: "user is active", success: false });
    }
    // check to be right code
    if (code !== "123456") {
      return res.status(400).json({ msg: "code is false", success: false });
    }

    //   active user
    await User.updateOne(
      { username: user.username },
      { $set: { active: true } }
    );
    return res.status(200).json({ msg: "activated", success: true });
  } catch (error) {
    return res.status(500).json({ msg: "there is a problem" });
  }
};

// @desc    signin user
// @route   POST  /API/v1/user/login
// @access  public
exports.handleSignin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // get user
    const user = await User.findOne({ username });

    // check enter username and password
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "enter username and password" });
    }

    // check exist user
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "user is not exist", login: false });
    }

    // check activate user
    if (!user.active) {
      return res
        .status(400)
        .json({ success: false, msg: "user is not active" });
    }

    // sync password user
    const syncPassword = await bcrypt.compare(password, user.password);
    // check sync password user
    if (!syncPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "username or password is not true" });
    }
    // success login
    return res.status(200).json({
      success: true,
      token: generateToken({
        fullname: user.fullname,
        username: user.username,
      }),
    });
  } catch (error) {
    return res.status(500).json({ msg: "there is a problem" });
  }
};

// @desc    forget password user
// @route   POST  /API/v1/user/forget-password
// @access  public
exports.handleForgetPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    // check exsit user
    if (!user) {
      return res.status(400).json({ msg: "user not exist", user: false });
    }
    // send code to email or phone number
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ msg: "there is a problem" });
  }
};

// @desc    check code for change password user
// @route   POST  /API/v1/user/check-code-set-password
// @access  public
exports.checkCodeSetPassword = async (req, res) => {
  try {
    const { code } = req.body;
    if (code !== "123456") {
      return res.status(400).json({ success: false, msg: "code is false" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ msg: "there is a problem" });
  }
};

// @desc    set new password
// @route   POST  /API/v1/user/set-new-password
// @access  public
exports.setNewPassword = async (req, res) => {
  try {
    const { username, password, passwordConfirm } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, msg: "user not exist" });
    }
    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        msg: "password and confirm password must to be equal",
      });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, msg: "password must be more than 6 chracter" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.updateOne(
      { username: user.username },
      { $set: { password: hashPassword } }
    );
    return res.status(200).json({ success: true, message: "password updated" });
  } catch (error) {
    return res.status(500).json({ msg: "there is a problem" });
  }
};
const generateToken = (key) => {
  return jwt.sign({ key }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
