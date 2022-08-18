const express = require("express");
const passport = require("passport");
const connectDB = require("./configs/connectDB");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require('cors');
const { errorHandler } = require("./middlewares/errorMiddleware");

const port = process.env.PORT || 3000;

require("dotenv").config();

// connect db
connectDB();

// config passport middleware
require("./configs/passport");

const app = express();

// express parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

// sesstion config
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/income-expenses",
      ttl: 30 * 24 * 60 * 60,
    }),
    unset: "destroy",
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// route user
app.use("/API/v1/user", require("./routes/user"));
app.use("/API/v1/manage", require("./routes/manage"));

// app.get("/API/v1/admin/profile", authenticated, (req, res) => {
//   return res.status(200).json({ msg: "ok" });
// });

// page 404
app.use("/", (req, res) => {
  res.status(404).json({msg:'request failed'});
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
