const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");

const User = require("../models/User");

passport.use(
  new Strategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "this user is not exist!" });
        }
        const passHash = await bcrypt.compare(password, user.password);
        if (!passHash) {
          return done(null, false, {
            message: "username or password is incorrect",
          });
        }
        return done(null, user);
      } catch (error) {
        console.log(`error catch in passport => ${error}`);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
